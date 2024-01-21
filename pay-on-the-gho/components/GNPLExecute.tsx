import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pool, InterestRate, EthereumTransactionTypeExtended } from '@aave/contract-helpers';
import { ethers, providers, BigNumber } from 'ethers';
import { useAccount } from 'wagmi';

interface ProductDetails {
    price: number;
    // Add other relevant product details here
}

interface GNPLExecuteProps {
    productId: number;
    merchantId: string;
    onPaymentSuccess: (response: any) => void;
    onPaymentError: (error: any) => void;
}

const GNPLExecute: React.FC<GNPLExecuteProps> = ({
    productId,
    merchantId,
    onPaymentSuccess,
    onPaymentError,
}) => {
    const router = useRouter();
    const { data: accountData } = useAccount();
    const [product, setProduct] = useState<ProductDetails | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`/api/product/${productId}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                } else {
                    throw new Error(`Failed to fetch product details: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                onPaymentError(error);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    const handleTransaction = async () => {
        if (!product) {
            console.error('Product details not available');
            return;
        }

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const poolAddress = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951'; // Replace with the actual pool address
            const wethGatewayAddress = '...'; // Replace with actual WETH Gateway address
            const pool = new Pool(provider, {
                POOL: poolAddress,
                WETH_GATEWAY: wethGatewayAddress,
            });

            const user = accountData?.address;
            if (!user) {
                throw new Error('User wallet not connected');
            }
            const ghoAddress = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60'; // Replace with the actual GHO token address

            // Calculate deposit amount (1.5x of the product price)
            const depositAmount = BigNumber.from(product.price).mul(150).div(100);
            const borrowAmount = BigNumber.from(product.price); // Borrow amount equals product price

            // Deposit GHO tokens as collateral
            const supplyTxs: EthereumTransactionTypeExtended[] = await pool.supply({
                user,
                reserve: ghoAddress,
                amount: depositAmount.toString(),
                onBehalfOf: user,
            });
            await submitTransaction({ provider, tx: supplyTxs[0] });

            // Borrow against the collateral
            const borrowTxs: EthereumTransactionTypeExtended[] = await pool.borrow({
                user,
                reserve: ghoAddress,
                amount: borrowAmount.toString(),
                interestRateMode: InterestRate.Variable,
                onBehalfOf: user,
            });
            await submitTransaction({ provider, tx: borrowTxs[0] });

            // Send borrowed amount to merchant
            const merchantWalletAddress = '...'; // Replace with actual merchant wallet address
            await provider.getSigner().sendTransaction({
                to: merchantWalletAddress,
                value: borrowAmount,
            });

            onPaymentSuccess();
            router.push(`/checkout/${productId}`);
        } catch (error) {
            onPaymentError(error);
        }
    };

    // ... submitTransaction function

    return (
        <button className='GNPLButton' onClick={handleTransaction}>
            GHO now pay later
        </button>
    );
};

export default GNPLExecute;

// pages/checkout/[session_id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutCard from '../../components/CheckoutCard';

interface Product {
    productId: string;
    currency: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    merchantId: string;
    merchantName: string;
    merchantLogo: string;
    productPriceInGHO: number;
    // Add additional fields as required
}

const CheckoutSessionPage = () => {
    const router = useRouter();
    const { session_id } = router.query;
    const [productDetails, setProductDetails] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!session_id) return;

            // Fetching session data logic (placeholder)
            const sessionResponse = {
                sessionId: session_id,
                productId: "a210b284-cc55-42ec-8c65-744a7206b71e", // Example product ID
                merchantId: "8d4e8840-363c-4847-bab7-9353aa05f86a" // Example merchant ID
            };

            try {
                const res = await fetch(`/api/product/${sessionResponse.productId}`);
                if (!res.ok) throw new Error('Failed to load product data');
                const data: Product = await res.json();
                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [session_id]);

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    // Assuming CheckoutCard accepts Product type as a prop
    return (
        <div>
            <CheckoutCard
                productId={productDetails.productId}
                merchantLogo={productDetails.merchantLogo}
                merchantName={productDetails.merchantName}
                productName={productDetails.name}
                productDescription={productDetails.description}
                productPhoto={productDetails.imageUrl}
                productPriceInUSD={productDetails.price}
                productPriceInGHO={productDetails.price} // Assuming GHO price is the same as USD price
                selectedCollateralAsset={"ETH"} // Placeholder
                // supportedCollateralAssetList={["WETH", "Asset2"]} // Placeholder
                collateralRatio={1.5} // Placeholder
                collateralAmount={149.95} // Placeholder
                gasFeeAmount={0.01} // Placeholder
                networkAsset={"GHO"} // Placeholder
                gasFeeInUSD={10} // Placeholder
            />
        </div>
    );
};

export default CheckoutSessionPage;

import Image from 'next/image';
import React from 'react';
import GNPLExecute from './GNPLExecute';
import ConnectWallet from './ConnectWallet';

interface CheckoutCardProps {
    productId: number;
    merchantId: string;
    merchantLogo: string;
    merchantName: string;
    productName: string;
    productDescription: string;
    productPhoto: string;
    productPriceInUSD: number;
    productPriceInGHO: number;
    selectedCollateralAsset: string;
    supportedCollateralAssetList: string[];
    collateralRatio: number;
    collateralAmount: number;
    gasFeeAmount: number;
    networkAsset: string;
    gasFeeInUSD: number;
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
    productId,
    merchantId,
    merchantLogo,
    merchantName,
    productName,
    productDescription,
    productPhoto,
    productPriceInUSD,
    productPriceInGHO,
    selectedCollateralAsset,
    supportedCollateralAssetList,
    collateralRatio,
    collateralAmount,
    gasFeeAmount,
    networkAsset,
    gasFeeInUSD
}) => {
    return (
        <div className='CheckoutCard'>
            <ConnectWallet />
            <h3>Pay with GHO</h3>
            <div className='ProductSection'>
                <div className='ProductSectionTop'>
                    <div className='ProductSectionLeft'>
                        <Image src={productPhoto} width={140} height={90} alt={productName} className='ProductPhoto' />
                    </div>
                    <div className='ProductSectionRight'>
                        <div className='Merchantlogo'>
                            <img src={merchantLogo} alt={merchantName} className='MerchantLogo' />
                            <p>{merchantName}</p>
                        </div>
                        <div>
                            <p>{productName}</p>
                            <p>{productDescription}</p>
                        </div>
                    </div>
                </div>
                <div className='ProductSectionBottom'>
                    <p>Product price</p>
                    <div className='ProductPriceRight'>
                        <div className='ProductPriceUSD'>${productPriceInUSD.toFixed(2)}</div>
                        <div>| {productPriceInGHO.toFixed(2)} GHO</div>
                    </div>
                </div>
            </div>

            {/* Collateral Section */}
            <div className='CollateralSection'>
                <p>Collateral Details</p>
                <div className='CollateralSectionTop'>
                    <div className='CollateralSectionRight'>
                        <p>Collateral asset</p>
                    </div>
                    <div className='CollateralSectionLeft'>
                        <p>${collateralAmount}</p>
                        <p>{selectedCollateralAsset}</p>

                    </div>
                </div>
                <div className='CollateralSectionBottom'>
                    <p>Collateral Ratio</p>
                    <p>{collateralRatio}x</p>
                </div>
            </div>

            {/* Gas Fee Section */}
            <div className='GasSection'>
                <p>Gas Fee</p>
                <div className='GasSectionLeft'>
                    <p className='GasSectionAmount'>${gasFeeInUSD.toFixed(2)}</p>
                    <p>|</p>
                    <p> {gasFeeAmount} {networkAsset} ETH</p>
                </div>
            </div>

            <GNPLExecute
                productId={productId}
                merchantId={merchantId}
                onPaymentSuccess={function (response: any): void {
                    throw new Error('Function not implemented.');
                }} onPaymentError={function (error: any): void {
                    throw new Error('Function not implemented.');
                }} />
        </div>
    );
};

export default CheckoutCard;

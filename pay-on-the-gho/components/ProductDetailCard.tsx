// ProductDetail component
import Image from 'next/image';
import React from 'react';
import GNPLButton from './GNPLButton'; // Import the GNPLButton component
import ConnectWallet from './ConnectWallet';

interface Product {
    productId: number;
    currency: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    merchantId: string;
}

const ProductDetail: React.FC<{ product: Product }> = ({ product }) => {

    const handlePaymentSuccess = (response: any) => {
        console.log('Payment Session Create Successful:', response);
        // Handle successful payment here
    };

    const handlePaymentError = (error: any) => {
        console.error('Payment Session Create Error:', error);
        // Handle payment error here
    };

    console.log(product);

    return (
        <div className='ProductDetails'>
            <div className='ProductDetailsLeft'>
                <ConnectWallet />
                <Image src="/etsy_productdetail.png" width={1240} height={740} alt={`${product.name}`} />
            </div>
            <div className='ProductDetailsRight'>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: {product.currency} {product.price.toFixed(2)}</p>
                <GNPLButton
                    productId={product.productId}
                    merchantId={product.merchantId}
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                />
            </div>
        </div>
    );
};

export default ProductDetail;

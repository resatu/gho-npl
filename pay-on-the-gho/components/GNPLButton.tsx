import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

interface GNPLButtonProps {
    productId: number;
    merchantId: string;
    onPaymentSuccess: (response: any) => void;
    onPaymentError: (error: any) => void;
}

const GNPLButton: React.FC<GNPLButtonProps> = ({
    productId,
    merchantId,
    onPaymentSuccess,
    onPaymentError
}) => {
    const router = useRouter();

    const handleRedirect = async () => {
        try {
            const response = await fetch('/api/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, merchantId }),
            });

            const data = await response.json();
            if (response.ok) {
                onPaymentSuccess(data);
                router.push(`/checkout/${data.sessionId}`);
            } else {
                throw new Error('Failed to create checkout session');
            }
        } catch (error) {
            onPaymentError(error);
        }
    };

    return (
        <button className='GNPLButton' onClick={handleRedirect}>
            <Image src="/merchant-homecard.png" width={24} height={24} alt='GHO' />
            GHO now pay later
        </button>
    );
};

export default GNPLButton;

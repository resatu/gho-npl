// pages/api/pay.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import { createCheckoutSession } from '../../lib/createCheckoutSession';
import { generateUniqueId } from '../../utils/generateUniqueId'; // Ensure this path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { productId, merchantId } = req.body;

        // Validate the input data
        if (!productId || !merchantId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Use createCheckoutSession to create a new session
        const checkoutSession = createCheckoutSession({
            sessionId: generateUniqueId(),
            productId,
            merchantId,
        });

        res.status(200).json(checkoutSession);
    } catch (error) {
        console.error('Payment API error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

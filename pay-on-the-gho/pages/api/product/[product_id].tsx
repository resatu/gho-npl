export default function handler(req, res) {
    const { product_id } = req.query;

    const products = {
        'a210b284-cc55-42ec-8c65-744a7206b71e': {
            productId: 'a210b284-cc55-42ec-8c65-744a7206b71e',
            merchantId: '8d4e8840-363c-4847-bab7-9353aa05f86a', // Example merchant ID
            currency: "USD",
            name: 'NuPhy Air low switches Animal Duck keycap',
            price: 99.99,
            description: 'NuPhy Air low switches Animal Duck keycap key cap for Personalized manual mechanical keyboard',
            imageUrl: '/etsy_productdetail.png',    // Replace with your product image URL
            merchantLogo: '/Merchant_logo.png',
            merchantName: 'etsy.com',
            productPriceInGHO: 99.99,
        },
        // ... other products
    };

    const product = products[product_id];

    if (product) {
        res.status(200).json(product);
    } else {
        console.log(`Product not found for ID: ${product_id}`);
        res.status(404).json({ message: "Product not found" });
    }
}
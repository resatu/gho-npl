import ProductDetail from "@/components/ProductDetailCard";

interface ProductProps {
    product: any; // Define a more specific type if possible
}

// This function component displays the product details
export default function Product({ product }: ProductProps) {
    if (!product) {
        return <div>Product not found</div>;
    } else {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ProductDetail
                // center the component pls horiz and vert with custom styles
                product={product}
            />
        </div>
    }
}

// This function runs on the server for each request and fetches product data
// Inside getServerSideProps in pages/products/[product_id].tsx

export async function getServerSideProps(context) {
    const { product_id } = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${product_id}`);

    if (!res.ok) {
        console.error(`API response error: Status ${res.status}`);
        return { props: { product: null } };
    }

    const product = await res.json();
    return { props: { product } };
}

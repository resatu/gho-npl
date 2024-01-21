import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Home from '@/components/HomeCard';
import ConnectWallet from '@/components/ConnectWallet';
import { useRouter } from 'next/router'; // Import useRouter

const Mainpage: NextPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const isConnected = localStorage.getItem('wagmi.connected') === 'true';
    setIsLogged(isConnected);

    // Redirect to the product detail page if wagmi.connected is true
    if (isConnected) {
      // Replace '/product-detail' with your actual product detail page route
      router.push('/products/a210b284-cc55-42ec-8c65-744a7206b71e');
    }
  }, [router]);

  // Render logic remains the same
  return (
    isLogged ?
      <div>
        <ConnectWallet />
      </div>
      :
      <div>
        <Home
          image="/home-card.png"
          title="GHO NOW PAY LATER"
          description="Flexible spending, preserve your crypto. GNPL empowers you to make purchases without liquidating your valuable crypto assets. Keep your cryptocurrency investments intact while still having access to funds for your everyday needs."
        />
      </div>
  );
};

export default Mainpage;

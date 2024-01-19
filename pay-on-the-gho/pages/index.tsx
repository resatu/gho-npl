import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Home from '@/components/Home';
import { ConnectWallet } from '@/components/ConnectWallet';

const Mainpage: NextPage = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Implement logic to check if user is logged in
    // This could be checking for a token in localStorage, a state in context, etc.
    // For example:
    // setIsLogged(!!localStorage.getItem('userToken'));

    // Temporary logic to simulate a logged-in user
    setIsLogged(localStorage.getItem('wagmi.connected') === 'true')
  }, []);

  return (
    isLogged ? <ConnectWallet /> :
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
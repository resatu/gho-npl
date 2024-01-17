import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [ethAmount, setEthAmount] = useState('');

  const handleLogin = () => {
    // Mock login function
    setIsLogged(true);
  };

  const handleLockCollateral = () => {
    // Mock collateral lock function
    console.log(`Locking ${ethAmount} ETH as collateral`);
    // Here you would interact with the CollateralContract
  };

  const handlePurchase = () => {
    // Mock purchase function
    console.log('Processing purchase with GHO');
    // Here you would interact with the MintingContract
  };

  return (
    isLogged ? (
      <Layout
        title="Payment Portal"
        description="Lock ETH and complete purchase"
        buttonText="Proceed"
        buttonOnClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      >
        <h1>Payment Portal</h1>
        <input
          type="text"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          placeholder="Amount of ETH to lock"
        />
        <button onClick={handleLockCollateral}>Lock ETH as Collateral</button>
        <button onClick={handlePurchase}>Complete Purchase with GHO</button>
        <Link href="/repayment">Go to Repayment</Link>
      </Layout>
    ) : (
      <Layout
        title="GHO NOW PAY LATER"
        description="Value prop."
        buttonText="Purchase with GHO"
        buttonOnClick={handleLogin} // Pass the handleLogin function as a prop
      />
    )
  );
};

export default IndexPage;
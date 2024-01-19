import React, { useState } from 'react';
import Image from 'next/image';
import type { NextPage } from 'next';
import Home from '@/components/Home';



const Mainpage: NextPage = () => {
  return (
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
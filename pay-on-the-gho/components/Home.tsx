import Link from 'next/link';
import Image from 'next/image';
import { ConnectWallet } from './ConnectWallet';

interface HomeProps {
    image: string;
    title: string;
    description: string;
}

const Home: React.FC<HomeProps> = ({ image, title, description }) => (
    <div className='HomeCard'>
        <Image src={image} alt={title} width={825} height={622} />
        <h1>{title}</h1>
        <h2>{description}</h2>
        <ConnectWallet />
    </div>
);

export default Home;
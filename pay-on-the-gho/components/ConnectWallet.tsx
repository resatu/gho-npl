import { ConnectKitButton } from "connectkit";

interface ConnectWalletProps {
    label: string;
    showBalance?: boolean;
}

const buttonText = "Start paying with GHO"; // Declare and assign a value to the buttonText variable
export default function ConnectWallet() {
    return (
        <div>
            <ConnectKitButton label={buttonText} showBalance={true} />
        </div>
    );
}

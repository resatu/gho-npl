import { ConnectKitButton } from "connectkit";

interface ConnectWalletProps {
    label: string;
}

const buttonText = "Start paying with GHO"; // Declare and assign a value to the buttonText variable
export function ConnectWallet() {
    return (
        <div>
            <ConnectKitButton label={buttonText} />
        </div>
    );
}

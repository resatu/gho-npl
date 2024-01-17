import { GetServerSideProps, NextPage } from "next";
import { siweServer } from "@/utils/siweServer";

const walletHasToken = async (address: string): Promise<boolean> => {
    // Implement your token-gated logic here
    return true; // Placeholder
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const { address } = await siweServer.getSession(req, res);

    if (!address || !(await walletHasToken(address))) {
        return {
            redirect: {
                permanent: false,
                destination: '/login', // Redirect if wallet does not have the required token
            },
        };
    }

    return {
        props: {},
    };
};

const CollectorsOnlyPage: NextPage = () => {
    return (
        <div>Welcome, collector.</div>
    );
};

export default CollectorsOnlyPage;
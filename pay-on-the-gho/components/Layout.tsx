type LayoutProps = {
    title: string;
    description: string;
    buttonText?: string;
    buttonOnClick?: () => void;
    children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ title, description, buttonText, buttonOnClick, children }) => {
    return (
        <div className="layout-container">
            <h1 className="layout-title">{title}</h1>
            <p className="layout-description">{description}</p>
            {buttonText && buttonOnClick && (
                <button className="layout-button" onClick={buttonOnClick}>{buttonText}</button>
            )}
            {children}
        </div>
    );
};

export default Layout;
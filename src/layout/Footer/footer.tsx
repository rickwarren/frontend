import React from 'react';
import "./footer.styles.scss";

const Footer: React.FC = (props: any) => {
    return (
        <>
            <div className="footer-wrapper">
                <div className="copyright-wrapper">
                    © Bloom Inc 2024
                </div>
            </div>
        </>
    );
}

export default Footer;
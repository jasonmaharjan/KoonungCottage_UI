import { useEffect } from "react";
import { Link } from "react-router-dom";

import { notification } from "antd";
import "./paymentInfo.css";

const PaymentInfo = ({ params }) => {
    console.log(params);
    const chargeToken = window.location.search;
    console.log(chargeToken);

    const openNotification = ({ message, description, type }) => {
        notification[type]({
            message,
            description,
            duration: 3,
        });
    };

    useEffect(() => {
        // TO DO -> check for the validity of charge token
        if (chargeToken) {
            openNotification({ type: "success", message: "Payment Successful", description: "Thank you for using our service!" });
        } else {
            openNotification({ type: "error", message: "Payment Unsuccessful", description: "Please contact the administrators" });
        }
    });

    return (
        <section>
            <Link style={{ fontSize: "1rem", textAlign: "center", textDecoration: "underline" }} to="/">
                Back to Homepage
            </Link>
        </section>
    );
};

export default PaymentInfo;

import { FilterOutlined } from "@ant-design/icons";

import "./button.css";

const Button = ({ title, onClick }) => {
    return (
        <button className={`button-${title}`} onClick={onClick}>
            {title === "filter" ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FilterOutlined /> &nbsp;
                    {title}
                </div>
            ) : (
                title
            )}
        </button>
    );
};

export default Button;

import "./button.css";

const Button = ({ title, onClick }) => {
    return (
        <button className={`button-${title}`} onClick={onClick}>
            {title}
        </button>
    );
};

export default Button;

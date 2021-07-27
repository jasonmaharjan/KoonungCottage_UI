import Button from "../Button/Button";

import "./form.css";

const Form = () => {
    return (
        <form className="form">
            <label for id="firstName">
                First Name <span style={{ color: "red" }}>&#42;</span>
            </label>
            <input id="firstName" name="firstName" type="text" className="form-input" />

            <label for id="lastName">
                Last Name <span style={{ color: "red" }}>&#42;</span>
            </label>
            <input name="lastName" type="text" className="form-input" />

            <label for id="email">
                Email <span style={{ color: "red" }}>&#42;</span>
            </label>
            <input name="email" type="email" className="form-input" />

            <label for id="mobileNumber">
                Mobile Number <span style={{ color: "red" }}>&#42;</span>
            </label>
            <input name="mobileNumber" placeholder type="phone" className="form-input" />

            <Button title="submit" />
        </form>
    );
};

export default Form;

import "./formInput.css";

const FormInput = ({ handleChange, ...otherProps }) => {
    const { name } = { ...otherProps };
    return (
        <div className="form-group">
            <div style={{ textTransform: "capitalize", marginBottom: "0.5rem" }}>
                <label>{name} </label>
            </div>
            <input className="form-input" onChange={handleChange} {...otherProps} />
        </div>
    );
};

export default FormInput;

import "./Input.scss";

function Input({ label, name, type, onChange, value, placeholder }) {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input 
                type={type} 
                id={name} 
                name={name} 
                onChange={onChange} 
                value={value} 
                placeholder={placeholder}
                className="field__input" />
        </div>
    );
}

export default Input;

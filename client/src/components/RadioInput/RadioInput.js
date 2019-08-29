import React from 'react';

const RadioInput = ({ handleCheck, isChecked, children, name, id, value, extraClasses}) => {
    return (
        <div className={`form-check form-check-inline ${extraClasses ? extraClasses : ""}`}>
            <input className={`form-check-input`} type="radio" name={name} id={id} value={value} checked={isChecked ? true : false} onClick={handleCheck}/>
            <label className={`form-check-label`} htmlFor={id}>{children}</label>
        </div>
    );
}

export default RadioInput;
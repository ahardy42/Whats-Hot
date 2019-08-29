import React, {useState} from 'react';
import './Button.sass';

const Button = ({extraClass, type, handleClick, children}) => {
    return(
        <button type={type} className={`btn ${extraClass ? extraClass : ""}`} onClick={handleClick}>{children}</button>
    )
}

export default Button;
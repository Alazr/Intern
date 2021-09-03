import React from 'react';
function InputGroup({name,label,type,value,onChange,error}) {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}:</label>
            <input value={value} onChange={onChange} type={type} id={name} name={name} />
            {
                error && 
                (
                    <p>{error}</p>
                ) 
            }
        </div>
    );
}


export default InputGroup;
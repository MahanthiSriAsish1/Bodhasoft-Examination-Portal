import React from 'react'
import "../Styles/textInput.css"

const TextInput = ({ value, onChange, placeholder }) => {
    return (
        <div className='inputBox'>
            <div className='input'>
                <textarea
                    className='text-area'
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </div>

    )
}

export default TextInput
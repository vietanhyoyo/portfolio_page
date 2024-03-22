import React, { ChangeEvent } from 'react';

interface InputProps {
    id: string;
    name: string;
    type: string;
    value?: string;
    onChange?: (value: string) => void;
    autoComplete?: string | "off";
    required?: boolean;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({ id, name, type, value, onChange, autoComplete, required, placeholder }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            autoComplete={"false"}
            onChange={onChange ? (event) => {
                onChange(event.target.value)
            } : () => { }}
            required={required}
            placeholder={placeholder}
            className="text-gray-700 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    );
};

export default Input;

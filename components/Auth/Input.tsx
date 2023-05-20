import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  id: string;
  onChange: any;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange, id }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-md font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="ring-gray-400 outline-none ring-2 text-gray-600 text-sm font-semibold px-2 py-1 rounded-md focus:ring-sky-500 bg-gray-200"
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;

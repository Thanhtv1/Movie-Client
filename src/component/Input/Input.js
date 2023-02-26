import React from "react";

export default function Input({
  type,
  handleChangeInput,
  name,
  placeholder,
  value,
}) {
  return (
    <>
      <input
        value={value}
        onChange={handleChangeInput}
        type={type || `text`}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md input-style"
      />
    </>
  );
}

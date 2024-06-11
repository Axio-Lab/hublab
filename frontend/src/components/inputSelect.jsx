import React from "react";

const InputSelect = ({
  options = [],
  value,
  onChange,
  defaultOptionText = "Select your preferred option",
}) => {
  return (
    <select
   className="border outline-none bg-transparent font-normal text-[14px] rounded-lg w-full px-5 py-3 border-[#0D0E32]"
      value={value}
      onChange={onChange}
    >
      <option value="disabled">{defaultOptionText}</option>
      {options.map((option) => (
        <option
          style={{
            fontWeight: "400",
            fontSize: "14px",
            color: "##6B7280",
          }}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;

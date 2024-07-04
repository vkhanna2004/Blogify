import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-zinc-700/55 text-gray-300 outline-none duration-200 border border-black/10 focus:bg-zinc-500/65 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="bg-zinc-800">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);

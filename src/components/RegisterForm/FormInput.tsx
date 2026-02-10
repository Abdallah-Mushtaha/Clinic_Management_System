import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const FormInput = React.memo(({ error, ...props }: InputProps) => (
  <div className="w-full">
    <input
      {...props}
      className={`w-full px-4 py-3.5 bg-slate-50 border ${
        error ? "border-red-500" : "border-slate-200"
      } rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
    />
    {error && <p className="text-red-500 text-xs mt-1 mr-2">{error}</p>}
  </div>
));

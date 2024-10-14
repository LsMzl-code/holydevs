import React from "react";

interface FormErrorProps {
   message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
   if (!message) return null;
   return (
      <div className="bg-destructive/15 p-2 rounded-md flex items-center gap-x-1.5 text-sm text-destructive">
        <p>⚠️</p>
        <p>{message} </p>
      </div>
   );
};

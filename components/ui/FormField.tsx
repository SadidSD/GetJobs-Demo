"use client";

import React, { useState, useEffect } from "react";
import Input from "./Input";
import { cn } from "./utils";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type ValidationRule = {
  test: (value: string) => boolean;
  message: string;
};

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  rules?: ValidationRule[];
  showValidation?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
};

export default function FormField({
  label,
  rules = [],
  showValidation = true,
  validateOnBlur = true,
  validateOnChange = false,
  onBlur,
  onChange,
  value,
  ...props
}: FormFieldProps) {
  const [error, setError] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validate = (val: string) => {
    if (!val && !props.required) {
      setError("");
      setIsValid(null);
      return true;
    }

    if (props.required && !val) {
      setError(`${label} is required`);
      setIsValid(false);
      return false;
    }

    for (const rule of rules) {
      if (!rule.test(val)) {
        setError(rule.message);
        setIsValid(false);
        return false;
      }
    }

    setError("");
    setIsValid(true);
    return true;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validateOnBlur) {
      setIsValidating(true);
      setTimeout(() => {
        validate(e.target.value);
        setIsValidating(false);
      }, 300);
    }
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateOnChange) {
      validate(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <div className="relative">
      <Input
        label={label}
        error={showValidation && error ? error : undefined}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        className={cn(
          showValidation && isValid === true && "pr-10",
          showValidation && isValidating && "pr-10"
        )}
        {...props}
      />
      {showValidation && (
        <div className="absolute right-3 top-[38px] flex items-center">
          {isValidating ? (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
          ) : isValid === true ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : isValid === false ? (
            <XCircle className="h-4 w-4 text-red-600" />
          ) : null}
        </div>
      )}
    </div>
  );
}


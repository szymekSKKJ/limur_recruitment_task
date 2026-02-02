"use client";

import styles from "./styles.module.scss";
import { InputEvent, useId, useState } from "react";
import { Fustat } from "next/font/google";

const fustatFont = Fustat({ subsets: ["latin-ext"], weight: ["400"] });

type InputProps = {
  placeholder: string;
  type: "text" | "password";
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  onInput: (event: InputEvent<HTMLInputElement>) => {
    message: string | null;
  };
};

export const Input = ({ placeholder, type, defaultValue, name, disabled = false, onInput }: InputProps) => {
  const id = useId();

  const [error, setError] = useState<string | null>(null);

  return (
    <div className={`${styles.input} ${error !== null ? styles.error : ""} ${disabled ? styles.disabled : ""}`}>
      <div className={`${styles.labelWrapper}`}>
        <label className={`${fustatFont.className}`} htmlFor={id}>
          {error !== null ? error : placeholder}
        </label>
      </div>
      <input
        className={`${fustatFont.className}`}
        placeholder={placeholder}
        id={id}
        name={name}
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
        onInput={(event) => {
          const { message } = onInput(event);

          setError(message);
        }}></input>
    </div>
  );
};

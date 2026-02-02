"use client";

import { JSX } from "@emotion/react/jsx-runtime";
import styles from "./styles.module.scss";
import { HTMLAttributes } from "react";
import { Mitr } from "next/font/google";

const mitrFont = Mitr({ weight: ["200", "300", "400", "500", "600", "700"], subsets: ["latin"] });

type ButtonProps = {
  type?: "default" | "danger";
} & HTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, type = "default", className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${mitrFont.className} ${(() => {
        if (type === "danger") {
          return styles.danger;
        } else {
          return styles.default;
        }
      })()} ${className !== undefined ? className : ""}`}
      {...rest}>
      {children}
    </button>
  );
};

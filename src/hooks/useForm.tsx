"use client";

import { useLayoutEffect, useState } from "react";
import { InputEvent } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input/Input";
import { JSX } from "@emotion/react/jsx-runtime";

type FormData = {
  id: string;
  type: "text" | "password";
  placeholder: string;
  name: string;
  disabled?: boolean;
  defaultValue?: string;
  onInput: (event: InputEvent<HTMLInputElement>) => { message: string | null };
};

export const useForm = (
  formDataLocal: FormData[][],
): [({ disabled }: { disabled?: boolean }) => JSX.Element, { name: string; value: string; isValid: boolean }[]] => {
  const [formData, setFormData] = useState<FormData[][]>(
    formDataLocal.map((data) => {
      return data.map((data) => {
        return {
          ...data,
        };
      });
    }),
  );
  const [formDataLocalLocal, setFormDataLocalLocal] = useState<(FormData & { currentValue: string; isValid: boolean })[][]>(
    formDataLocal.map((data) => {
      return data.map((data) => {
        return {
          ...data,
          currentValue: data.defaultValue !== undefined ? data.defaultValue : "",
          isValid: true,
        };
      });
    }),
  );

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(formDataLocal);
  }, [formDataLocal]);

  const Form = ({ disabled }: { disabled?: boolean }) => {
    const isFormDisabled = disabled;

    return (
      <form className={`${styles.form}`}>
        {formData.map((data, index) => {
          return (
            <div className={`${styles.row}`} key={index}>
              {data.map(({ placeholder, id, type, name, disabled, defaultValue, onInput }) => {
                return (
                  <Input
                    key={id}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    disabled={isFormDisabled ? isFormDisabled : disabled}
                    onInput={(event) => {
                      const thisElemenet = event.currentTarget;

                      const { message } = onInput(event);

                      setFormDataLocalLocal((currentValue) => {
                        const copiedCurrentValue = [...currentValue];

                        const foundData = copiedCurrentValue.at(index)!.find((data) => data.id === id)!;

                        foundData.isValid = message === null;

                        if (foundData.isValid) {
                          foundData.currentValue = thisElemenet.value.trim();
                        } else {
                          foundData.currentValue = "";
                        }

                        return copiedCurrentValue;
                      });

                      return { message: message };
                    }}></Input>
                );
              })}
            </div>
          );
        })}
      </form>
    );
  };

  const flattenedFormValues = formDataLocalLocal.flatMap((row) =>
    row.map(({ name, currentValue, isValid }) => ({ name, value: currentValue, isValid: isValid })),
  );

  return [Form, flattenedFormValues];
};

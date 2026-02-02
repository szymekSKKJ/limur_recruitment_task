"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { InputEvent } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input/Input";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { useUsersZustand } from "../Users";

const svg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
    </svg>
  );
};

export const AddUser = () => {
  const router = useRouter();
  const [Form, formData] = useForm([
    [
      {
        id: crypto.randomUUID(),
        placeholder: "Imię",
        type: "text",
        name: "firstName",
        onInput: (event) => {
          return { message: null };
        },
      },
      {
        id: crypto.randomUUID(),
        placeholder: "Nazwisko",
        type: "text",
        name: "lastName",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
    ],
    [
      {
        id: crypto.randomUUID(),
        placeholder: "Email",
        type: "text",
        name: "email",
        onInput: (event) => {
          const thisElemenet = event.currentTarget;

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (emailRegex.test(thisElemenet.value)) {
            return {
              message: null,
            };
          } else {
            return {
              message: "Podaj poprawny adres email",
            };
          }
        },
      },
      {
        id: crypto.randomUUID(),
        placeholder: "Telefon",
        type: "text",
        name: "phone",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
    ],
    [
      {
        id: crypto.randomUUID(),
        placeholder: "Miasto",
        type: "text",
        name: "city",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
      {
        id: crypto.randomUUID(),
        placeholder: "Ulica",
        type: "text",
        name: "street",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
      {
        id: crypto.randomUUID(),
        placeholder: "Nr mieszkania",
        type: "text",
        name: "suite",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
      {
        id: crypto.randomUUID(),
        placeholder: "Kod pocztowy",
        type: "text",
        name: "zipCode",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
    ],
    [
      {
        id: crypto.randomUUID(),
        placeholder: "Nazwa firmy",
        type: "text",
        name: "companyName",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
    ],
  ]);

  const userCreate = useUsersZustand((state) => state.userCreate);

  return (
    <div className={`${styles.addUser}`}>
      <div className={`${styles.options}`}>
        <button
          onClick={() => {
            router.back();
          }}>
          {svg()}
        </button>
      </div>
      <div className={`${styles.formWrapper}`}>
        <Form></Form>
        <Button
          className={`${styles.save}`}
          onClick={() => {
            const result = formData.reduce(
              (acc, item) => {
                acc[item.name] = item.value;

                return acc;
              },
              {} as Record<string, string>,
            );

            if (formData.every((data) => data.isValid && data.value.trim().length !== 0)) {
              userCreate({
                id: crypto.randomUUID(),
                website: "",
                name: `${result.firstName} ${result.lastName}`,
                email: result.email,
                phone: result.phone,
                address: {
                  city: result.city,
                  street: result.street,
                  suite: result.suite,
                  zipcode: result.zipCode,
                  geo: { lat: "", lng: "" },
                },
                company: {
                  name: result.companyName,
                  bs: "",
                  catchPhrase: "",
                },
              });
            }
          }}>
          Zapisz
        </Button>
      </div>
    </div>
  );
};

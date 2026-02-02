"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { InputEvent } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input/Input";
import { useForm } from "@/hooks/useForm";
import { Button } from "@/components/UI/Button/Button";
import { User, useUsersZustand } from "../Users";

const svg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
    </svg>
  );
};

type EditUserProps = {
  data: User;
  setSelectedUserId: Dispatch<SetStateAction<string | null>>;
};

export const EditUser = ({ data, setSelectedUserId }: EditUserProps) => {
  const { id, name, email, phone, address, company } = data;

  const [Form, formData] = useForm([
    [
      {
        id: crypto.randomUUID(),
        placeholder: "Imię",
        type: "text",
        defaultValue: name.trim().split(" ").at(0),
        name: "firstName",
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
      {
        id: crypto.randomUUID(),
        placeholder: "Nazwisko",
        type: "text",
        defaultValue: name.trim().split(" ").at(1),
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
        defaultValue: email,
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
      {
        id: crypto.randomUUID(),
        placeholder: "Telefon",
        type: "text",
        name: "phone",
        defaultValue: phone,
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
        defaultValue: address.city,
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
        defaultValue: address.street,
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
        defaultValue: address.suite,
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
        defaultValue: address.zipcode,
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
        defaultValue: company.name,
        onInput: (event) => {
          return {
            message: null,
          };
        },
      },
    ],
  ]);

  const updateUserById = useUsersZustand((state) => state.userUpdateById);

  return (
    <div className={`${styles.editUser}`}>
      <div className={`${styles.options}`}>
        <button
          className={`${styles.danger}`}
          onClick={() => {
            setSelectedUserId(null);
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

            updateUserById(id, {
              name: `${result.firstName} ${result.lastName}`,
              email: result.email,
              phone: result.phone,
              address: {
                city: result.city,
                street: result.street,
                suite: result.suite,
                zipcode: result.zipCode,
                geo: address.geo,
              },
              company: {
                name: result.companyName,
                bs: company.bs,
                catchPhrase: company.catchPhrase,
              },
            });
          }}>
          Zapisz
        </Button>
      </div>
    </div>
  );
};

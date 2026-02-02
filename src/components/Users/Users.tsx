"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { create } from "zustand";
import { Modal } from "../UI/Modal/Modal";
import { Button } from "../UI/Button/Button";
import { EditUser } from "./EditUser/EditUser";

const svg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
    </svg>
  );
};

const svg1 = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" />
    </svg>
  );
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const useUsersZustand = create<{
  users: User[];
  setUsers: (users: User[]) => void;
  userDeleteById: (userId: string) => void;
  userGetById: (userId: string) => User | undefined;
  userUpdateById: (userId: string, data: Partial<Omit<User, "id">>) => void;
  userCreate: (userData: User) => void;
}>((set, get) => {
  return {
    users: [],
    setUsers: (users) => {
      set((state) => {
        return {
          users: users,
        };
      });
    },
    userDeleteById: (userId) => {
      set((state) => {
        const copiedUsersState = structuredClone(state.users);

        const foundIndex = copiedUsersState.findIndex((data) => data.id === userId);

        if (foundIndex !== -1) {
          copiedUsersState.splice(foundIndex, 1);
        }

        return {
          users: copiedUsersState,
        };
      });
    },
    userGetById: (userId) => {
      const users = get().users;

      return users.find((data) => data.id === userId);
    },
    userUpdateById: (userId, data) => {
      set((state) => {
        const copiedUsersState = structuredClone(state.users);

        const foundData = copiedUsersState.find((data) => data.id === userId);

        if (foundData !== undefined) {
          Object.assign(foundData, data);
        }

        return {
          users: copiedUsersState,
        };
      });
    },
    userCreate: (userData) => {
      set((state) => {
        const copiedUsersState = structuredClone(state.users);

        copiedUsersState.push(userData);

        return {
          users: copiedUsersState,
        };
      });
    },
  };
});

type UsersProps = {
  data: User[];
};

export const Users = ({ data }: UsersProps) => {
  const usersData = useUsersZustand((state) => state.users);
  const userDeleteById = useUsersZustand((state) => state.userDeleteById);
  const userGetById = useUsersZustand((state) => state.userGetById);
  const setUsers = useUsersZustand((state) => state.setUsers);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set<string>(),
  });

  useEffect(() => {
    setUsers(data);
  }, []);

  return (
    <div className={`${styles.users}`}>
      <div className={`${styles.options}`}>
        <button>{svg()}</button>
        <button
          className={`${styles.danger}`}
          onClick={() => {
            setIsModalOpen(true);
          }}>
          {svg1()}
        </button>
      </div>
      <div className={`${styles.table}`}>
        <Paper sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={usersData}
            columns={[
              { field: "name", headerName: "Imię i nazwisko", flex: 1 },
              { field: "email", headerName: "Email", flex: 1 },
              {
                field: "city",
                headerName: "Miasto",
                flex: 1,
                valueGetter: (value, data) => {
                  const { address } = data;
                  const { city } = address;

                  return `${city}`;
                },
              },
              {
                field: "street",
                headerName: "Miasto",
                flex: 1,
                valueGetter: (params, data) => {
                  const { address } = data;
                  const { street } = address;

                  return street;
                },
              },
              {
                field: "zipCode",
                headerName: "Kod pocztowy",
                flex: 1,
                valueGetter: (params, data) => {
                  const { address } = data;
                  const { zipcode } = address;

                  return zipcode;
                },
              },
            ]}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 100 } } }}
            pageSizeOptions={[100, 10]}
            checkboxSelection={true}
            rowSelectionModel={rowSelectionModel}
            disableRowSelectionOnClick={true}
            onRowClick={(data, event) => {
              setSelectedUserId(data.id as string);
            }}
            onRowSelectionModelChange={(newSelection) => {
              setRowSelectionModel(newSelection);
            }}
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={() => {
          setSelectedUserId(null);

          rowSelectionModel.ids.forEach((value) => {
            userDeleteById(value as string);
          });
        }}
        onCancel={() => {}}></Modal>

      {selectedUserId !== null && <EditUser data={userGetById(selectedUserId)!} setSelectedUserId={setSelectedUserId}></EditUser>}
    </div>
  );
};

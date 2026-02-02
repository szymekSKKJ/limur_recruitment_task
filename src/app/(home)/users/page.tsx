import { EditUser } from "@/components/Users/EditUser/EditUser";
import { User, Users } from "@/components/Users/Users";

export const Page = async () => {
  const data = await new Promise<User[]>(async (resolve) => {
    try {
      const response = (await fetch("https://jsonplaceholder.typicode.com/users").then(async (response) => await response.json())) as User[];

      resolve(response);
    } catch (error) {
      resolve([]);
    }
  });

  return <Users data={data}></Users>;
};

export default Page;

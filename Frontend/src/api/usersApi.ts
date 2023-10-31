import { User } from "../types/types";

export const getUsers = async () : Promise<User[]> => {
    const apiUrl: string = 'http://localhost:5077/api/user';
    const response = await fetch(apiUrl);
    const users = await response?.json();
    return users;
}

export const addUser = async (user: User): Promise<void> => {
    const apiUrl: string = 'http://localhost:5077/api/user';
    const data: string = JSON.stringify(user);
    await fetch(apiUrl,
        {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
          },
        body: data
    });
   }

   export const deleteUser = async (id: number): Promise<void> => {
    const apiUrl: string = `http://localhost:5077/api/user/${id}`;
    await fetch(apiUrl, {method: 'DELETE'});
   }

export const updateUser = async ( user: User): Promise<void> => {
    const apiUrl: string = `http://localhost:5077/api/user/${user.id}`;
    const data: string = JSON.stringify(user);
    await fetch(apiUrl, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: data
        });
   }
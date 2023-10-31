import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteButton from "../helperComponents/buttons/DeleteButton";
import UpdateButton from "../helperComponents/buttons/UpdateButton";
import { User, UsersTitles, userTemplate } from "../../types/types";
import { useEffect, useRef, useState } from "react";
import { deleteUser, getUsers } from "../../api/usersApi";
import UserDetails from "../userDetails/UserDetails";
import CreateButton from "../helperComponents/buttons/CreateButton";
import RefreshButton from "../helperComponents/buttons/RefreshButton";
import Loader from "../helperComponents/loader/Loader";
import "./userTable.css";

const BasicTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const userRef = useRef<User>(userTemplate());

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await getUsers());
    };

    fetchUsers();
  }, []);

  const setOpenModalState = (shouldOpen: boolean): void => {
    setOpenModal(shouldOpen);
  };

  const handleDelete = (userId: number): void => {
    deleteUser(userId);

    setUsers((prevUsersList) => {
      const updatedUsersList = prevUsersList?.filter(
        (user) => user.id !== userId
      );
      return updatedUsersList;
    });
  };

  const handleUpdate = (user: User): void => {
    userRef.current = user;
    setOpenModal(true);
  };
  const handleReresh = async () => {
    setUsers(await getUsers());
  };
  const handleCreate = (): void => {
    userRef.current = userTemplate();
    setOpenModal(true);
  };

  return (
    <div className="container">
      <div>
        <h2>Users</h2>
        <CreateButton onClick={() => handleCreate()}></CreateButton>
        <RefreshButton onClick={() => handleReresh()}></RefreshButton>
      </div>
      {users?.length !== 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1250 }} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="justify">{UsersTitles.Number}</TableCell>
                  <TableCell align="center">{UsersTitles.ID}</TableCell>
                  <TableCell align="center">{UsersTitles.Name}</TableCell>
                  <TableCell align="center">{UsersTitles.Email}</TableCell>
                  <TableCell align="center">{UsersTitles.Birthday}</TableCell>
                  <TableCell align="center">{UsersTitles.Gender}</TableCell>
                  <TableCell align="center">{UsersTitles.Phone}</TableCell>
                  <TableCell align="center">{UsersTitles.Action}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.birthday.toString()}
                    </TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">
                      <UpdateButton onClick={() => handleUpdate(user)} />
                      <DeleteButton onClick={() => handleDelete(user.id)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div className="loader">
          <Loader />
        </div>
      )}
      {openModal && (
        <UserDetails
          user={userRef.current}
          shouldOpenModal={openModal}
          setOpenModal={setOpenModalState}
          updateTableFunc={handleReresh}
        />
      )}
    </div>
  );
};

export default BasicTable;

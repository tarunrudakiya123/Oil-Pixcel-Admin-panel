import { DataGrid } from "@mui/x-data-grid";
import apiHelper from "../../Common/ApiHelper";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import ManageUser from "./ManageUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function UserData() {
  const [open, setopen] = useState(false);
  const Users = {
    fullName: "",
    email: "",
    password: "",
    roll: "0",
  };
  let [userDetails, setuserDetails] = useState(Users);
  const [User, setUser] = useState([]);

  const columns = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (cell) => {
        return (
          <>
            <div className="d-flex gap-2">
              <button
                className="Addmaster"
                onClick={() => {
                  setuserDetails(cell?.row);
                  setopen(true);
                }}
              >
                <EditIcon />
              </button>

              <button
                className="Deletemaster"
                onClick={() => {
                  RemoveUser(cell.row?._id);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          </>
        );
      },
    },
    { field: "fullName", headerName: "FULLNAME", width: 230 },
    { field: "email", headerName: "EMAIL", width: 270 },
    { field: "roll", headerName: "Roll", width: 230 },
  ];

  const GetUserData = async () => {
    try {
      const result = await apiHelper.GetUser({});
      if (result && result.status === 200) {
        setUser(result.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserData();
    return () => {};
  }, []);

  const RemoveUser = async (id) => {
    try {
      const result = await apiHelper.DeleteUser(id);
      if (result.status === 200) {
        GetUserData();
      }
      setuserDetails({
        fullName: "",
        email: "",
        password: "",
        roll: "0",
      });
    } catch (error) {}
  };

  const UpdateUser = async () => {
    try {
      const result = await apiHelper.UpdateUser(userDetails._id, userDetails);
      if (result.status === 200) {
        GetUserData();
      }
      setuserDetails({
        fullName: "",
        email: "",
        password: "",
        roll: "0",
      });
      setopen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="row" style={{ backgroundColor: "white" }}>
        <div className="col-12 mb-3 d-flex justify-content-between">
          <h3 className="masterTitle">Manage Users</h3>
          <button
            className="Addmaster"
            onClick={() => {
              setopen(true);
            }}
          >
            {userDetails._id ? "Update User" : "Add User"}
          </button>
        </div>

        <div className="col-12 mt-4">
          <DataGrid
            rows={User}
            autoHeight={true}
            columns={columns}
            pageSizeOptions={[5, 10]}
            getRowId={(e) => e?._id}
          />
        </div>

        <ManageUser
          GetUsers={GetUserData}
          open={open}
          setopen={setopen}
          userDetails={userDetails}
          setuserDetails={setuserDetails}
          Users={Users}
          UpdateUser={UpdateUser}
        />
      </div>
    </>
  );
}

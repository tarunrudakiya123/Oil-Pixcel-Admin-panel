import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import apiHelper from "../../../Common/ApiHelper";

export default function CategoryDailog(props) {
  const {
    open,
    setopen,
    GetCategoryData,
    EditOpen,
    setEditOpen,
    AddCategory,
    setAddCategory,
  } = props;
  const [Error, setError] = useState([]);

  const handleClose = () => {
    setopen(false);
    setError([]);
    setAddCategory({
      name: "",
      alias: "",
    });
    setEditOpen(false);
  };

  const Addcategory = async () => {
    try {
      const result = await apiHelper.AddCategory(AddCategory);
      if (result && result.status === 200) {
        GetCategoryData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError([{ key: "name", message: error.response.data.message }]);
      }
    }
  };

  const Editdata = async () => {
    try {
      const resul = await apiHelper.EditCategory(AddCategory, AddCategory?._id);
      if (resul && resul.status === 200) {
        GetCategoryData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open || EditOpen}
        onClose={handleClose}
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            width: "40%", // Custom width
            maxWidth: "1200px", // Custom max width
          },
        }}
      >
        <center>
          <DialogTitle>
            <h3 className="titleMaster">
              {EditOpen ? "Edit Category" : "Add Category"}
            </h3>
          </DialogTitle>
        </center>
        <hr className="mb-0" />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            error={Error.some((x) => x.key === "name")}
            helperText={Error?.find((x) => x.key === "name")?.message}
            value={AddCategory?.name}
            onChange={(e) => {
              setAddCategory({ ...AddCategory, name: e.target.value });
            }}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Alias"
            type="text"
            error={Error.some((x) => x.key === "alias")}
            helperText={Error?.find((x) => x.key === "alias")?.message}
            value={AddCategory?.alias}
            onChange={(e) => {
              setAddCategory({ ...AddCategory, alias: e.target.value });
            }}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <button className="Deletemaster" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="Addmaster"
            onClick={EditOpen ? Editdata : Addcategory}
          >
            {EditOpen ? "Edit" : "Add"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

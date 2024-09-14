import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import apiHelper from "../../../Common/ApiHelper";
import { Button, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CategoryDailog from "./CategoryDilog";
import { useState } from "react";

export default function CategoryTable() {
  const [open, setopen] = useState(false);
  const [category, setcategory] = React.useState([]);
  const [EditOpen, setEditOpen] = useState(false);
  const [AddCategory, setAddCategory] = useState({
    name: "",
    alias: "",
  });

  const DeleteCategory = async (id) => {
    try {
      const result = await apiHelper.DeleteCategory(id);
      if (result && result.status === 200) {
        GetCategoryData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      field: "Action",
      headerName: "Actions",
      width: 200,
      renderCell: (cell) => {
        return (
          <>
            <div className="d-flex gap-2">
              <button
                className="Addmaster"
                onClick={() => {
                  setEditOpen(true);
                  setAddCategory(cell.row);
                }}
                aria-label="add"
              >
                <EditIcon />
              </button>

              <button
                className="Deletemaster"
                sx={{ marginLeft: "10px" }}
                onClick={() => {
                  DeleteCategory(cell.row._id);
                }}
                aria-label="add"
              >
                <DeleteForeverIcon />
              </button>
            </div>
          </>
        );
      },
    },

    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
  ];

  const GetCategoryData = async () => {
    try {
      const result = await apiHelper.GetCategory();
      if (result && result.status === 200) {
        setcategory(result.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GetCategoryData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <div className="col-12 mb-4 d-flex justify-content-between">
        <h4 className="masterTitle">Manage Category</h4>
        <button className="Addmaster" onClick={() => setopen(true)}>
          Add Category
        </button>
      </div>
      <DataGrid
        rows={category}
        columns={columns}
        getRowId={(e) => e?._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        components={{
          Toolbar: GridToolbar,
        }}
        disableRowSelectionOnClick
      />

      <CategoryDailog
        AddCategory={AddCategory}
        setAddCategory={setAddCategory}
        open={open}
        GetCategoryData={GetCategoryData}
        setopen={setopen}
        EditOpen={EditOpen}
        setEditOpen={setEditOpen}
      />
    </Box>
  );
}

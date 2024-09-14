import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import apiHelper from "../../../Common/ApiHelper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarComponent from "../../../Component/Snackbar/Sncakbar";

export default function EditProduct() {
  const [Product, setProduct] = useState([]);
  const [Dlt_SnackOpn, setDlt_SnackOpn] = useState(false);
  const [EditSnack_OP, setEditSnack_OP] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const columns = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (cell) => {
        return (
          <>
            <div className="d-flex gap-2">
              <button
                className="Addmaster"
                onClick={() => {
                  navigate("/editproduct/" + cell?.row?._id);
                }}
                aria-label="add"
              >
                <EditIcon />
              </button>

              <button
                className="Deletemaster"
                sx={{ marginLeft: "10px" }}
                onClick={() => {
                  DeleteProduct(cell?.row?._id);
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
      field: "category",
      headerName: "Category",
      width: 160,
      valueGetter: (params) => params?.row?.category?.name || "",
    },

    {
      field: "title",
      headerName: "Title",
      width: 160,
    },
    {
      field: "Brand",
      headerName: "Brand",
      width: 160,
    },
    {
      field: "countInStock",
      headerName: "CountInStock",
      type: "number",
      width: 100,
    },
    {
      field: "totalPrice",
      headerName: "TotalPrice",
      type: "number",
      width: 100,
    },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
  ];

  const GetProductDetails = async () => {
    try {
      const result = await apiHelper.ProductDetails();
      if (result.status === 200) {
        setProduct(result?.data?.Product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetProductDetails();
    location.search === "?state?=true"
      ? setEditSnack_OP(true)
      : setEditSnack_OP(false);
  }, []);

  const DeleteProduct = async (id) => {
    try {
      const result = await apiHelper.DeleteProductById(id);
      if (result.status === 200) {
        GetProductDetails();
        setDlt_SnackOpn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row" style={{ backgroundColor: "white" }}>
        <div className="col-12 mb-3 d-flex justify-content-between">
          <h3 className="masterTitle">Manage Product</h3>
          <button
            className="Addmaster"
            onClick={() => {
              navigate("/product");
            }}
          >
            Add New Product
          </button>
        </div>
      </div>

      {Dlt_SnackOpn ? (
        <SnackbarComponent
          setDlt_SnackOpn={setDlt_SnackOpn}
          Dlt_SnackOpn={Dlt_SnackOpn}
        />
      ) : (
        <SnackbarComponent
          EditSnack_OP={EditSnack_OP}
          setEditSnack_OP={setEditSnack_OP}
        />
      )}

      <Box sx={{ height: 400, width: "100%" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={Product || []}
            columns={columns}
            getRowId={(x) => x?._id}
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
        </Box>
      </Box>
    </>
  );
}

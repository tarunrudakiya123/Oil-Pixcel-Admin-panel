import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageDialog from "../ImageDialogs/ImageDialog";
import apiHelper from "../../../Common/ApiHelper";
import Validation from "../../../Common/Validation";
import MultiImgDialog from "../ImageDialogs/MultiImagesDialog";
import { useNavigate, useParams } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Media, setMedia] = useState([]);
  const [FituerImage, setFituerImage] = useState({});
  const [relevantImg, setRelevantImg] = useState([]);
  const [IsSubmited, setIsSubmited] = useState(false);
  const [Error, setError] = useState([]);
  const [Category, setCategory] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    Brand: "",
    alias: "",
    price: 0,
    discount: 0,
    description: "",
    countInStock: 0,
    category: "",
  });

  // Fetch Category Data
  const GetCategoryData = async () => {
    try {
      const result = await apiHelper.GetCategory();
      if (result && result.status === 200) {
        setCategory(result?.data?.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Media Data
  const FetchMediaHandler = async () => {
    try {
      const result = await apiHelper.FetchMedia();
      if (result) {
        setMedia(result.data.media);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetCategoryData();
    FetchMediaHandler();
  }, []);

  // Fetch Product Data to Edit
  const GetEditProductData = async () => {
    try {
      const result = await apiHelper.GetEditProductById(id);
      if (result && result.status === 200) {
        const productData = result.data.Product;

        const selectedCategory =
          Category?.find((x) => x._id === productData.category)?._id || "";

        const releIMG = {};
        productData.RelevantImages.forEach((x) => {
          releIMG[x._id] = x;
        });

        setProduct({
          ...productData,
          category: selectedCategory,
        });

        setFituerImage(productData.FeatureImages);
        setRelevantImg(releIMG);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetEditProductData();
  }, [Category]);

  // Handle Product Edit
  const EditProductHandler = async () => {
    try {
      setIsSubmited(true);
      const ValidationResult = Validation(product, "adminproduct");

      if (ValidationResult.length > 0) {
        setError(ValidationResult);
        return;
      }

      product.FeatureImages = FituerImage?._id;
      product.RelevantImages = Object.values(relevantImg);
      product.totalPrice =
        product.price - product.price * (product.discount / 100);

      const result = await apiHelper.EditProductDetails(product, id);
      if (result && result.status === 200) {
        navigate("/showproduct?state?=true");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-8">
          <h2>Edit Product</h2>
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <button className="Addmaster" onClick={EditProductHandler}>
            <EditNoteIcon className="me-2" /> Edit Product
          </button>
        </div>
      </div>

      <div className="row m-0 px-2">
        {/* Category Selection */}
        <FormControl variant="filled" fullWidth className="mt-3">
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            value={product.category}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Category &&
              Category.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div className="row mt-3 m-0">
        {/* Product Title */}
        <div className="col-12 col-md-6">
          <p className="fw-bold mb-0">Product Name</p>
          <TextField
            id="product-title"
            placeholder="Product Name"
            error={Error.some((x) => x.key === "title")}
            helperText={Error.find((x) => x.key === "title")?.message}
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            fullWidth
            variant="outlined"
          />
        </div>

        {/* Brand */}
        <div className="col-12 col-md-6">
          <p className="fw-bold mb-0">Brand</p>
          <TextField
            id="brand"
            placeholder="Brand"
            error={Error.some((x) => x.key === "Brand")}
            helperText={Error.find((x) => x.key === "Brand")?.message}
            value={product.Brand}
            onChange={(e) => setProduct({ ...product, Brand: e.target.value })}
            fullWidth
            variant="outlined"
          />
        </div>

        {/* Alias */}
        <div className="col-12 col-md-6 mt-3">
          <p className="fw-bold mb-0">Alias</p>
          <TextField
            id="alias"
            placeholder="Alias"
            value={product.alias}
            onChange={(e) => setProduct({ ...product, alias: e.target.value })}
            fullWidth
            variant="outlined"
          />
        </div>

        {/* Price */}
        <div className="col-12 col-md-6 mt-3">
          <p className="fw-bold mb-0">Price</p>
          <TextField
            id="price"
            placeholder="Price"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            fullWidth
            variant="outlined"
          />
        </div>

        {/* Discount */}
        <div className="col-12 col-md-6 mt-3">
          <p className="fw-bold mb-0">Discount (%)</p>
          <TextField
            id="discount"
            placeholder="Discount"
            type="number"
            value={product.discount}
            onChange={(e) =>
              setProduct({ ...product, discount: e.target.value })
            }
            fullWidth
            variant="outlined"
          />
        </div>

        {/* Count in Stock */}
        <div className="col-12 col-md-6 mt-3">
          <p className="fw-bold mb-0">Count in Stock</p>
          <TextField
            id="countInStock"
            placeholder="Count in Stock"
            type="number"
            value={product.countInStock}
            onChange={(e) =>
              setProduct({ ...product, countInStock: e.target.value })
            }
            fullWidth
            variant="outlined"
          />
        </div>

        {/* Description */}
        <div className="col-12 mt-3">
          <p className="fw-bold mb-0">Description</p>
          <Editor
            apiKey="your-tinymce-api-key"
            initialValue={product.description}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content) =>
              setProduct({ ...product, description: content })
            }
          />
        </div>
      </div>
    </>
  );
}

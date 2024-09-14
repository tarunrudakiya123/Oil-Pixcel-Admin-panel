import axios from "axios";

class ApiHelper {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensure cookies and credentials are sent
    });
  }

  // Example API methods using the axios instance

  GetUser() {
    return this.api.get(`/admin/getuser`);
  }

  AdminLogin(userDetails) {
    return this.api.post(`/admin/login`, userDetails);
  }

  InserUser(userDetails) {
    return this.api.post(`/admin/adduser`, userDetails);
  }

  DeleteUser(id) {
    return this.api.delete(`/admin/dltuser/${id}`);
  }

  UpdateUser(id, data) {
    return this.api.put(`/admin/upuser/${id}`, data);
  }

  OtpVerify(data) {
    return this.api.post(`/admin/verify`, data);
  }

  FetchMedia() {
    return this.api.get(`/admin/showmedia`);
  }

  UploadMedia(File) {
    return this.api.post(`/admin/upload`, File);
  }

  AddProduct(data) {
    return this.api.post(`/admin/insertproduct`, data);
  }

  ProductDetails() {
    return this.api.get(`/admin/getproduct`);
  }

  DeleteProductById(id) {
    return this.api.delete(`/admin/dltproduct/${id}`);
  }

  GetEditProductById(id) {
    return this.api.post(`/admin/editproduct/${id}`);
  }

  EditProductDetails(data, id) {
    return this.api.put(`/admin/updateproduct/${id}`, data);
  }

  // Category-related methods

  GetCategory() {
    return this.api.get(`/admin/getcategory`);
  }

  AddCategory(data) {
    return this.api.post(`/admin/addcategory`, data);
  }

  EditCategory(data, id) {
    return this.api.put(`/admin/updatecategory/${id}`, data);
  }

  DeleteCategory(id) {
    return this.api.delete(`/admin/deletecategary/${id}`);
  }
}

const apiHelper = new ApiHelper();
export default apiHelper;

import axios from "axios";

class ApiHelper {
  constructor() {
    this.baseURL = process.env.REACT_APP_BACKEND_URL
  }

  GetUser() {
    return axios.get(`${this.baseURL}/admin/getuser`);
  }

  AdminLogin(userDetails) {
    return axios.post(`${this.baseURL}/admin/login`, userDetails);
  }

  InserUser(userDetails) {
    return axios.post(`${this.baseURL}/admin/adduser`, userDetails);
  }

  DeleteUser(id) {
    return axios.delete(`${this.baseURL}/admin/dltuser/${id}`);
  }

  UpdateUser(id, data) {
    return axios.put(`${this.baseURL}/admin/upuser/${id}`, data);
  }

  OtpVerify(data) {
    return axios.post(`${this.baseURL}/admin/verify`, data);
  }

  FetchMedia() {
    return axios.get(`${this.baseURL}/admin/showmedia`);
  }

  //upload image--
  UploadMedia(File) {
    return axios.post(`${this.baseURL}/admin/upload`, File);
  }

  AddProduct(data) {
    return axios.post(`${this.baseURL}/admin/insertproduct`, data);
  }

  ProductDetails() {
    return axios.get(`${this.baseURL}/admin/getproduct`);
  }

  DeleteProductById(id) {
    return axios.delete(`${this.baseURL}/admin/dltproduct/${id}`);
  }

  GetEditProductById(id) {
    return axios.post(`${this.baseURL}/admin/editproduct/${id}`);
  }

  EditProductDetails(data, id) {
    return axios.put(`${this.baseURL}/admin/updateproduct/${id}`, data);
  }

  //Category---

  GetCategory() {
    return axios.get(`${this.baseURL}/admin/getcategory`);
  }

  AddCategory(data) {
    return axios.post(`${this.baseURL}/admin/addcategory`, data);
  }

  EditCategory(data, id) {
    return axios.put(`${this.baseURL}/admin/updatecategory/${id}`, data);
  }

  DeleteCategory(id) {
    return axios.delete(`${this.baseURL}/admin/deletecategary/${id}`);
  }
}

const apiHelper = new ApiHelper();
export default apiHelper;

import axios from "axios";

const API_URL = "http://localhost:3000/Admin/product";

class ProductListService {
  getProductList() {
    return axios.get(API_URL);
  }
}

export default new ProductListService();

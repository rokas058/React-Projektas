import axios from 'axios';

const API_URL = 'http://localhost:8080/paveikslai';

class PaveikslaiService {
  getPaveikslai() {
    return axios.get(API_URL);
  }
}

export default new PaveikslaiService();

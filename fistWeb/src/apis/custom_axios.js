import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:50000/',
  });

  export default instance;
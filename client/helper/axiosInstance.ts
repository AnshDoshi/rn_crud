import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.68.163:3001/',
});

export default instance;

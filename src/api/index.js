import axios from "axios";
import { API_KEY } from "../constants";

const httpClient = axios.create({
    baseURL: `http://www.omdbapi.com`
});

httpClient.interceptors.request.use(config => {
   config.params = {
       apikey: API_KEY,
       ...config.params,
   }
   return config;
});

export default httpClient;
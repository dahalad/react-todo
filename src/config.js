import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 2000
});

function getToken(type) {
  return localStorage.getItem(type);
}

axiosInstance.interceptors.response.use(response => response, (error => {
     if (error.response.status === 401) {
       return axiosInstance({
         method: 'get',
         url: '/todos',
         headers : {
           'type': 'refresh ',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '+ getToken('refToken')
         }
       }).then(response => {
         if (response.status === 200) {
           let config = Object.assign({}, error.config);
           localStorage.setItem('accToken', response.data);
           config.headers.type = 'access';
           config.headers.Authorization = "Bearer "+ response.data;
           return axiosInstance.request(config).then(response => {
            return  response;
          }).catch(error => error);
         }
       }).catch(error => error);
     }
     return Promise.reject(error);
   }));


export default axiosInstance;

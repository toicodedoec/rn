import axios from "axios";
// import path from  'path'
// __APP_API__: JSON.stringify('http://albus-api-dev.us-east-2.elasticbeanstalk.com/api'),
// __DB_FILE_PATH__: JSON.stringify(path.resolve(__dirname,'resources/assets/db/'))


// try {
 const baseUrl = "http://albus-api-dev.us-east-2.elasticbeanstalk.com/api"||process.env.__APP_API__ ||process.env.REACT_APP___APP_API__;
// }
// catch (err) {
//   alert(err)
// }finally {
//   baseUrl= baseUrl || "http://albus-api-dev.us-east-2.elasticbeanstalk.com/api"
// }

console.log(process.env)

const axiosInstance = axios.create({
  baseURL:  baseUrl//
});

// axiosInstance.interceptors.request.use(
//   config => {
//     console.log(config)
//     let authToken=sessionStorage.getItem("authToken")||localStorage.getItem("authToken")||"";
//     authToken && (config.headers.Authorization = authToken);
//     return config;
//   },
//   error => Promise.reject(error)
// );

export default axiosInstance;

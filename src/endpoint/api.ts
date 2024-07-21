import axios from 'axios';
import { TOKEN_FAKE } from './config';
import { API_URL } from './config';
import { KEY_LOCAL } from '@/types/keyLocal';
import { ERR_TOKEN } from '@/types/errorMessage';

const AxiosInstance = axios.create({
  baseURL: API_URL,
});

AxiosInstance.interceptors.request.use(
  (request: any) => {
    let accessToken:string = localStorage.getItem("accessToken") || TOKEN_FAKE;
    let userId:string = localStorage.getItem("userId") || "";
    request.headers['Accept'] = 'application/json';
    request.headers['Authorization'] = `Bearer ${accessToken}`;
    request.headers['UserId'] = `${userId}`;
    request.headers['Content-Type'] = 'application/json; charset=utf-8';
    // console.log(request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (v:any) => v,
  async (error:any) => {
    const originalConfig = error?.config;
    
    if (originalConfig && error?.response?.status === 401) {
      try {
        // Xu ly loi expried accessToken
        if (error?.response?.status === 401 && error?.response?.data?.message === ERR_TOKEN) {
          const logoutInstance = axios.create({
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          await logoutInstance.post(API_URL + '/auth/logout')
          localStorage.removeItem(KEY_LOCAL.PROFILE_USER)
          window.location.href = "/login"  
          return;
        }
        

      } catch (error: any) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;



// console.log("error?.response: ", error?.response);
//         let refreshToken:string = localStorage.getItem("refreshToken") || TOKEN_FAKE;
//         let accessToken:string = localStorage.getItem("accessToken") || TOKEN_FAKE;
//         let userId:string = localStorage.getItem("userId") || "";
//         const refreshInstance = axios.create({
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Authorization": `Bearer ${accessToken}`,
//             "UserId": userId
//           },
//         });

//         const res = await refreshInstance.post(API_URL + 'auth/token', {data: {
//           refreshToken: `Bearer ${refreshToken}`
//         }})
//         if (res.data?.success) {
//           localStorage.setItem("accessToken", res?.data?.data?.accessToken?.split(" ")[1])
//           localStorage.setItem("refreshToken", res?.data?.data?.refreshToken?.split(" ")[1])
//           originalConfig.headers = { ...originalConfig.headers };
//           originalConfig.headers[
//             "Authorization"
//           ] = `Bearer ${res?.data?.data?.accessToken}`;
//           originalConfig.headers[
//           "UserId"
//           ] = `${userId}`;
//           return AxiosInstance(originalConfig)
//         } else {
//           localStorage.removeItem("accessToken")
//           localStorage.removeItem("refreshToken")
//           localStorage.removeItem("userId")
//           window.location.href = "/login"
//         }
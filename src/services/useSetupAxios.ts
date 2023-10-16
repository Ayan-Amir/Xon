import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
//@ts-ignore
import * as caseConverter from 'change-object-case';
import { ACCESS_TOKEN } from '@/utils/constant';

const options = { recursive: true, arrayRecursive: true };

export const useSetupAxios = () => {
  axios.defaults.baseURL = `${import.meta.env.VITE_APP_BASE_URL}`;

  axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (!!accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }

    if (config?.data instanceof FormData) {
      config.data;
    } else if (!!config.data) {
      const caseConvertedData = caseConverter.snakeKeys(config.data, {
        exclude: ['password1', 'password2', 'new_password1', 'new_password2'],
      });
      config.data = caseConvertedData;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      const caseConvertedData = caseConverter.camelKeys(
        response?.data,
        options,
      );
      response.data = caseConvertedData;
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return;
};

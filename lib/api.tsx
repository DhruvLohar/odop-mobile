import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API_URL = "http://192.168.20.200:8000/";
export const MEDIA_URL = "http://192.168.1.26:8000";

axios.defaults.baseURL = API_URL;

interface Session {
  access_token?: string;
  // Add other session properties if needed
}

interface ApiResponse<T = any> {
  data: T;
  message?: string;
  verified?: boolean;
  success: boolean;
}

export async function postToAPI<T>(url: string, data: any): Promise<ApiResponse<T> | any> {
  try {
    const res: AxiosResponse<ApiResponse<T>> = await axios.post(url, data);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    return undefined;
  }
}

export async function fetchFromAPI<T>(url: string): Promise<ApiResponse<T> | { success: boolean }> {
  try {
    const sessionString = await SecureStore.getItemAsync("session");
    const session: Session = sessionString ? JSON.parse(sessionString) : {};
    if (session.access_token) {
      axios.defaults.headers.common.Authorization = `Bearer ${session.access_token}`;
    }
    const res: AxiosResponse<ApiResponse<T>> = await axios.get(url);
    return res.data;
  } catch (err: any) {
    console.error(err.message);
    return { success: false };
  }
}

export async function axiosRequest<T>(
  url: string,
  reqParams: AxiosRequestConfig,
  sendingMedia: boolean
): Promise<ApiResponse<T> | any> {
  const sessionString = await SecureStore.getItemAsync("session");
  const session: Session = sessionString ? JSON.parse(sessionString) : {};

  try {
    const res: AxiosResponse<ApiResponse<T>> = await axios.request({
      url: API_URL + url,
      ...reqParams,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        Accept: "application/json",
        "Content-Type": sendingMedia ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log(JSON.stringify(err));
    return undefined;
  }
}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

export const API_URL = "http://192.168.1.13:3000/";

axios.defaults.baseURL = API_URL;

interface Session {
  accessToken?: string;
  // Add other session properties if needed
}

interface ApiResponse<T = any> {
  data: T;
  success?: boolean;
}

export async function postToAPI<T>(url: string, data: any): Promise<ApiResponse<T> | undefined> {
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
    if (session.accessToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;
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
): Promise<ApiResponse<T> | undefined> {
  const sessionString = await SecureStore.getItemAsync("session");
  const session: Session = sessionString ? JSON.parse(sessionString) : {};

  try {
    const res: AxiosResponse<ApiResponse<T>> = await axios.request({
      url: API_URL + url,
      ...reqParams,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
        "Content-Type": sendingMedia ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

import axios from 'axios';

export const performGetRequest = (url: string) => axios.get(url);

export const performPostRequest = (url: string, payload: object | null) => axios.post(url, payload);

export const performPatchRequest = (url: string, payload: object | null) => axios.patch(url, payload);

export const performPutRequest = (url: string, payload: object | null) => axios.put(url, payload);

export const performDeleteRequest = (url: string) => axios.delete(url);

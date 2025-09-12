import axios from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS } from '../../config';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
});
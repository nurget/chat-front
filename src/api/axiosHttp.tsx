import axios from 'axios';
import { useAppSelector } from '../store';

const url = `${process.env.REACT_APP_HTTP}://${process.env.REACT_APP_HOST}`;
export const axiosHttp = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

const token = localStorage.getItem('token');
export const axiosAuth = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${token}`,
  },
});

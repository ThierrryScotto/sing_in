require('dotenv').config();
import axios from "axios"

export const api = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: 'http://localhost:3000/'
})
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

function createAxiosInstance(config: AxiosRequestConfig) {
  const instance = axios.create(config)

  return instance
}

export default createAxiosInstance({
  baseURL: 'http://localhost:9091/',
  timeout: 60000
})

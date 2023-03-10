import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http'

import axios from 'axios'

export class AxiosHttpAdapter implements HttpClient {
  request = async (data: HttpRequest): Promise<HttpResponse> => {
    let axiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error.response ? error.response : undefined
    }

    if (!axiosResponse) {
      axiosResponse = {
        status: 500,
        data: 'Server Error'
      }
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}

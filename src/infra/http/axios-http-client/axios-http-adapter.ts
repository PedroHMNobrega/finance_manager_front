import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpAdapter implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response ? error.response : undefined
    }

    if (!httpResponse) {
      httpResponse = {
        status: 500,
        data: 'Server Error'
      }
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}

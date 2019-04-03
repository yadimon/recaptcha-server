import axios, { AxiosInstance } from 'axios'

export default class Recaptcha {
  private recapAxios: AxiosInstance
  constructor(private secret: string, private timeout = 3000) {
    this.recapAxios = axios.create({
      baseURL: 'https://www.recaptcha.net',
      timeout
    })
  }

  async verifyV3Async(token: string, minScore = 0.6): Promise<boolean> {
    const { data: verifyResult } = await this.recapAxios.post('recaptcha/api/siteverify', null, {
      params: {
        secret: this.secret,
        response: token
      }
    })

    return (verifyResult.score && verifyResult.score >= minScore) || false
  }
}

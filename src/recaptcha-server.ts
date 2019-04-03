'use strict';

import axios, { AxiosInstance } from 'axios';
import { PardError } from './utils';

interface VerifyV3Response {
  isPassed: boolean;
  score: number;
  hostName: string;
  action: string;
  checkedAt: Date;
}

export default class Recaptcha {
  private recapAxios: AxiosInstance;
  constructor(private secret: string, private timeout = 3000) {
    this.recapAxios = axios.create({
      baseURL: 'https://www.recaptcha.net',
      timeout
    });
  }

  async verifyV3Async(token: string, minScore = 0.6): Promise<VerifyV3Response> {
    try {
      interface AxiosResponse {
        data: AxiosRecaptchaResult;
      }
      interface AxiosRecaptchaResult {
        success: boolean;
        score: number;
        action: string;
        challenge_ts: string;
        hostname: string;
        'error-codes'?: string[];
      }

      const { data: verifyResult }: AxiosResponse = await this.recapAxios.post(
        'recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: this.secret,
            response: token
          }
        }
      );

      const {
        success,
        score,
        action,
        hostname,
        challenge_ts,
        'error-codes': errorCodes
      } = verifyResult;

      if (!success) {
        throw new PardError(`[recaptcha-server] Failed to verify recaptcha: ${errorCodes}`, {
          type: 'RECAPTCHA_VERIFY_ERROR'
        });
      }

      return {
        isPassed: success && score > minScore,
        score,
        hostName: hostname,
        action,
        checkedAt: new Date()
      };
    } catch (error) {
      error.type = error.type || 'RECAPTCHA_UNEXPECTED_ERROR';
      throw error;
    }
  }
}

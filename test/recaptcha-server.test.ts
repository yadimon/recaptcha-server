'use strict';

import Recaptcha from '../src/recaptcha-server';
import * as nock from 'nock';

describe('Recaptcha', () => {
  const recInstance = new Recaptcha('testSecret');
  it('should can init instance with secret', () => {
    expect(recInstance).toBeInstanceOf(Recaptcha);
  });

  it('should can throw error when failed', async () => {
    nock('https://www.recaptcha.net')
      .post('/recaptcha/api/siteverify')
      .query({
        secret: 'fakeSecret',
        response: 'testToken'
      })
      .reply(200, {
        success: false,
        score: 0.9,
        action: 'contactUs',
        challenge_ts: '2019-04-03T14:00:00ZZ',
        hostname: 'dozto.com',
        'error-codes': ['invalid-secret']
      });

    try {
      const recFakeInstance = new Recaptcha('fakeSecret');
      await recFakeInstance.verifyV3Async('testToken');
    } catch (error) {
      expect(error.type).toEqual('RECAPTCHA_VERIFY_ERROR');
    }
  });

  it('should can verify with correct data', async () => {
    nock('https://www.recaptcha.net')
      .post('/recaptcha/api/siteverify')
      .query({
        secret: 'testSecret',
        response: 'testToken1'
      })
      .reply(200, {
        success: true,
        score: 0.9,
        action: 'contactUs',
        challenge_ts: '2019-04-03T14:00:00ZZ',
        hostname: 'dozto.com'
      });

    const v3Result = await recInstance.verifyV3Async('testToken1');

    expect(v3Result.isPassed).toBeTruthy();
  });

  it('should can verify with correct data and custom score', async () => {
    nock('https://www.recaptcha.net')
      .post('/recaptcha/api/siteverify')
      .query({
        secret: 'testSecret',
        response: 'testToken2'
      })
      .reply(200, {
        success: true,
        score: 0.7,
        action: 'contactUs',
        challenge_ts: '2019-04-03T14:00:00ZZ',
        hostname: 'dozto.com'
      });

    const v3Result = await recInstance.verifyV3Async('testToken2', 0.7);
    expect(v3Result.isPassed).toBeFalsy();
  });
});

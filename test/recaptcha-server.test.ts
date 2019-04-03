import Recaptcha from '../src/recaptcha-server'

/**
 * Dummy test
 */
describe('Recaptcha', () => {
  const recInstance = new Recaptcha('testSercet')
  it('should can init instance with secret', () => {
    expect(recInstance).toBeInstanceOf(Recaptcha)
  })

  it('should can not verify v3 token with incorrect data', async () => {
    const isVerified = await recInstance.verifyV3Async('testToken')
    expect(isVerified).toBeFalsy()
  })
})

# recaptcha-server

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/pardjs/recaptcha-server.svg)](https://greenkeeper.io/)
[![Travis](https://travis-ci.org/pardjs/recaptcha-server.svg?branch=master)](https://travis-ci.org/pardjs/recaptcha-server)
[![Coveralls](https://coveralls.io/repos/github/pardjs/recaptcha-server/badge.svg?branch=master)](https://coveralls.io/github/pardjs/recaptcha-server?branch=master)

The server side recaptcha module to do verification. Use with [Google reCaptcha](https://www.google.com/recaptcha)

### Usage

This verification used the v3 method, which returns a score (1.0 is very likely a good interaction, 0.0 is very likely a bot).

The lib by default use the `0.6` as the default passed minScore(not included)

```js
import Recaptcha from '@pardjs/recaptcha-server'

const recInstance = new Recaptcha('The reCaptcha Secret that get from Google reCapatcha')

// Verifiy the token directly
const v3Result = await recInstance.verifyV3Async('testToken1')
// Verifiy the token with custom min passed score
const v3Result = await recInstance.verifyV3Async('testToken1', 0.8)

// The v3Result example
// {
//   isPassed: true,
//   score: 0.9,
//   hostName: 'dozto.com',
//   action: 'contactUs',
//   checkedAt: 2019-04-03T08:51:34.038Z
// }
```

### Error Types

There will be a `type` in the throwed error object, and there are the following defined types

```yaml
RECAPTCHA_VERIFY_ERROR: The verification handled by google successfully, but faild in the verificatoin result.
RECAPTCHA_UNEXPECTED_ERROR: Unexpected error during process google reCaptcha verification.
```

#### Example

```
{ Error: [recaptcha-server] Failed to verify recaptcha: invalid-secret
  at Recaptcha.<anonymous> (/Users/ole3021/workspaces/pardjs/recaptcha-server/src/recaptcha-server.ts:3006:35)
  at step (/Users/ole3021/workspaces/pardjs/recaptcha-server/src/recaptcha-server.ts:2909:27)
  at Object.next (/Users/ole3021/workspaces/pardjs/recaptcha-server/src/recaptcha-server.ts:2797:20)
  at fulfilled (/Users/ole3021/workspaces/pardjs/recaptcha-server/src/recaptcha-server.ts:2736:32)
  at process._tickCallback (internal/process/next_tick.js:68:7) type: 'RECAPTCHA_UNEXPECTED_ERROR' }

error.type === 'RECAPTCHA_VERIFY_ERROR' // true
```

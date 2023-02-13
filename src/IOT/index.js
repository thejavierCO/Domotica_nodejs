const {
  SinricPro,
  startSinricPro,
  raiseEvent,
  eventNames,
} = require('sinricpro')

const APPKEY = process.env.APPKEY
const APPSECRET = process.env.APPSECRET
const device1 = process.env.device1

const deviceIds = [device1]
const sinricpro = new SinricPro(APPKEY, deviceIds, APPSECRET, true)

module.exports = { sinricpro, raiseEvent, startSinricPro, eventNames };
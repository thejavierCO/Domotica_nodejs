const dotenv = require('dotenv')
const { createClient } = require('@supabase/supabase-js')
const {
  SinricPro,
  startSinricPro,
  raiseEvent,
  eventNames,
} = require('sinricpro')
dotenv.config()
const APPKEY = process.env.APPKEY
const APPSECRET = process.env.APPSECRET
const device1 = process.env.device1
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
)
const deviceIds = [device1]
deviceIds.forEach(async (e, i) => {
  try {
    let { data: devices } = await supabase
      .from('devices')
      .insert({ id: i, device_id: e, state: false })
      console.log(devices)
  } catch (error) {
    console.log(error)
  }
})
const sinricpro = new SinricPro(APPKEY, deviceIds, APPSECRET, true)
const setPowerState = async (deviceid, data) => {
  let {
    data: [{ id }],
    error: errorid,
  } = await supabase.from('devices').select('*').eq('device_id', deviceid)
  let { data: devices, error: errorUpdate } = await supabase
    .from('devices')
    .update([
      {
        id,
        device_id: deviceid,
        state: data == 'On' ? true : data == 'Off' ? false : false,
      },
    ])
    .eq('device_id', deviceid)
  console.log(deviceid, data, devices, errorid, errorUpdate)
}

startSinricPro(sinricpro, { setPowerState })

supabase
  .channel('supabase_realtime')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'devices' }, payload => {
    console.log('Change received!', payload)
    //raiseEvent(sinricpro, eventNames.powerState, device1, { state: 'On' })
  })
  .subscribe()

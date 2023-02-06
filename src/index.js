const dotenv = require('dotenv')
dotenv.config()

const {sinricpro,raiseEvent,startSinricPro,eventNames} = require("./IOT");
const {supabase} = require("./db");

const setPowerState = async (deviceid, data) => {
  let {
    data: [{ id }],
    error: errorid,
  } = await supabase
    .from('devices')
    .select('*')
    .eq('device_id', deviceid)

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

(()=>{
  console.log("Run");
  startSinricPro(sinricpro, { setPowerState })
})();

//raiseEvent(sinricpro, eventNames.powerState, device1, { state: 'On' })

const dotenv = require('dotenv')
dotenv.config()
const {Db} = require("./db/index.js");
const {sinricpro,raiseEvent,startSinricPro,eventNames} = require("./IOT/index.js");

const db = new Db(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
)
const Devices = db.getTable("devices")
Devices.getItemsForColumn("devices_id").then(e=>{
  console.log(e);
}).catch(e=>console.log(e))

// const setPowerState = async (deviceid, data) => {
//   let {
//     data: [{ id }],
//     error: errorid,
//   } = await supabase
//     .from('devices')
//     .select('*')
//     .eq('device_id', deviceid)

//   let { data: devices, error: errorUpdate } = await supabase
//     .from('devices')
//     .update([
//       {
//         id,
//         device_id: deviceid,
//         state: data == 'On' ? true : data == 'Off' ? false : false,
//       },
//     ])
//     .eq('device_id', deviceid)
  
//   console.log(deviceid, data, devices, errorid, errorUpdate)
// }

// (async ()=>{
//   // console.log("Run",Devices);
//   // startSinricPro(sinricpro, { setPowerState })
// })();

//raiseEvent(sinricpro, eventNames.powerState, device1, { state: 'On' })

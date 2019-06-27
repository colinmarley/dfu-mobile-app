const SERVICE_DATA_KEY = '0x07';
var flags = 0x00;
const DASHES = ['','' ,'-','-','-','-','',''];
let deviceId;


// Local Functions

function asHexString(i) {
  //returns a hexadecimal string version of the input number 'i'
  let hex = i.toString(16);
  return "0x" + ((hex.length === 1)? '0': '') + hex;
}

function parseAdvertisingData(buffer) {
  var length, type, data, i = 0, advertisementData = {};
  var bytes = new Uint8Array(buffer);

  // decode type constants from https://www.bluetooth.org/en-us/specification/assigned-numbers/generic-access-profile
  while (length !== 0) {
      length = bytes[i] & 0xFF;
      i++;
      type = bytes[i] & 0xFF;
      i++;
      data = bytes.slice(i, i + length - 1).buffer; // length includes type byte, but not length byte
      i += length - 2;  // move to end of data
      i++;

      advertisementData[asHexString(type)] = data;
  }
  console.log('advertisementData: ', advertisementData);
  return advertisementData;
}

function generateServiceDataFromAdvertising(buffer) {
  // console.log('generateServiceDataFromAdvertising');
  let adData = parseAdvertisingData(buffer);
  let serviceData = adData[SERVICE_DATA_KEY];

  let uuid = "";

  if (serviceData) {
    let uuidBytes = new Uint16Array(serviceData);
    console.log('uuidBytes: ', uuidBytes);
    for (let i = uuidBytes.length - 1; i >= 0; --i) {
      uuid += DASHES[i] + uuidBytes[i].toString(16);
    }
  }
  console.log('serviceData: ', serviceData);
  console.log('uuid: ', uuid);
  return uuid;
}

//Returns a string given an array buffer
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

//Retyurns an array buffer given a string
function stringToBytes(string) {
    let arr = new Uint8Array(string.length);
    for (let i = 0; i < string.length; i++) {
        arr[i] = string.charCodeAt(i);
    }
    return arr.buffer;
}


//Exported module to be used by other files
export var bleMod = {

  ios_uris: [
    {
      name: "Test 1",
      uri: ""
    },
    {
      name: "Test 2",
      uri: ""
    }
  ],

  android_uris: [
    {
      name: "Test 1",
      uri: "content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2Fapp_package_test1.zip"
    },
    {
      name: "Test 2",
      uri: "content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2Fapp_package_test2.zip"
    }
  ],


  scan: (onSuccess, onError) => {
    console.log("Scan called");
    ble.scan([], 5, onSuccess, onError);
  },

  connect: (deviceId, onSuccess, onError) => {
    ble.connect(deviceId, onSuccess, onError);
  },

  disconnect: function (deviceId, onSuccess, onError) {
    if (!deviceId || deviceId == null) {
      //Don't try to disconnect if the id value is null or undefined
      console.log("In bleMod.onDisconnect: No ID");
      return;
    }

    ble.disconnect(deviceId, onSuccess, onError);
  },

  dfu: (deviceId, uri, onDfuProgress, onDfuError, deviceType) => {
    console.log("bleMod.dfu: ", uri);
    var usableUri = "";
    if(deviceType == "Android") {
      usableUri = bleMod.android_uris[0].uri;
    } else {
      usableUri = uri;
    }
    console.log("usableUri: ", usableUri);
    
    ble.upgradeFirmware(deviceId, usableUri, onDfuProgress, onDfuError);
  },

  onDfuProgress: (result) => {
    console.log("onDfuProgress");
    switch(result.status) {
        case "progressChanged":
            this.props.setDfuProgress(result.progress.percent);
            break;
        case "dfuCompleted":
            document.querySelector(".start-dfu-container").style.display = 'none';
        default:
            console.log(`dfuProgress: ${result.status}`);
            break;
    }
  },

  onDfuError: (error) => {
      console.log("onDfuError");
      console.log(error);
  }
}

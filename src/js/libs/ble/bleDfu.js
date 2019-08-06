

export var bleMod = {

  scan: (onSuccess, onError, scanLength) => {
    ble.scan([], scanLength, onSuccess, onError);
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
    var usableUri = "";
    
    if (deviceType == "Android") {
      //Android prep
      usableUri = uri;
    } else if (deviceType == "iOS") {
      //iOS Prep
      usableUri = uri;
    } else {
      //Unauthorized Device
      console.log("Invalid Platform Type");
    }
    ble.upgradeFirmware(deviceId, usableUri, onDfuProgress, onDfuError);
  },

  onDfuProgress: (result) => {
    // You will likely have to write your callback function outside of this
    // library but here is an outline to use when setting it up.
    switch(result.status) {
      case "deviceConnecting":
        // The app has begun the process of connecting to the device to be updated
        break;
      case "deviceConnected":
        // The app has finished connecting to the device to be updated
        break;
      case "enablingDfuMode":
        // Initializing the dfu mode on the device to be updated
        break;
      case "dfuProcessStarting":
        // Begin starting the DFU process
        break;
      case "dfuProcessStarted":
        // DFU process has been started
        break;
      case "firmwareUploading":
        // Starting to upload the firmware to the device
        break;
      case "progressChanged":
        // The progress percentage has increased
        break;
      case "firmwareValidating":
        // Validating the firmware written to the device
        break;
      case "deviceDisconnecting":
        // In the process of the disconnecting from device
        break;
      case "deviceDisconnected":
        // The device has been disconnected
        //Last Callback of a successful upgrade
        break;
      case "dfuCompleted":
        // The dfu has completed
        break;
      case "dfuAborted":
        // DFU aborted by user input
        //Last Callback on user abort
        break;
      default:
        // Unhandled result.status 
        console.log(`dfuProgress: ${result.status}`);
        break;
    }
  },

  onDfuError: (error) => {
      console.log("onDfuError");
      console.log(error);
  }
}

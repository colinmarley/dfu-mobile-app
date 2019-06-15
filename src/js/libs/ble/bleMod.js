/* eslint-disable no-undef */
// import { toast } from './toast';

export const ENABLE = 'enable';
export const ENABLED = 'enabled';
export const DISABLE = 'disable';
export const DISABLED = 'disabled';
export const SCAN_STARTED = 'scanStarted';
export const SCAN_RESULT = 'scanResult';


let CONNECT_SUCCESS = false;

/** Central Life Cycle
 *  1) Initialize
 *  2) Scan 
 *  3) Connect
 *  4) Discover
 *  5) Read/Write/Subscribe Characteristics
 *  6) Disconnect
 *  7) Close
 */

export var bleMod = {
    

    initialize: (params, onCallback = bleMod.initializeCallback) => {
        bluetoothle.initialize((res) => onCallback(res), params);
    },

    //ANDROID ONLY 
    enable: (onError = bleMod.enableError) => {
        if (device.platform == 'Android') {
            bluetoothle.enable(() => {}, onError);
        } else {
            console.log("bleMod: enable() called but platform is not android (action cancelled)");
        }
    },

    //ANDROID ONLY
    disable: (onError = bleMod.disableError) => {
        if (device.platform == 'Android') {
            bluetoothle.disable(() => {}, onError);
        } else {
            console.log("bleMod: disable() called but platform is not android (action cancelled)");
        }
    },

    getAdapterInfo: (onCallback = bleMod.getAdapterInfoCallback) => {
        bluetoothle.getAdapterInfo(onCallback);
    },

    //ANDROID ONLY 
    hasPermission: (onCallback = bleMod.hasPermissionCallback) => {
        //Check to see if device has granted permission for coarse location 
        //(needed for scanning of unpaired devices on Android 23 +)
        bluetoothle.hasPermission(onCallback);
    },

    //ANDROID ONLY
    requestPermission: (onSuccess = bleMod.requestPermissionSuccess, onError = bleMod.requestPermissionError) => {
        //requests permission for coarse location
        //(needed for scanning of unpaired devices on Android 23 +)
        bluetoothle.requestPermission(onSuccess, onError);
    },

    startScan: (onSuccess, params = {"allowDuplicates": false}, onError = bleMod.startScanError) => {
        //start the scan, does not automatically so make sure to have stopScan on a timeout when called
        //For Android API 23 + must be sure to have permission before starting scan.
        if ((device.platform == "Android") && (Number(device.version) >= 6)) {
            //check for Android API level 23 (Android 6.0 Marshmallow)
            bleMod.hasPermission();
        }
        bluetoothle.startScan(onSuccess, onError, params);
    },

    stopScan: (onSuccess, onError = bleMod.stopScanError) => {
        bluetoothle.stopScan(onSuccess, onError);
    },

    retrievePaired: (onSuccess = bleMod.retrievePairedSuccess, onError = bleMod.retrievePairedError, params = {}) => {
        bluetoothle.retrieveConnected(onSuccess, onError, params);
    }, 

    //ANDROID ONLY
    bond: (onSuccess = bleMod.bondSuccess, onError = bleMod.bondError, params = {}) => {
        if (params == {}) {
            console.log("function called without an address argument");
            return;
        }
        bluetoothle.bond(onSuccess, onError, params);

    },

    //ANDROID ONLY
    unbond: (onSuccess = bleMod.unbondSuccess, onError = bleMod.unbondError, params = {}) => {
        if(params == {}) {
            console.log("function called without an address argument");
            return;
        }
        bluetoothle.unbond(onSuccess, onError, params);

    },

    connect: (address = '', onSuccess = bleMod.connectSuccess, onError = bleMod.connectError) => {
        //Connect to a ble device
        bluetoothle.connect(onSuccess, onError, { address: address });
    },

    disconnect: (address = '', onSuccess = bleMod.disconnectSuccess, onError = bleMod.disconnectError) => {
        //Disconnect from a Bluetooth LE device
        bluetoothle.disconnect(onSuccess, onError, { address: address });
    },

    close: (address = '', onSuccess = bleMod.closeSuccess, onError = bleMod.closeError) => {
        //Close/Dispose a Bluetooth LE device
        //Disconnecting before closing seems required if device is running iOS 10 or newer
        bluetoothle.close(onSuccess, onError, { address: address });
    },

    discover: (params, onSuccess = bleMod.discoverSuccess, onError = bleMod.discoverError) => {
        //Discover all of the device's services, characteristics, and descriptors
        //Has a bug sometimes when called on an iOS 8 device
        bluetoothle.discover(onSuccess, onError, params);

    },

    services: (params, onSuccess = bleMod.servicesSuccess, onError = bleMod.servicesError) => {
        //discover the devices services
        //For iOS devices only, use instead of discover because it's buggy with iOS 8
        bluetoothle.services(onSuccess, onError, params);
    },      

    read: (params, onSuccess = bleMod.readSuccess, onError = bleMod.readError) => {
        //Read a characteristic once
        bluetoothle.read(onSuccess, onError, params);
    },

    subscribe: (params, onSuccess = bleMod.subscribeSuccess, onError = bleMod.subscribeError) => {
        //Subscribe to a particular service's characteristic
        //Unsubscribe from characteristic once finished
        bluetoothle.subscribe(onSuccess, onError, params);
    },

    unsuscribe: (params, onSuccess = bleMod.subscribeSuccess, onError = bleMod.subscribeError) => {
        //Unsubscribe to a particular service's characteristic
        bluetoothle.unsubscribe(onSuccess, onError, params);
    },

    write: (params, onSuccess = bleMod.writeSuccess, onError = bleMod.writeError) => {
        //Write to a particular characteristic
        bluetoothle.write(onSuccess, onError, params);
    },

    writeQ: (params, onSuccess = bleMod.writeQSuccess, onError = bleMod.writeQError) => {
        //write Queue: Quickly exuctutes a write without response command when writing more than 20 bytes at a time.
        bluetoothle.writeQ(onSuccess, onError, params);
    },

    isEnabled: (onCallback = bleMod.isEnabledCallback) => {
        //Check to see if adpter is enabled
        bluetoothle.isEnabled(onCallback);
    },

    isScanning: (onCallback = bleMod.isScanningCallback) => {
        //Check to see if adapter is scanning
        bluetoothle.isScanning(onCallback);
    },

    isBonded: (params, onSuccess = bleMod.isBondedSuccess, onError = bleMod.isBondedError) => {
        //Check to see if a device is bonded to the phone
        bluetoothle.isBonded(onSuccess, onError, params);
    },
    
    isConnected: (params, onSuccess = bleMod.isConnectedSuccess, onError = bleMod.isConnectedError) => {
        //Check to see if the indicated device is connected
        bluetoothle.isConnected(onSuccess, onError, params);
    },

    isLocationEnabled: (onSuccess = bleMod.isLocationEnabledSuccess) => {
        //Check to see if the location services are enabled
        bluetoothle.isLocationEnabled(onSuccess);
    },

    requestLocation: (onSuccess = bleMod.requestLocationSuccess, onError = bleMod.requestLocationError) => {
        //Prompt the location services settings pages
        bluetoothle.requestLocation(onSuccess, onError);
    },

    /**
     * CALLBACKS
     */

    initializeCallback: result => {
        let message;
        switch(result.status) {
            case ENABLED:
                message = 'Bluetooth is Enabled';
                break;
            case DISABLED:
                message = 'Bluetooth is Disabled';
                break;
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        //Just for Testing, be sure to remove toast
        // toast.showBottom(`initializeCallback: ${message}`, "short", 0);
        console.log(`initializeCallback: ${message}`);
    },

    enableError: result => {
        let message;
        switch (result.error) {
            case DISABLE:
                message = "Bluetooth is likely already enabled";
                break;
            case ENABLE:
                message = "If this error occurs something is wrong";
                break;
            case 'initialize':
                message = "enable called before initialization";
                break;
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        // toast.showBottom(`enableError: ${message}`, "short", 0);
        console.log(`enableError: ${message}`);
    },

    disableError: result => {
        let message;
        switch (result.error) {
            case DISABLE:
                message = "If this error occurs something is wrong";
                break;
            case ENABLE:
                message = "Bluetooth is likely already disabled";
                break;
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        // toast.showBottom(`disableError: ${message}`, "short", 0);
        console.log(`disableError: ${message}`);
    },

    getAdapterInfoCallback: result => {
        console.log(`Current Adapter State for: '${result.name}'`);
        console.log(`address: '${result.address}'`);
        console.log(`isInitialized: '${result.isInitialized}'`);
        console.log(`isEnabled: '${result.isEnabled}'`);
        console.log(`isScanning: '${result.isScanning}'`);
        console.log(`isDiscoverable: '${result.isDiscoverable}'`);
    },

    hasPermissionCallback: result => {
        let message;
        switch(result.hasPermission) {
            case true:
                message = "ACCESS_COARSE_LOCATION permission is granted";
                break;
            case false:
                message = "ACCESS_COARSE_LOCATION permission is not granted";
                bleMod.requestPermission();
                break;
            default:
                message = `Unknown Result Returned: ${result.hasPermission}`;
                console.log(result);
        }
        console.log(`hasPermissionCallback: ${message}`);
    },

    requestPermissionSuccess: result => {
        let message;
        switch(result.requestPermission) {
            case true:
                message = "Successfully acquired permision to ACCESS_COARSE_LOCATION";
                break;
            case false:
                message = "Failed to acquire permission to ACCESS_COARSE_LOCATION";
                break;
            default:
                message = `Unknown Result Returned: ${result.requestPermission}`;
                console.log(result);
        }
        console.log(`requestPermissionCallback: ${message}`);
    },

    requestPermissionError: result => {
        let message;
        switch(result.error) {
            default:
                message = `Unknown Error Occured: ${result.error}`;
        }
        console.log(`requestPermissionError: ${message}`);
    },

    startScanSuccess: result => {
        //check the status of the result
        let message, showResult;
        switch(result.status) {
            case SCAN_STARTED:
                message = 'Scan Has Started';
                showResult = false;
                break;
            case SCAN_RESULT:
                message = 'Scan has found the following device';
                showResult = true;
                break;
            case 'scanStopped':
                message = 'Scan has Stopped';
                showResult = false;
                break;
            default:
                message = `Unknown Error Occured: ${result.status}`;
                showResult = true;
        }
        console.log(`startScanSuccess: ${message}`);
        if (showResult) { console.log(result); }
    },

    startScanError: result => {
        let message;
        switch (result.error) {
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        console.log(`startScanError: ${message}`);
    },

    stopScanSuccess: result => {
        let message;
        switch (result.status) {
            case 'scanStopped':
                message = "Scan has stopped successfully";
                break;
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        console.log(`stopScanSuccess: ${message}`);
    },

    stopScanError: result => {
        let message;
        switch (result.error) {
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        console.log(`stopScanError: ${message}`);
    },

    retrievePairedSuccess: result => {
        let message;
        switch (result.status) {
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        console.log(`receivePairedSuccess: ${message}`);
    },

    retrievePairedError: result => {
        let message;
        switch (result.error) {
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        console.log(`receivePairedError: ${message}`);
    },
    
    bondSuccess: result => {
        let message;
        switch(result.status) {
            case 'bonding':
                message = "Bonding Has Begun";
                break;
            case 'bonded':
                message = "The bond is created";
                break;
            case 'unbonded':
                message = "The bonding popup is cancelled or failed";
                break;
            default:
                message = `Unknown Status Returned: '${result.status}`;
                console.log(result);
        }
        console.log(`bondSuccess: ${message}`);
    },

    bondError: result => {
        let message;
        switch(result.error) {
            case 'bond':
                message = "The bond couldn't be formed. (Make sure the device is Android and it isn't already attempting to bond)";
                break;
            default:
                message = `Unkown Error Occured: '${result.error}`;
                console.log(result);
        }
        console.log(`unbondError: ${message}`);
    },

    unbondSuccess: result => {
        let message;
        switch(result.status) {
            case 'unbonded':
                message = "The device is unbonded";
                break;
            default:
                message = `Unknown Status Returned: '${result.status}'`;
                console.log(result);
        }
        console.log(`unbondSuccess: ${message}`);
    },

    unbondError: result => {
        let message;
        switch(result.error) {
            case 'unbond':
                message = "The bond couldn't be broken. (Make sure the device is Android and it isn't already attempting to unbond)";
                break;
            default:
                message = `Unkown Error Occured: '${result.error}'`;
                console.log(result);
        }
        console.log(`unbondError: ${message}`);
    },

    connectSuccess: result => {
        let message;
        switch(result.status) {
            case 'connected':
                message = "The device has connected successfully";
                break;
            case 'disconnected':
                message = "The device has been unexpectedly disconnected";
                bleMod.disconnect(result.address);
                break;
            default:
                message = `Unknown Status Returned: '${result.status}'`;
                console.log(result);
        }
        console.log(`connectSuccess: ${message}`);
    },

    connectError: result => {
        let message;
        switch(result.error) {
            case 'connect':
                message = result.message;
                break;
            default:
                message = `Unknown Error Occured: '${result.error}'`;
                console.log(result);
        }
        console.log(`connectError: ${message}`);
    },

    disconnectSuccess: result => {
        
        let message;
        switch(result.status) {
            case 'disconnected':
                message = "Device has disconnected successfully";
                bleMod.close(result.address);
                break;
            default:
                message = `Unknown Status Returned ${result.status}`;
                console.log(result);
        }
        console.log(`disconnectSuccess: ${message}`);
    },

    disconnectError: result => {
        let message;
        switch(result.error) {
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        console.log(`disconnectError: ${message}`);
    },

    closeSuccess: result => {
        let message;
        switch(result.status) {
            case 'closed':
                message = "Connection with the device completely closed down";
                break;
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        console.log(`closeSuccess: ${message}`);
    },

    closeError: result => {
        let message;
        switch(result.error) {
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        console.log(`closeError: ${message}`);
    },

    discoverSuccess: result => {
        let message;
        switch (result.status) {
            case 'discovered':
                message = `result of discover on device ${result.address}`;
                break;
            default:
                message = `The device requested has not yet been discovered: ${result.status}`;
                console.log(result);
        }
        console.log(`discoverSuccess: ${message}`)
    },

    discoverError: result => {
        let message;
        switch(result.error) {
            case 'neverConnected':
                message = "Never Connected to the device you tried to discover";
                break;
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        console.log(`discoverError: ${message}`);
    },

    servicesSuccess: result => {
        let message;
        switch(result.status) {
            case 'services':
                message = `Discovered the following services on '${result.name}'`;
                break;
            default:
                message = `Unknown Result Returned: ${result.status}'`;
                console.log(result);
        }
        console.log(`servicesSuccess: ${message}`);
    },

    servicesError: result => {
        let message;
        switch(result.status) {
            default:
                message = `Unknown Error Occured: '${result.status}`;
                console.log(result);
        }
        console.log(`servicesError: ${message}`);
    },  

    readSuccess: result => {
        let message;
        switch(result.status) {
            case 'read':
                message = `Read Successful for caracteristic: ${result.characteristic}`;
                break;
            default:
                message = `Unknown Result Returned: '${result.status}`;
                console.log(result);
        } 
        console.log(`readSuccess: ${message}`);
    },

    readError: result => {
        let message;
        switch(result.status) {
            default:
                message = `Unknown Error Ocurred: ${message}`;
                console.log(result);
        }
        console.log(`readError: ${message}`);
    },

    subscribeSuccess: result => {
        let message;
        switch(result.status) {
            case 'subscribed':
                message = `Subscription has started`;
                break;
            case 'subscribedResult':
                message = `Received a subscription result: ${result.value}`;
                break;
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        console.log(`subscribeSuccess: ${message}`);
    },

    subscribeError: result => {
        let message;
        switch(result.status) {
            default:
                message = `Unknown Error Occured: ${result.status}`;
                console.log(result);
        }
        console.log(`subscriceError: ${message}`);
    },

    unsubscribeSuccess: result => {
        let message;
        switch(result.status) {
            case 'unsubscribed':
                message = `Successfully unsubscribed from characteristic: ${result.characteristic}`;
                break;
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        console.log(`unsubscibeSuccess: ${message}`);
    },

    unsubscribeError: result => {
        let message;
        switch(result.status) {
            default:
                message = `Unknown Error Occured: ${result.status}`;
                console.log(result);
        }
        console.log(`unsubscribeError: ${message}`);
    },

    writeSuccess: result => {
        let message;
        switch(result.status) {
            case 'written':
                message = `Successfully Wrote to Characteristic: '${result.characteristic}'`;
                break;
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        console.log(`writeSuccess: ${message}`);
    },

    writeError: result => {
        let message;
        switch(result.status) {
            default:
                message = `Unknown Error Occured: ${result.status}`;
                console.log(result);
        }
        console.log(`writeError: ${message}`);
    },

    writeQSuccess: result => {
        let message;
        switch(result.status) {
            case 'written':
                message = `Successfully Wrote to Characteristic: '${result.characteristic}'`;
                break;
            default:
                message = `Unknown Result Returned: ${result.status}`;
                console.log(result);
        }
        console.log(`writeSuccess: ${message}`);
    },

    writeQError: result => {
        let message;
        switch(result.status) {
            default:
                message = `Unknown Error Occured: ${result.status}`;
                console.log(result);
        }
        console.log(`writeError: ${message}`);
    },

    isEnabledCallback: result => {
        let message;
        switch(result.isEnabled) {
            case true:
                message = `The adabpter is Enabled`;
                break;
            case false:
                message = `The adapter is NOT Enabled`;
                break;
            default:
                message = `Unknown Result Returned: ${result.isEnabled}`;
                console.log(result);
        }
        console.log(`isEnabledCallback: ${message}`);
    },

    isScanningCallback: result => {
        let message;
        switch(result.isScanning) {
            case true:
                message = `The adapter is Scanning`;
                break;
            case false:
                message = `The adapter is Not Scanning`;
                break;
            default:
                message = `Unknown Result Occured: ${result.isScanning}`;
                console.log(result);
        }
        console.log(`isScanningCallback: ${message}`);
    },

    isBondedSuccess: result => {
        let message;
        switch(result.isBonded) {
            case true:
                message = `The indicated device is bonded`;
                break;
            case false:
                message = `The indicated device is not bonded`;
                break;
            default:
                message = `Unknown Result Occured: ${result.isBonded}`;
                console.log(result);
        }
        console.log(`isBondedSuccess: ${message}`);
    },

    isBondedError: result => {
        let message;
        switch(result.error) {
            default:
                message = `Unknown Error Occured`;
                console.log(result);
        }
        console.log(`isBondedError: ${message}`);
    },

    isConnectedSuccess: result => {
        let message;
        switch(result.isConnected) {
            default:
                message = `Unknown Result Returned: ${result.isConnected}`;
                console.log(result);
        }
        console.log(`isConnectedSuccess: ${message}`);
    },

    isConnectedError: result => {
        let message;
        switch(result.error) {
            default:
                message = `Unknown Error Occured: ${result.error}`;
                console.log(result);
        }
        console.log(`isConnectedError: ${message}`);
    },

    isLocationEnabledSuccess: result => {
        let message;
        switch(result.isLocationEnabled) {
            case true:
                message = 'The Location Service are currently enabled';
                break;
            case false:
                message = ' The Location Services are currently disabled';
                break;
            default:
                message = `Unknown Result Returned: ${result.isLocationEnabled}`;
                console.log(result);
        }
        console.log(`isLocationEnabled: ${message}`);
    },

    requestLocationSuccess: result => {
        let message;
        switch(result.requestLocation) {
            case true:
                message = 'Location Services are now currently enabled';
                break;
            case false:
                message = 'Location Services are now currently disabled';
                break;
            default:
                message = `Unknown Result Returned: ${result.requestLocation}`;
                console.log(result);
        }
        console.log(`requestLocationSuccess: ${message}`);
    },

    requestLocationError: result => {
        let message;
        switch(result.error) {
            default:
             message = `Unknown Error Occured: ${result.error}`;
             console.log(result);
        }
        console.log(`requestLocationError: ${message}`);
    }

}
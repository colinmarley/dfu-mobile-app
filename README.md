This is just a small hybrid app to allow for an OTA DFU (over-the-air device firmware update) to a Nordic nRF52 device via BLE.  The app allows the user to connect to the device and update it with a new application, softdevice, or even a new bootloader.

## Table of Contents

- [Setting Up the Environment](#setting-up-the-environment)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installing Dependencies](#installing-dependencies)
    - [Building for Android](#building-for-android)
        - [Prepare and Build Project Using Cordova](#prepare-and-build-project-using-cordova)
        - [Open Project with Android Studio](#open-project-with-android-studio)
    - [Available Scripts](#available-scripts)
        - [npm run start](#npm-run-start)
        - [npm run build](#npm-run-build)
        - [npm run build-dev](#npm-run-build-dev)
        - [npm run build-cordova](#npm-run-build-cordova)
        - [npm run build-cordova-android](#npm-run-build-cordova-android)
        - [npm run build-cordova-ios](#npm-run-build-cordova-ios)
        - [npm run webpack](#npm-run-webpack)
        - [npm run sass](#npm-run-sass)
        - [npm run copy-res](#npm-run-copy-res)
        - [npm run copy-img](#npm-run-copy-img)
        - [npm run add-android](#npm-run-add-android)
        - [npm run add-ios](#npm-run-add-ios)
        - [npm run remove-android](#npm-run-remove-android)
        - [npm run remove-ios](#npm-run-remove-ios)       
- [Bluetooth Low Energy](#bluetooth-low-energy)
- [Plugins](#plugins)
    - [cordova-plugin-ble-central](#cordova-plugin-ble-central)
    - [cordova-plugin-ble-central fork](#cordova-plugin-ble-central-fork)
    - [cordova-plugin-chooser](#cordova-plugin-chooser)


## Setting Up the Environment

This project binds [webpack](https://webpack.js.org/guides/installation), [cordova](https://cordova.apache.org/#getstarted), [React.js](https://facebook.github.io/create-react-app/docs/getting-started), and [redux](https://redux.js.org/introduction/getting-started) together for development. (Click on the name to go to the installation page). You must have all of these installed on your computer to begin development on this project. The rest of the dependencies are automatically installed by following the instructions under the [Installing Depedencies](#installing-dependencies) section.

### Cloning the Repository

To clone the repository go to the directory that you want the project in and run the following command:

`git clone https://github.com/colinmarley/dfu-mobile-app.git`

### Installing Dependencies

Once you have cloned the repository cd into the main project directory and run the following command to install all of the dependencies for the project:

```
$ npm install
```

### Building for Android

Running the project through the phonegap desktop app does not allow for the use of bluetooth so to test the bluetooth capabilities you have to either go through the process of building the project on phonegap build or set up Android Studio to make updating the app on your testing device quicker for future changes.

If you would like to build the android version of the project using Android Studio follow these steps. (must have the phonegap cli and/or cordova cli installed)

### `Prepare and Build Project Using Phonegap`

First, be sure to add 'android' as a platform by running the following command from the `/mobile` folder:

```cordova platform add android```

Next, build the project with webpack from the main project folder by running: 

```npm run webpack-android```

Then go into the `/mobile` folder and run the following commands:

```cordova prepare android```

Running cordova prepare is only required when the `/android` folder is not already created in `/mobile/platforms`.

```cordova build android```

This command will build the project using the version of android specified in the `package.json` file in `/mobile` or update the current android build if one exists.

### `Open Project with Android Studio`

Start Android Studio and select `File->New->Import Project...`. Go to the folder that you have saved the project under and select the `/android` folder in `/mobile/platforms/` and click `OK`.

Once Android Studio builds the project you can run/install the project on an android device or emulator for testing.  Every time you run `cordova build android` from the command line it will update this build on Android Studio and you can reload the new version of the app on your device/emulator.

### Available Scripts

Webpack is used to pack all of the written code and styling files in the `/src` folder into minified files in the `/mobile` folder to be built with cordova/phonegap. The scripts used to pack and build the project are defined in the `package.json` file in the main project folder.

In the main project directory, you can run the following scripts:

#### `npm run start`

(from the [create-react-app](https://github.com/facebook/create-react-app) documentation)
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the application with webpack to the /mobile folder in production mode.

#### `npm run build-dev`

Webpacks the application to the /mobile folder in development mode.

#### `npm run build-cordova`

Webpacks the application to the /mobile folder in development mode and then builds the cordova project for whichever platforms have already been added to the cordova project.

#### `npm run build-cordova-android`

Webpacks the application to the /mobile folder in development mode and then builds the cordova project for android.

#### `npm run build-cordova-ios`

Webpacks the application to the /mobile folder in development mode and then builds the cordova project for iOS.

#### `npm run webpack`

Runs `npm run sass-android`, webpacks the project with the webpack.config.js file and copies all of the contents of the `/res` and `/img` folders to `./mobile/www/res` and `./mobile/www/img` respectively.  Useful for updating code to check quickly for styling in the browser.

#### `npm run sass`

Compresses all of the .scss files in `/src/scss/` to `./mobile/www/css/index.css`.

#### `npm run copy-res`

Copies all of the contents of `/src/res` to `./mobile/www/res`.

#### `npm run copy-img`

Copies all of the contents of `/src/img` to `./mobile/www/img`.

#### `npm run add-android`

Adds the latest version of the android platform to the cordova project.

#### `npm run add-ios`

Adds the latest version of the iOS platform to the cordova project.

#### `npm run remove-android`

Removes the currently installed version of the android platform from the cordova project.

#### `npm run remove-ios`

Removes the currently installed version of the iOS platform from the cordova project.

## Bluetooth Low Energy

The application performs the OTA DFU using Bluetooth Low Energy (BLE). The user is prompted to scan for devices and can then choose which one to connect to. The device to be updated must be put into DFU mode before the update can take place.  The user will know that the device is ready when the advertising name shows up as 'DfuTarg'. Once connected the and a file is chosen to send, the update is completed with a single button push on the app.

## Plugins

### `don/cordova-plugin-ble-central`

The main ble plugin used in the development of this app is [`don/cordova-plugin-ble-central`](https://github.com/don/cordova-plugin-ble-central).  The plugin is used to scan, connect, and disconnect to devices in the application.  All of the documentation on the functions used in `src/js/libs/ble/bleDfu.js` can be found on the plugin's github page (see link above).

### `cordova-plugin-ble-central fork`

The second ble plugin that is used is [`fxe-gear/cordova-plugin-ble-central`](https://github.com/fxe-gear/cordova-plugin-ble-central). This plugin is a fork of the plugin mentioned above with the added Android and iOS libraries from Nordic Semiconductors.  This is where the function to perform the DFU is found.  All of the documentation about how this function works can be found on the plugin's github page (see link above).

### `cordova-plugin-chooser`

The plugin that allows for the native file selection in the application is [`cyph/cordova-plugin-chooser`](https://github.com/cyph/cordova-plugin-chooser). The plugin displays the native prompt to select a file on both iOS and Android. All of the documentation on how the plugin works can be found on the olugin's github page (see link above).
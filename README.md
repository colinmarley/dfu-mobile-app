This is just a small hybrid app to allow for an OTA DFU (over-the-air device firmware update) to a Nordic nRF52 device via BLE.  The app allows the user to connect to the device and update it with a new application, softdevice, or even a new bootloader.

## Table of Contents

- [Setting Up the Environment](#setting-up-the-environment)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installing Dependencies](#installing-dependencies)
    - [Building for Android](#building-for-android)
        - [Prepare and Build Project Using Cordova](#prepare-and-build-project-using-cordova)
        - [Open Project with Android Studio](#open-project-with-android-studio)
    - [Available Scripts](#available-scripts)
        - [start]


## Setting Up the Environment

This project binds [webpack](https://webpack.js.org/guides/installation), [cordova](https://cordova.apache.org/#getstarted), and [React.js](https://facebook.github.io/create-react-app/docs/getting-started) together for development. (Click on the name to go to the installation page). You must have all of these installed on your computer to begin development on this project. The rest of the dependencies are automatically installed by following the instructions under the [Installing Depedencies](#installing-dependencies) section.

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

`cordova platform add android@6`
  (We use Android version 6.3 to remain compatible with some plugins we use)

Next, build the project with webpack from the main project folder by running: 

`npm run webpack-android`

Then go into the `/mobile` folder and run the following commands:

`cordova prepare android`

Running cordova prepare is only required when the `/android` folder is not already created in `/mobile/platforms`.

`cordova build android`

This command will build the project using the version of android specified in the `package.json` file in `/mobile` or update the current android build if one exists.

### `Open Project with Android Studio`

Start Android Studio and select `File->New->Import Project...`. Go to the folder that you have saved the project under and select the `/android` folder in `/mobile/platforms/` and click `OK`.

Once Android Studio builds the project you can run/install the project on an android device or emulator for testing.  Every time you run `cordova build android` from the command line it will update this build on Android Studio and you can reload the new version of the app on your device/emulator.

### Available Scripts

Webpack is used to pack all of the written code and styling files in the `/src` folder into minified files in the `/mobile` folder to be built with cordova/phonegap. The scripts used to pack and build the project are defined in the `package.json` file in the main project folder.

In the main project directory, you can run the following scripts:

#### ```npm run start```

(from the [create-react-app](https://github.com/facebook/create-react-app) documentation)
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.



#### `npm run sass-android`

Compresses all of the .scss files in `/src/scss/` to `./mobile/www/css/index.css`.

#### `npm run copy-res`

Copies all of the contents of `/src/res` to `./mobile/www/res`.

#### `npm run copy-img`

Copies all of the contents of `/src/img` to `./mobile/www/img`.

#### `npm run build`

Runs `npm run sass-android`, webpacks the project, and copies all of the contents of the /res and /img folders to `./mobile/www/res` and `.mobile/www/img` respectively. (Does not build the project with the phonegap-cli)

#### `npm run webpack`

Runs `npm run sass-android`, webpacks the project with the webpack.config.dev.js file and copies all of the contents of the `/res` and `/img` folders to `./mobile/www/res` and `./mobile/www/img` respectively.

#### `npm run webpack-android`

Runs `npm run webpack` then build the project for android using the phonegap-cli. (This was being used to make a version of the project that could be used to build a .apk file in android studio)















## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

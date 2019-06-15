import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

let BROWSER = true;

function startApp() {
    console.log('startApp');
    BROWSER = false;
    ReactDOM.render(<App browser={BROWSER} />, document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    // serviceWorker.unregister();
}

document.addEventListener('deviceready', startApp, false);

setTimeout(
    () => {if (BROWSER) {
        console.log("Browser");
        //Only run if testing on browser, deviceready wont fire otherwise
        ReactDOM.render(<App browser={BROWSER} />, document.getElementById('root'));
    }},
    1000
);


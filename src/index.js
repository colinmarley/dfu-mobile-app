import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './js/reducers/index';
import * as serviceWorker from './serviceWorker';

let BROWSER = true;

function startApp() {
    console.log('startApp');
    BROWSER = false;
    const store = createStore(rootReducer);
    ReactDOM.render(
        <Provider store={store} >
            <App browser={BROWSER} />
        </Provider>,
        document.getElementById('root')
    );
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    // serviceWorker.unregister();
}

document.addEventListener('deviceready', startApp, true);

setTimeout(
    () => {if (BROWSER) {
        console.log("Browser");
        const store = createStore(rootReducer);
        //Only run if testing on browser, deviceready wont fire otherwise
        ReactDOM.render(
            <Provider store={store} >
                <App browser={BROWSER} />
            </Provider>,
            document.getElementById('root')
        );
    }},
    1000
);


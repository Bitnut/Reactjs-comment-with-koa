import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import { LocaleProvider } from 'antd';
import App from './App';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './redux/reducers'
// performance improving settings
import { createStore, applyMiddleware } from 'redux'
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
)

ReactDOM.render(
<LocaleProvider locale={zh_CN}>
    <Provider store={store}> 
        <Router>
            <App />
        </Router>
    </Provider>
</LocaleProvider>,
 document.getElementById('root'));
serviceWorker.unregister();

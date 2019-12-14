import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './redux/reducer';
import App from './components/App';

const store = createStore(reducer, {}, applyMiddleware(thunk));
window.gRickyMartyStore = store;

const AppWrapper = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<AppWrapper />, document.getElementById('app-container'));

import './input.css';
import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ApiProvider } from './api/useApi';
import { Wrapper } from './layout';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <ApiProvider>
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </ApiProvider>
  </Provider>,
);

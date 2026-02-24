import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// eslint-disable-next-line
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
// eslint-disable-next-line
import i18n from './i18n';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from 'react-router-dom';
import { registerServiceWorker, addResourceHints, collectPerformanceMetrics } from './utils/performance';

const queryClient = new QueryClient();

// Initialize performance optimizations
addResourceHints();
registerServiceWorker();

// Collect initial performance metrics
if (process.env.NODE_ENV === 'production') {
  collectPerformanceMetrics();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

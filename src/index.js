import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, NotifyProvider } from './components/Store';
import { VideoProvider } from './components/Store/VideoContext';
import reportWebVitals from './reportWebVitals';
import Globalstyles from './components/Globalstyles';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AuthProvider>
        <VideoProvider>
            <NotifyProvider>
                <Globalstyles>
                    <App />
                </Globalstyles>
            </NotifyProvider>
        </VideoProvider>
    </AuthProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, NotifyProvider } from './components/Store';
import { VideoProvider } from './components/Store/VideoContext';
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
    </AuthProvider>,
    // </React.StrictMode>
);

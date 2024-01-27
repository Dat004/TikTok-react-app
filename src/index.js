import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemesProvider, AuthProvider, NotifyProvider, VideoProvider } from './components/Store';
import Globalstyles from './components/Globalstyles';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <ThemesProvider>
        <AuthProvider>
            <VideoProvider>
                <NotifyProvider>
                    <Globalstyles>
                        <App />
                    </Globalstyles>
                </NotifyProvider>
            </VideoProvider>
        </AuthProvider>
    </ThemesProvider>,
    // </React.StrictMode>
);

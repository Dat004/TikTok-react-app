import React, { useState, useContext } from 'react';

const NotifyContext = React.createContext();

export function UserNotify() {
    return useContext(NotifyContext);
}

export function NotifyProvider({ children }) {
    const [infoNotify, setInfoNotify] = useState({
        content: '',
        delay: 3000,
        isNotify: false,
    });

    const values = { infoNotify, setInfoNotify };

    return <NotifyContext.Provider value={values}>{children}</NotifyContext.Provider>;
}

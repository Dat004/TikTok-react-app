import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useLocalStorage } from '../../hooks';

const ThemeContext = React.createContext();

export function UserThemes() {
    return useContext(ThemeContext);
}

export function ThemesProvider({ children }) {
    const { setItems, getItems } = useLocalStorage();
    const { display } = getItems();

    const [themes, setThemes] = useState('light');

    useEffect(() => {
        const themesProps = {
            display: {
                themes,
            },
        };

        setItems(themesProps);
    }, [themes]);


    console.log(display ?? 'light');

    const value = {
        themes,
        setThemes,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export function UserAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormLogout, setOpenFormLogout] = useState(false);
    const [openFormEdit, setOpenFormEdit] = useState(false);
    const [openFullVideo, setOpenFullVideo] = useState(false);
    const [openFormDelete, setOpenFormDelete] = useState(false);
    const [openFormDiscard, setOpenFormDiscard] = useState(false);
    const [dataForm, setDataForm] = useState({});

    const tokenStr = JSON.parse(localStorage.getItem('token')) ?? '';
    const userAuth = JSON.parse(localStorage.getItem('user-id')) ?? '';

    const value = {
        isFollowed,
        setIsFollowed,
        openFormLogin,
        setOpenFormLogin,
        openFormLogout,
        setOpenFormLogout,
        openFormEdit,
        setOpenFormEdit,
        openFullVideo,
        setOpenFullVideo,
        openFormDelete,
        setOpenFormDelete,
        tokenStr,
        userAuth,
        dataForm,
        setDataForm,
        openFormDiscard,
        setOpenFormDiscard,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

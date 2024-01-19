import { useEffect } from 'react';

import DiscardForm from '../../components/Auth/DiscardForm';
import UpdateForm from '../../components/Auth/UpdateForm';
import ActionsApp from '../../components/ActionsApp';
import { UserAuth } from '../../components/Store';
import LogOut from '../../components/Auth/LogOut';
import Login from '../../components/Auth/Login';
import AuthForm from '../../components/Auth';
import Header from '../components/Header';

function DefaultLayout({ children }) {
    const { openFormLogin, openFormLogout, openFormEdit, openFormDiscard } = UserAuth();

    useEffect(() => {
        document.body.style =
            openFormLogin || openFormLogout || openFormEdit || openFormDiscard
                ? 'overflow: hidden'
                : 'overflow-y: overlay';
    }, [openFormLogin, openFormLogout, openFormEdit, openFormDiscard]);

    return (
        <div>
            <Header />
            <div style={{ marginTop: 60 }} className="container">
                <div style={{ width: '100%', height: '100vh' }} className="content">
                    {children}
                </div>
            </div>
            {(openFormLogin || openFormLogout || openFormEdit || openFormDiscard) && (
                <AuthForm>
                    {openFormLogin && <Login />}
                    {openFormLogout && <LogOut />}
                    {openFormEdit && <UpdateForm />}
                    {openFormDiscard && <DiscardForm />}
                </AuthForm>
            )}
            <ActionsApp />
        </div>
    );
}

export default DefaultLayout;

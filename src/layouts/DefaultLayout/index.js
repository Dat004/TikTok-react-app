import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefalutLayout.module.scss';

import { UserAuth } from '../../components/Store/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AuthForm from '../../components/Auth';
import Login from '../../components/Auth/Login';
import LogOut from '../../components/Auth/LogOut';
import FormUpdate from '../../components/Auth/UpdateForm';
import FullScreen from '../FullScreen';
import DeleteForm from '../../components/Auth/DeleteForm';
import DiscardForm from '../../components/Auth/DiscardForm';
import Notify from '../../components/Notify';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { openFormLogin, openFormLogout, openFormEdit, openFullVideo, openFormDelete, openFormDiscard } = UserAuth();

    useEffect(() => {
        document.body.style =
            openFormLogin || openFormLogout || openFormEdit || openFullVideo || openFormDelete || openFormDiscard
                ? 'overflow-y: hidden'
                : 'overflow-y: overlay';
    }, [openFormLogin, openFormLogout, openFormEdit, openFullVideo, openFormDelete, openFormDiscard]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            {(openFormLogin || openFormLogout || openFormEdit || openFormDelete || openFormDiscard) && (
                <AuthForm>
                    {openFormLogin && <Login />}
                    {openFormLogout && <LogOut />}
                    {openFormEdit && <FormUpdate />}
                    {openFormDelete && <DeleteForm />}
                    {openFormDiscard && <DiscardForm />}
                </AuthForm>
            )}
            {openFullVideo && <FullScreen />}
            <Notify />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;

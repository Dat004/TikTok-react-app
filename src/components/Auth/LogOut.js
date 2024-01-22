import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

import { UserAuth } from '../Store/AuthContext';
import Button from '../Button';
import { Wrapper } from '../Popper';
import config from '../../services';
import { UserNotify } from '../Store';

const cx = classNames.bind(styles);

function LogOut() {
    const navigate = useNavigate();

    const { tokenStr, setOpenFormLogout } = UserAuth();
    const { setInfoNotify } = UserNotify();

    const handleCloseForm = () => {
        setOpenFormLogout(false);
    };

    const handleLogout = async () => {
        const data = await config.logout(tokenStr);

        if (data.errorCode) {
            setInfoNotify({
                content: 'Logout failed. Try again later!',
                delay: 1500,
                isNotify: true,
            });
            setOpenFormLogout(false);
        } else {
            setInfoNotify({
                content: 'Logout successfully!',
                delay: 1500,
                isNotify: true,
            });

            setTimeout(() => {
                localStorage.removeItem('user-id');
                localStorage.removeItem('token');

                navigate('/');
                window.location.reload();
            }, [300]);
        }

        // localStorage.removeItem('user-id');
        // localStorage.removeItem('token');

        // navigate('/');
        // window.location.reload();
    };

    return (
        <div className={cx('form-container')}>
            <Wrapper className={cx('form-logout')}>
                <div className={cx('logout-content')}>
                    <h1 className={cx('title-logout')}>Bạn có chắc chắn muốn đăng xuất?</h1>
                    <div className={cx('btn-primary')}>
                        <Button onClick={handleCloseForm} className={cx('btn-form-logout')} large outline>
                            Hủy
                        </Button>
                        <Button
                            onClick={handleLogout}
                            className={cx('btn-form-logout', {
                                'logout-btn': true,
                            })}
                            large
                            outline
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}

export default LogOut;

import classNames from 'classnames/bind';
import styles from './SuggestedLogin.module.scss';

import { UserAuth } from '../Store/AuthContext';
import Button from '../Button';

const cx = classNames.bind(styles);

function SuggestedLogin() {
    const { openFormLogin, setOpenFormLogin } = UserAuth();

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h4 className={cx('title')}>Đăng nhập để follow các tác giả, thích video và xem bình luận.</h4>
                <Button onClick={handleOpenFormLogin} className={cx('btn-login')} large outline>
                    Log in
                </Button>
            </div>
        </div>
    );
}

export default SuggestedLogin;

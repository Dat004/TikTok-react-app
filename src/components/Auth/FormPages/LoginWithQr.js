import classNames from 'classnames/bind';
import styles from './FormPages.module.scss';
import { HidePassIcon, ShowPassIcon } from '../../CustomIcon';
import { useState } from 'react';
import Button from '../../Button';

const cx = classNames.bind(styles);

function LoginWithQr() {
    const [showPass, setShowPass] = useState(false);

    const onShow = () => {
        setShowPass(!showPass);
    }

    return (
        <div className={cx('login-inner')}>
            <h1 className={cx('title')}>Log in with QR</h1>
            <form className={cx('form')}>
                <div className={cx('des-form')}>
                    <p className={cx('type')}>Điện thoại</p>
                    <span className={cx('link')}>Đăng nhập bằng email hoặc TikTok ID</span>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input type='text' placeholder='Phone Number' />
                    </div>
                </div>
                <div className={cx('container-form')}>
                    <div className={cx('form-input')}>
                        <input type={showPass ? 'text' : 'password'} placeholder='Password' autoComplete='on' required />
                        <div className={cx('control-pass')} onClick={onShow}>
                            {showPass ? <ShowPassIcon /> : <HidePassIcon />}
                        </div>
                    </div>
                </div>
            </form>
            <div className={cx('forgot')}>
                <span>Forgot password?</span>
            </div>
            <Button type='submit' className={cx('btn-submit')} primary large>
                Log in
            </Button>
        </div>
    );
}

export default LoginWithQr;

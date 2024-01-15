import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormPages.module.scss';

import LoginWithDefault from './LoginWithDefault';
import LoginWithQr from './LoginWithQr';
import {
    AppleIcon,
    FacebookIcon,
    GoogleIcon,
    LineIcon,
    PerSonIcon,
    QrIcon,
    TalkIcon,
    TwitterIcon,
} from '../../CustomIcon';
import { BackIcon } from '../../CustomIcon';

const cx = classNames.bind(styles);

const data = [
    {
        icon: <FacebookIcon />,
        title: 'Continue with Facebook',
        disabled: true,
    },
    {
        icon: <GoogleIcon />,
        title: 'Continue with Google',
        disabled: true,
    },
    {
        icon: <TwitterIcon />,
        title: 'Continue with Twitter',
        disabled: true,
    },
    {
        icon: <LineIcon />,
        title: 'Continue with LINE',
        disabled: true,
    },
    {
        icon: <TalkIcon />,
        title: 'Continue with KakaoTalk',
        disabled: true,
    },
];

const MENU_SIGNUP = {
    titleHeader: 'Sign up for TikTok',
    data: [
        {
            icon: <PerSonIcon />,
            title: 'Use phone or email',
            disabled: true,
        },
        ...data,
    ],
    titleFooter: 'Already have an account?',
    toLink: 'Log in',
};

const MENU_LOGIN = {
    titleHeader: 'Log in to TikTok',
    data: [
        {
            icon: <QrIcon />,
            title: 'Use QR code',
            disabled: true,
            children: {
                title: 'Log in',
                type: 'components',
                data: <LoginWithQr />,
            },
        },
        {
            icon: <PerSonIcon />,
            title: 'Phone number / Email / TikTok ID',
            children: {
                title: 'Log in',
                type: 'components',
                data: <LoginWithDefault />,
            },
        },
        ...data,
        {
            icon: <AppleIcon />,
            title: 'Continue with Apple',
            disabled: true,
        },
    ],
    policy: 'By continuing, you agree to TikTok’s Terms of Service and confirm that you have read TikTok’s Privacy Policy.',
    titleFooter: 'Don’t have an account?',
    toLink: 'Sign up',
};

function FormPages() {
    const [isFormLogin, setIsFormLogin] = useState(true);
    const [convertForm, setConvertForm] = useState(false);
    const [form, setForm] = useState(null);

    const items = isFormLogin ? MENU_LOGIN : MENU_SIGNUP;

    const onChangeForm = () => {
        setIsFormLogin(!isFormLogin);
    };

    const handleNextForm = (value) => {
        if (value.children) {
            setForm(value.children);
            setConvertForm(true);
        }
    };

    const handleBackMenu = () => {
        setConvertForm(false);
    };

    return (
        <div className={cx('wrapper')}>
            {convertForm ? (
                <Fragment>
                    <div onClick={handleBackMenu} className={cx('back')}>
                        <BackIcon className={cx('back-btn')} />
                    </div>
                    {form.data}
                </Fragment>
            ) : (
                <Fragment>
                    <div className={cx('body')}>
                        <h1 className={cx('title')}>{items.titleHeader}</h1>
                        <div className={cx('main-form')}>
                            {items.data.map((value) => (
                                <button
                                    onClick={() => handleNextForm(value)}
                                    className={cx('channel-item')}
                                    key={value.title}
                                    disabled={value.disabled}
                                >
                                    <span className={cx('icon')}>{value.icon}</span>
                                    <p className={cx('text')}>{value.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={cx('policy')}>
                        <p className={cx('text-policy')}>{items.policy}</p>
                    </div>
                </Fragment>
            )}
            <div className={cx('footer-form')}>
                <p className={cx('advice')}>
                    {items.titleFooter}
                    <span onClick={onChangeForm} className={cx('to')}>
                        {items.toLink}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default FormPages;

import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { UserAuth } from '../../../components/Store/AuthContext';
import { UserThemes } from '../../../components/Store';
import Menu from '../../../components/Popper/Menu';
import Button from '../../../components/Button';
import {
    AddIcon,
    ElipseVerticalIcon,
    InboxIcon,
    MessagesIcon,
    CoinIcon,
    GearIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    PerSonIcon,
    QuestionIcon,
    LogoDarkIcon,
    LogoLightIcon,
} from '../../../components/CustomIcon';
import Image from '../../../components/Image';
import Search from '../Search';
import config from '../../../config';
const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    const { userAuth, tokenStr, setOpenFormLogin } = UserAuth();
    const { themes } = UserThemes();

    const MENU_ITEMS = [
        {
            icon: <LanguageIcon />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        code: 'en',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        code: 'العربية',
                        title: 'العربية',
                    },
                    {
                        type: 'language',
                        code: 'বাঙ্গালি (ভারত)',
                        title: 'বাঙ্গালি (ভারত)',
                    },
                    {
                        type: 'language',
                        code: 'Cebuano (Pilipinas)',
                        title: 'Cebuano (Pilipinas)',
                    },
                    {
                        type: 'language',
                        code: 'Čeština (Česká republika)',
                        title: 'Čeština (Česká republika)',
                    },
                    {
                        type: 'language',
                        code: 'Deutsch',
                        title: 'Deutsch',
                    },
                    {
                        type: 'language',
                        code: 'Ελληνικά (Ελλάδα)',
                        title: 'Ελληνικά (Ελλάδα)',
                    },
                    {
                        type: 'language',
                        code: 'Español',
                        title: 'Español',
                    },
                    {
                        type: 'language',
                        code: 'Suomi (Suomi)',
                        title: 'Suomi (Suomi)',
                    },
                    {
                        type: 'language',
                        code: 'Filipino (Pilipinas)',
                        title: 'Filipino (Pilipinas)',
                    },
                    {
                        type: 'language',
                        code: 'Français',
                        title: 'Français',
                    },
                    {
                        type: 'language',
                        code: 'עברית (ישראל)',
                        title: 'עברית (ישראל)',
                    },
                    {
                        type: 'language',
                        code: 'हिंदी',
                        title: 'हिंदी',
                    },
                    {
                        type: 'language',
                        code: 'Magyar (Magyarország)',
                        title: 'Magyar (Magyarország)',
                    },
                    {
                        type: 'language',
                        code: '简体中文',
                        title: '简体中文',
                    },
                    {
                        type: 'language',
                        code: 'Italiano (Italia)',
                        title: 'Italiano (Italia)',
                    },
                    {
                        type: 'language',
                        code: '日本語（日本）',
                        title: '日本語（日本）',
                    },
                    {
                        type: 'language',
                        code: 'vi',
                        title: 'Tiếng Việt',
                    },
                ],
            },
        },
        {
            icon: <QuestionIcon />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <KeyboardIcon />,
            title: 'Keyboard shortcuts',
        },
        {
            icon: <KeyboardIcon />,
            title: '',
        },
    ];

    const USER_MENU = [
        {
            icon: <PerSonIcon />,
            title: 'View profile',
            to: `/@${userAuth.nickname}`,
        },
        {
            icon: <CoinIcon />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <GearIcon />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            separate: true,
            component: true,
        },
    ];

    const handleFormLogin = () => {
        tokenStr && userAuth ? navigate('/upload') : setOpenFormLogin(true);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    {themes === 'dark' ? <LogoLightIcon /> : <LogoDarkIcon />}
                </Link>
                <Search />

                <div className={cx('actions')}>
                    <Button onClick={handleFormLogin} className={cx('btn-upload')} outline medium>
                        <AddIcon className={cx('add-icon')} />
                        Upload
                    </Button>
                    {userAuth && tokenStr ? (
                        <>
                            <div className={cx('btn-wrapper')}>
                                <Tippy interactive content="Messages">
                                    <button className={cx('action-btn')}>
                                        <MessagesIcon />
                                    </button>
                                </Tippy>
                            </div>
                            <div className={cx('btn-wrapper')}>
                                <Tippy interactive content="Inbox">
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('notification')}>18</span>
                                    </button>
                                </Tippy>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button className={cx('btn-login')} onClick={handleFormLogin} primary medium>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={userAuth && tokenStr ? USER_MENU : MENU_ITEMS}>
                        {userAuth && tokenStr ? (
                            <div className={cx('btn-wrapper')}>
                                <Link to={`/@${userAuth.nickname}`} className={cx('avatar-user')}>
                                    <Image
                                        className={cx('avatar')}
                                        src={userAuth.avatar}
                                        alt={userAuth.first_name + ' ' + userAuth.last_name}
                                    />
                                </Link>
                            </div>
                        ) : (
                            <button className={cx('menu-btn')}>
                                <ElipseVerticalIcon />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

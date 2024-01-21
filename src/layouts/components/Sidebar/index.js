import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import {
    HomeActiveIcon,
    HomeIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
    VideoActiveIcon,
    VideoIcon,
} from '../../../components/CustomIcon';
import { UserAuth } from '../../../components/Store/AuthContext';
import config from '../../../config';
import FooterSide from './FooterSide';
import Following from '../../../components/SuggestedAccounts/Following';
import MenuItem from './Menu/MenuItem';
import Menu from './Menu/Menu';
import SuggestedLogin from '../../../components/SuggestedLogin';
import Suggest from '../../../components/SuggestedAccounts/Suggest';

const cx = classNames.bind(styles);

function Sidebar() {
    const sidebarRef = useRef(null);

    const { userAuth, tokenStr } = UserAuth();

    return (
        <aside className={cx('wrapper')}>
            <div ref={sidebarRef} className={cx('sidebar-nav')}>
                <Menu>
                    <MenuItem
                        title="For You"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeActiveIcon />}
                    />
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupActiveIcon />}
                    />
                    <MenuItem
                        title="LIVE"
                        to={config.routes.live}
                        icon={<VideoIcon />}
                        activeIcon={<VideoActiveIcon />}
                    />
                </Menu>

                {userAuth && tokenStr ? (
                    <div>
                        <Suggest headingTitle="Suggested accounts" footerTitle="See all" />
                        <Following headingTitle="Following accounts" footerTitle="See all" />
                    </div>
                ) : (
                    <SuggestedLogin />
                )}

                <FooterSide />

                <div style={{ display: 'none' ,height: 'calc(100% - 450px)' }} className={cx('scrollbar-control')}></div>
            </div>
        </aside>
    );
}

export default Sidebar;

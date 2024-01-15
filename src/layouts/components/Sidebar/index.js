import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { UserAuth } from '../../../components/Store/AuthContext';
import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import config from '../../../config';
import SuggestedLogin from '../../../components/SuggestedLogin';
import FooterSide from './FooterSide';
import {
    HomeActiveIcon,
    HomeIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
    VideoActiveIcon,
    VideoIcon,
} from '../../../components/CustomIcon';
import Suggest from '../../../components/SuggestedAccounts/Suggest';
import Following from '../../../components/SuggestedAccounts/Following';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    const sidebarRef = useRef(null);

    const [positionScrollBar, setPositionScrollBar] = useState(0);
    const [totalHeigth, setTotalHeight] = useState();
    const [pointsScroll, setPointsScroll] = useState(0);

    const { userAuth, tokenStr } = UserAuth();

    // useEffect(() => {
    //     if (sidebarRef) {
    //         const sidebarHeight = sidebarRef.current.clientHeight;

    //         console.log(totalHeigth);

    //         const handleSroll = () => {
    //             const scrollTop = sidebarRef.current.scrollTop;
    //             setPointsScroll(scrollTop);

    //             const scrollPercentage = (scrollTop / (sidebarTotalHeight - sidebarHeight)) * 100;
    //             setPositionScrollBar(scrollPercentage);
    //         };

    //         sidebarRef.current.addEventListener('scroll', handleSroll);

    //         return () => {
    //             sidebarRef.current.removeEventListener('scroll', handleSroll);
    //         };
    //     }
    // }, [pointsScroll]);

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

Sidebar.propTypes = {};

export default Sidebar;

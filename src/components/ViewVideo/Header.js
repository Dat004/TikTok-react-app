import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';

import { UserAuth, UserNotify } from '../Store';
import ButtonFollow from '../../components/Button/ButtonFollow';
import config from '../../services';

const cx = classNames.bind(styles);

function Header({ data = {}, isFollow = false, setFollowStatus = () => {} }) {
    const { tokenStr, userAuth, setOpenFormLogin } = UserAuth();
    const { setInfoNotify } = UserNotify();

    const [followUser, setFollowUser] = useState(isFollow);

    useEffect(() => {
        setFollowUser(isFollow);
    }, [isFollow]);

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    const handleToggleFollow = async (userId) => {
        if (followUser) {
            handleUnFollow(userId);
        } else {
            handleFollow(userId);
        }
    };

    const handleFollow = async (userId) => {
        const res = await config.followUser(userId, tokenStr);

        if (res.Error) {
            setInfoNotify({
                content: "Can't follow this user!",
                delay: 3000,
                isNotify: true,
            });
        } else {
            setFollowUser(true);

            setFollowStatus((prev) => [...prev, userId]);
        }
    };

    const handleUnFollow = async (userId) => {
        const res = await config.unFollowUser(userId, tokenStr);

        if (res.Error) {
            setInfoNotify({
                content: "Can't unfollow this user!",
                delay: 3000,
                isNotify: true,
            });
        } else {
            setFollowUser(false);

            setFollowStatus((prev) => prev.filter((i) => i !== userId));
        }
    };

    return (
        <header className={cx('header-video')}>
            <div className={cx('infor')}>
                <div className={cx('name')}>
                    <Link to={`/@${data.user.nickname}`} className={cx('nickname')}>
                        {data.user.nickname}
                    </Link>
                    <Link
                        to={`/@${data.user.nickname}`}
                        className={cx('username')}
                    >{`${data.user.first_name} ${data.user.last_name}`}</Link>
                </div>
                <div className={cx('content')}>
                    <p className={cx('text-content')}>{data.description}</p>
                </div>
                <div className={cx('music')}>
                    <span className={cx('name-music')}>{data.music}</span>
                </div>
            </div>
            <ButtonFollow
                className={cx(isFollow ? 'btn-unfollow' : 'btn-follow')}
                onClick={() => (tokenStr && userAuth ? handleToggleFollow(data?.user?.id) : handleOpenFormLogin())}
                isFollowed={isFollow}
            />
        </header>
    );
};

Header.propTypes = {
    data: PropTypes.object,
    isFollow: PropTypes.bool,
    setFollowStatus: PropTypes.func,
};

export default Header;

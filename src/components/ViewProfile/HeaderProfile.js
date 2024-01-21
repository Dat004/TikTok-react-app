import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';

import { LinkIcon, UpdateIcon, PerSonCheckIcon } from '../CustomIcon';
import { UserAuth } from '../Store';
import config from '../../services';
import Button from '../Button';
import Image from '../Image';

const cx = classNames.bind(styles);

function HeaderProfile({ data = {} }) {
    const { userAuth, tokenStr, setOpenFormEdit, setOpenFormLogin } = UserAuth();

    const [isFollowed, setIsFollowed] = useState(data?.is_followed);

    useEffect(() => {
        setIsFollowed(data?.is_followed);
    }, [data]);

    const handleOpenFormUpdate = () => {
        setOpenFormEdit(true);
    };

    const handleOpenFormLogin = () => {
        setOpenFormLogin(true);
    };

    const handleFollowUser = () => {
        const userId = data?.id;
        const fetchApi = async () => {
            const data = await config.followUser(userId, tokenStr);

            setIsFollowed(true);
        };

        fetchApi();
    };

    const handleUnFollowUser = () => {
        const userId = data.id;
        const fetchApi = async () => {
            const data = await config.unFollowUser(userId, tokenStr);

            setIsFollowed(false);
        };

        fetchApi();
    };

    return (
        <header className={cx('header-profile')}>
            <div className={cx('info-user')}>
                <div className={cx('avatar-profile')}>
                    <Image src={data.avatar} alt={data.avatar} />
                </div>
                <div className={cx('infor')}>
                    <h1 className={cx('nickname')}>{data.nickname}</h1>
                    <h4 className={cx('username')}>{data.first_name + ' ' + data.last_name}</h4>
                    {(userAuth && tokenStr && userAuth.id === data.id && (
                        <Button onClick={handleOpenFormUpdate} className={cx('btn-update')} outline medium>
                            <UpdateIcon className={cx('update-icon')} />
                            Update profile
                        </Button>
                    )) ||
                        (userAuth && tokenStr && userAuth.id !== data.id && isFollowed === false && (
                            <Button
                                onClick={handleFollowUser}
                                className={cx('btn-update', {
                                    'btn-follow': true,
                                })}
                                outline
                                medium
                            >
                                Follow
                            </Button>
                        )) ||
                        (userAuth && tokenStr && userAuth !== data.id && isFollowed === true && (
                            <div className={cx('container-btn')}>
                                <Button
                                    className={cx('btn-update', {
                                        'btn-message': true,
                                    })}
                                    outline
                                    medium
                                >
                                    Message
                                </Button>
                                <Button onClick={handleUnFollowUser} outline className={cx('btn-unfollow')}>
                                    <PerSonCheckIcon />
                                </Button>
                            </div>
                        )) ||
                        (!userAuth && !tokenStr && (
                            <Button
                                onClick={handleOpenFormLogin}
                                outline
                                medium
                                className={cx('btn-update', {
                                    'btn-follow': true,
                                })}
                            >
                                Follow
                            </Button>
                        ))}
                </div>
            </div>
            <div className={cx('count-info')}>
                <p className={cx('count-title')}>
                    {data.followings_count}
                    <span className={cx('title')}>Following</span>
                </p>
                <p className={cx('count-title')}>
                    {data.followers_count}
                    <span className={cx('title')}>Followers</span>
                </p>
                <p className={cx('count-title')}>
                    {data.likes_count}
                    <span className={cx('title')}>Likes</span>
                </p>
            </div>
            {data.bio && <h4 className={cx('user-bio')}>{data.bio}</h4>}
            {data.website_url && (
                <div className={cx('link-title')}>
                    <a className={cx('link-text')} href={data.website_url}>
                        <LinkIcon className={cx('link-icon')} />
                        <span>{data.website_url}</span>
                    </a>
                </div>
            )}
            {data.youtube_url && (
                <div className={cx('link-title')}>
                    <a className={cx('link-text')} href={data.youtube_url}>
                        <LinkIcon className={cx('link-icon')} />
                        <span>{data.youtube_url}</span>
                    </a>
                </div>
            )}
        </header>
    );
}

HeaderProfile.propTypes = {
    data: PropTypes.object,
};

export default HeaderProfile;

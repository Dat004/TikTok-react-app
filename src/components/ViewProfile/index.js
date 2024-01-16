import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';

import { UserAuth, UserVideo } from '../Store';
import config from '../../services';
import HeaderProfile from './HeaderProfile';
import Items from './Items';

const cx = classNames.bind(styles);

function ViewProfile() {
    const { nickname } = useParams();

    const [videosProfile, setVideosProfile] = useState([]);

    const { profileUser, setProfileUser, listVideos, setListVideos } = UserVideo();
    const { tokenStr } = UserAuth();

    useEffect(() => {
        setVideosProfile(listVideos);
    }, [listVideos]);

    useEffect(() => {
        setProfileUser({});
        setListVideos([]);

        const fetchApi = async () => {
            const data = await config.user(nickname, tokenStr);

            setProfileUser(data);
            setListVideos(data.videos);
        };

        fetchApi();
    }, [nickname]);

    if (Object.keys(profileUser).length === 0 || videosProfile.length === 0) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <HeaderProfile data={profileUser} />
            <Items data={profileUser} videos={videosProfile} />
        </div>
    );
}

export default ViewProfile;

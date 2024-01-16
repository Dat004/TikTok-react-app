import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ViewProfile.module.scss';

import config from '../../services';
import HeaderProfile from './HeaderProfile';
import Items from './Items';
import { UserAuth, UserVideo } from '../Store';
import ActionsApp from '../ActionsApp';

const cx = classNames.bind(styles);

function ViewProfile() {
    const { nickname } = useParams();

    const { profileUser, setProfileUser, listVideos, setListVideos } = UserVideo();
    const { tokenStr } = UserAuth();

    useEffect(() => {
        const fetchApi = async () => {
            const data = await config.user(nickname, tokenStr);

            setProfileUser(data);
            setListVideos(data.videos);
        };

        fetchApi();
    }, [nickname]);

    if (Object.keys(profileUser).length === 0) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <HeaderProfile data={profileUser} />
            <Items data={profileUser} videos={listVideos} />
            <ActionsApp />
        </div>
    );
}

export default ViewProfile;

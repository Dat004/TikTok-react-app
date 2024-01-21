import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';

import { UserAuth, UserVideo } from '../Store';
import VideoItems from './VideoItems';
import config from '../../services';

const cx = classNames.bind(styles);

function ViewVideo({ type = '' }) {
    const categories = type;

    const [listVideoUser, setListVideoUser] = useState([]);

    const { listVideoHome, setListVideoHome, setListVideos } = UserVideo();
    const { tokenStr } = UserAuth();

    useEffect(() => {
        setListVideoUser(listVideoHome);
    }, [listVideoHome]);

    useEffect(() => {
        setListVideoUser([]);

        if (type === 'following') {
            const fetchApi = async () => {
                const data = await config.videos(categories, 1, tokenStr ?? '');

                setListVideos(data);
                setListVideoHome(data);
            };

            fetchApi();
        } else {
            const fetchApi = async () => {
                const data = await config.videos(categories, 1, tokenStr ?? '');

                setListVideos(data);
                setListVideoHome(data);
            };

            fetchApi();
        }
    }, [categories]);

    if (listVideoUser.length === 0) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-wrapper')}>
                <VideoItems data={listVideoUser} />
            </div>
        </div>
    );
}

ViewVideo.propTypes = {
    type: PropTypes.string,
};

export default ViewVideo;

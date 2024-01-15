import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ViewVideo.module.scss';

import { UserAuth, UserVideo } from '../Store';
import config from '../../services';
import VideoItems from './VideoItems';
import ActionsApp from '../ActionsApp';

const cx = classNames.bind(styles);

function ViewVideo({ type }) {
    const [listVideo, setListVideo] = useState([]);
    const [categories, setCategories] = useState(type);

    const { setListVideos } = UserVideo();
    const { tokenStr, userAuth } = UserAuth();

    useEffect(() => {
        if (type === 'following') {
            const fetchApi = async () => {
                const data = await config.videos(categories, 1, tokenStr ?? '');

                setListVideo(data);
                setListVideos(data);
            };

            fetchApi();
        } else {
            const fetchApi = async () => {
                const data = await config.videos(categories, 1, tokenStr ?? '');

                setListVideo(data);
                setListVideos(data);
            };

            fetchApi();
        }
    }, [categories]);

    if (listVideo.length === 0) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-wrapper')}>
                <VideoItems data={listVideo} />
            </div>
            <ActionsApp />
        </div>
    );
}

export default ViewVideo;

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ViewVideo.module.scss';

import { UserAuth, UserVideo } from '../Store';
import config from '../../services';
import VideoItems from './VideoItems';
import ActionsApp from '../ActionsApp';

const cx = classNames.bind(styles);

function ViewVideo({ type }) {
    const [categories, setCategories] = useState(type);

    const { listVideoHome, setListVideoHome, setListVideos } = UserVideo();
    const { tokenStr } = UserAuth();

    useEffect(() => {
        setListVideoHome([]);

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

    if (listVideoHome.length === 0) {
        return;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video-wrapper')}>
                <VideoItems data={listVideoHome} />
            </div>
            <ActionsApp />
        </div>
    );
}

export default ViewVideo;

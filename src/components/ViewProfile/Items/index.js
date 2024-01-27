import PropTypes from 'prop-types';
import { useState, useRef, useEffect, Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './Items.module.scss';

import { LockIcon, LockIconLarger } from '../../CustomIcon';
import VideoItems from './VideoItems';

const cx = classNames.bind(styles);

function Items({ data = {}, videos = [] }) {
    const [video, setVideo] = useState();
    const [activeItem, setActiveItem] = useState('video');
    const [publicVideos, setPublicVideos] = useState(true);

    useEffect(() => {
        if (video) {
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {}).catch((err) => {});
            }
        }

        return () => {
            if (video) {
                video.pause();
            }
        };
    }, [video]);

    const tabVideoRef = useRef(null);
    const tabLikedRef = useRef(null);
    const lineBarRef = useRef(null);

    useEffect(() => {
        const tabRef = activeItem === 'video' && tabVideoRef.current;

        const lineBar = lineBarRef.current;

        const tabRect = tabRef.offsetLeft;
        const tabWidth = tabRef.offsetWidth;

        lineBar.style.left = `${tabRect}px`;
        lineBar.style.width = `${tabWidth}px`;
    }, [activeItem]);

    const handleActiveItem = (tab) => {
        setActiveItem(tab);

        if (tab === 'video') {
            tab = tabVideoRef.current;
            setPublicVideos(true);
        } else {
            tab = tabLikedRef.current;
            setPublicVideos(false);
        }

        const lineBar = lineBarRef.current;

        const tabRect = tab.offsetLeft;
        const tabWidth = tab.offsetWidth;

        lineBar.style.left = `${tabRect}px`;
        lineBar.style.width = `${tabWidth}px`;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('feed-tab')}>
                <div
                    onClick={(e) => handleActiveItem('video')}
                    ref={tabVideoRef}
                    className={cx('tab-content')}
                >
                    <div className={cx('content-tab', {
                        'active-items': activeItem === 'video' && true,
                    })}>
                        <p className={cx('feed-title')}>Video</p>
                    </div>
                </div>
                <div
                    onClick={(e) => handleActiveItem('liked')}
                    ref={tabLikedRef}
                    className={cx('tab-content')}
                >
                    <div className={cx('content-tab', {
                        'active-items': activeItem === 'liked' && true,
                    })}>
                        <LockIcon className={cx('lock-icon')} />
                        <p className={cx('feed-title')}>Liked</p>
                    </div>
                </div>
                <span ref={lineBarRef} className={cx('line-break')}></span>
            </div>
            <aside className={cx('container')}>
                {publicVideos ? (
                    <Fragment>
                        {videos.length === 0 ? (
                            <div className={cx('wrapper-videos')}>
                                <div className={cx('icon-big')}>
                                    <LockIconLarger className={cx('icon')} />
                                </div>
                                <h1 className={cx('title')}>No content</h1>
                                <p className={cx('description')}>This user has not posted any videos yet</p>
                            </div>
                        ) : (
                            <div className={cx('container-layout-public')}>
                                {videos.map((video, index) => (
                                    <VideoItems key={video.id} data={video} index={index} setVideo={setVideo} />
                                ))}
                            </div>
                        )}
                    </Fragment>
                ) : (
                    <div className={cx('container-layout-private')}>
                        <div className={cx('icon-big')}>
                            <LockIconLarger className={cx('icon')} />
                        </div>
                        <h1 className={cx('title')}>This user's liked videos are private</h1>
                        <p className={cx('description')}>Videos liked by {data.nickname} are currently hidden</p>
                    </div>
                )}
            </aside>
        </div>
    );
}

Items.propTypes = {
    data: PropTypes.object,
    videos: PropTypes.array,
};

export default Items;

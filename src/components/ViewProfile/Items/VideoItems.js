import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Items.module.scss';

import { PlayIconRegular } from '../../CustomIcon';
import { UserAuth, UserVideo } from '../../Store';

const cx = classNames.bind(styles);

function VideoItems({ data = {}, index, setVideo = () => {} }) {
    const videoRefs = useRef();

    const { setOpenFullVideo } = UserAuth();
    const { setIdVideo, setPositionVideo } = UserVideo();

    useEffect(() => {
        if (index === 0) {
            setVideo(videoRefs.current);
        }
    }, []);

    const handleMouseOver = () => {
        setVideo(videoRefs.current);
    };

    const handleOpenFullVideo = () => {
        setOpenFullVideo(true);
        setIdVideo(data?.id);
        setPositionVideo(index);
    };

    const handleContext = (e) => {
        e.preventDefault();
    };

    return (
        <section onContextMenu={handleContext} className={cx('section')} onMouseOver={handleMouseOver}>
            <div className={cx('main-content')} onClick={handleOpenFullVideo}>
                <div className={cx('card-video')}>
                    <video
                        muted
                        loop
                        ref={videoRefs}
                        className={cx('video-items')}
                        poster={data.thumb_url}
                        src={data.file_url}
                        preload="auto"
                    />
                    <div className={cx('card-footer')}>
                        <PlayIconRegular />
                        <strong className={cx('view-video')}>{data.views_count}</strong>
                    </div>
                </div>
                <div className={cx('description-video')}>
                    <h4 className={cx('description')}>{data.description}</h4>
                </div>
            </div>
        </section>
    );
}

VideoItems.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    setVideo: PropTypes.func,
};

export default VideoItems;

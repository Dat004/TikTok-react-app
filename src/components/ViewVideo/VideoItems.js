import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, useLayoutEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';

import { UserAuth, UserVideo } from '../Store';
import Image from '../Image';
import Header from './Header';
import VideoActions from './Video/VideoActions';
import Video from './Video';
// import { CommentIcon, LoveIcon, ShareIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

function VideoItems({ data }) {
    const wrapperRef = useRef();

    const { openFullVideo } = UserAuth();
    const { positionVideo } = UserVideo();

    const [followStatus, setFollowStatus] = useState(data.filter((i) => i.user.is_followed).map((i) => i.user.id));

    // useEffect(() => {
    //     if (positionVideo === null) {
    //         return;
    //     }

    //     wrapperRef.current.children[positionVideo].scrollIntoView({
    //         behavior: 'smooth',
    //         block: 'center',
    //     });
    // }, [positionVideo, openFullVideo]);

    return (
        <div ref={wrapperRef} className={cx('container')}>
            {data.map((items, index) => (
                <div key={items.id} className={cx('video-items')}>
                    <Link to={`/@${items.user.nickname}`} className={cx('avatar')}>
                        <LazyLoad height="100%">
                            <Image className={cx('avatar-user')} src={items.user.avatar} />
                        </LazyLoad>
                    </Link>
                    <div className={cx('container')}>
                        <Header
                            data={items}
                            index={index}
                            isFollow={followStatus.includes(items?.user?.id)}
                            setFollowStatus={setFollowStatus}
                        />
                        <div className={cx('main-video')}>
                            <Video data={items} index={index} />
                            <VideoActions data={items} index={index} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

VideoItems.propTypes = {
    data: PropTypes.array.isRequired,
};

export default VideoItems;

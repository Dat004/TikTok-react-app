import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';

import Image from '../Image';
import Header from './Header';
import VideoActions from './Video/VideoActions';
import Video from './Video';

const cx = classNames.bind(styles);

function VideoItems({ data = [] }) {
    const wrapperRef = useRef();

    const [followStatus, setFollowStatus] = useState(data.filter((i) => i.user.is_followed).map((i) => i.user.id));

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

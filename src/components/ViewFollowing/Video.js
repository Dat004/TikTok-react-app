import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ViewFollowing.module.scss';

import { CheckIcon } from '../CustomIcon';
import Image from '../Image';
import Button from '../Button';

const cx = classNames.bind(styles);

function Video({ data = {}, index, setVideo = () => {}, src = '', thumb = '' }) {
    const videoRef = useRef();

    useEffect(() => {
        if (index === 0) {
            setVideo(videoRef.current);
        }
    }, [index]);

    const handleMouseOver = () => {
        setVideo(videoRef.current);
    };

    return (
        <section className={cx('section-items')}>
            <Link onMouseOver={handleMouseOver} to={`/@${data.nickname}`} className={cx('container-info')}>
                <div className={cx('preview-videos')}>
                    <video className={cx('video')} muted loop ref={videoRef} poster={src} src={thumb} preload="auto" />;
                </div>
                <div className={cx('preview-info')}>
                    <div className={cx('avatar-container')}>
                        <Image src={data.avatar} alt={data.avatar} />
                    </div>
                    <h2 className={cx('username')}>{data.first_name + ' ' + data.last_name}</h2>
                    <p className={cx('nickname')}>
                        <span>{data.nickname}</span>
                        {data.tick && <CheckIcon />}
                    </p>
                    <Button onClick={(e) => e.preventDefault()} className={cx('div-btn')} primary medium>
                        Follow
                    </Button>
                </div>
            </Link>
        </section>
    );
}

Video.propTypes = {
    data: PropTypes.object,
    setVideo: PropTypes.func,
    index: PropTypes.number,
    src: PropTypes.string,
    thumb: PropTypes.string,
};

export default Video;

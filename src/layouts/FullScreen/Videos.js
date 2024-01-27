import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FullScreen.module.scss';

import { NavIcon } from '../../components/CustomIcon';
import { UserAuth, UserNotify, UserVideo } from '../../components/Store';
import { CloseTabs, VolumeVideo } from '../../components/Control';
import { useVideoTime } from '../../hooks';
import Button from '../../components/Button';
import ContextMenu from '../../components/ContextMenu';
import InputSlider from '../../components/InputSlider';

const cx = classNames.bind(styles);

function Videos({ onPrevPage = () => {}, onNextPage = () => {}, data = {}, index, listVideos = [] }) {
    const videoRef = useRef();
    const navigate = useNavigate();

    const { nickname } = useParams();

    const STEP = 0.00001;
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(data?.meta?.playtime_seconds);
    const DEFAULT_VOLUME = 0.7;

    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const [isFirstPage, setIsFirstPage] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    const [isContextMenu, setIsContextMenu] = useState(false);

    const { valueVolume, setValueVolume, mutedVideo, setMutedVideo, setIdVideo } = UserVideo();
    const { setOpenFullVideo } = UserAuth();
    const { setInfoNotify } = UserNotify();

    const currentTime = useVideoTime(timeValueVideo);
    const durationTime = useVideoTime(MAX_VALUE);

    const handleChangeTime = (e) => {
        const currentTime = e;

        setTimeValueVideo(currentTime);

        videoRef.current.currentTime = currentTime;
    };

    const handleDrag = () => {
        videoRef.current.pause();
    };

    const handleDrop = () => {
        videoRef.current.play();
    };

    const handleMuteVideo = () => {
        setMutedVideo((prev) => (!prev ? (videoRef.current.muted = true) : (videoRef.current.muted = false)));

        if (!mutedVideo) {
            setValueVolume(MIN_VALUE);
        } else {
            setValueVolume(DEFAULT_VOLUME * 100);
        }
    };

    const handleChanegVolumeVideo = (e) => {
        setValueVolume(Number(e));
    };

    const handleCLoseVideo = () => {
        setOpenFullVideo(false); // Đóng chế độ xem video

        nickname ? navigate(`/${nickname}`) : navigate(`/`); // Chuyển hướng khi tắt chế độ xem video
    };

    const handleContext = (e) => {
        e.preventDefault();

        setPosition({
            x: e.nativeEvent.layerX,
            y: e.nativeEvent.layerY,
        });
        setIsContextMenu(true);
    };

    const handleOthers = () => {
        if (isContextMenu) {
            setIsContextMenu(false);
        }
    };

    useEffect(() => {
        setIdVideo(data?.id);
    }, [data, listVideos]);

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;

                setTimeValueVideo(currentTime);
            }
        };

        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [index]);

    useEffect(() => {
        document.addEventListener('click', handleOthers);
        document.addEventListener('scroll', handleOthers);
        document.addEventListener('keydown', handleOthers);

        return () => {
            document.removeEventListener('click', handleOthers);
            document.removeEventListener('scroll', handleOthers);
            document.removeEventListener('keydown', handleOthers);
        };
    }, [isContextMenu]);

    useEffect(() => {
        if (videoRef.current) {
            const playPromise = videoRef.current.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {})
                    .catch((error) => {
                        videoRef.current.pause();

                        setInfoNotify({
                            content: 'Video not supported. Try again later!',
                            delay: 1500,
                            isNotify: true,
                        });
                    });
            }
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, [index, data]);

    useEffect(() => {
        if (Number(valueVolume) === 0) {
            setMutedVideo(true);

            videoRef.current.volume = Number(valueVolume) / 100;
            videoRef.current.muted = true;
        } else {
            setMutedVideo(false);

            videoRef.current.volume = Number(valueVolume) / 100;
            videoRef.current.muted = false;
        }
    }, [videoRef.current, valueVolume]);

    useEffect(() => {
        index <= 0 ? setIsFirstPage(true) : setIsFirstPage(false);
        index >= listVideos.length - 1 ? setIsLastPage(true) : setIsLastPage(false);
    }, [index, listVideos]);

    return (
        <div className={cx('container-videos')}>
            <div className={cx('background-videos')} style={{ backgroundImage: `${data?.thumb_url}` }}></div>
            <div className={cx('wrapper-video')}>
                <div onContextMenu={handleContext} className={cx('card-video')}>
                    {isContextMenu && <ContextMenu idVideo={data?.id} positionX={position.x} positionY={position.y} />}
                    <video
                        muted
                        loop
                        ref={videoRef}
                        className={cx('video')}
                        poster={data?.thumb_url}
                        src={data?.file_url}
                        preload="auto"
                    />
                </div>
                <div className={cx('bar-progress')}>
                    <InputSlider
                        className={cx('slider-container')}
                        borderRadius="0"
                        height="100%"
                        widthThumb="16px"
                        heightThumb="16px"
                        heightX="4px"
                        widthX="100%"
                        onChange={handleChangeTime}
                        onSeekStart={handleDrag}
                        onSeekEnd={handleDrop}
                        min={MIN_VALUE}
                        max={MAX_VALUE}
                        step={STEP}
                        value={timeValueVideo}
                    />
                    <span className={cx('time-line')}>
                        {currentTime.minutes + ':' + currentTime.seconds}/
                        {durationTime.minutes + ':' + durationTime.seconds}
                    </span>
                </div>
            </div>
            <div
                className={cx('close-wrapper', {
                    'btn-direction': true,
                })}
            >
                <CloseTabs onClick={handleCLoseVideo} />
            </div>
            <div className={cx('directional')}>
                <Button
                    disabled={isFirstPage ? true : false}
                    onClick={onPrevPage}
                    className={cx('btn-direction', {
                        'btn-prev': true,
                    })}
                >
                    <NavIcon />
                </Button>
                <Button
                    disabled={isLastPage ? true : false}
                    onClick={onNextPage}
                    className={cx('btn-direction', {
                        'btn-next': true,
                    })}
                >
                    <NavIcon />
                </Button>
            </div>
            <div className={cx('sound')}>
                <VolumeVideo
                    onClick={handleMuteVideo}
                    onChangeVolume={handleChanegVolumeVideo}
                    volumeValue={valueVolume}
                    width="28px"
                    height="106px"
                    widthY="4px"
                    heightY="80px"
                    widthThumb="16px"
                    heightThumb="16px"
                    backgroundWrapper="rgba(84, 84, 84, 0.5)"
                    isMute={mutedVideo ? true : false}
                    className={cx('btn-direction')}
                />
            </div>
        </div>
    );
}

Videos.propTypes = {
    onPrevPage: PropTypes.func,
    onNextPage: PropTypes.func,
    data: PropTypes.object,
    index: PropTypes.number,
    listVideos: PropTypes.array,
};

export default Videos;

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FullScreen.module.scss';

import { NavIcon } from '../../components/CustomIcon';
import { UserAuth, UserNotify, UserVideo } from '../../components/Store';
import { CloseTabs, VolumeVideo } from '../../components/Control';
import { useVideoTime } from '../../hooks';
import Button from '../../components/Button';
import ContextMenu from '../../components/ContextMenu';

const cx = classNames.bind(styles);

function Videos({ onPrevPage, onNextPage, data, index, listVideos }) {
    const videoRef = useRef();
    const navigate = useNavigate();

    const { nickname } = useParams();

    const STEP = 0.00001;
    const MIN_VALUE = 0;

    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const [valuePercent, setValuePercent] = useState();
    const [isFirstPage, setIsFirstPage] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    const [isContextMenu, setIsContextMenu] = useState(false);

    const { mutedVideo, setMutedVideo, setIdVideo } = UserVideo();
    const { setOpenFullVideo } = UserAuth();
    const { setInfoNotify } = UserNotify();

    const currentTime = useVideoTime(timeValueVideo);
    const durationTime = useVideoTime(data?.meta?.playtime_seconds);

    const handleChangeTime = (e) => {
        const currentTime = Number(e.target.value);

        setTimeValueVideo(currentTime);

        setValuePercent((currentTime / data?.meta?.playtime_seconds) * 100);

        videoRef.current.currentTime = currentTime;
    };

    const handleSeekStart = () => {
        videoRef.current.pause();
    };

    const handleSeekEnd = () => {
        videoRef.current.play();
    };

    const handleMuteVideo = () => {
        setMutedVideo((prev) => !prev); // Bật tắt âm thanh
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
        };
    };

    useEffect(() => {
        setIdVideo(data?.id);
    }, [data, listVideos]);

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;
                setValuePercent((currentTime / videoRef.current.duration) * 100);
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
        }
    }, [isContextMenu]);

    useEffect(() => {
        mutedVideo ? (videoRef.current.muted = true) : (videoRef.current.muted = false);
    }, [mutedVideo]);

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
                    <div className={cx('input-slider')}>
                        <input
                            className={cx('input-element')}
                            onChange={handleChangeTime}
                            onMouseDown={handleSeekStart}
                            onMouseUp={handleSeekEnd}
                            type="range"
                            value={timeValueVideo}
                            max={data?.meta?.playtime_seconds}
                            min={MIN_VALUE}
                            step={STEP}
                        />
                        <span className={cx('input-thumb')} style={{ left: `${valuePercent}%` }}></span>
                        <span className={cx('input-progress')} style={{ width: `${valuePercent}%` }}></span>
                    </div>
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
                <VolumeVideo onClick={handleMuteVideo} isMute={mutedVideo} className={cx('btn-direction')} />
            </div>
        </div>
    );
}

export default Videos;

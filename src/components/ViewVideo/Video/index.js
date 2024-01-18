import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { PlayVideo, VolumeVideo } from '../../Control';
import { UserVideo } from '../../Store/VideoContext';
import { UserAuth } from '../../Store';
import { useVideoTime } from '../../../hooks';
import Image from '../../Image';
import ContextMenu from '../../ContextMenu';

const cx = classNames.bind(styles);

function Video({ data, index }) {
    const videoRef = useRef();

    const DEFAULT_VALUE = 0.7;
    const MIN_VALUE = 0;
    const MAX_VALUE = 1;
    const STEP = 0.0001;

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [percentsValue, setPercentsValue] = useState(0);
    const [timeValueVideo, setTimeValueVideo] = useState(MIN_VALUE);
    const [playVideo, setPlayVideo] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const currentTime = useVideoTime(timeValueVideo);
    const durationTime = useVideoTime(data?.meta?.playtime_seconds);

    const { mutedVideo, setMutedVideo, valueVolume, setValueVolume, setIdVideo, setPositionVideo } = UserVideo();
    const { openFullVideo, setOpenFullVideo } = UserAuth();

    const setRef = useCallback((node) => {
        if (node) {
            videoRef.current = node;
        }
    }, []);

    // Handle event change time current video
    const handleChangeTimeCurrentVideo = (e) => {
        const currentTime = Number(e.target.value);

        setTimeValueVideo(currentTime);

        setPercentsValue((currentTime / data.meta.playtime_seconds) * 100);

        videoRef.current.currentTime = currentTime;
    };

    //Handle event change volume video
    const handleChangeVolume = (e) => {
        setValueVolume(e.target.value);

        if (Number(valueVolume) === 0) {
            setMutedVideo(true);
        } else {
            setMutedVideo(false);
        }
    };

    //Handle event toggle play video
    const handlePlayVideo = (e) => {
        setPlayVideo((prev) => !prev);

        !playVideo ? videoRef.current.play() : videoRef.current.pause();
    };

    //Handle event toggle muted video
    const handleMuteVoice = (e) => {
        e.preventDefault();

        setMutedVideo((prev) => !prev);

        if (mutedVideo) {
            setValueVolume(DEFAULT_VALUE);

            videoRef.current.muted = false;
        } else {
            setValueVolume(MIN_VALUE);

            videoRef.current.muted = true;
        }
    };

    const handleGetVideo = () => {
        setIdVideo(data.id);
        setPositionVideo(index);
        setOpenFullVideo(true);
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.75,
        };

        const callBack = (entry) => {
            entry.forEach((entries) => {
                if (entries.isIntersecting) {
                    const playPromise = entries.target.play();

                    if (playPromise !== undefined) {
                        playPromise.then(() => {}).catch((error) => {});
                    }

                    setPlayVideo(true);
                } else {
                    entries.target.pause();

                    setPlayVideo(false);
                }
            });
        };

        const observer = new IntersectionObserver(callBack, options);

        observer.observe(videoRef.current);

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [openFullVideo]);

    //Handle creating progress bar for video
    useEffect(() => {
        videoRef.current.currentTime = 0;

        const handleTimeUpdate = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;

                setTimeValueVideo(currentTime);

                setPercentsValue((currentTime / data.meta.playtime_seconds) * 100);
            }
        };

        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                videoRef.current.pause();
            }
        };
    }, [openFullVideo]);

    useEffect(() => {
        if (Number(valueVolume) === 0) {
            setMutedVideo(true);

            videoRef.current.volume = Number(valueVolume);
        } else {
            setMutedVideo(false);

            videoRef.current.volume = Number(valueVolume);
        }
    }, [valueVolume, openFullVideo]);

    const handleOthers = () => {
        if (isContextMenu) {
            setIsContextMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOthers);
        document.addEventListener('scroll', handleOthers);

        return () => {
            document.removeEventListener('click', handleOthers);
            document.removeEventListener('scroll', handleOthers);
        };
    }, [isContextMenu]);

    const handleContext = (e) => {
        e.preventDefault();

        setPosition({
            x: e.nativeEvent.layerX,
            y: e.nativeEvent.layerY,
        });
        setIsContextMenu(true);
    };

    return (
        <div onContextMenu={handleContext} className={cx('container')}>
            {isContextMenu && <ContextMenu idVideo={data?.id} positionX={position.x} positionY={position.y} />}
            <div className={cx('section-video')}>
                <div
                    className={cx('card-video', {
                        'video-horizontal': data.meta.video.resolution_x > data.meta.video.resolution_y ? true : false,
                        'video-vertical': data.meta.video.resolution_x < data.meta.video.resolution_y ? true : false,
                    })}
                >
                    <div onClick={handleGetVideo} className={cx('container-video')}>
                        <Image className={cx('poster')} src={data.thumb_url} alt={data.thumb_url} />
                        <video
                            className={cx('video', {
                                'video-hidden': isVisible || openFullVideo,
                            })}
                            ref={setRef}
                            src={data.file_url}
                            preload="auto"
                            loop
                        ></video>
                    </div>
                    <div className={cx('container-control')}>
                        <div
                            className={cx('btn-control', {
                                'play-control': true,
                            })}
                        >
                            <PlayVideo isPlay={playVideo} onClick={handlePlayVideo} />
                        </div>
                        <div
                            className={cx('btn-control', {
                                'voice-control': true,
                            })}
                        >
                            <div className={cx('control-volume')}>
                                <div className={cx('container-slider')}>
                                    <div className={cx('slider')}>
                                        <input
                                            id="slider"
                                            value={valueVolume}
                                            onChange={handleChangeVolume}
                                            type="range"
                                            min={MIN_VALUE}
                                            max={MAX_VALUE}
                                            step={STEP}
                                        />
                                        <span
                                            style={{ width: `${valueVolume * 100}%` }}
                                            className={cx('progress-bar')}
                                        ></span>
                                    </div>
                                </div>
                                <div className={cx('voice')}>
                                    <VolumeVideo isMute={mutedVideo} onClick={handleMuteVoice} />
                                </div>
                            </div>
                        </div>
                        <div
                            className={cx('btn-control', {
                                'input-control': true,
                            })}
                        >
                            <div className={cx('content')}>
                                <input
                                    id="slider-input"
                                    type="range"
                                    value={timeValueVideo}
                                    min={MIN_VALUE}
                                    max={data.meta.playtime_seconds}
                                    step={STEP}
                                    onChange={handleChangeTimeCurrentVideo}
                                />
                                <span className={cx('slider-thumb')} style={{ left: `${percentsValue}%` }}></span>
                                <span
                                    style={{ left: 0, borderRadius: 0, width: `${percentsValue}%` }}
                                    className={cx('progress-bar')}
                                ></span>
                            </div>
                            <span className={cx('progress-time')}>
                                {currentTime.minutes + ':' + currentTime.seconds} /{' '}
                                {durationTime.minutes + ':' + durationTime.seconds}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Video.propTypes = {};

export default Video;

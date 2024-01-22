import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './PicutureInPicture.module.scss';

import { CloseTabs, PlayVideo, VolumeVideo, FullScreenVideos } from '../Control';
import { Wrapper } from '../../components/Popper';
import { PauseIcon, PlayIcon, ZoomIcon } from '../CustomIcon';
import { UserVideo } from '../Store/VideoContext'; 
import Image from '../Image';
import InputSlider from '../InputSlider';

const cx = classNames.bind(styles);

const DATA_SPEED_VIDEO = [
    {
        value: 0.75,
        type: 'speed',
    },
    {
        value: 1,
        type: 'speed',
    },
    {
        value: 1.25,
        type: 'speed',
    },
    {
        value: 1.5,
        type: 'speed',
    },
    {
        value: 2,
        type: 'speed',
    },
];

function PicutureInPicture({ data = {} }) {
    const wrapperRef = useRef();
    const videoRef = useRef();
    const videoSpeedRef = useRef([]);

    const MIN_VOLUME = 0;
    const DEFAULT_VOLUME = 0.7;
    const MIN_VALUE = 0;
    const MAX_VALUE = Number(data?.meta?.playtime_seconds);
    const STEP = 0.00001;

    const [timeValue, setTimeValue] = useState(MIN_VALUE);
    const [targetSpeed, setTargetSpeed] = useState(1);
    const [isPictureInPicture, setIsPictureInPicture] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [isClickVideo, setIsClickVideo] = useState(false);

    const { valueVolume, setValueVolume, mutedVideo, setMutedVideo } = UserVideo();

    useEffect(() => {
        const handleLoadPlayVideo = () => {
            if (videoRef.current) {
                setIsPlay(true);

                videoRef.current.play();
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('loadeddata', handleLoadPlayVideo);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadeddata', handleLoadPlayVideo);
            }
        };
    }, [videoRef.current]);

    useEffect(() => {
        if (!isPictureInPicture) {
            if (videoSpeedRef.current) {
                videoSpeedRef.current.forEach((item, id) => {
                    id === targetSpeed
                        ? (item.style.background = 'rgba(255, 255, 255, 0.08)')
                        : (item.style.background = 'rgb(27, 27, 27)');
                });
            }
        }
    }, [isPictureInPicture, targetSpeed]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.17,
        };

        const callback = (entry) => {
            entry.forEach((entries) => {
                if (entries.isIntersecting) {
                    setIsPictureInPicture(false);
                } else {
                    setIsPictureInPicture(true);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (wrapperRef.current) {
            observer.observe(wrapperRef.current);
        }

        return () => {
            if (wrapperRef.current) {
                observer.unobserve(wrapperRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;

                setTimeValue(currentTime);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [videoRef.current]);

    useEffect(() => {
        if (Number(valueVolume) === 0) {
            setMutedVideo(true);

            videoRef.current.muted = true;
            videoRef.current.volume = Number(valueVolume) / 100;
        } else {
            setMutedVideo(false);

            videoRef.current.muted = false;
            videoRef.current.volume = Number(valueVolume) / 100;
        }
    }, [videoRef.current, valueVolume]);

    const handleMuteVideo = () => {
        setMutedVideo((prev) => (!prev ? (videoRef.current.muted = true) : (videoRef.current.muted = false)));

        if (!mutedVideo) {
            setValueVolume(MIN_VOLUME * 100);
        } else {
            setValueVolume(DEFAULT_VOLUME * 100);
        }
    };

    const handlePlayVideo = () => {
        setIsPlay((prev) => (!prev ? videoRef.current.play() : videoRef.current.pause()));
    };

    const handleCloseVideoMini = () => {
        if (isPictureInPicture) {
            setIsPictureInPicture(false);
        }
    };

    const handleScrollOnTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const handleChangeSpeed = (value, index) => {
        setTargetSpeed(index);

        videoRef.current.playbackRate = value;

        videoSpeedRef.current.forEach((item, id) => {
            id === index
                ? (item.style.background = 'rgba(255, 255, 255, 0.08)')
                : (item.style.background = 'rgb(27, 27, 27)');
        });
    };

    const handleOpenFullscreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }
    };

    const handleChangeVolume = (e) => {
        const value = Number(e);

        setValueVolume(value);
    };

    const handleChangeTimeVideo = (e) => {
        const currentTime = e;

        setTimeValue(currentTime);

        videoRef.current.currentTime = currentTime;
    };

    const handleEndedAnimation = () => {
        setIsClickVideo(false);
    };

    const handleClickVideo = () => {
        setIsClickVideo(true);
        handlePlayVideo();
    };

    const handleDrag = () => {
        if (!isPlay) {
            return;
        }

        videoRef.current.pause();
    };

    const handleDrop = () => {
        if (!isPlay) {
            return;
        }

        videoRef.current.play();
    };

    return (
        <div ref={wrapperRef} className={cx('wrapper')}>
            <div
                className={cx('container-video', {
                    'video-sticky': isPictureInPicture,
                })}
            >
                {!isPictureInPicture && isClickVideo && (
                    <div className={cx('animation-wrapper')}>
                        <div className={cx('animation-controller')} onAnimationEnd={handleEndedAnimation}>
                            {!isPlay ? (
                                <PlayIcon width="8.8rem" height="8.8rem" />
                            ) : (
                                <PauseIcon width="8.8rem" height="8.8rem" />
                            )}
                        </div>
                    </div>
                )}
                {isPictureInPicture ? (
                    <div className={cx('video-controls')}>
                        <div onClick={handleScrollOnTop} className={cx('zoom-control')}>
                            <ZoomIcon />
                        </div>
                        <div className={cx('close-btn')}>
                            <CloseTabs onClick={handleCloseVideoMini} width="2.4rem" height="2.4rem" />
                        </div>
                        <div className={cx('play-btn')}>
                            <PlayVideo
                                onClick={handlePlayVideo}
                                isPlay={isPlay ? true : false}
                                width="4rem"
                                heigth="4rem"
                            />
                        </div>
                    </div>
                ) : (
                    <div className={cx('videoplayer-controller')}>
                        <InputSlider
                            borderRadius="0"
                            width="100%"
                            height="4px"
                            onChange={handleChangeTimeVideo}
                            onSeekStart={handleDrag}
                            onSeekEnd={handleDrop}
                            pseudoProps={{
                                opacity: 1,
                                cursor: 'pointer',
                            }}
                            min={MIN_VALUE}
                            max={MAX_VALUE}
                            value={timeValue}
                            step={STEP}
                        />
                        <div className={cx('controller')}>
                            <div className={cx('left-controller')}>
                                <PlayVideo isPlay={isPlay ? true : false} onClick={() => handlePlayVideo(videoRef)} />
                            </div>
                            <div className={cx('right-controller')}>
                                <div className={cx('right-items')}>
                                    <Wrapper className={cx('wrapper-items')} widthBox="120px">
                                        {DATA_SPEED_VIDEO.map((items, index) => (
                                            <div
                                                ref={(ref) => (videoSpeedRef.current[index] = ref)}
                                                onClick={() => handleChangeSpeed(items.value, index)}
                                                key={index}
                                                className={cx('items-speed')}
                                            >
                                                {items.value}
                                                <span>x</span>
                                            </div>
                                        ))}
                                    </Wrapper>
                                    <span className={cx('control-speed')}>Speed</span>
                                </div>
                                <VolumeVideo
                                    onChangeVolume={handleChangeVolume}
                                    onClick={handleMuteVideo}
                                    volumeValue={valueVolume}
                                    backgroundWrapper='rgb(27, 27, 27)'
                                    width='28px'
                                    height='106px'
                                    widthY='4px'
                                    heightY='80px'
                                    isMute={mutedVideo ? true : false}
                                />
                                <div>
                                    <Tippy content="Full screen">
                                        <FullScreenVideos onClick={handleOpenFullscreen} />
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('video-layer')}>
                    <div className={cx('video-card')}>
                        <Image className={cx('poster')} src={data?.thumb_url} alt="poster" />
                        <video
                            onClick={handleClickVideo}
                            ref={videoRef}
                            onEnded={() => setIsPlay(false)}
                            className={cx('video-element')}
                            src={data?.file_url}
                            preload="auto"
                            muted
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

PicutureInPicture.propTypes = {
    data: PropTypes.object,
};

export default PicutureInPicture;

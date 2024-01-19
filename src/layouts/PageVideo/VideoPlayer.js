import { useEffect, useRef, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './PageVideo.module.scss';

import { PlayVideo, VolumeVideo, FullScreenVideos } from '../../components/Control';
import { LoopIcon } from '../../components/CustomIcon';
import { Wrapper } from '../../components/Popper';
import Button from '../../components/Button';
import Image from '../../components/Image';
import ContextMenu from '../../components/ContextMenu';

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

function VideoPlayer({ data }) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const MIN_VALUE = 0;
    const MAX_VALUE = data?.meta?.playtime_seconds;
    const STEP = 0.00001;

    const videoRef = useRef();
    const videoSpeedRef = useRef([]);

    const [isEnded, setIsEnded] = useState(false);
    const [isContextMenu, setIsContextMenu] = useState(false);
    const [mutedVideo, setMutedVideo] = useState(true);
    const [isPlay, setIsPlay] = useState(false);
    const [targetSpeed, setTargetSpeed] = useState(1);
    const [percentsValue, setPercentsValue] = useState();
    const [timeValue, setTimeValue] = useState(MIN_VALUE);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.65,
        };

        const callBack = (entry) => {
            entry.forEach((entries) => {
                if (entries.isIntersecting) {
                    // const promiseVideo = entries.target.play();
                    // if (promiseVideo !== undefined) {
                    //     promiseVideo.then(() => {}).catch((error) => {});
                    // }
                    // setIsPlay(true);
                } else {
                    // entries.target.pause();
                    // setIsPlay(false);
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
    }, []);

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;

                setTimeValue(currentTime);

                setPercentsValue((currentTime / MAX_VALUE) * 100);
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
    }, []);

    useEffect(() => {
        videoSpeedRef.current.forEach((item, id) => {
            id === targetSpeed
                ? (item.style.background = 'rgba(255, 255, 255, 0.08)')
                : (item.style.background = 'rgb(27, 27, 27)');
        });
    }, []);

    const handleOthers = () => {
        if (isContextMenu) {
            setIsContextMenu(false);
        }
    };

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

    const backgroundStyle = {
        backgroundImage: `url(${data.thumb_url})`,
        backgroundRepeat: 'no-repeat',
    };

    const handlePlayVideo = () => {
        setIsPlay((prev) => (!prev ? videoRef.current.play() : videoRef.current.pause()));
    };

    const handleMuteVideo = () => {
        setMutedVideo((prev) => (!prev ? (videoRef.current.muted = true) : (videoRef.current.muted = false)));
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

    const handleChangeTimeVideo = (e) => {
        const currentTime = Number(e.target.value);

        setTimeValue(currentTime);

        setPercentsValue((currentTime / MAX_VALUE) * 100);

        videoRef.current.currentTime = currentTime;
    };

    const handleEndedVideo = () => {
        setIsPlay(false);
    };

    const handlePlayAgainVideo = () => {
        setIsPlay(true);

        videoRef.current.currentTime = MIN_VALUE;
        videoRef.current.play();
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

    const handleContext = (e) => {
        e.preventDefault();

        setPosition({
            x: e.nativeEvent.layerX,
            y: e.nativeEvent.layerY,
        });
        setIsContextMenu(true);
    };

    return (
        <div onContextMenu={handleContext} className={cx('videoplayer-detail')}>
            {isContextMenu && (
                <ContextMenu
                    idVideo={data?.id}
                    positionX={position.x}
                    positionY={position.y}
                    fileName={data?.file_url}
                    mimeType={data?.meta?.mime_type}
                />
            )}
            <div className={cx('wrapper-background')}>
                <div style={backgroundStyle} className={cx('background-videoplayer')}></div>
            </div>
            {isEnded && (
                <div className={cx('videoplayer-ended')}>
                    <Button onClick={handlePlayAgainVideo} className={cx('play-again')}>
                        <LoopIcon />
                    </Button>
                </div>
            )}
            <div className={cx('videoplayer-controller')}>
                <div className={cx('slider-controller')}>
                    <input
                        onChange={handleChangeTimeVideo}
                        className={cx('input')}
                        type="range"
                        value={timeValue}
                        max={MAX_VALUE}
                        min={MIN_VALUE}
                        step={STEP}
                    />
                    <div className={cx('input-slider')} style={{ width: `${percentsValue}%` }}></div>
                    <div className={cx('input-thumb')} style={{ left: `${percentsValue}%` }}></div>
                </div>
                <div className={cx('controller')}>
                    <div className={cx('left-controller')}>
                        <PlayVideo isPlay={isPlay} onClick={handlePlayVideo} />
                    </div>
                    <div className={cx('right-controller')}>
                        <Wrapper className={cx('wrapper-items')} widthBox="120px">
                            {DATA_SPEED_VIDEO.map((items, index) => (
                                <div
                                    ref={(ref) => (videoSpeedRef.current[index] = ref)}
                                    onClick={() => handleChangeSpeed(items.value, index)}
                                    key={index}
                                    className={cx('items-speed')}
                                >
                                    {items.value}x
                                </div>
                            ))}
                        </Wrapper>
                        <div className={cx('control-speed')}>Speed</div>
                        <VolumeVideo isMute={mutedVideo} onClick={handleMuteVideo} />
                        <div>
                            <Tippy content="Full screen">
                                <FullScreenVideos onClick={handleOpenFullscreen} />
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('videoplayer-content')}>
                <div className={cx('video-element')}>
                    <Image className={cx('poster')} src={data.thumb_url} alt={data.thumb_url} />
                    <video
                        ref={videoRef}
                        className={cx('video')}
                        src={data?.file_url}
                        onEnded={handleEndedVideo}
                        preload="auto"
                        muted
                    />
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;

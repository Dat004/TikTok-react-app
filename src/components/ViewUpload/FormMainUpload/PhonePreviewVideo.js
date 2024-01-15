import classNames from 'classnames/bind';
import styles from './FormMainUpload.module.scss';

import { PlayVideo, VolumeVideo } from '../../Control';
import { Fragment, useEffect, useRef, useState } from 'react';
import { UploadIcon } from '../../CustomIcon';
import { useVideoTime } from '../../../hooks';
import config from '../../../services';
import Image from '../../Image';
import images from '../../../assets/images';
import Button from '../../Button';

const cx = classNames.bind(styles);

function PhonePreviewVideo({
    stateFiles,
    stateCaption,
    stateVideo,
    user,
    state,
    stateUpload,
    stateDataLoading,
    handleDiscardFile,
}) {
    const videoRef = useRef();
    const inputRef = useRef();

    const [isFile, setIsFile] = stateFiles;
    const [captionValue, setCaptionValue] = stateCaption;
    const [isPlay, setIsPlay] = stateVideo;
    const [isUploading, setIsUploading] = stateUpload;
    const [maxValue, setMaxValue] = state;
    const [dataLoading, setDataLoading] = stateDataLoading;

    const [muteVideo, setMuteVideo] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const [percentsValue, setPercentsValue] = useState(0);

    const currentTime = useVideoTime(currentValue);
    const durationTime = useVideoTime(maxValue);

    const handlePlayVideo = () => {
        setIsPlay((prev) => (!prev ? videoRef.current.play() : videoRef.current.pause()));
    };

    const handleMuteVideo = () => {
        setMuteVideo((prev) => (!prev ? (videoRef.current.muted = true) : (videoRef.current.muted = false)));
    };

    useEffect(() => {
        setCurrentValue(0);
        setPercentsValue(0);
        setMuteVideo(false);

        const handleLoadeddata = () => {
            const duration = videoRef.current.duration;

            setMaxValue(duration);
        };

        const handleUpdateTime = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;
                const duration = videoRef.current.duration;

                setCurrentValue(currentTime);
                setPercentsValue((currentTime / duration) * 100);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('loadeddata', handleLoadeddata);
            videoRef.current.addEventListener('timeupdate', handleUpdateTime);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadeddata', handleLoadeddata);
                videoRef.current.removeEventListener('timeupdate', handleUpdateTime);
            }
        };
    }, [isFile]);

    // useEffect(() => {
    //     !isFile && (videoRef.current.currentTime = 0);
    // }, [isFile]);

    const handleEndedVideo = () => {
        setIsPlay(false);
    };

    const handleSelectFiles = () => {
        inputRef.current.click();
    };

    const hanleCreateUrlFile = (e) => {
        const file = e.target.files[0];

        if (e.target.files.length > 0) {
            setIsUploading(true);
            setCaptionValue(file.name);

            const reader = new FileReader();

            reader.onload = (event) => {
                setTimeout(async () => {
                    try {
                        const base64 = event.target.result;

                        const blobUrl = await config.Base64Convert(base64, 'video/mp4');

                        setIsFile(blobUrl);
                    } catch (error) {
                        console.error(error);
                    }
                }, 1500);
            };

            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentLoaded = Math.round((event.loaded / event.total) * 100);
                    setDataLoading(percentLoaded);
                }
            };

            reader.readAsDataURL(file);
        } else {
            return;
        }
    };

    return (
        <div className={cx('preview')}>
            {isFile ? (
                <div className={cx('preview-video')}>
                    <div className={cx('phone-preview')}>
                        <div className={cx('phone-notch')}></div>
                        <div className={cx('header-title-phone')}>
                            <Image className={cx('logo-img')} src={images.LiveLogo} alt="logo" />
                            <p className={cx('title')}>Following</p>
                            <p
                                className={cx('title', {
                                    separate: true,
                                })}
                            >
                                For You
                            </p>
                            <Image className={cx('logo-img')} src={images.SearchLogo} alt="logo" />
                        </div>
                        <div className={cx('video-overlay')}>
                            <div className={cx('sidebar-vertical')}>
                                <div className={cx('sidebar-content')}>
                                    <div className={cx('avatar-info')}>
                                        <Image src={user.avatar} alt="avatar" />
                                    </div>
                                    <div className={cx('video-info')}>
                                        <Image src={images.SidebarActions} alt="avatar" />
                                    </div>
                                    <div
                                        className={cx('avatar-info', {
                                            'cd-thumb-rotate': true,
                                            'animate-stop': !isPlay,
                                        })}
                                    >
                                        <Image src={user.avatar} alt="avatar" />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('sidebar-horizontal')}>
                                <p className={cx('nickname')}>@{user.nickname}</p>
                                <p className={cx('caption')}>{captionValue.split('.')[0]}</p>
                                <div className={cx('music-info')}>
                                    <div className={cx('music-logo')}>
                                        <Image src={images.MusicLogo} alt="logo" />
                                    </div>
                                    <div className={cx('music-text')}>
                                        <div
                                            className={cx('show-music', {
                                                'music-animation-running': true,
                                                'animate-stop': !isPlay,
                                            })}
                                        >
                                            <p className={cx('name-music')}>
                                                Nhạc nền - {user.first_name + ' ' + user.last_name} <span>&nbsp;</span>
                                            </p>
                                            <p className={cx('name-music')}>
                                                Nhạc nền - {user.first_name + ' ' + user.last_name} <span>&nbsp;</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('layout-phone')}>
                            <div className={cx('layout-tabs')}></div>
                        </div>
                        <div className={cx('controller')}>
                            <div className={cx('controller-video')}>
                                <div className={cx('actions-control')}>
                                    <div className={cx('action')}>
                                        <div>
                                            <PlayVideo
                                                onClick={handlePlayVideo}
                                                isPlay={isPlay}
                                                width="1.6rem"
                                                heigth="1.6rem"
                                            />
                                        </div>
                                        <p className={cx('time')}>
                                            00:{currentTime.minutes}:{currentTime.seconds} <span> / </span> 00:
                                            {durationTime.minutes}:{durationTime.seconds}
                                        </p>
                                    </div>
                                    <div>
                                        <VolumeVideo
                                            isMute={muteVideo}
                                            onClick={handleMuteVideo}
                                            width="1.6rem"
                                            heigth="1.6rem"
                                        />
                                    </div>
                                </div>
                                <div className={cx('slider-control')}>
                                    <input
                                        className={cx('input-slider')}
                                        type="range"
                                        readOnly
                                        value={currentValue}
                                        min={0}
                                        max={maxValue}
                                    />
                                    <div style={{ left: `${percentsValue}%` }} className={cx('slider-thumb')}></div>
                                    <div style={{ width: `${percentsValue}%` }} className={cx('slider-progress')}></div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('phone-video')}>
                            <div className={cx('card-video')}>
                                <video
                                    ref={videoRef}
                                    onEnded={handleEndedVideo}
                                    className={cx('video')}
                                    src={isFile}
                                    preload="auto"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('change-video')}>
                        <p className={cx('caption-card')}>{captionValue}</p>
                        <Button onClick={handleDiscardFile} className={cx('btn-change')}>
                            Change video
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={cx('card-form')}>
                    {!isUploading ? (
                        <Fragment>
                            <input
                                onInput={hanleCreateUrlFile}
                                className={cx('input-select')}
                                ref={inputRef}
                                type="file"
                                accept="video/*"
                                multiple
                            />
                            <div onClick={handleSelectFiles} className={cx('form-file-select')}>
                                <UploadIcon className={cx('upload-icon')} />
                                <h1 className={cx('select-title')}>Select video to upload</h1>
                                <div className={cx('text-sub')}>
                                    <span className={cx('text-upload')}>Drags and drop files</span>
                                </div>
                                <div className={cx('text-video-infor')}>
                                    <span className={cx('text-upload')}>
                                        Support mp4, avi, webm and mov video formats
                                    </span>
                                    <span className={cx('text-upload')}>720x1280 resolution or higher</span>
                                    <span className={cx('text-upload')}>Up to 10 minutes</span>
                                    <span className={cx('text-upload')}>Less than 10 GB</span>
                                    <span className={cx('text-upload')}>Less than 30 videos</span>
                                </div>
                                <Button className={cx('btn-select-file')} large primary>
                                    Select files
                                </Button>
                            </div>
                        </Fragment>
                    ) : (
                        <div
                            className={cx('uploading-file', {
                                'form-file-select': true,
                            })}
                        >
                            <div className={cx('circle-progess-uploading')}>
                                <span className={cx('total')}></span>
                                <span
                                    style={{
                                        background: `conic-gradient(rgba(254, 44, 85, 1) ${dataLoading}%, #1618231f ${dataLoading}%)`,
                                    }}
                                    className={cx('progress')}
                                ></span>
                                <span className={cx('count-loading')}>{dataLoading + '%'}</span>
                            </div>
                            <div className={cx('info-loading')}>
                                <h1 className={cx('title-loading')}>Uploading...{captionValue}</h1>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PhonePreviewVideo;

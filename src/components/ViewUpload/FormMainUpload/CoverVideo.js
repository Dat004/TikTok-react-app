import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormMainUpload.module.scss';

import config from '../../../services';
import Image from '../../Image';

const cx = classNames.bind(styles);

function CoverVideo({ src, stateList, stateValue, stateTimeThumbnail }) {
    const canvasRef = useRef();
    const videoRef = useRef();
    const videoFormRef = useRef();
    const thumbnailRef = useRef();

    // const [captureLeakVideo, setCaptureLeakVideo] = state;
    const [listThumbnails, setListThumbnails] = stateList;
    const [maxValue, setMaxValue] = stateValue;
    const [setCaptureTimeLeakVideo] = stateTimeThumbnail;

    const [changeValue, setChangeValue] = useState(0);
    // const [numberThumbnails, setNumberThumbnails] = useState([]);

    const handleCapture = () => {
        canvasRef.current.width = videoFormRef.current.videoWidth;
        canvasRef.current.height = videoFormRef.current.videoHeight;

        canvasRef.current
            .getContext('2d')
            .drawImage(videoFormRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        const imageUrl = canvasRef.current.toDataURL('image/jpeg', 1.0);

        return imageUrl;
    };

    useEffect(() => {
        let timeInterval;
        let timeOut;

        const handleCaptureFps = () => {
            if (videoFormRef.current) {
                const duration = videoFormRef.current.duration;
                let numberThumbnails = parseFloat(duration / 8);
                const prevValue = numberThumbnails;

                videoFormRef.current.currentTime = 0;

                setMaxValue(duration);

                timeOut = setTimeout(() => {
                    timeInterval = setInterval(async () => {
                        try {
                            if (numberThumbnails <= duration) {
                                const urlCapture = handleCapture();

                                const blobUrl = await config.Base64Convert(urlCapture, 'image/jpeg');

                                setListThumbnails((prev) => [...prev, blobUrl]);

                                numberThumbnails += prevValue;

                                videoFormRef.current.currentTime = numberThumbnails;
                            } else {
                                clearInterval(timeInterval);
                                // const urlCapture = await handleCapture();

                                // setCaptureLeakVideo(urlCapture);
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    }, 150);
                }, 250);
            }
        };

        if (videoFormRef.current) {
            videoFormRef.current.addEventListener('loadeddata', handleCaptureFps);
        }

        return () => {
            if (videoFormRef.current) {
                videoFormRef.current.removeEventListener('loadeddata', handleCaptureFps);
            }
            clearInterval(timeInterval);
            clearTimeout(timeOut);
        };
    }, [videoFormRef, src]);

    // useEffect(() => {
    //     if (videoFormRef.current) {
    //         videoFormRef.current.addEventListener('loadedmetadata', () => {
    //             const value = parseFloat(videoFormRef.current.duration / 8);
    //             const duration = videoFormRef.current.duration;

    //             setMaxValue(duration);

    //             let getTime = [];
    //             let count = 0;

    //             for (let i = 0; i < 8; i++) {
    //                 count += value;

    //                 getTime.push(count);
    //             }

    //             setNumberThumbnails(getTime);
    //         });
    //     }

    //     return () => {
    //         if (videoFormRef.current) {
    //             videoFormRef.current.removeEventListener('loadedmetadata', () => {});
    //         }
    //     };
    // }, [src, videoFormRef]);

    const handleChangeValue = (e) => {
        const current = Number(e.target.value);

        setChangeValue(current);
        setCaptureTimeLeakVideo(current);

        videoRef.current.currentTime = current;

        if (current >= maxValue.toFixed(0)) {
            thumbnailRef.current.style.transform = `translateX(600px) scale(1.1, 1.09)`;
        } else {
            thumbnailRef.current.style.transform = `translateX(calc(6 * (${
                videoRef.current.currentTime / videoRef.current.duration
            }) * 100px)) scale(1.1, 1.09)`;
        }
    };

    return (
        <div className={cx('container-items')}>
            <div className={cx('cover-container')}>
                <p className={cx('title-text')}>Cover</p>
                <div className={cx('cover-thumbnail')}>
                    <canvas style={{ display: 'none', visibility: 'hidden', opacity: 0 }} ref={canvasRef} />
                    {src && (
                        <div className={cx('container-thumbnail')}>
                            {/* {numberThumbnails.length > 0 &&
                                numberThumbnails.map((value, index) => (
                                    <div key={index} className={cx('thumnail-generator')}>
                                        <VideoThumbnail
                                            videoUrl={src}
                                            // width={171.5}
                                            // height={300}
                                            snapshotAtTime={value}
                                            thumbnailHandler={(thumbnails) =>
                                                setListThumbnails((prev) => [...prev, thumbnails])
                                            }
                                        />
                                    </div>
                                ))} */}
                            {listThumbnails.length > 0 &&
                                listThumbnails.map((thumb, index) => (
                                    <div key={index} className={cx('list-thumbnail')}>
                                        <Image
                                            className={cx('thumbnail-img', {
                                                'image-layer': true,
                                            })}
                                            src={thumb}
                                            alt="thumbnail"
                                        />
                                    </div>
                                ))}
                        </div>
                    )}
                    {src ? (
                        <div className={cx('chosen-container')}>
                            <div className={cx('chosen')}>
                                <input
                                    onChange={handleChangeValue}
                                    className={cx('input-chosen')}
                                    type="range"
                                    value={changeValue}
                                    min={0}
                                    max={maxValue.toFixed(0)}
                                    step={0.5}
                                />
                                <div ref={thumbnailRef} className={cx('video-around')}>
                                    <video className={cx('video-thumbnail')} ref={videoRef} src={src} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('emty-container')}></div>
                    )}
                </div>
                <video style={{ display: 'none' }} ref={videoFormRef} src={src} />
            </div>
        </div>
    );
}

export default CoverVideo;

// const handleCapture = () => {
//     canvasRef.current.width = 85.75;
//     canvasRef.current.height = 150;

//     canvasRef.current
//         .getContext('2d')
//         .drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

//     const imageUrl = canvasRef.current.toDataURL();

//     return imageUrl;
// };

// useEffect(() => {
//     const handleCaptureFps = () => {
//         const duration = videoRef.current.duration;
//         let numberThumbnails = parseFloat(duration / 8);
//         const prevValue = numberThumbnails;

//         setMaxValue(duration);

//         const timeInterval = setInterval(async () => {
//             if (videoRef.current.readyState > 2) {
//                 if (numberThumbnails <= duration) {
//                     const urlCapture = await handleCapture();

//                     setListThumbnails((prev) => [...prev, urlCapture]);

//                     numberThumbnails += prevValue;

//                     videoRef.current.currentTime = numberThumbnails;
//                 } else {
//                     videoRef.current.currentTime = 0;

//                     const urlCapture = await handleCapture();

//                     setCaptureLeakVideo(urlCapture);

//                     clearInterval(timeInterval);
//                 }
//             }
//         }, 120);

//         return () => {
//             clearInterval(timeInterval);
//         };
//     };

//     if (videoRef.current) {
//         videoRef.current.addEventListener('loadeddata', handleCaptureFps);
//     }

//     return () => {
//         if (videoRef.current) {
//             videoRef.current.removeListener('loadeddata', handleCaptureFps);
//         }
//     };
// }, []);

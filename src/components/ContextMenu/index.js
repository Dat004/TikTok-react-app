import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ContextMenu.module.scss';

import { DeltailICon, DownloadIcon, LinkSmallIcon, PictureInPictureIcon, SendIcon } from '../CustomIcon';
import { UserAuth, UserNotify, UserVideo } from '../Store';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

// const DATA_MENU = [
//     {
//         icon: <DownloadIcon />,
//         type: 'menu',
//         title: 'Download video',
//         isHandle: true,
//         onHandle: () => {},
//     },
//     {
//         icon: <SendIcon />,
//         type: 'menu',
//         title: 'Send friend',
//         isHandle: false,
//     },
//     {
//         icon: <LinkSmallIcon />,
//         type: 'menu',
//         title: 'Copy link video',
//         isHandle: true,
//         onHandle: () => {},
//     },
//     {
//         icon: <DeltailICon />,
//         type: 'menu',
//         title: 'See detail video',
//         isHandle: true,
//         onHandle: () => {
//             setInfoNotify();
//         },
//     },
// ];

function ContextMenu({ idVideo, positionX, positionY, fileName, mimeType }) {
    const navigate = useNavigate();

    const { setInfoNotify } = UserNotify();

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href + 'video' + '/' + idVideo);

            setInfoNotify({
                content: 'Copied text!',
                delay: 1500,
                isNotify: true,
            });
        } catch (err) {
            setInfoNotify({
                content: 'Unable to copy text. Try again later!',
                delay: 1500,
                isNotify: true,
            });
        }
    };

    const handleDownload = () => {
        setInfoNotify({
            content: 'Feature temporarily unavailable.',
            delay: 1500,
            isNotify: true,
        });
    };

    const handleSeeDetailVideo = () => {
        navigate(`/video/${idVideo}`);
    };

    return (
        <div style={{ top: positionY, left: positionX }} className={cx('wrapper-menu')}>
            <ul className={cx('list-menu')}>
                <li onClick={handleDownload} className={cx('list-item')}>
                    <DownloadIcon />
                    <span className={cx('title-menu')}>Download video</span>
                </li>
                <li onClick={null} className={cx('list-item')}>
                    <SendIcon />
                    <span className={cx('title-menu')}>Send friend</span>
                </li>
                <li onClick={handleCopyLink} className={cx('list-item')}>
                    <LinkSmallIcon />
                    <span className={cx('title-menu')}>Copy link video</span>
                </li>
                <li onClick={handleSeeDetailVideo} className={cx('list-item')}>
                    {/* {isDetail ? <PictureInPictureIcon /> : <DeltailICon />}
                    <span className={cx('title-menu')}>{isDetail ? 'Picture-in-picture' : 'See detail video'}</span> */}
                    <DeltailICon />
                    <span className={cx('title-menu')}>See detail video</span>
                </li>
            </ul>
        </div>
    );
}

export default ContextMenu;

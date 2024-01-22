import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ContextMenu.module.scss';

import { DeltailICon, DownloadIcon, LinkSmallIcon, PictureInPictureIcon, SendIcon } from '../CustomIcon';
import { UserAuth, UserNotify } from '../Store';

const cx = classNames.bind(styles);

function ContextMenu({ idVideo, positionX, positionY, fileName = '', mimeType = '' }) {
    const navigate = useNavigate();
    const location = useLocation();

    const pathName = `/video/${idVideo}`;

    const { openFullVideo, setOpenFullVideo } = UserAuth();
    const { setInfoNotify } = UserNotify();

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText();

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
        if (openFullVideo) {
            setOpenFullVideo(false);
        }

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
                <li onClick={location.pathname === pathName ? null : handleSeeDetailVideo} className={cx('list-item')}>
                    {location.pathname === pathName ? <PictureInPictureIcon /> : <DeltailICon />}
                    <span className={cx('title-menu')}>
                        {location.pathname === pathName ? 'Picture-in-picture' : 'See detail video'}
                    </span>
                </li>
            </ul>
        </div>
    );
}

ContextMenu.propTypes = {
    idVideo: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    fileName: PropTypes.string,
    mimeType: PropTypes.string,
};

export default ContextMenu;

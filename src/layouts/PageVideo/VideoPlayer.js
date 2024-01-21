import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PageVideo.module.scss';

import PicutureInPicture from '../../components/PicutureInPicture';
import ContextMenu from '../../components/ContextMenu';

const cx = classNames.bind(styles);
function VideoPlayer({ data = {} }) {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    const [isContextMenu, setIsContextMenu] = useState(false);

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
        };
    }, [isContextMenu]);

    const backgroundStyle = {
        backgroundImage: `url(${data.thumb_url})`,
        backgroundRepeat: 'no-repeat',
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
            {/* <div className={cx('videoplayer-ended')}>
                <Button className={cx('play-again')}>
                    <LoopIcon />
                </Button>
            </div> */}
            <PicutureInPicture data={data} />
        </div>
    );
}

VideoPlayer.propTypes = {
    data: PropTypes.object.isRequired,  
};

export default VideoPlayer;

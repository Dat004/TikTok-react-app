import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Control.module.scss';

import { VolumeIcon, VolumeMuteIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

function VolumeVideo({ isMute = false, onClick = () => {}, className, width, height }) {
    return (
        <div
            onClick={onClick}
            className={cx('control-wrapper', {
                [className]: className,
            })}
        >
            {isMute ? <VolumeMuteIcon width={width} height={height} /> : <VolumeIcon width={width} height={height} />}
        </div>
    );
}

VolumeVideo.propTypes = {
    isMute: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default VolumeVideo;

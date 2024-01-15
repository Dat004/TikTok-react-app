import classNames from 'classnames/bind';
import styles from './Control.module.scss';
import { VolumeIcon, VolumeMuteIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

function VolumeVideo({ isMute, onClick, className, width, height }) {
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

export default VolumeVideo;

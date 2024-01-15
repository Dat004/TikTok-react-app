import classNames from 'classnames/bind';
import styles from './Control.module.scss';
import { PauseIcon, PlayIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

function PlayVideo({ isPlay, onClick, className, width, heigth }) {
    return (
        <div
            onClick={onClick}
            className={cx('control-wrapper', {
                [className]: className,
            })}
        >
            {isPlay ? <PauseIcon width={width} height={heigth} /> : <PlayIcon width={width} height={heigth} />}
        </div>
    );
}

export default PlayVideo;

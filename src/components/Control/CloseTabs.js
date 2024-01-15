import classNames from 'classnames/bind';
import styles from './Control.module.scss';
import { CloseIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

function CloseTabs({ onClick, className, width, height }) {
    return (
        <div
            onClick={onClick}
            className={cx('control-wrapper', {
                [className]: className,
            })}
        >
            <CloseIcon width={width} height={height} />
        </div>
    );
}

export default CloseTabs;

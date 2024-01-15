import React from 'react';
import classNames from 'classnames/bind';
import styles from './Control.module.scss';
import { FullScreenIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

const FullSCreenVideos = React.forwardRef(({ onClick, className }, ref) => {
    return (
        <div
            onClick={onClick}
            className={cx('control-wrapper', {
                [className]: className,
            })}
            ref={ref}
        >
            <FullScreenIcon />
        </div>
    );
});

export default FullSCreenVideos;

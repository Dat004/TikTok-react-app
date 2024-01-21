import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Control.module.scss';

import { FullScreenIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

const FullSCreenVideos = React.forwardRef(({ onClick = () => {}, className }, ref) => {
    return (
        <div
            ref={ref}
            onClick={onClick}
            className={cx('control-wrapper', {
                [className]: className,
            })}
        >
            <FullScreenIcon />
        </div>
    );
});

FullSCreenVideos.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    ref: PropTypes.node,
};

export default FullSCreenVideos;

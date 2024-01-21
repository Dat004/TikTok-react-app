import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Control.module.scss';

import { CloseIcon } from '../CustomIcon';

const cx = classNames.bind(styles);

function CloseTabs({ onClick = () => {}, className, width, height }) {
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

CloseTabs.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default CloseTabs;

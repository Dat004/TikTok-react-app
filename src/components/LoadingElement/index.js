import classNames from 'classnames/bind';
import styles from './LoadingElement.module.scss';

const cx = classNames.bind(styles);

function LoadingElement({ className, width, height, borderRadius }) {
    return (
        <div
            style={{ width: width, height: height, borderRadius: borderRadius }}
            className={cx('load', {
                [className]: true,
            })}
        ></div>
    );
}

export default LoadingElement;

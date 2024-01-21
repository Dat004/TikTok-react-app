import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ButtonActions.module.scss';

const cx = classNames.bind(styles);

function ButtonActions({ data = [] }) {
    return (
        <div className={cx('container-actions')}>
            {data.map((items, index) => (
                <button key={index} className={cx('actions-btn')}>
                    <span className={cx('icon-btn')}>{items.icon}</span>
                    <span>{items.data}</span>
                </button>
            ))}
            {/* <button className={cx('actions-btn')}>
                <span className={cx('icon-btn')}>
                    <CommentIcon />
                </span>
                <span>28.5K</span>
            </button>
            <button className={cx('actions-btn')}>
                <span className={cx('icon-btn')}>
                    <FavouriteIcon />
                </span>
                <span>386.2K</span>
            </button>
            <button className={cx('actions-btn')}>
                <span className={cx('icon-btn')}>
                    <ShareIcon />
                </span>
                <span>48.9k</span>
            </button> */}
        </div>
    );
}

ButtonActions.propTypes = {
    data: PropTypes.array,
};

export default ButtonActions;

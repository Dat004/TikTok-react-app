import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { CommentIcon, FavouriteIcon, LoveIcon, ShareIcon } from '../../CustomIcon';
import { UserAuth, UserVideo } from '../../Store';
import Button from '../../Button';

const cx = classNames.bind(styles);

function VideoActions({ data = {}, index }) {
    const { setOpenFullVideo } = UserAuth();
    const { setPositionVideo } = UserVideo();

    const handleOpenFormFullVideo = () => {
        setOpenFullVideo(true);
        setPositionVideo(index);
    };

    return (
        <div className={cx('container-actions')}>
            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')}>
                    <LoveIcon />
                </Button>
                <p className={cx('info-count')}>{data?.likes_count}</p>
            </div>
            <div className={cx('actions-item')}>
                <Button onClick={handleOpenFormFullVideo} className={cx('btn-action')}>
                    <CommentIcon />
                </Button>
                <p className={cx('info-count')}>{data?.comments_count}</p>
            </div>
            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')}>
                    <FavouriteIcon />
                </Button>
                <p className={cx('info-count')}>{data?.likes_count}</p>
            </div>
            <div className={cx('actions-item')}>
                <Button className={cx('btn-action')}>
                    <ShareIcon />
                </Button>
                <p className={cx('info-count')}>{data?.shares_count}</p>
            </div>
        </div>
    );
}

VideoActions.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
};

export default VideoActions;

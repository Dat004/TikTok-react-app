import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Button from '../../Button';
import Image from '../../Image';
import { CheckIcon } from '../../CustomIcon';
import { UserAuth } from '../../Store';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountPreview({ data = {} }) {
    const { userAuth } = UserAuth();

    return (
        <div className={cx('account-preview')}>
            <div className={cx('account-header')}>
                <Link to={`/@${data.nickname}`} className={cx('avatar')}>
                    <Image src={data.avatar} alt="abc" fallback={data.avatar} />
                </Link>
                {userAuth.id !== data?.id && (
                    <Button outline medium className={cx('btn-follow')}>
                        {data?.is_followed ? 'Following' : 'Follow'}
                    </Button>
                )}
            </div>
            <div className={cx('content')}>
                <Link to={`/@${data.nickname}`} className={cx('nickname')}>
                    <span>{data.nickname}</span>
                    <span className={cx('icon')}>{data.tick && <CheckIcon />}</span>
                </Link>
                <span className={cx('username')}>{`${data.first_name} ${data.last_name}`}</span>
                <div className={cx('data')}>
                    <p className={cx('followers')}>
                        <strong>{data.followers_count}</strong>
                        <span>Followers</span>
                    </p>
                    <p className={cx('likes')}>
                        <strong>{data.likes_count}</strong>
                        <span>Likes</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

AccountPreview.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountPreview;

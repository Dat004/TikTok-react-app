import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Account.module.scss';

import { CheckIcon } from '../CustomIcon';
import Image from '../Image';

const cx = classNames.bind(styles);

function AccountItems({ value = {} }) {
    return (
        <Link to={`/@${value.nickname}`} className={cx('wrapper-account')}>
            <div className={cx('account-item')}>
                <div className={cx('avatar-user')}>
                    <Image className={cx('avatar')} src={value.avatar} alt={value.full_name} />
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        <span>{value.nickname}</span>
                        {value.tick && <CheckIcon className="check" />}
                    </h4>
                    <span className={cx('username')}>{value.full_name}</span>
                </div>
            </div>
        </Link>
    );
}

AccountItems.propTypes = {
    value: PropTypes.object.isRequired,
};

export default AccountItems;

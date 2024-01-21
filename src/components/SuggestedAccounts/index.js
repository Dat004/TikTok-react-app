import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ headingTitle = '', footerTitle = '', data = [], onClick = () => {}, isPreview = false }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, [1000]);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{headingTitle}</p>

            {data.map((account) => (
                <AccountItem key={account.id} value={account} isLoading={isLoading} isPreview={isPreview} />
            ))}

            <p onClick={onClick} className={cx('more-btn')}>
                {footerTitle}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    headingTitle: PropTypes.string.isRequired,
    footerTitle: PropTypes.string.isRequired,
    data: PropTypes.array,
    isPreview: PropTypes.bool,
};

export default SuggestedAccounts;

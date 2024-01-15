import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import LazyLoad from 'react-lazy-load';

import LoadingElement from '../LoadingElement';
import Image from '../Image';
import { CheckIcon } from '../CustomIcon';
import { Wrapper } from '../Popper';
import AccountPreview from './AccountPreview';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function AccountItem({ value, isLoading, isPreview }) {
    const renderPreview = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            {isPreview && (
                <Wrapper className={cx('wrapper-account')}>
                    <AccountPreview data={value} />
                </Wrapper>
            )}
        </div>
    );

    return (
        <div>
            <Tippy interactive delay={[1000, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <Link to={`/@${value.nickname}`} className={cx('account-item')}>
                    {!isLoading ? (
                        <Fragment>
                            <div className={cx('avatar')}>
                                <LazyLoad height="100%">
                                    <Image src={value.avatar} fallback={value.avatar} alt="abc" />
                                </LazyLoad>
                            </div>
                            <div className={cx('infor')}>
                                <p className={cx('nickname')}>
                                    <strong>{value.nickname}</strong>
                                    <span className={cx('icon')}>{value.tick && <CheckIcon />}</span>
                                </p>
                                <p className={cx('username')}>{`${value.first_name} ${value.last_name}`}</p>
                            </div>
                        </Fragment>
                    ) : (
                        <div className={cx('loading-container')}>
                            <LoadingElement className={cx('loading-avatar')} />
                            <div className={cx('loading-info')}>
                                <LoadingElement className={cx('loading-nickname')} />
                                <LoadingElement className={cx('loading-username')} />
                            </div>
                        </div>
                    )}
                </Link>
            </Tippy>
        </div>
    );
}

export default AccountItem;

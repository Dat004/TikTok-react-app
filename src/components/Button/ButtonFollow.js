import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

import { UserAuth } from '../Store';
import Button from '.';
import config from '../../services';

const cx = classNames.bind(styles);

function ButtonFollow({ onClick, className, isFollowed }) {
    const { tokenStr, userAuth, setOpenFormLogin } = UserAuth();

    useEffect(() => {
        // console.log(isFollowed);
    }, [isFollowed]);

    return (
        <div className={cx('container-btn')}>
            {!tokenStr && !userAuth ? (
                <Button onClick={onClick} outline medium>
                    Follow
                </Button>
            ) : (
                <Button className={cx(className)} onClick={onClick} outline medium>
                    {isFollowed ? 'Following' : 'Follow'}
                </Button>
            )}
        </div>
    );
}

export default ButtonFollow;

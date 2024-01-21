import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Menu.module.scss';

import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MenuItem({ title = '', to = '', icon, activeIcon }) {
    return (
        <NavLink
            className={({ isActive }) =>
                cx('menu-item', {
                    'active': isActive,
                })
            }
            to={to}
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('icon-active')}>{activeIcon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;

import { Fragment, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            children,
            to,
            href,
            className,
            primary = false,
            outline = false,
            text = false,
            rounded = false,
            small = false,
            medium = false,
            large = false,
            disabled = false,
            leftIcon,
            rightIcon,
            onKeyDown = () => {},
            onClick = () => {},
            type,
            ...passProps
        },
        ref,
    ) => {
        let Comp = 'button';

        const props = {
            onKeyDown,
            onClick,
            ...passProps,
        };

        if (to) {
            Comp = Link;
            props.to = to;
        } else if (href) {
            Comp = 'a';
            props.href = href;
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary,
            outline,
            text,
            rounded,
            small,
            medium,
            large,
        });

        return (
            <Fragment>
                <Comp
                    ref={ref}
                    className={classes}
                    type={type}
                    disabled={disabled}
                    {...props}
                >
                    {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                    <span className={cx('content')}>{children}</span>
                    {rightIcon}
                </Comp>
            </Fragment>
        );
    },
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    leftIcon: PropTypes.node,
    rigthIcon: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;

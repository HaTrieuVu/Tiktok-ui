import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    className,
    to,
    href,
    children,
    small = false,
    large = false,
    outline = false,
    primary = false,
    rouneded = false,
    text = false,
    disabled = false,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        rouneded,
        text,
        disabled,
        [className]: className,
    });

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    small: PropTypes.bool,
    large: PropTypes.bool,
    outline: PropTypes.bool,
    primary: PropTypes.bool,
    rouneded: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;

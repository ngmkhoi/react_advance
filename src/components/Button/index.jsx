import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

function Button({
    children,
    href,
    to,
    type = 'button',
    primary = false,
    bordered = false,
    rounded = false,
    size = 'medium',
    disabled = false,
    loading = false,
    className,
    onClick,
    leftIcon,
    rightIcon,
    ...passProps
}) {

    let Comp = 'button';

    if (disabled || loading) {
        // Nếu disabled/loading → luôn dùng button/span (không navigate)
        Comp = 'button';
    } else if (to) {
        // ✅ Internal routing → dùng Link (KHÔNG reload)
        Comp = Link;
    } else if (href) {
        // ✅ External link → dùng <a> (reload)
        Comp = 'a';
    }
    
    const classes = clsx(
        styles.btn,
        {
            [styles.primary]: primary,
            [styles.bodered]: bordered,
            [styles.rounded]: rounded,
            [styles[size]]: true,
            [styles.disabled]: disabled,
            [styles.loading]: loading,
        },
        className
    )

    const handleClick = (e) => {
        if(disabled || loading) {
            e.preventDefault();
            e.stopPropagation();
            return;
        };

        onClick && onClick(e);
    }

    const props = {
        className: classes,
        onClick: handleClick,
        ...passProps
    }

    if(Comp === 'button'){
        props.disabled = disabled || loading;
        props.type = type;
    }else if (Comp === Link) {
        // React Router Link props
        props.to = to;
        
        // Nếu disabled, prevent navigation
        if (disabled || loading) {
            props.to = '#';
            props.onClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };
        }
    } else if (Comp === 'a') {
        // External link props
        props.href = href;
        
        if (disabled || loading) {
            props.href = '#';
            props['aria-disabled'] = 'true';
            props.tabIndex = -1;
        }
    }

    return (
        <Comp {...props}>
            {loading && <span className={styles.spinner}></span>}
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </Comp>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,          
    href: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),   
    primary: PropTypes.bool,
    bordered: PropTypes.bool,
    rounded: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
}

export default Button;
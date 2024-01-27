import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Switch.module.scss';

const cx = classNames.bind(styles);

function Switch({
    onCheck = () => {},
    width = '52px',
    height = '24px',
    bgColor = 'rgb(255, 255, 255)',
    bgCircleColor = 'rgb(0, 0, 0)',
}) {
    const switchRef = useRef();
    const switchCircle = useRef();

    const [checked, setChecked] = useState(false);

    const styleSwitch = {
        width: width,
        height: height,
        backgroundColor: bgColor,
    };

    useEffect(() => {
        if (switchRef.current && switchCircle.current) {
            switchCircle.current.style.width = `${switchRef.current.offsetHeight - 2}px`;
            switchCircle.current.style.height = `${switchRef.current.offsetHeight - 2}px`;

            if (checked) {
                switchCircle.current.style.transform = `translateX(${
                    switchRef.current.offsetWidth - switchRef.current.offsetHeight
                }px)`;
            } else {
                switchCircle.current.style.transform = 'translateX(2px)';
            }
        }
    }, [switchRef.current, switchCircle.current, checked]);

    const handleChecked = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div style={styleSwitch} className={cx('switch-container')}>
            <label
                style={{ backgroundColor: bgCircleColor }}
                className={cx('switch-circle')}
                ref={switchCircle}
                htmlFor="switch"
            ></label>
            <input
                ref={switchRef}
                onChange={(e) => {
                    handleChecked(e);
                    onCheck(e.target.checked);
                }}
                className={cx('switch')}
                id="switch"
                name="switch"
                type="checkbox"
            />
        </div>
    );
}

Switch.propTypes = {
    onCheck: PropTypes.func.isRequired,
    width: PropTypes.string,  
    height: PropTypes.string,
    bgColor: PropTypes.string,
    bgCircleColor: PropTypes.string,
};

export default Switch;

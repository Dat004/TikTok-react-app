import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ className, children, widthBox, heigtBox }) {
    return ( <div className={cx('wrapper', {
        [className]: className
    })} style={{width: widthBox, maxHeight: heigtBox}}>{ children }</div> );
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    widthBox: PropTypes.string,
    heigtBox: PropTypes.string,
}

export default Wrapper;
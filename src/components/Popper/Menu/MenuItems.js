import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Menu.module.scss';

import Button from '../../Button';

const cx = classNames.bind(styles);

function MenuItem({ data = {}, className = '', onClick = () => {} }) {
    return (
        <Button className={className} to={data.to} leftIcon={data.icon} onClick={onClick}>
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default MenuItem;

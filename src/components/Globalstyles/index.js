import PropTypes from 'prop-types';
import './Globalstyles.scss';

function Globalstyles({ children }) {
    return children;
}

Globalstyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Globalstyles;

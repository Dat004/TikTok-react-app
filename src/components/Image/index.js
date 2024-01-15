import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import LazyLoad from 'react-lazy-load'

import images from '../../assets/images';

const Image = forwardRef(({ src, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(images.noImage);
    };

    return <img loading='lazy' ref={ref} src={fallback || src} {...props} onError={handleError} />
});

Image.propTypes = {
    src: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;

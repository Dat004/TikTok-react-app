import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

import images from '../../assets/images';

const Image = forwardRef(({ src, alt, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(images.noImage);
    };

    return <img loading='lazy' ref={ref} src={fallback || src} {...props} alt={alt} onError={handleError} />
});

Image.propTypes = {
    src: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;

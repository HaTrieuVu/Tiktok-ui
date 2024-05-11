import { useState, forwardRef } from 'react';
import images from '~/assets/images';

// import styles from './Image.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

const Image = forwardRef(({ src, alt, ...props }, ref) => {
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(images.noImage);
    };

    return <img ref={ref} src={fallBack || src} {...props} alt={alt} onError={handleError} />;
});

export default Image;

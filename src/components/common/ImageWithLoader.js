import React from 'react';
import Loader from './Loader';

const ImageWithLoader = ({
    showLoading,
    className,
    alt,
    src,
    onLoadComplete,
    style
}) => (
    <>
        <img
            onLoad={() => onLoadComplete()}
            alt={alt}
            className={className}
            src={src}
            style={style}
        />
        {showLoading && (
            <div className="r8y-image-absolute-container">
                <div className="w3-display-container" style={{ height: '100%', width: '100%' }}>
                    <div className="w3-display-middle">
                        <Loader style={{ height: '30px', width: '30px' }} />
                    </div>
                </div>
            </div>
        )}
    </>
);

export default ImageWithLoader;

'use client';

import { Loader2 } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div className="loading-wrapper">
            <div className="loading-shadow-wrapper">
                <div className="loading-shadow">
                    <Loader2 className="loading-animation w-10 h-10" />
                    <h2 className="loading-title loading-dots">
                        Working
                    </h2>
                    <p className="loading-description">
                        Hang on a second—we’re getting your Book ready for an Interactive Experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
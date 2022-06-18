import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center py-48 justify-center ">
            <div className="w-14 h-14 border-b-4 border-accent rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;
import React, { JSX } from 'react';
import { CgSpinner } from 'react-icons/cg';

const Loader = (): JSX.Element => {
    return (
        <CgSpinner
            aria-label="spinning-loader"
            className="size-10 animate-spin text-white"
        />
    );
};

export default Loader;

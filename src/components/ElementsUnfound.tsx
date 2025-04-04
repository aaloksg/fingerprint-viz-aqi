import React from 'react';
import { PiMaskSadLight } from 'react-icons/pi';

const DEFAULT_ELEMENTS_TYPE = 'results';

type ElementsUnfoundProps = {
    elementsType?: string;
};

const ElementsUnfound = ({ elementsType }: ElementsUnfoundProps) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <PiMaskSadLight className="size-24 animate-bounce text-white" />
            <p className="text-center text-lg text-white">
                {`No ${elementsType || DEFAULT_ELEMENTS_TYPE} found, please try another query.`}
            </p>
        </div>
    );
};

export default ElementsUnfound;

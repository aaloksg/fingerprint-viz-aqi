import { useState } from 'react';

export type UseStateObjectReturn<T> = {
    value: T;
};

const useStateObject = <T,>(initialValue: T): UseStateObjectReturn<T> => {
    const [state, setState] = useState<T>(initialValue);

    return {
        set value(v: T) {
            setState(v);
        },
        get value(): T {
            return state;
        },
    };
};

export default useStateObject;

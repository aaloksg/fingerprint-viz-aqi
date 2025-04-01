import { createContext } from 'react';

type FingerprintLayout = {
    height: number;
    width: number;
};

const FingerprintLayoutContext = createContext<FingerprintLayout>({
    height: 0,
    width: 0,
});

export default FingerprintLayoutContext;

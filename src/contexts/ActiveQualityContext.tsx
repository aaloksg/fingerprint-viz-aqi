import { createContext } from 'react';

type ActiveQuality = {
    activeQuality: string;
    setActiveQuality: (newQuality: string) => void;
};

const ActiveQualityContext = createContext<ActiveQuality>({
    activeQuality: '',
    setActiveQuality: (): void => {},
});

export default ActiveQualityContext;

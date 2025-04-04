import { type AqiComparativeValue } from '@/definitions/interfaces';
import { JSX, useContext } from 'react';
import FingerprintLayoutContext from '@/contexts/FingerPrintLayoutContext';
import ActiveQualityContext from '@/contexts/ActiveQualityContext';
import { QUALITY_PRINT_WIDTH } from './AqiQuality';
import getColourFromSafetyLevel from '@/utils/getColourFromSafetyLevel';

const TICK_COLOR = '#8b8b8b';

type AqiAxesProps = {
    side: 'left' | 'right';
    data: AqiComparativeValue;
    cx: number;
    cy: number;
    ry: number;
    clipPath: string;
};

const AqiAxes = ({
    side,
    cx,
    cy,
    ry,
    clipPath,
    data,
}: AqiAxesProps): JSX.Element => {
    const strokeColor = getColourFromSafetyLevel(data.value);

    const { activeQuality, setActiveQuality } =
        useContext(ActiveQualityContext);

    const { width } = useContext(FingerprintLayoutContext);
    const lineWidth = width / 2;
    const y = cy + ry;

    return (
        <g
            onPointerEnter={() => setActiveQuality(data.name)}
            onPointerLeave={() => setActiveQuality('')}
            onPointerDown={() => setActiveQuality(data.name)}
            onPointerUp={() => setActiveQuality('')}
        >
            <line
                x1={side === 'left' ? cx - lineWidth : cx}
                x2={side === 'left' ? cx : cx + lineWidth}
                y1={y}
                y2={y}
                stroke={strokeColor}
                strokeOpacity="0"
                strokeWidth={QUALITY_PRINT_WIDTH}
                rx={ry / 2}
                ry={ry}
                clipPath={clipPath}
            ></line>
            <line
                x1={side === 'left' ? cx - lineWidth : cx}
                x2={side === 'left' ? cx : cx + lineWidth}
                y1={y}
                y2={y}
                stroke={data.name === activeQuality ? strokeColor : TICK_COLOR}
                strokeOpacity={
                    !activeQuality || data.name === activeQuality ? 1 : 0.4
                }
                strokeWidth="2"
                strokeDasharray="5,5"
                rx={ry / 2}
                ry={ry}
                clipPath={clipPath}
                className="transition-all duration-500"
            ></line>
        </g>
    );
};

export default AqiAxes;

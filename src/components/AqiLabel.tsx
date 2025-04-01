import { type AqiComparativeValue } from '@/definitions/interfaces';
import { JSX, useContext } from 'react';
import FingerprintLayoutContext from '@/contexts/FingerPrintLayoutContext';
import LabelText from './LabelText';
import ActiveQualityContext from '@/contexts/ActiveQualityContext';

const getColourFromSafetyLevel = (value: number): string => {
    if (value > 300) {
        return '#7e0023';
    }
    if (value > 200) {
        return '#8f3f97';
    }
    if (value > 150) {
        return '#ff0000';
    }
    if (value > 100) {
        return '#ff7e00';
    }
    if (value > 50) {
        return '#ffff00';
    }

    return '#00e400';
};

const TICK_COLOR = '#8b8b8b';
const AQI_LABEL_BUFFER = 40;
const AQI_LABEL_PERC = 0.2;

type AqiLabelProps = {
    side: 'left' | 'right';
    data: AqiComparativeValue;
    cx: number;
    cy: number;
    ry: number;
    clipPath: string;
};

const AqiLabel = ({
    side,
    cx,
    cy,
    ry,
    clipPath,
    data,
}: AqiLabelProps): JSX.Element => {
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
                strokeWidth="12"
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
            {side === 'left' && (
                <LabelText
                    x={Math.max(
                        cx - lineWidth + AQI_LABEL_BUFFER,
                        cx - lineWidth * (1 - AQI_LABEL_PERC)
                    )}
                    y={y}
                    opacity={
                        !activeQuality || data.name === activeQuality ? 1 : 0.4
                    }
                    textColor={data.name === activeQuality ? 'black' : 'white'}
                    bgColor={data.name === activeQuality ? 'white' : 'black'}
                    text={data.name}
                    clipPath={clipPath}
                />
            )}
            <LabelText
                x={side === 'left' ? cx - lineWidth : cx + lineWidth}
                y={y}
                opacity={
                    !activeQuality || data.name === activeQuality ? 1 : 0.4
                }
                textColor={data.name === activeQuality ? 'black' : 'white'}
                bgColor={data.name === activeQuality ? strokeColor : 'none'}
                text={data.value.toFixed(2).split(`.00`)[0]}
                clipPath={clipPath}
                textAnchor={side === 'right' ? 'end' : 'start'}
            />
        </g>
    );
};

export default AqiLabel;

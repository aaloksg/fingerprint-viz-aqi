import { type AqiComparativeValue } from '@/definitions/interfaces';
import { JSX, useContext } from 'react';
import FingerprintLayoutContext from '@/contexts/FingerPrintLayoutContext';
import LabelText from './LabelText';
import ActiveQualityContext from '@/contexts/ActiveQualityContext';
import getColourFromSafetyLevel from '@/utils/getColourFromSafetyLevel';

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

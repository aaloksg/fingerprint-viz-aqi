import { type AqiComparativeData } from '@/definitions/interfaces';
import AqiQuality, { QUALITY_PRINT_WIDTH } from './AqiQuality';
import { JSX, useContext } from 'react';
import FingerprintLayoutContext from '@/contexts/FingerPrintLayoutContext';
import AqiLabel from './AqiLabel';
import AqiAxes from './AqiAxes';

type AqiPrintProps = {
    side: 'left' | 'right';
    data: AqiComparativeData;
};

export const RADIUS_X_FACTOR = 0.6;

const MIN_Y_RADIUS = QUALITY_PRINT_WIDTH / 2;
const PADDING_B = 10;

const AqiPrint = ({ side, data }: AqiPrintProps): JSX.Element => {
    const isLeft = side === 'left';

    const layoutContext = useContext(FingerprintLayoutContext);
    const { height } = layoutContext;
    const width = layoutContext.width / 2;

    const clipPathId = `AqiViz-fingerprint-${side}`;
    const clipPath = `url(#${clipPathId})`;

    const centerX = width;
    const centerY = height / 2;
    const stYRadius = height / 2 - PADDING_B;

    let xRadiusFactor = RADIUS_X_FACTOR;

    if (stYRadius * xRadiusFactor >= width) {
        xRadiusFactor = (0.8 * width) / stYRadius;
    }
    const numQualities = data.data.length;
    // const minRadius = MIN_Y_RADIUS_FACTOR * (height / 2);
    const yDeltaRadius = Math.max(
        (stYRadius - MIN_Y_RADIUS) / numQualities,
        QUALITY_PRINT_WIDTH + PADDING_B
    );

    return (
        <g>
            <clipPath id={clipPathId}>
                <rect
                    x={isLeft ? 0 : width}
                    y="0"
                    height={height}
                    width={width}
                ></rect>
            </clipPath>
            {data?.data.map((quality, index) => (
                <AqiAxes
                    key={`axis-${data.name}-${quality.name}`}
                    data={quality}
                    side={side}
                    cx={centerX}
                    cy={centerY}
                    ry={stYRadius - yDeltaRadius * index}
                    clipPath={clipPath}
                />
            ))}
            {data?.data.map((quality, index) => (
                <AqiQuality
                    key={`quality-${data.name}-${quality.name}`}
                    data={quality}
                    side={side}
                    cx={centerX}
                    cy={centerY}
                    ry={stYRadius - yDeltaRadius * index}
                    clipPath={clipPath}
                    xRadiusFactor={xRadiusFactor}
                />
            ))}
            {data?.data.map((quality, index) => (
                <AqiLabel
                    key={`labels-${data.name}-${quality.name}`}
                    data={quality}
                    side={side}
                    cx={centerX}
                    cy={centerY}
                    ry={stYRadius - yDeltaRadius * index}
                    clipPath={clipPath}
                />
            ))}
        </g>
    );
};

export default AqiPrint;

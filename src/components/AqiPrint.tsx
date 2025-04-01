import { type AqiComparativeData } from '@/definitions/interfaces';
import AqiQuality, { QUALITY_PRINT_WIDTH, RADIUS_X_FACTOR } from './AqiQuality';
import { JSX, useContext } from 'react';
import FingerprintLayoutContext from '@/contexts/FingerPrintLayoutContext';
import AqiLabel from './AqiLabel';

type AqiPrintProps = {
    side: 'left' | 'right';
    data: AqiComparativeData;
};

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
    let stYRadius = height / 2 - PADDING_B;

    if (stYRadius * RADIUS_X_FACTOR > width) {
        stYRadius = width / RADIUS_X_FACTOR;
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
                <AqiLabel
                    key={`${data.name}-${quality.name}`}
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
                    key={`${data.name}-${quality.name}`}
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

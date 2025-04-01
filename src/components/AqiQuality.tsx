import { type AqiComparativeValue } from '@/definitions/interfaces';
import {
    JSX,
    useCallback,
    useContext,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import ActiveQualityContext from '@/contexts/ActiveQualityContext';

const STROKE_WIDTH = 2;
const STROKE_BOUNDS = 10;
export const QUALITY_PRINT_WIDTH = STROKE_WIDTH + STROKE_BOUNDS;

export const RADIUS_X_FACTOR = 0.6;

const getColourFromSafetyLevel = (value: number): string => {
    if (value > 300) {
        return '#cb0000'; // #7e0023
    }
    if (value > 200) {
        return '#8f3f97'; // #660099
    }
    if (value > 150) {
        return '#ff0000'; // #cc0033
    }
    if (value > 100) {
        return '#ff7e00'; // #ff9933
    }
    if (value > 50) {
        return '#ffff00'; // #ffde33
    }

    return '#00e400'; // #009966
};

type AqiQualityProps = {
    side: 'left' | 'right';
    data: AqiComparativeValue;
    cx: number;
    cy: number;
    ry: number;
    clipPath: string;
};

const AqiQuality = ({
    side,
    cx,
    cy,
    ry,
    clipPath,
    data,
}: AqiQualityProps): JSX.Element => {
    const isLeft = side === 'left';
    const strokeColor = getColourFromSafetyLevel(data.value);

    const { activeQuality, setActiveQuality } =
        useContext(ActiveQualityContext);

    const [pathLength, setPathLength] = useState(0);
    const [strokeDasharray, setStrokeDasharray] = useState('');
    const [strokeDashoffset, setStrokeDashoffset] = useState(1);

    const ellipseRef = useRef<SVGEllipseElement>(null);

    const calculateEllipseBorder = useCallback(() => {
        if (!ellipseRef.current) return;
        const newEllipseLength = ellipseRef.current.getTotalLength() / 2;
        setPathLength(newEllipseLength);
        let dasharray, dashoffset;
        if (data.ratio === 1) {
            dasharray = `${newEllipseLength},${newEllipseLength}`;
            dashoffset = isLeft ? -newEllipseLength / 2 : newEllipseLength / 2;
        } else {
            dasharray = `${newEllipseLength * data.ratio},${(2 - data.ratio) * newEllipseLength}`;
            dashoffset = isLeft
                ? -newEllipseLength / 2
                : newEllipseLength * data.ratio - newEllipseLength / 2;
        }

        setStrokeDasharray(dasharray);
        setStrokeDashoffset(dashoffset);
    }, [data.ratio, isLeft]);

    useLayoutEffect(() => {
        calculateEllipseBorder();
    });

    return (
        <g
            onPointerEnter={() => setActiveQuality(data.name)}
            onPointerLeave={() => setActiveQuality('')}
            onPointerDown={() => setActiveQuality(data.name)}
            onPointerUp={() => setActiveQuality('')}
        >
            <ellipse
                cx={cx}
                cy={cy}
                fill="none"
                stroke={strokeColor}
                strokeOpacity={0}
                strokeWidth={QUALITY_PRINT_WIDTH}
                rx={ry * RADIUS_X_FACTOR}
                ry={ry}
                clipPath={clipPath}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
            ></ellipse>
            <ellipse
                ref={ellipseRef}
                cx={cx}
                cy={cy}
                fill="none"
                stroke={strokeColor}
                strokeOpacity={
                    !activeQuality || activeQuality === data.name ? 1 : 0.2
                }
                strokeWidth={STROKE_WIDTH}
                rx={ry * RADIUS_X_FACTOR}
                ry={ry}
                clipPath={clipPath}
                className="transition-all duration-500"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={pathLength * 2}
                style={{
                    transition: 'stroke-dashoffset 1s',
                    strokeDashoffset: strokeDashoffset, // Animate to fully revealed
                }}
            ></ellipse>
        </g>
    );
};

export default AqiQuality;

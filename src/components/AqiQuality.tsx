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
import getColourFromSafetyLevel from '@/utils/getColourFromSafetyLevel';

const STROKE_WIDTH = 2;
const STROKE_BOUNDS = 18;
export const QUALITY_PRINT_WIDTH = STROKE_WIDTH + STROKE_BOUNDS;

type AqiQualityProps = {
    side: 'left' | 'right';
    data: AqiComparativeValue;
    cx: number;
    cy: number;
    ry: number;
    clipPath: string;
    xRadiusFactor: number;
};

const AqiQuality = ({
    side,
    cx,
    cy,
    ry,
    clipPath,
    data,
    xRadiusFactor,
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

    const emphasize = (event: React.PointerEvent): void => {
        event.preventDefault();
        setActiveQuality(data.name);
    };

    const deEmphasize = (event: React.PointerEvent): void => {
        event.preventDefault();
        setActiveQuality('');
    };

    return (
        <g
            onPointerEnter={emphasize}
            onPointerLeave={deEmphasize}
            onPointerDown={emphasize}
            onPointerUp={deEmphasize}
        >
            <ellipse
                cx={cx}
                cy={cy}
                fill="none"
                stroke={strokeColor}
                strokeOpacity={0}
                strokeWidth={QUALITY_PRINT_WIDTH}
                rx={ry * xRadiusFactor}
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
                rx={ry * xRadiusFactor}
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

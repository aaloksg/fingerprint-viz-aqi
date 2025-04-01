import { JSX } from 'react';
import { useResizeDetector } from 'react-resize-detector';

type LabelTextProps = {
    text: string;
    x: number;
    y: number;
    px?: number;
    py?: number;
    clipPath: string;
    textColor?: string;
    bgColor?: string;
    opacity?: number;
    textAnchor?: 'start' | 'end';
};

const DEFAULT_PADDING = 4;

const LabelText = ({
    x,
    y,
    px,
    py,
    text,
    clipPath,
    textColor,
    bgColor,
    opacity,
    textAnchor,
}: LabelTextProps): JSX.Element => {
    const { ref: labelTextRef, height, width } = useResizeDetector();
    const paddingX = px ?? DEFAULT_PADDING;
    const paddingY = py ?? DEFAULT_PADDING;
    const isStartAnchor = textAnchor !== 'end';
    return (
        <g>
            {height && width && (
                <rect
                    x={isStartAnchor ? x : x - width - 2 * paddingX}
                    y={y - paddingY - height / 2}
                    rx="5px"
                    height={height + 2 * paddingY}
                    width={width + 2 * paddingX}
                    fill={bgColor ?? 'none'}
                    fillOpacity={opacity ?? 0.6}
                    strokeWidth={0}
                    clipPath={clipPath}
                    className="transition-all"
                ></rect>
            )}
            <text
                ref={labelTextRef}
                x={x}
                y={y}
                dx={isStartAnchor ? paddingX : -paddingX}
                alignmentBaseline="middle"
                textAnchor={isStartAnchor ? 'start' : 'end'}
                fill={textColor}
                fillOpacity={opacity ?? 1}
                clipPath={clipPath}
                className="font-light cursor-default text-xs sm:text-sm md:text-base lg:text-lg transition-all"
            >
                {text}
            </text>
        </g>
    );
};

export default LabelText;

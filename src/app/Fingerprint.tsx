'use client';

import AqiPrint from '@/components/AqiPrint';
import useFingerPrintLayout from '@/hooks/useFingerprintLayout';
import { JSX, useState } from 'react';
import FingerprintLayoutContext from '@/contexts/FingerPrintLayoutContext';
import ActiveQualityContext from '@/contexts/ActiveQualityContext';
import {
    AqiComparativeValue,
    AqiData,
    ComparativeDataReturn,
} from '@/definitions/interfaces';
import Loader from '@/components/Loader';

type FingerprintProps = {
    leftAqiData: AqiData;
    rightAqiData: AqiData;
};

const Y_AXIS_WIDTH = 3;

const Fingerprint = ({
    leftAqiData,
    rightAqiData,
}: FingerprintProps): JSX.Element => {
    const { svgRef, width, height } = useFingerPrintLayout();

    const [activeQuality, setActiveQuality] = useState('');

    const calculateComparativeData = (): ComparativeDataReturn => {
        const leftData = {
            name: leftAqiData.name,
            data: [] as AqiComparativeValue[],
        };
        const rightData = {
            name: rightAqiData.name,
            data: [] as AqiComparativeValue[],
        };

        const data2Types = Object.keys(rightAqiData.values);
        const dataTypes = Object.keys(leftAqiData.values).filter((dataType) =>
            data2Types.includes(dataType)
        );

        dataTypes.forEach((dataType) => {
            const prop = dataType;
            const val1 = leftAqiData.values[prop] ?? 0;
            const val2 = rightAqiData.values[prop] ?? 0;

            leftData.data.push({
                name: prop,
                value: val1,
                ratio: Math.min(1, val1 / val2),
            });
            rightData.data.push({
                name: prop,
                value: val2,
                ratio: Math.min(1, val2 / val1),
            });
        });

        return [leftData, rightData];
    };

    const [leftData, rightData] = calculateComparativeData();

    return (
        <FingerprintLayoutContext value={{ height, width }}>
            <ActiveQualityContext value={{ activeQuality, setActiveQuality }}>
                {!width || !height || !leftData || !rightData ? (
                    <div
                        ref={svgRef}
                        className="relative w-full h-full flex justify-center items-center"
                    >
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div ref={svgRef} className="relative w-full h-full">
                            <svg width="100%" height="100%" id="ContainerSVG">
                                <defs id="F1DataVisDefs"></defs>
                                <AqiPrint side="left" data={leftData} />
                                <AqiPrint side="right" data={rightData} />

                                {/* Center line */}
                                <line
                                    x1={width / 2}
                                    x2={width / 2}
                                    y1={0}
                                    y2={height}
                                    stroke="white"
                                    strokeOpacity="0.7"
                                    strokeWidth={Y_AXIS_WIDTH}
                                ></line>
                            </svg>
                            {/* <div className="h-full absolute w-0.5 border-l-3 -translate-x-1/2 border-l-white/70 top-0 left-1/2 border-solid" /> */}
                        </div>
                    </>
                )}
            </ActiveQualityContext>
        </FingerprintLayoutContext>
    );
};

export default Fingerprint;

'use client';

import { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

type UseFingerPrintLayoutReturn = {
    svgRef: ReturnType<typeof useResizeDetector>['ref'];
    height: number;
    width: number;
};

const useFingerPrintLayout = (): UseFingerPrintLayoutReturn => {
    const { ref: svgRef, height, width } = useResizeDetector();

    const [fingerprintWidth, setWidth] = useState(0);
    const [fingerprintHeight, setHeight] = useState(0);

    useEffect(() => {
        setWidth(width || 0);
        setHeight(height || 0);
    }, [width, height]);

    return {
        svgRef,
        height: fingerprintHeight,
        width: fingerprintWidth,
    };
};

export default useFingerPrintLayout;

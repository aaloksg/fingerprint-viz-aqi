import { AqiData } from '@/definitions/interfaces';

export const AQI_SAFE_LEVELS = {
    name: 'Safe Levels - extended',
    id: 'ExtendedSafeLevels',
    values: {
        no2: 50,
        pm25: 50,
        pm10: 50,
        o3: 50,
        co: 50,
        so2: 50,
    },
};

export const AQI_DATA: AqiData[] = [
    {
        name: 'Safe Levels',
        id: 'Safe Levels',
        values: { pm25: 50, no2: 50, pm10: 50, o3: 50 },
    },
    {
        name: 'Region 1',
        id: 'Region 1',
        values: {
            pm25: 120,
            no2: 90,
            pm10: 80,
            o3: 30,
        },
    },
    {
        name: 'Region 2',
        id: 'Region 2',
        values: {
            pm25: 60,
            no2: 45,
            pm10: 50,
            o3: 77,
        },
    },
    {
        name: 'Region 3',
        id: 'Region 3',
        values: { pm25: 120, no2: 90, pm10: 80, o3: 30 },
    },
    {
        name: 'Weimar',
        id: 'Weimar',
        values: {
            no2: 11,
            pm25: 7,
            pm10: 11,
            o3: 10,
            co: 297,
            so2: 1,
        },
    },
    AQI_SAFE_LEVELS,
    {
        name: "Schitt's Creek",
        id: "Schitt's Creek",
        values: {
            no2: 54,
            pm25: 34,
            pm10: 66,
            o3: 34,
            co: 77,
            so2: 33,
        },
    },
    {
        name: 'Elmdale',
        id: 'Elmdale',
        values: {
            no2: 78,
            pm25: 120,
            pm10: 170,
            o3: 145,
            co: 343,
            so2: 255,
        },
    },
];

type AqiValues = Partial<Record<string, number>>;

export type AqiComparativeValue = {
    name: string;
    value: number;
    ratio: number;
};

export type AqiData = {
    name: string;
    id: string;
    values: AqiValues;
};

export type AqiComparativeData = {
    name: string;
    data: AqiComparativeValue[];
};

export type ComparativeDataReturn = [AqiComparativeData, AqiComparativeData];

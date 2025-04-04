const getColourFromSafetyLevel = (value: number): string => {
    if (value > 300) {
        return '#7e0023';
    }
    if (value > 200) {
        return '#8f3f97';
    }
    if (value > 150) {
        return '#ff0000';
    }
    if (value > 100) {
        return '#ff7e00';
    }
    if (value > 50) {
        return '#ffff00';
    }

    return '#00e400';
};

export default getColourFromSafetyLevel;

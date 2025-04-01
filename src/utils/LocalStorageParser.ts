type RegionStorage = {
    name: string;
    id: string;
    geo: [number, number];
};

export const LocalStorageParser = {
    region: {
        read: (store?: string): RegionStorage | undefined => {
            if (!store) return undefined;
            const [name, id, lat, long] = store.split('&');
            return !name || !id || !lat || !long
                ? undefined
                : { name, id, geo: [+lat, +long] };
        },
        write: (
            store: Partial<RegionStorage> & Pick<RegionStorage, 'name' | 'id'>
        ): string => {
            return `${store.name}&${store.id}${store.geo ? `&${store.geo[0]}&${store.geo[1]}` : ''}`;
        },
    },
};

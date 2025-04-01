import Fetcher from '@/utils/Fetcher';

export type StationDTO = {
    aqi: string;
    lat: number;
    lon: number;
    station: {
        name: string;
        time: string;
    };
    uid: number;
};

export type SearchStationDTO = {
    aqi: string;
    station: {
        country: string;
        geo: [number, number];
        name: string;
        url: string;
    };
    time: {
        stime: string;
        tz: string;
        vtime: number;
    };
    uid: number;
};

type DailyAqiAvgDTO = {
    avg: number;
    day: string;
    max: number;
    min: number;
};

type IAqiData = Record<string, Record<'v', number>>;

export type LocationAqiDTO = {
    aqi: number;
    idx: number;
    attributions: {
        url: string;
        name: string;
    }[];

    city: {
        geo: [number, number];
        name: string;
        url: string;
        location: string;
    };
    dominentpol: string;
    iaqi: IAqiData;
    time: {
        s: string;
        tz: string;
        v: number;
        iso: string;
    };
    forecast: {
        daily: {
            o3: DailyAqiAvgDTO[];
            pm10: DailyAqiAvgDTO[];
            pm25: DailyAqiAvgDTO[];
            uvi: DailyAqiAvgDTO[];
        };
    };
    debug: {
        sync: string;
    };
};

type FetcherReturns<T> = ReturnType<Fetcher<T>['execute']>;

const AQI_TOKEN = 'd577a785bc98d866dd1360f3cbfaa58de9279dc9';
const MIN_LAT = 0;
const MAX_LAT = 90;
const MIN_LONG = 0;
const MAX_LONG = 180;

const AqiApi = (() => {
    const stationsFetcher = new Fetcher<StationDTO[]>(
        `https://api.waqi.info/v2/map/bounds?latlng=${MIN_LAT},${MIN_LONG},${MAX_LAT},${MAX_LONG}&networks=all&token=${AQI_TOKEN}`,
        { useCache: true }
    );

    const hereFetcher = new Fetcher<LocationAqiDTO>(
        `https://api.waqi.info/feed/here/?token=${AQI_TOKEN}`
    );

    return {
        fetchStations: (): FetcherReturns<StationDTO[]> => {
            return stationsFetcher.execute();
        },

        fetchHere: (): FetcherReturns<LocationAqiDTO> => {
            return hereFetcher.execute();
        },

        searchStation: (query: string): FetcherReturns<SearchStationDTO[]> => {
            const searchFetcher = new Fetcher<SearchStationDTO[]>(
                `https://api.waqi.info/search/?keyword=${query}&token=${AQI_TOKEN}`,
                { useCache: true }
            );
            return searchFetcher.execute();
        },

        fetchStation: (
            cityName: string | number
        ): FetcherReturns<LocationAqiDTO> => {
            const fetcher = new Fetcher<LocationAqiDTO>(
                `https://api.waqi.info/v2/feed/${cityName}/?token=${AQI_TOKEN}`,
                { useCache: true }
            );
            return fetcher.execute();
        },
        fetchGeoStation: ([
            latitude,
            longitude,
        ]: SearchStationDTO['station']['geo']): FetcherReturns<LocationAqiDTO> => {
            const fetcher = new Fetcher<LocationAqiDTO>(
                `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${AQI_TOKEN}`,
                { useCache: true }
            );
            return fetcher.execute();
        },
    };
})();

export default AqiApi;

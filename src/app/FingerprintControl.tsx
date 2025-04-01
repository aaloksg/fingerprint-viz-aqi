'use client';

import { AQI_SAFE_LEVELS } from '@/data/aqi-data';
import { type AqiData } from '@/definitions/interfaces';
import { JSX, useCallback, useEffect, useState } from 'react';
import AqiApi, { SearchStationDTO } from '@/api/AqiApi';
import { useLocalStorage } from 'react-use';
import Fingerprint from './Fingerprint';
import { LocalStorageParser } from '@/utils/LocalStorageParser';
import FingerprintUI from './FingerprintUI';

type SelectedStation = {
    uid: string | number;
    station: {
        name: SearchStationDTO['station']['name'];
        geo?: SearchStationDTO['station']['geo'];
    };
};

const FingerprintControl = (): JSX.Element => {
    const [leftAqiData, setLeftAqiData] = useState<AqiData>({
        name: '',
        id: '',
        values: {},
    });
    const [rightAqiData, setRightAqiData] = useState<AqiData>({
        name: '',
        id: '',
        values: {},
    });

    const [leftRegionStore, setLeftRegionStore] = useLocalStorage(
        'fingerprint-viz-left-region',
        LocalStorageParser.region.write(AQI_SAFE_LEVELS)
    );

    const [rightRegionStore, setRightRegionStore] = useLocalStorage(
        'fingerprint-viz-right-region',
        LocalStorageParser.region.write(AQI_SAFE_LEVELS)
    );

    const handleSetLeftRegion = useCallback(
        (selectedStation: SelectedStation) => {
            const stationId = selectedStation.uid.toString();
            const stationName = selectedStation.station.name;
            const stationGeo = selectedStation.station.geo;
            if (
                stationId === leftAqiData.id ||
                stationName === leftAqiData.name
            )
                return;

            if (!stationId || stationName === AQI_SAFE_LEVELS.name) {
                setLeftAqiData(AQI_SAFE_LEVELS);
                setLeftRegionStore(
                    LocalStorageParser.region.write(AQI_SAFE_LEVELS)
                );
                return;
            }
            const fetchData = async (): Promise<void> => {
                (stationGeo
                    ? AqiApi.fetchGeoStation(stationGeo)
                    : AqiApi.fetchStation(stationId)
                ).then((res) => {
                    if (!res) return;
                    const values = Object.keys(res.iaqi).reduce(
                        (aqiData, key) => ({
                            ...aqiData,
                            [key]: res.iaqi[key].v,
                        }),
                        {}
                    );
                    setLeftAqiData({
                        name: stationName,
                        id: stationId,
                        values,
                    });
                    setLeftRegionStore(
                        LocalStorageParser.region.write({
                            name: stationName,
                            id: stationId,
                            geo: stationGeo,
                        })
                    );
                });
            };
            fetchData();
        },
        [setLeftRegionStore, leftAqiData]
    );

    const handleSetRightRegion = useCallback(
        (selectedStation: SelectedStation) => {
            const stationId = selectedStation.uid.toString();
            const stationName = selectedStation.station.name;
            const stationGeo = selectedStation.station.geo;
            if (
                stationId === rightAqiData.id ||
                stationName === rightAqiData.name
            )
                return;

            if (!stationId || stationName === AQI_SAFE_LEVELS.name) {
                setRightAqiData(AQI_SAFE_LEVELS);
                setRightRegionStore(
                    LocalStorageParser.region.write(AQI_SAFE_LEVELS)
                );
                return;
            }

            const fetchData = async (): Promise<void> => {
                (stationGeo
                    ? AqiApi.fetchGeoStation(stationGeo)
                    : AqiApi.fetchStation(stationId)
                ).then((res) => {
                    if (!res) return;
                    const values = Object.keys(res.iaqi).reduce(
                        (aqiData, key) => ({
                            ...aqiData,
                            [key]: res.iaqi[key].v,
                        }),
                        {}
                    );
                    setRightAqiData({
                        name: stationName,
                        id: stationId,
                        values,
                    });
                    setRightRegionStore(
                        LocalStorageParser.region.write({
                            name: stationName,
                            id: stationId,
                            geo: stationGeo,
                        })
                    );
                });
            };
            fetchData();
        },
        [setRightRegionStore, rightAqiData]
    );

    useEffect(() => {
        if (!leftAqiData.name) {
            const defaultLeft = LocalStorageParser.region.read(leftRegionStore);
            handleSetLeftRegion(
                defaultLeft
                    ? {
                          station: {
                              name: defaultLeft.name,
                              geo: defaultLeft.geo,
                          },
                          uid: defaultLeft.id,
                      }
                    : {
                          station: { name: AQI_SAFE_LEVELS.name },
                          uid: AQI_SAFE_LEVELS.id,
                      }
            );
        }
        if (!rightAqiData.name) {
            const defaultRight =
                LocalStorageParser.region.read(rightRegionStore);
            handleSetRightRegion(
                defaultRight
                    ? {
                          station: {
                              name: defaultRight.name,
                              geo: defaultRight.geo,
                          },
                          uid: defaultRight.id,
                      }
                    : {
                          station: { name: AQI_SAFE_LEVELS.name },
                          uid: AQI_SAFE_LEVELS.id,
                      }
            );
        }
    });

    return (
        <>
            <FingerprintUI
                leftName={leftAqiData.name}
                rightName={rightAqiData.name}
                setLeftRegion={handleSetLeftRegion}
                setRightRegion={handleSetRightRegion}
            >
                <Fingerprint
                    leftAqiData={leftAqiData}
                    rightAqiData={rightAqiData}
                />
            </FingerprintUI>
        </>
    );
};

export default FingerprintControl;

import PopOverOptions, {
    PopOverOption,
} from '../components/inputs/PopOverOptions';
import useStateObject from '@/hooks/useStateObject';
import { JSX, useState, type PropsWithChildren } from 'react';
import AqiApi, { SearchStationDTO } from '@/api/AqiApi';
import { useDebounce } from 'react-use';

type FingerprintUIProps = {
    leftName: string;
    rightName: string;
    setLeftRegion: (selectedOption: SearchStationDTO) => void;
    setRightRegion: (selectedOption: SearchStationDTO) => void;
};

type AqiOption = PopOverOption & {
    data: SearchStationDTO;
};

const FingerprintUI = ({
    setLeftRegion,
    setRightRegion,
    leftName,
    rightName,
    children,
}: PropsWithChildren<FingerprintUIProps>): JSX.Element => {
    const [leftRegions, setLeftRegions] = useState([] as AqiOption[]);
    const [rightRegions, setRightRegions] = useState([] as AqiOption[]);
    const leftQuery = useStateObject('');
    const rightQuery = useStateObject('');

    useDebounce(
        async () => {
            if (!leftQuery.value) {
                setLeftRegions([]);
                return;
            }

            AqiApi.searchStation(leftQuery.value).then((response) => {
                console.log(`Stations found: ${response}`);
                if (!response?.length) {
                    setLeftRegions([]);
                    return;
                }
                setLeftRegions(
                    response.map((station) => ({
                        value: station.station.name,
                        id: station.uid.toString(),
                        data: station,
                    }))
                );
            });
        },
        300,
        [leftQuery.value]
    );

    useDebounce(
        async () => {
            if (!rightQuery.value) {
                setRightRegions([]);
                return;
            }
            AqiApi.searchStation(rightQuery.value).then((response) => {
                if (!response?.length) {
                    setRightRegions([]);
                    return;
                }
                setRightRegions(
                    response.map((station) => ({
                        value: station.station.name,
                        id: station.uid.toString(),
                        data: station,
                    }))
                );
            });
        },
        300,
        [rightQuery.value]
    );

    return (
        <div className="h-full w-full flex flex-col justify-between gap-2 p-4 overflow-hidden">
            <div className="w-full flex justify-around gap-4">
                <div className="grow w-10 max-w-60">
                    <PopOverOptions
                        query={leftQuery}
                        placeholder="Search for a station..."
                        options={leftRegions}
                        select={(option) => setLeftRegion(option.data)}
                    />
                </div>
                <div className="grow w-10 max-w-60">
                    <PopOverOptions
                        query={rightQuery}
                        placeholder="Search for a station..."
                        options={rightRegions}
                        select={(option) => setRightRegion(option.data)}
                    />
                </div>
            </div>
            <div className="w-full h-auto grow flex justify-center items-center">
                {children}
            </div>
            <div className="w-full flex items-start text-base sm:text-lg md:text-xl font-extralight text-blue-400">
                <div className="grow flex justify-center max-w-1/2 text-center ">
                    <span className="pr-4 md:pr-6 lg:pr-10 transition ">
                        {leftName}
                    </span>
                </div>
                <div className="grow flex justify-center max-w-1/2 text-center ">
                    <span className="pl-4 md:pl-6 lg:pl-10 transition">
                        {rightName}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FingerprintUI;

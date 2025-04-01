import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { JSX, useId, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

type DropDownOption = {
    id: string;
    value: string;
};

type DropDownProps = {
    defaultValue?: DropDownOption;
    options: DropDownOption[];
    select: (selectedOption: DropDownOption) => void;
};

const DropDown = ({
    defaultValue,
    options,
    select,
}: DropDownProps): JSX.Element => {
    const id = `dropdown-${useId()}`;
    const [selectedOption, selectOption] = useState<DropDownOption | undefined>(
        defaultValue
    );
    const onOptionSelect = (option: DropDownOption): void => {
        selectOption(option);
        select(option);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="pointer-events-auto inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    {selectedOption?.value ?? ''}
                    <HiChevronDown
                        aria-hidden="true"
                        className="-mr-1 size-5 text-gray-400"
                    />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="pointer-events-auto absolute flex flex-col right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="py-1">
                    {options.map((option) => (
                        <MenuItem key={`${id}-option-${option.id}`}>
                            <button
                                onClick={() => onOptionSelect(option)}
                                className="text-start w-full px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                {option.value}
                            </button>
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    );
};

export default DropDown;

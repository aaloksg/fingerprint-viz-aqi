import { UseStateObjectReturn } from '@/hooks/useStateObject';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import clsx from 'clsx';
import { JSX, useId } from 'react';
import Loader from '../Loader';
import { MdClear } from 'react-icons/md';
import ElementsUnfound from '../ElementsUnfound';

export type PopOverOption = {
    id: string;
    value: string;
};

type DropDownProps<T> = {
    query: UseStateObjectReturn<string>;
    placeholder: string;
    options: T[] | undefined;
    select: (selectedOption: T) => void;
};

const PopOverOptions = <T extends PopOverOption>({
    query,
    placeholder,
    options,
    select,
}: DropDownProps<T>): JSX.Element => {
    const id = `dropdown-${useId()}`;

    const onOptionSelect = (option: T, close: () => void): void => {
        select(option);
        query.value = '';
        close();
    };

    return (
        <Popover>
            {({ open }) => (
                <>
                    <div className={clsx('relative w-full')}>
                        <PopoverButton
                            className={clsx(
                                open ? 'invisible' : '',
                                'relative p-2 pr-8 rounded-lg pointer-events-auto block w-full',
                                'text-start text-sm/6 font-semibold outline-2',
                                'text-white/40 focus-within:text-white/100 focus:text-white/100   hover:text-white/100 ',
                                'outline-white/40 focus-within:outline-white/100 focus:outline-white/100  hover:outline-white/100'
                            )}
                        >
                            {placeholder}
                        </PopoverButton>
                        {open && (
                            <>
                                <input
                                    className={clsx(
                                        'absolute inset-0 left-0 top-0',
                                        'p-2 pr-8 rounded-lg pointer-events-auto w-full',
                                        'text-start text-sm/6 font-semibold outline-2',
                                        'text-white/40 focus-within:text-white/100 focus:text-white/100   hover:text-white/100 ',
                                        'outline-white/40 focus-within:outline-white/100 focus:outline-white/100  hover:outline-white/100'
                                    )}
                                    autoFocus={true}
                                    type="text"
                                    placeholder={placeholder}
                                    value={query.value}
                                    onChange={({ target }) =>
                                        (query.value = target.value)
                                    }
                                ></input>
                                <button
                                    className="group absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                    onPointerDownCapture={() =>
                                        (query.value = '')
                                    }
                                >
                                    <MdClear className="size-4 text-white group-hover:opacity-75" />
                                </button>
                            </>
                        )}
                    </div>

                    <PopoverPanel
                        transition
                        anchor={{ to: 'bottom', gap: 5 }}
                        className="pointer-events-auto transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                    >
                        {({ close }) => (
                            <div
                                className={clsx(
                                    'p-4 overflow-hidden rounded-xl',
                                    '[--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 ',
                                    'bg-black/80',
                                    'transition duration-200 ease-in-out'
                                )}
                            >
                                <div
                                    className={clsx(
                                        ' w-80 max-h-80 max-w-full min-h-64 overflow-y-auto',
                                        'flex flex-row items-center',
                                        options?.length
                                            ? 'flex-wrap'
                                            : query.value.length
                                              ? 'justify-center'
                                              : 'invisible pointer-events-none'
                                    )}
                                >
                                    {(options?.length &&
                                        options.map((option) => (
                                            <button
                                                key={`${id}-option-${option.id}`}
                                                onClick={() =>
                                                    onOptionSelect(
                                                        option,
                                                        close
                                                    )
                                                }
                                                className="text-start px-4 rounded-lg py-2 text-sm text-gray-300 hover:bg-blue-300/30 active:bg-blue-300/30 data-focus:outline-hidden"
                                            >
                                                {option.value}
                                            </button>
                                        ))) ||
                                        (query.value.length &&
                                            ((!options && (
                                                <ElementsUnfound />
                                            )) || <Loader />))}
                                </div>
                            </div>
                        )}
                    </PopoverPanel>
                </>
            )}
        </Popover>
    );
};

export default PopOverOptions;

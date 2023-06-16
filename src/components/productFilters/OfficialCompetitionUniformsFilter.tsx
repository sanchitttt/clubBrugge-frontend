import { FilterAccordian } from ".";
import { useNavigate } from "react-router-dom";
import { CloseIcon, SelectedFilterButton, UnselectedFilterButton } from "../icons";
import { Dispatch, useEffect, useState } from 'react';
import { OfficialCompetitionKit } from "../../pages/ProductDetail";
import { generatePossibleSizes } from "./helper";
// import { useAnimate } from "framer-motion";
// import BlueButton, { BlackButton } from "../buttons";

const mockAvailableUnits = [
    "128",
    "140",
    "152",
    "164",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "4XL",
    "5XL",
    "35-38",
    "39-42",
    "43-46",
    "47-50",
    "128 - JS",
    "149 - JM",
    "152 - JL",
    "164 - JXL",
    "31-34"
];

const mockColors = [
    "blue",
    "black",
    "white",
    "yellow",
    "red"
];

type ValidColors = "blue" | "black" | "white" | "yellow" | "red" | undefined;
type ValidCompetitionKit = 'home' | 'keeper' | 'third' | 'away';
type ValidGenders = 'men' | 'women' | 'kids';

const searchParams = new URLSearchParams(window.location.search);

function OfficialCompetitionUniformsFilter({ data, showMobileFilter, setShowFilter }: { data: OfficialCompetitionKit[], showMobileFilter: boolean, setShowFilter: Dispatch<React.SetStateAction<boolean>> }) {

    const [minPrice, setMinPrice] = useState(() => searchParams.has('minPrice') ? parseInt(searchParams.get('minPrice') ?? '') : 0);
    const [maxPrice, setMaxPrice] = useState(() => searchParams.has('maxPrice') ? parseInt(searchParams.get('maxPrice') ?? '') : 100);
    const [sizes, setSizes] = useState<Record<string, number>>({});
    const navigate = useNavigate();
    // const [scope, animate] = useAnimate();
    const [selectedCompetitionKit, setSelectedCompetitionKit] = useState<ValidCompetitionKit | undefined>(undefined)
    const [selectedSizes, setSelectedSizes] = useState<Set<string>>(() => new Set());
    const [selectedFor, setSelectedFor] = useState<ValidGenders | undefined>(undefined);
    const [selectedColor, setSelectedColor] = useState<ValidColors>(undefined);

    useEffect(() => {
        const newSizes = generatePossibleSizes(data);
        if (newSizes) setSizes(newSizes);
    }, [data])


    return <>
        <div className='w-[300px] mx-[20px] flex flex-col mobile:hidden desktop:flex bg-[#fff]'>
            <div className='greyLine' />
            <FilterAccordian heading='Competition Kit' defaultOpened={true}>
                <div className='flex flex-col gap-[5px] mt-[20px] overflow-hidden'>
                    {['home', 'away', 'third', 'keeper'].map((option, idx) => {
                        const value = searchParams.get('competitionKit');
                        return <div className='flex gap-[10px]' key={idx}>
                            <div className={`w-[20px] h-[20px]`}
                                onClick={() => {
                                    if (value) {
                                        if (value === option) searchParams.delete('competitionKit');
                                        else {
                                            searchParams.set('competitionKit', option);
                                        }
                                    } else {
                                        searchParams.set('competitionKit', option);
                                    }
                                    navigate(`/products/official-competition-uniforms?${searchParams.toString()}`);
                                }}

                            >
                                {searchParams.get('competitionKit') === option ? <SelectedFilterButton /> : <UnselectedFilterButton />}
                            </div>
                            <div className='text-[13px] text-[#2a3548] capitalize'>{option}</div>
                        </div>
                    })}
                </div>
            </FilterAccordian>
            <div className='greyLine mt10' />
            <FilterAccordian heading='Price' defaultOpened={false}>
                <div className='flex items-center justify-between'>
                    <input
                        type='number'
                        onChange={(e) => {
                            setMinPrice(parseInt(e.target.value));
                            searchParams.set('minPrice', e.target.value);
                            const id = setTimeout(() => {
                                navigate(`/products/official-competition-uniforms?${searchParams.toString()}`);
                                clearTimeout(id);
                            }, 500);

                        }}
                        value={minPrice}
                        className='border-[1px] w-[100px] rounded-full p-[5px]'
                    />
                    <div className='text-[24px] font-bold'>-</div>
                    <input
                        type='number'
                        onChange={(e) => {
                            setMaxPrice(parseInt(e.target.value));
                            searchParams.set('maxPrice', e.target.value);
                            const id = setTimeout(() => {
                                navigate(`/products/official-competition-uniforms?${searchParams.toString()}`);
                                clearTimeout(id);
                            }, 1000);
                        }}
                        value={maxPrice}
                        className='border-[1px] w-[100px] bg-white p-[5px] rounded-full'
                    />
                </div>
            </FilterAccordian>
            <div className='greyLine mt10' />
            <FilterAccordian heading='Size' defaultOpened={true}>
                <div className='flex flex-wrap gap-[5px]'>
                    {mockAvailableUnits.map((objKey, idx) => {
                        {/** eslint-disable-next-line @typescript-eslint/ban - ts - comment
                            // @ts-ignore */}
                        let shouldBeBlueBackground;
                        const value = searchParams.get('size');
                        if (!value) shouldBeBlueBackground = false;
                        else {
                            const set = new Set(value.split(','));
                            shouldBeBlueBackground = set.has(objKey)
                        }

                        return <div key={idx} className={` w-[60px] rounded-[3px] border-[1px] h-[40px] text-[12px] flex items-center justify-center ${shouldBeBlueBackground && 'bg-blue text-white'}  ${sizes[objKey] > 0 ? 'text-black border-black hover:bg-blue hover:text-white transition' : 'text-softGrey border-softGrey'}`}
                            onClick={() => {

                                if (!value) searchParams.set('size', objKey);
                                else {
                                    const set = new Set(value.split(','));
                                    if (!set.has(objKey)) {
                                        set.add(objKey);
                                    }
                                    else set.delete(objKey);
                                    if (!set.size) searchParams.delete('size')
                                    else {
                                        const transformedValueToString = Array.from(set).join(',');
                                        searchParams.set('size', transformedValueToString);
                                    }

                                }
                                navigate(`/products/official-competition-uniforms?${searchParams.toString()}`);
                            }}
                        >
                            {objKey}
                        </div>
                    })}
                </div>
            </FilterAccordian>
            <div className='greyLine mt10' />
            <FilterAccordian heading='For' defaultOpened={true}>
                <div className='flex flex-col gap-[5px]'>
                    {['men', 'women', 'kids'].map((gender) => {
                        const value = searchParams.get('gender');
                        return <div className='flex gap-[10px]' key={gender}>
                            <div className={`w-[20px] h-[20px]`}
                                onClick={() => {
                                    if (value) {
                                        if (value === gender) {
                                            searchParams.delete('gender');
                                        }
                                        else {
                                            searchParams.set('gender', gender);
                                        }
                                    }
                                    else {
                                        searchParams.set('gender', gender)
                                    }
                                    navigate(`/products/official-competition-uniforms?${searchParams.toString()}`);
                                }}
                            >
                                {value === gender ? <SelectedFilterButton /> : <UnselectedFilterButton />}
                            </div>
                            <div className='text-[13px] text-[#2a3548] capitalize'>{gender}</div>
                        </div>
                    })}
                </div>
            </FilterAccordian>
            <div className='greyLine mt10' />
            <FilterAccordian heading='Color' defaultOpened={false}>
                <div className='flex flex-col gap-[10px]'>
                    {mockColors.map((color) => {
                        const value = searchParams.get('color');
                        return <div className='flex gap-[10px]' key={color}>
                            <button className={`rounded-full border-[1px] ${value === color ? 'border-blue' : 'border-[#cbcbcb]F'}`} style={{ background: color, width: '28px', height: '28px' }}
                                onClick={() => {
                                    if (value === color) searchParams.delete('color')
                                    else searchParams.set('color', color);
                                    navigate(`/products/official-competition-uniforms?${searchParams.toString()}`);
                                }}
                            >
                            </button>
                            <div className='text-[13px] text-[#2a3548] capitalize'>{color}</div>
                        </div>
                    })}
                </div>
            </FilterAccordian>
        </div>
        {showMobileFilter &&
            <div className='desktop:hidden  overflow-scroll fixed top-[0px] left-[0px] w-[100vw] h-[100vh] bg-black z-[1000] mobile:flex desktop:hidden items-start justify-start pb-[100px]'
                // ref={scope}
            >
                <div className='flex flex-col w-[100%]'>
                    <div className='relative py-[30px] flex items-center justify-center'>
                        <div className='mt-[15px] absolute left-[10px] top-[40%]'
                            style={{ transform: 'translate(0,-100%)' }}
                            onClick={() => setShowFilter(false)}
                        >
                            <CloseIcon />
                        </div>
                        <div className='text-[1.875rem] uppercase text-softWhite bebas'
                        >
                            Filters
                        </div>
                    </div>

                    <FilterAccordian type='blackThemed' heading='Competition Kit' defaultOpened={true}>
                        <div className='flex flex-col gap-[5px] py-[10px] overflow-hidden'>
                            {['home', 'away', 'third', 'keeper'].map((option, idx) => {
                                const value = searchParams.get('competitionKit');
                                return <div className='flex gap-[10px]' key={idx}>
                                    <div className={`w-[20px] h-[20px]`}
                                        onClick={() => {
                                            if (value) {
                                                if (value === option) {
                                                    searchParams.delete('competitionKit')
                                                    setSelectedCompetitionKit(undefined);
                                                }
                                                else {
                                                    searchParams.set('competitionKit', option);
                                                    setSelectedCompetitionKit(option as ValidCompetitionKit);
                                                }
                                            } else {
                                                searchParams.set('competitionKit', option);
                                                setSelectedCompetitionKit(option as ValidCompetitionKit);
                                            }
                                            console.log(searchParams)
                                        }}
                                    >
                                        {searchParams.get('competitionKit') === option || selectedCompetitionKit === option ? <SelectedFilterButton /> : <UnselectedFilterButton />}
                                    </div>
                                    <div className='text-[13px] text-white capitalize'>{option}</div>
                                </div>
                            })}
                        </div>
                    </FilterAccordian>
                    <FilterAccordian type='blackThemed' heading='Price' defaultOpened={false}>
                        <div className='flex items-center justify-around'>
                            <input
                                type='number'
                                onChange={(e) => {
                                    setMinPrice(parseInt(e.target.value));
                                    searchParams.set('minPrice', e.target.value);
                                    const id = setTimeout(() => {
                                        navigate(`/products/official-competition-uniforms?${searchParams.toString()}`);
                                        clearTimeout(id);
                                    }, 500);

                                }}
                                value={minPrice}
                                className='border-[1px] w-[100px] rounded-full p-[5px]'
                            />
                            <div className='text-[24px] font-bold'>-</div>
                            <input
                                type='number'
                                onChange={(e) => {
                                    setMaxPrice(parseInt(e.target.value));
                                    searchParams.set('maxPrice', e.target.value);
                                }}
                                value={maxPrice}
                                className='border-[1px] w-[100px] bg-white p-[5px] rounded-full'
                            />
                        </div>
                    </FilterAccordian>
                    <FilterAccordian heading='Size' defaultOpened={true}>
                        <div className='flex flex-wrap gap-[5px]'>
                            {mockAvailableUnits.map((objKey, idx) => {
                                {/** eslint-disable-next-line @typescript-eslint/ban - ts - comment
                            // @ts-ignore */}

                                let shouldBeBlueBackground;
                                const value = searchParams.get('size');
                                if (!value) shouldBeBlueBackground = false;
                                else {
                                    const set = new Set(value.split(','));
                                    shouldBeBlueBackground = set.has(objKey)
                                }

                                return <div key={idx} className={` w-[60px] rounded-[3px] border-[1px] h-[40px] text-[12px] flex items-center justify-center ${shouldBeBlueBackground || selectedSizes.has(objKey) && 'bg-blue text-white'}  ${sizes[objKey] > 0 ? 'text-softWhite border-softWhite hover:bg-blue hover:text-white transition' : 'text-black border-black'}`}
                                    onClick={() => {

                                        if (!value) {
                                            searchParams.set('size', objKey);
                                        }
                                        else {
                                            const set = new Set(value.split(','));
                                            if (!set.has(objKey)) {
                                                set.add(objKey);
                                            }
                                            else set.delete(objKey);
                                            if (!set.size) searchParams.delete('size')
                                            else {
                                                const transformedValueToString = Array.from(set).join(',');
                                                searchParams.set('size', transformedValueToString);
                                            }
                                        }
                                        if (showMobileFilter) {
                                            if (selectedSizes.has(objKey)) selectedSizes.delete(objKey)
                                            else selectedSizes.add(objKey);
                                            const newSet = new Set(Array.from(selectedSizes));
                                            console.log(newSet)
                                            setSelectedSizes(newSet)
                                        }

                                    }}
                                >
                                    {objKey}
                                </div>
                            })}
                        </div>
                    </FilterAccordian>
                    <FilterAccordian heading='For' defaultOpened={true}>
                        <div className='flex flex-col gap-[5px] py-[10px]'>
                            {['men', 'women', 'kids'].map((gender) => {
                                const value = searchParams.get('gender');
                                return <div className='flex gap-[10px]' key={gender}>
                                    <div className={`w-[20px] h-[20px]`}
                                        onClick={() => {
                                            if (value) {
                                                if (value === gender) {
                                                    searchParams.delete('gender');
                                                }
                                                else {
                                                    searchParams.set('gender', gender);
                                                }
                                            }
                                            else {
                                                searchParams.set('gender', gender)
                                            }
                                            if (showMobileFilter) {
                                                if (selectedFor === gender) setSelectedFor(undefined)
                                                else setSelectedFor(gender as ValidGenders)
                                            }
                                        }}
                                    >
                                        {value === gender || gender === selectedFor ? <SelectedFilterButton /> : <UnselectedFilterButton />}
                                    </div>
                                    <div className='text-[13px] text-softWhite capitalize'>{gender}</div>
                                </div>
                            })}
                        </div>
                    </FilterAccordian>
                    <FilterAccordian heading='Color' defaultOpened={false}>
                        <div className='flex flex-col gap-[10px] py-[10px] mb-[10px]'>
                            {mockColors.map((color) => {
                                const value = searchParams.get('color');
                                return <div className='flex gap-[10px]' key={color}>
                                    <button className={`rounded-full border-[1px] ${value === color || color == selectedColor ? 'border-blue' : 'border-[#cbcbcb]F'}`} style={{ background: color, width: '28px', height: '28px' }}
                                        onClick={() => {
                                            if (value === color) searchParams.delete('color')
                                            else searchParams.set('color', color);
                                            if (showMobileFilter) {
                                                setSelectedColor(color as ValidColors);
                                            }
                                        }}
                                    >
                                    </button>
                                    <div className='text-[13px] text-softWhite capitalize'>{color}</div>
                                </div>
                            })}
                        </div>
                    </FilterAccordian>
                </div >
                <a className="fixed left-[0] bottom-[0px] py-[10px] bg-blue w-[97%] flex items-center justify-center rounded-tl-[30px] rounded-tr-[20px]"
                    href={`/products/official-competition-uniforms?${searchParams.toString()}`}
                    onClick={() => {
                        // setShowFilter(false);
                        // navigate(`/products/official-competition-uniforms?${searchParams.toString()}`)
                        console.log(`${searchParams.toString()}`)
                    }}
                >
                    <button

                        aria-describedby="button"
                        className='relative bg-black w-[80%] text-[20px] text-white uppercase bebas px-[30px] py-[15px] rounded-full flex justify-center items-center uppercase '
                    >
                        Show results ›
                    </button>
                </a>
            </div >
        }
    </>
}

export default OfficialCompetitionUniformsFilter
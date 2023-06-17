import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterAccordian } from ".";
import { Dispatch, SetStateAction } from 'react';

function FanArticlesFilters({ showMobileFilter, setShowFilter }: { showMobileFilter: boolean, setShowFilter: Dispatch<SetStateAction<boolean>> }) {
    const searchParams = new URLSearchParams(window.location.search);
    const [minPrice, setMinPrice] = useState(() => searchParams.has('minPrice') ? parseInt(searchParams.get('minPrice') ?? '') : 0);
    const [maxPrice, setMaxPrice] = useState(() => searchParams.has('maxPrice') ? parseInt(searchParams.get('maxPrice') ?? '') : 100);
    const navigate = useNavigate();


    return (
        <>
            <div className='w-[300px] mx-[20px] flex flex-col mobile:hidden desktop:flex bg-[#fff]'>
                <div className='greyLine mt10' />
                <FilterAccordian heading='Price' defaultOpened={false}>
                    <div className='flex items-center justify-between'>
                        <input
                            type='number'
                            onChange={(e) => {
                                setMinPrice(parseInt(e.target.value));
                                searchParams.set('minPrice', e.target.value);
                                const id = setTimeout(() => {
                                    navigate(`/products/fan-articles?${searchParams.toString()}`);
                                    clearTimeout(id);
                                }, 1000);

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
                                    navigate(`/products/fan-articles?${searchParams.toString()}`);
                                    clearTimeout(id);
                                }, 1000);
                            }}
                            value={maxPrice}
                            className='border-[1px] w-[100px] bg-white p-[5px] rounded-full'
                        />
                    </div>
                </FilterAccordian>
            </div>
            {
                showMobileFilter && <div className='desktop:hidden  overflow-scroll fixed top-[0px] left-[0px] w-[100vw] h-[100vh] bg-black z-[1000] mobile:flex desktop:hidden items-start justify-center  pb-[100px]'>
                    <FilterAccordian heading='Price' defaultOpened={true}>
                        <div className='flex items-center justify-between mx-[15px] py-[10px]'>
                            <input
                                type='number'
                                onChange={(e) => {
                                    setMinPrice(parseInt(e.target.value));
                                    searchParams.set('minPrice', e.target.value);
                                    const id = setTimeout(() => {
                                        navigate(`/products/fan-articles?${searchParams.toString()}`);
                                        clearTimeout(id);
                                    }, 1000);

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
                                        navigate(`/products/fan-articles?${searchParams.toString()}`);
                                        clearTimeout(id);
                                    }, 1000);
                                }}
                                value={maxPrice}
                                className='border-[1px] w-[100px] bg-white p-[5px] rounded-full'
                            />
                        </div>
                    </FilterAccordian>
                    <a className="fixed left-[0] bottom-[0px] py-[10px] bg-blue w-[97%] flex items-center justify-center rounded-tl-[30px] rounded-tr-[20px]"
                        href={`/products/fan-articles?${searchParams.toString()}`}
                        onClick={() => {
                            // setShowFilter(false);
                            // navigate(`/products/official-competition-uniforms?${searchParams.toString()}`)
                            setShowFilter(false)
                        }}
                    >
                        <button

                            aria-describedby="button"
                            className='relative bg-black w-[80%] text-[20px] text-white uppercase bebas px-[30px] py-[15px] rounded-full flex justify-center items-center uppercase '
                        >
                            Show results ›
                        </button>
                    </a>
                </div>
            }
        </>
    )
}

export default FanArticlesFilters
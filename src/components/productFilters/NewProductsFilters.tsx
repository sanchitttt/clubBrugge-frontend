import { useState } from "react";
// import { FanArticles } from "../../pages/ProductDetail"
import { useNavigate } from "react-router-dom";
import { FilterAccordian } from ".";

function NewProductsFilters() {
    const searchParams = new URLSearchParams(window.location.search);
    const [minPrice, setMinPrice] = useState(() => searchParams.has('minPrice') ? parseInt(searchParams.get('minPrice') ?? '') : 0);
    const [maxPrice, setMaxPrice] = useState(() => searchParams.has('maxPrice') ? parseInt(searchParams.get('maxPrice') ?? '') : 100);
    const navigate = useNavigate();


    return (
        <div className='w-[300px] mx-[20px] flex flex-col'>
            <div className='greyLine mt10' />
            <FilterAccordian heading='Price' defaultOpened={false}>
                <div className='flex items-center justify-between'>
                    <input
                        type='number'
                        onChange={(e) => {
                            setMinPrice(parseInt(e.target.value));
                            searchParams.set('minPrice', e.target.value);
                            const id = setTimeout(() => {
                                navigate(`/products/new?${searchParams.toString()}`);
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
                                navigate(`/products/new?${searchParams.toString()}`);
                                clearTimeout(id);
                            }, 1000);
                        }}
                        value={maxPrice}
                        className='border-[1px] w-[100px] bg-white p-[5px] rounded-full'
                    />
                </div>
            </FilterAccordian>
        </div>
    )
}

export default NewProductsFilters
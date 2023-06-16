import { SearchIcon } from "../icons";
import { useState } from 'react';

function SearchBar({ className }: { className: string }) {
    const [text, setText] = useState('');
    return (
        <div className={'flex items-center justify-center bg-black py-[10px] py-[30px]' + className} >
            <div className={'w-[90vw] bg-[#2a3548] rounded-full px-[10px] flex items-center justify-between ' + className}>
                <input
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='text-white bg-[#2a3548] w-[90%] rounded-full  px-[5px]  py-[7.5px] px-[5px]'
                    placeholder="To search"

                />
                <div className=''>
                    <SearchIcon width='20px' />
                </div>
            </div >
        </div>
    )
}

export default SearchBar;
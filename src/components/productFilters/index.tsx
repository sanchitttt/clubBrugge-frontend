import { useAnimate } from "framer-motion";
import { Dispatch, useState } from 'react';
import type { Clothing, FanArticles, OfficialCompetitionKit } from "../../pages/ProductDetail";
import OfficialCompetitionUniformsFilter from "./OfficialCompetitionUniformsFilter";
import ClothingFilters from "./ClothingFilters";
import FanArticlesFilters from "./FanArticlesFilters";
import NewProductsFilters from "./NewProductsFilters";


export type ValidProductFilterType = 'official-competition-uniforms' | 'clothing' | 'fan-articles' | 'collections' | 'new';

interface BaseFilterType {
    type: ValidProductFilterType;
}

interface OfficialCompetitionUniformFilter extends BaseFilterType {
    data: OfficialCompetitionKit[]
}

interface ClothingFilter extends BaseFilterType {
    data: Clothing[]
}

interface FanArticlesFilter extends BaseFilterType {
    data: FanArticles[];
}

type ProductFiltersProps = {
    type: ValidProductFilterType,
    data: OfficialCompetitionUniformFilter | ClothingFilter | FanArticlesFilter,
    showMobileFilter: boolean,
    setShowFilter: Dispatch<React.SetStateAction<boolean>>
}


interface FilterAccordian {
    heading: string,
    children: React.ReactNode,
    defaultOpened: boolean,
    type?: 'blackThemed' | undefined;
}

export function FilterAccordian({ heading, children, defaultOpened }: FilterAccordian) {
    const [scope, animate] = useAnimate()
    const [opened, setOpened] = useState(defaultOpened);
    return (
        <div className={`flex flex-col w-[100%]  my-[10px] mobile:bg-[#2a3548] desktop:bg-[#fff]`}>
            <button className='flex items-center justify-between'
                onClick={() => {
                    setOpened(!opened)
                    if (opened) animate(scope.current, { height: '0px', paddingTop: '0px', paddingBottom: '0px' })
                    else animate(scope.current, { height: 'auto', overflow: 'hidden', paddingTop: '15px', paddingBottom: '15px' })
                }}
            >
                <div className={`text-[15px] mobile:text-softWhite desktop:text-[#2a3548] mobile:ml-[10px] mobile:mt-[10px]`}>{heading}</div>
                {opened ?
                    <svg className='mobile:mr-[30px] mobile:mt-[5px]' viewBox="0 0 24 24" fill="none" width='14px' xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="0" />
                        <g strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m5 16 7-7 7 7" stroke="#0572ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    : <svg className='mobile:mr-[30px] mobile:mt-[5px]' viewBox="0 0 24 24" width='14px' xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="F-Chevron"> <polyline fill="none" id="Down" points="5 8.5 12 15.5 19 8.5" stroke="#0572ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline> </g> </g> </g></svg>}
            </button>
            <div className={`mobile:ml-[10px] flex flex-col gap-[5px] mt-[20px] ${defaultOpened ? '' : 'h-[0px]'} overflow-hidden`} ref={scope}>
                {children}
            </div>
        </div >
    )
}



function ProductFilters({ type, data, showMobileFilter, setShowFilter }: ProductFiltersProps) {
    if (type === 'official-competition-uniforms') {
        return <OfficialCompetitionUniformsFilter setShowFilter={setShowFilter} showMobileFilter={showMobileFilter} data={data as unknown as OfficialCompetitionKit[]} />
    }
    else if (type === 'clothing') {
        return <ClothingFilters data={data as unknown as Clothing[]} />
    }
    else if (type === 'fan-articles') {
        return <FanArticlesFilters />
    }
    else if (type === 'new') {
        return <NewProductsFilters />
    }
    return (
        <div>

        </div>
    )
}

export default ProductFilters;

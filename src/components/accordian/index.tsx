import { useAnimate } from 'framer-motion';
import { useState } from 'react';

interface AccordianProps {
    heading: string,
    children: React.ReactNode,
}

function Accordian({ heading, children }: AccordianProps) {
    const [scope, animate] = useAnimate()
    const [opened, setOpened] = useState(heading === 'Washing Instructions' ? false : true);

    return (
        <div className='flex flex-col w-[100%] my-[10px]'>
            <button className='flex items-center justify-between'
                onClick={() => {
                    setOpened(!opened)
                    if (opened) animate(scope.current, { height: '0px', paddingTop: '0px', paddingBottom: '0px' })
                    else animate(scope.current, { height: 'auto', overflow: 'hidden', paddingTop: '15px', paddingBottom: '15px' })
                }}
            >
                <div className='text-[15px] text-[#2a3548]'>{heading}</div>
                {opened ?
                    <svg viewBox="0 0 24 24" fill="none" width='14px' xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="0" />
                        <g strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m5 16 7-7 7 7" stroke="#0572ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    : <svg viewBox="0 0 24 24" width='14px' xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="F-Chevron"> <polyline fill="none" id="Down" points="5 8.5 12 15.5 19 8.5" stroke="#0572ff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline> </g> </g> </g></svg>}
            </button>
            <div className={`text-[15px] text-[#2a3548] ${heading === 'Washing Instructions' ? 'py-[0px] h-[0]' : 'py-[15px]'} overflow-hidden`} ref={scope}>
                {children}
            </div>
        </div>
    )
}

export default Accordian
import { useEffect, useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { OfficialCompetitionUniforms, Clothing, FanArticles } from './NavLinkDetails';

type Links = 'New' | 'Official competition uniforms' | 'Clothing' | 'Fan Articles' | null;
const links: Links[] = [
    'New',
    'Official competition uniforms',
    'Clothing',
    'Fan Articles'
]

// const spring = {
//     type: "spring",
//     damping: 10,
//     stiffness: 100
// }

function NavLinks() {
    const [hoveredLink, setHoveredLink] = useState<Links>(null);
    const [scope, animate] = useAnimate()

    useEffect(() => {
        document.addEventListener('mousemove', (e) => {
            const expandedNavlink = document.getElementById('navLinkExpandContainer')
            const ele1 = document.getElementById('official-competition-uniforms');
            const ele2 = document.getElementById('clothing');
            const ele3 = document.getElementById('fan-articles');

            if (ele1?.contains(e.target as Node)) {
                console.log('yes');
                setHoveredLink('Official competition uniforms');
                animate(scope.current, { height: '320px', opacity: 1 })
                // expandedNavlink?.classList.add('displayShow');
                // expandedNavlink?.classList.remove('displayHide');
            }
            else if (ele2?.contains(e.target as Node)) {
                setHoveredLink('Clothing');
                animate(scope.current, { height: '320px', opacity: 1 })
                // expandedNavlink?.classList.add('displayShow');
                // expandedNavlink?.classList.remove('displayHide');
            }
            else if (ele3?.contains(e.target as Node)) {
                setHoveredLink('Fan Articles');
                animate(scope.current, { height: '320px', opacity: 1 })
                // expandedNavlink?.classList.add('displayShow');
                // expandedNavlink?.classList.remove('displayHide');
            }
            else if (expandedNavlink?.contains(e.target as Node)) {
                // do nothing
                console.log('yes')
            }
            else {
                if (hoveredLink) setHoveredLink(null);
                animate(scope.current, { height: '0px', opacity: 0 })
                // expandedNavlink?.classList.remove('displayShow');
                // expandedNavlink?.classList.add('displayHide');
            }

        });

        return () => {
            document.removeEventListener('mousemove', (e) => {
                const expandedNavlink = document.getElementById('navLinkExpandContainer')
                const ele1 = document.getElementById('official-competition-uniforms');
                const ele2 = document.getElementById('clothing');
                const ele3 = document.getElementById('fan-articles');

                if (ele1?.contains(e.target as Node)) {
                    console.log('yes');
                    setHoveredLink('Official competition uniforms');
                    animate(scope.current, { height: '320px', opacity: 1 })
                    // expandedNavlink?.classList.add('displayShow');
                    // expandedNavlink?.classList.remove('displayHide');
                }
                else if (ele2?.contains(e.target as Node)) {
                    setHoveredLink('Clothing');
                    animate(scope.current, { height: '320px', opacity: 1 })
                    // expandedNavlink?.classList.add('displayShow');
                    // expandedNavlink?.classList.remove('displayHide');
                }
                else if (ele3?.contains(e.target as Node)) {
                    setHoveredLink('Fan Articles');
                    animate(scope.current, { height: '320px', opacity: 1 })
                    // expandedNavlink?.classList.add('displayShow');
                    // expandedNavlink?.classList.remove('displayHide');
                }
                else if (expandedNavlink?.contains(e.target as Node)) {
                    // do nothing
                    console.log('yes')
                }
                else {
                    if (hoveredLink) setHoveredLink(null);
                    animate(scope.current, { height: '0px', opacity: 0 })
                    // expandedNavlink?.classList.remove('displayShow');
                    // expandedNavlink?.classList.add('displayHide');
                }

            })
        }
    }, []);


    return (
        <>
            <div id='navlinks-container' className='bg-midGrey transition relative w-[100vw]  flex items-center justify-center gap-[25px] mobile:hidden desktop:flex '>
                <div className="flex ">
                    {links.map((link) => {
                        return <a href={`/products/${link?.toLowerCase().split(' ').join('-')}`} key={link} className='navLink-anchor  px-[50px] py-[20px]'
                            id={link?.toLowerCase().split(' ').join('-')}
                        >
                            <div className="navLink text-white text-[15px] new">
                                {link}
                            </div>
                        </a>
                    })}
                </div>
                <motion.div ref={scope} id='navLinkExpandContainer' className=' w-[100vw] bg-black z-[1000] h-[0px] absolute top-[64px] left-[0] flex  items-center justify-center'
                // initial={{ height: '0px' }} animate={{ height: '320px' }}
                // exit={{ height: '0px' }}
                >
                    {hoveredLink === "Official competition uniforms" ? (
                        <OfficialCompetitionUniforms />
                    ) : hoveredLink === "Clothing" ? (
                        <Clothing />
                    ) : hoveredLink === "Fan Articles" ? (
                        <FanArticles />
                    ) : (
                        <></>
                    )}
                </motion.div>
            </div >

        </>
    )
}

export default NavLinks;
import { useAnimate } from 'framer-motion';
import { motion } from 'framer-motion';

export interface ProductCard {
    href: string,
    src: string,
    name: string,
    price: string,
    rating: number,
    totalReviews: number,
    availableUnits?: object
}


function ProductCardV2({ href, src, name, price, rating, totalReviews, availableUnits }: ProductCard) {
    const [scope, animate] = useAnimate();
    return (
        <>
            <motion.a
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                href={href}
                className='w-[100%] flex mobile:flex-row desktop:flex-col mobile:gap-[10px] pointer'
                onMouseOver={() => animate(scope.current, { opacity: 1, y: 0 })} onMouseLeave={() => animate(scope.current, { opacity: 0, y: 5 })}
            >
                <div className='mobile:w-[50vw] mobile:h-[50vw] desktop:w-[20vw] desktop:h-[20vw] overflow-hidden'
                    style={{ clipPath: 'polygon(10% 0,100% 0,100% 0,100% 90%,90% 100%,0 100%,0 100%,0 10%)' }}
                >
                    <img src={src}
                        width='100%' height={'100%'}
                        alt='productPreview'
                    />
                </div>
                <div className='flex flex-col gap-[0px] mobile:w-[50vw] desktop:w-auto'>
                    <div className='text-darkGrey text-[15px] mt-[5px] font-medium'>{name}</div>
                    {totalReviews > 0 && <div className='flex items-center gap-[10px] flex-wrap'>
                        {rating > 4 ? <div className='text-[22px] text-blue'>★★★★★</div>
                            : rating > 3 ? <div className='text-[22px] text-blue'>★★★★☆</div> :
                                rating > 2 ? <div className='text-[22px] text-blue'>★★★☆☆</div> : <></>
                        }
                        <div className='text-[13px] text-[#333]'>({totalReviews} reviews)</div>
                    </div>}
                    <div className='text-[15px] text-darkGrey'>${price}</div>
                    <div className='flex gap-[5px] flex-wrap h-[30px] mt-[10px] ease-in opacity-0' ref={scope}>
                        {availableUnits && Object.keys(availableUnits).map((objKey, idx) => {
                            {/**eslint-disable-next-line @typescript-eslint/ban - ts - comment
                                // @ts-ignore*/ }
                            return <div key={idx} className={` w-[42px] rounded-[3px] border-[1px] h-[40px] text-[12px] flex items-center justify-center  ${availableUnits[objKey] > 0 ? 'text-black border-black hover:bg-blue hover:text-white transition' : 'text-softGrey border-softGrey'}`}>
                                {objKey}
                            </div>
                        })}
                    </div>
                </div>

            </motion.a>
            <div className='mobile:block desktop:hidden greyLine w-[100vw]'>

            </div>
        </>
    )
}

export default ProductCardV2;

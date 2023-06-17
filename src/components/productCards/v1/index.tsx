
export interface ProductCard {
    src: string,
    name: string,
    price: string,
    rating: number,
    href?: string
}

function ProductCardV1({ src, name, price, rating, href }: ProductCard) {
    return (
        <a
            href={href}
            className='flex flex-col w-[300px] h-[400px] productv1 gap-[10px]'
        >
            <img src={src}
                alt={name}
                width='300px'
                height='300px'
                className='productv1-img'
            />
            <div className='flex justify-between items-end'>
                <div className='flex flex-col'>
                    <div className='text-white text-[15px]'>{name}</div>
                    <div className='text-white text-[15px] font-medium'>{price}</div>
                </div>
                <div>
                    {rating > 4 ? <div className='text-[22px] text-blue'>★★★★★</div>
                        : rating > 3 ? <div className='text-[22px] text-blue'>★★★★☆</div> :
                            rating > 2 ? <div className='text-[22px] text-blue'>★★★☆☆</div> : <></>
                    }

                </div>
            </div>
        </a>
    )
}

export default ProductCardV1;

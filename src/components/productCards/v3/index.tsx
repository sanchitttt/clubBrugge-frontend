import { useAppDispatch } from "../../../hooks";
import cartSlice from "../../../redux/features/cart/cartSlice";

export interface ProductCardV3 {
    name: string,
    price: number,
    coverImage: string,
    size: string,
    quantity: number,
    productId: string
}

function ProductCardV3({ name, price, coverImage, size, quantity, productId }: ProductCardV3) {
    const dispatch = useAppDispatch();
    const { increaseQuantity, decreaseQuantity, deleteItemFromCart } = cartSlice.actions;
    return (
        <div className='w-[100%] flex gap-[30px] relative'>
            <div className=''>
                <img
                    src={coverImage}
                    width='115px'
                    height={'115px'}
                    style={{ clipPath: 'polygon(10% 0,100% 0,100% 0,100% 90%,90% 100%,0 100%,0 100%,0 10%)' }}
                />
            </div>
            <div className='flex flex-col gap-[5px] w-[100%]'>
                <div className='flex gap-[100px] justify-between items-end'>
                    <div className='flex flex-col gap-[10px]'>
                        <div className='text-[15px] text-[#0D121A] tracking- font-medium'>{name}</div>
                        <div className='text-[#91a4c2] text-[13px]'>Size : {size}</div>
                        <div className='w-[100px] flex items-center justify-around border-[1px] h-[35px] border-[#4e5f7a] rounded-[3px]'>
                            <button className='text-[20px]'
                                onClick={() => quantity > 1 && dispatch(decreaseQuantity(productId))}
                            >-</button>
                            <div className='text-[15px] font-medium'>{quantity}</div>
                            <button className='text-[20px]'
                                onClick={() => dispatch(increaseQuantity(productId))}
                            >+</button>
                        </div>
                    </div>
                    <div className='flex gap-[30px]'>
                        <div className='text-[15px] text-[#0D121A]'>
                            {price}
                        </div>
                        <div
                            className='top-[0] right-[0px] text-[13px] text-[#91A4C2] underline pointer'
                            onClick={() => dispatch(deleteItemFromCart(productId))}
                        >
                            Remove
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default ProductCardV3;
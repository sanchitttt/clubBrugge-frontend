import { useAppDispatch } from "../../../hooks";
import cartSlice from "../../../redux/features/cart/cartSlice";
import { ProductCardV3 } from "../v3";

function ProductCardV4({ name, price, coverImage, size, quantity, productId }: ProductCardV3) {
    const dispatch = useAppDispatch();
    const { increaseQuantity, decreaseQuantity, deleteItemFromCart } = cartSlice.actions;
    return (
        <div className='w-[100%] flex relative py-[10px] items-center'>
            <div className='w-[30%]'>
                <img
                    src={coverImage}
                    width='75px'
                    height={'75px'}
                    style={{ clipPath: 'polygon(10% 0,100% 0,100% 0,100% 90%,90% 100%,0 100%,0 100%,0 10%)' }}
                />
            </div>
            <div className='w-[60%] flex flex-col gap-[5px]'>
                <div className='text-[15px] text-[#0D121A] tracking- font-medium'>{name}</div>
                <div className='text-[15px] text-[#0D121A]'>
                    {price}
                </div>
                <div className='text-[#91a4c2] text-[13px]'>Size : {size}</div>
                <div className='w-[100px] flex items-center justify-around border-[1px] h-[35px] border-[#4e5f7a] rounded-[3px]'>
                    <button className='text-[20px]'
                        onClick={() => quantity > 1 && dispatch(decreaseQuantity(productId))}
                    >-</button>
                    <div className='text-[0.81rem] font-medium'>{quantity}</div>
                    <button className='text-[20px]'
                        onClick={() => dispatch(increaseQuantity(productId))}
                    >+</button>
                </div>
            </div>
            <div
                className='bottom-[15px] absolute right-[0px] text-[13px] text-[#91A4C2] underline pointer'
                onClick={() => dispatch(deleteItemFromCart(productId))}
            >
                Remove
            </div>
        </div>
    )
}

export default ProductCardV4;
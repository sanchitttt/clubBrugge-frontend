import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks";
import { calculateSubtotal } from "./CartPage";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getInfoDetails, postInfoDetails } from "./CheckoutInformation";
import BlueButton from "../components/buttons";
// import { useQuery } from "react-query";
// import config from "../config";
// import axios from "axios";

type CheckoutStatus = 'Shopping cart' | 'Information' | 'Dispatch' | 'Payment' | 'Score';

// type CheckoutInformationDetailsPayload = {
//     email: string,
//     firstName: string,
//     lastName: string,
//     companyName: string,
//     streetAndHouseNumber: string,
//     pinCode: number,
//     city: string,
//     giftCard: string
// }


// const getInfoDetails = async () => {
//     const { data } = await axios.get(`${config.BACKEND_ENDPOINT}/checkout`, { withCredentials: true });
//     return data;
// }

// const postInfoDetails = async (data: CheckoutInformationDetailsPayload) => {
//     console.log('data is', data);
//     const result = await axios.post(`${config.BACKEND_ENDPOINT}/checkout`, {
//         type: 'informationDetails', data: data
//     }, { withCredentials: true })
//     console.log(result);
// }


function CheckoutDispatch() {
    const [currentStage, setCurrentStage] = useState<CheckoutStatus>('Dispatch');
    const [giftCard, setGiftCard] = useState('');
    const [email, setEmail] = useState('');
    const [streetAndHouseNumber, setStreetAndHouseNumber] = useState('');
    const [pinCode, setPincode] = useState<null | number>();
    const [city, setCity] = useState('');
    const { cartData } = useAppSelector((state) => state.cart);
    const navigate = useNavigate();
    const { data } = useQuery({
        queryKey: 'checkoutToken',
        queryFn: getInfoDetails
    })

    useEffect(() => {
        const informationDetails = data?.informationDetails;
        if (informationDetails) {
            const { email, streetAndHouseNumber, pinCode, city } = informationDetails;
            if (email) setEmail(email)
            if (streetAndHouseNumber) setStreetAndHouseNumber(streetAndHouseNumber)
            if (pinCode) setPincode(pinCode)
            if (city) setCity(city)
        }
    }, [data])

    return (
        <div className='w-[100vw] h-[100vh] bg-[#f4f7f8] flex gap-[30px]'>
            <div className='ml-[50px] mt-[50px] w-[55vw] flex flex-col gap-[30px]'>
                <div className=''>
                    <img
                        src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/Group_272_3a1504ad-c7ac-431e-b97d-c705176595f6.png?25584'
                        alt='logo'
                        className='max-w-[8rem]'
                    />
                </div>
                {/* <div className='w-[100vw] h-[63.5px] flex items-center justify-between'>
                    <button className='text-[#0d121a] text-[15px]'>View order summary</button>
                    <div className='text-[18px] text-[#1822333]'>{calculateSubtotal(cartData)}</div>
                    {showOrderSummary && cartData.map((item) => {

                    })}
                </div> */}
                <div className='flex items-center flex-wrap justify-start'>
                    <div className='flex flex-col gap-[5px] items-center justify-center'
                        onClick={() => {
                            setCurrentStage('Shopping cart');
                            navigate('/cart');
                        }}
                    >
                        <svg fill={currentStage === 'Shopping cart' ? '#0572ff' : "#2a3548"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 902.86 902.86" transform="scale(-1 1)" stroke="#2a3548" width='25' height='20'>
                            <g />
                            <g />
                            <path d="M671.504 577.829 781.989 145.22H902.86v-68H729.174L703.128 179.2 0 178.697l74.753 399.129h596.751v.003zm14.262-330.641-67.077 262.64h-487.49L81.928 246.756l603.838.432zM578.418 825.641c59.961 0 108.743-48.783 108.743-108.744s-48.782-108.742-108.743-108.742H168.717c-59.961 0-108.744 48.781-108.744 108.742s48.782 108.744 108.744 108.744S277.46 776.858 277.46 716.897c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107 12.59-7.928 26.342-7.928 40.742.001 59.961 48.783 108.744 108.744 108.744zM209.46 716.897c0 22.467-18.277 40.744-40.743 40.744s-40.744-18.277-40.744-40.744c0-22.465 18.277-40.742 40.744-40.742 22.466 0 40.743 18.277 40.743 40.742zm409.702 0c0 22.467-18.277 40.744-40.743 40.744s-40.743-18.277-40.743-40.744c0-22.465 18.277-40.742 40.743-40.742s40.743 18.277 40.743 40.742z" />
                        </svg>

                        <div className={`text-[12px] ${currentStage === 'Shopping cart' ? 'text-blue' : 'text-[#2a3548]'}`}>Shopping cart</div>
                    </div>
                    <div className='w-[50px] mt-[-10px] h-[1px] bg-black'></div>
                    <div className='flex flex-col gap-[5px] items-center justify-center'
                        onClick={() => {
                            navigate('/checkout');
                        }}
                    >
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill={currentStage === 'Information' ? '#0572ff' : "#2a3548"} stroke={currentStage === 'Information' ? '#0572ff' : "#2a3548"}><g /><g /><path d="M16.563 18H3.438c-.706 0-1.228-.697-.961-1.338C3.713 13.698 6.617 12 10 12c3.384 0 6.288 1.698 7.524 4.662.267.641-.255 1.338-.961 1.338M5.917 6c0-2.206 1.832-4 4.083-4 2.252 0 4.083 1.794 4.083 4S12.252 10 10 10c-2.251 0-4.083-1.794-4.083-4m14.039 11.636c-.742-3.359-3.064-5.838-6.119-6.963 1.619-1.277 2.563-3.342 2.216-5.603-.402-2.623-2.63-4.722-5.318-5.028C7.023-.381 3.875 2.449 3.875 6c0 1.89.894 3.574 2.289 4.673-3.057 1.125-5.377 3.604-6.12 6.963C-.226 18.857.779 20 2.054 20h15.892c1.276 0 2.28-1.143 2.01-2.364" stroke="none" /></svg>
                        <div className={`text-[12px] ${currentStage === 'Information' ? 'text-blue' : 'text-[#2a3548]'}`}>Information</div>
                    </div>
                    <div className='w-[50px] mt-[-10px] h-[1px] bg-black'></div>
                    <div className='flex flex-col gap-[5px] items-center justify-center'
                        onClick={() => setCurrentStage('Dispatch')}
                    >
                        <svg fill={currentStage === 'Dispatch' ? '#0572ff' : "#2a3548"} width="30" height="25" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g /><g /><path d="M15.17 7.36 13 4.92a1.25 1.25 0 0 0-.94-.42h-2V2.75A1.25 1.25 0 0 0 8.82 1.5H1.76A1.25 1.25 0 0 0 .51 2.75v8.5a1.25 1.25 0 0 0 1.25 1.25h.33a2.07 2.07 0 0 0 2.13 2 2.08 2.08 0 0 0 2.14-2H10a2.07 2.07 0 0 0 2.13 2 2.08 2.08 0 0 0 2.14-2 1.26 1.26 0 0 0 1.2-1.25V8.19a1.22 1.22 0 0 0-.3-.83zM4.22 13.25a.82.82 0 0 1-.88-.75.82.82 0 0 1 .88-.75.83.83 0 0 1 .89.75.83.83 0 0 1-.89.75zm4.6-7.58v5.58H5.89a2.17 2.17 0 0 0-1.67-.75 2.17 2.17 0 0 0-1.66.75h-.8v-8.5h7.06zm1.25.08h2l1.44 1.63h-3.44zm2.08 7.5a.82.82 0 0 1-.88-.75.82.82 0 0 1 .88-.75.83.83 0 0 1 .89.75.83.83 0 0 1-.89.75zm0-2.75a2.17 2.17 0 0 0-1.66.75h-.42V8.62h4.17v2.63h-.42a2.17 2.17 0 0 0-1.67-.75z" /></svg>
                        <div className={`text-[12px] ${currentStage === 'Dispatch' ? 'text-blue' : 'text-[#2a3548]'}`}>Dispatch</div>
                    </div>
                    <div className='w-[50px] mt-[-10px] h-[1px] bg-black'></div>
                    <div className='flex flex-col gap-[5px] items-center justify-center'
                        onClick={() => {
                            setCurrentStage('Payment');
                            navigate('/checkout/payment')

                        }}
                    >
                        <svg viewBox="0 0 24 24" width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g strokeWidth="0" />
                            <g />
                            <g stroke={currentStage === 'Payment' ? '#0572ff' : "#2a3548"} strokeWidth="2">
                                <rect x="3" y="6" width="18" height="13" rx="2" />
                                <path d="M3 10h17.5M7 15h2" />
                            </g>
                        </svg>

                        <div className={`text-[12px] ${currentStage === 'Payment' ? 'text-blue' : 'text-[#2a3548]'}`}>Payment</div>
                    </div>
                   

                </div>
                <div className='flex flex-col'>
                    <div className='flex items-center  gap-[40px]'>
                        <div className='text-[13px] text-softGrey w-[70px] '>Contact</div>
                        <div className='flex justify-between items-center w-[100%]'>
                            <div className='text-[15px] text-midGrey'>{email}</div>
                            <a href='/checkout' className='text-blue text-[12.8px] underline'>Modify</a>
                        </div>
                    </div>
                    <div className='greyLine my-[15px]' />
                    <div className='flex items-center justify-between gap-[40px]'>
                        <div className='text-[13px] text-softGrey w-[70px]'>Send to</div>
                        <div className='flex justify-between items-center w-[100%]'>
                            <div className='text-[15px] text-midGrey'>{streetAndHouseNumber} {pinCode} , {city}</div>
                            <a href='/checkout' className='text-blue text-[12.8px] underline'>Modify</a>
                        </div>
                    </div>
                    <div className='greyLine my-[15px]' />
                    <div className='uppercase bebas text-[34px] text-[#313132] mt-[30px]'>Shipping method</div>
                    <div className='flex justify-between border-blue border-[1px] rounded-full py-[10px] px-[15px] mt-[10px]'>
                        <input type="radio" checked={true} id="shippingMethod" name="shippingMethod" value="Standard Delivery" />
                        {/* <div className='flex justify-between items-center'> */}
                        <div className='text-[15px] text-[#545454]'>Standard delivery</div>
                        <div className='text-[15px] text-[#333] font-medium'>$5</div>
                        {/* </div> */}
                    </div>
                    <div className='w-[100%] mt-[30px] bebas'
                        onClick={() => {
                            postInfoDetails('dispatchInformation', {
                                mode: 'Standard shipping $5'
                            })
                            navigate('/checkout/payment');
                        }}
                    >
                        <BlueButton width='100%'>Go to payment</BlueButton>
                    </div>
                </div>
            </div>
            <div className='w-[45vw] flex flex-col items-center justify-start h-[100vh] bg-black relative'>
                <div className='flex flex-col w-[90%] mt-[50px] gap-[15px]'>
                    {cartData.map(({ coverImage, name, selectedSize, price, quantity, productId }) => {
                        return <div className='flex' key={productId}>
                            <div className='relative'>
                                <img
                                    src={coverImage}
                                    width='69px'
                                    height='69px'
                                    alt=''

                                    style={{ clipPath: 'polygon(10% 0,100% 0,100% 0,100% 90%,90% 100%,0 100%,0 100%,0 10%)' }}
                                />
                                <div className='absolute w-[20px] h-[20px] text-white flex items-center justify-center right-[-15px] top-[-15px] bg-blue rounded-full'>
                                    {quantity}
                                </div>
                            </div>
                            <div className='flex items-center justify-between w-[100%] mx-[30px]'>
                                <div className='flex flex-col'>
                                    <div className='text-softWhite text-[15px]'>{name}</div>
                                    <div className='text-softGrey text-[13px]'>{selectedSize}</div>
                                </div>
                                <div className='text-[15px] text-softWhite'>
                                    ${price}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className='borderLG h-[1px] w-[90%] mt-[15px]' />
                <div className='flex gap-[15px] mx-[30px] mt-[15px] py-[15px]'>
                    <input
                        type='text'
                        value={giftCard}
                        onChange={(e) => setGiftCard(e.target.value)}
                        className='rounded-full px-[30px] bg-[#2a3548] text-softGrey text-[15px] py-[10px] w-[50%]'
                        placeholder="Gift card or discount code"
                    />
                    <button
                        aria-describedby="button"
                        className='relative w-[50%] border-[1px] rounded-full text-white transition border-white flex justify-center items-center uppercase hover:bg-blue '
                    >
                        To apply ›
                    </button>
                </div>
                <div className='borderLG h-[1px] w-[90%] mt-[15px]' />
                <div className='flex flex-col w-[90%] gap-[5px] mt-[30px]'>
                    <div className='flex justify-between items-center'>
                        <div className='text-[15px] text-white'>Subtotal</div>
                        <div className='text-[15px] text-white font-semibold'>${calculateSubtotal(cartData)}</div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-[15px] text-white'>Dispatch</div>
                        <div className='text-[15px] text-white font-semibold'>$5</div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-[15px] text-white'>Total</div>
                        <div className='text-[18px] text-white font-semibold'>{calculateSubtotal(cartData) + 5}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-[10px] mt-[30px] w-[90%]  mb-[30px]'>
                    <div className='flex gap-[15px] items-center'>
                        <svg className="iconReturn" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M9.361 5.146a.5.5 0 0 1 0 .708L5.718 9.5h9.036A5.248 5.248 0 0 1 20 14.75c0 2.9-2.349 5.25-5.246 5.25H4.51a.5.5 0 1 1 0-1h10.243A4.245 4.245 0 0 0 19 14.75a4.252 4.252 0 0 0-4.247-4.25H5.718l3.643 3.646a.5.5 0 1 1-.706.707l-4.497-4.5a.5.5 0 0 1 0-.707l4.497-4.5a.5.5 0 0 1 .706 0Z" fill="#0D121A" /></svg>
                        <div className='text-[13px] text-[#cfd0d1]'>Return up to 30 days after your order(excluding personalized items)</div>

                    </div>
                    <div className='flex gap-[15px] items-center'>
                        <svg className="icon-discount" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.122 4a1.394 1.394 0 0 0-.733.284c-.21.162-.368.382-.454.632L4.33 6.715c-.361.03-.698.19-.944.453a1.415 1.415 0 0 0-.386.96v1.78a.444.444 0 0 0 .315.426c.567.18 1.049.882 1.049 1.74s-.48 1.56-1.049 1.74a.455.455 0 0 0-.315.425v2.674c.002.377.155.738.426 1.005.27.266.637.417 1.02.419h7.176l7.718 2.593a1.37 1.37 0 0 0 1.725-.851l.59-1.753c.363-.026.703-.186.953-.448a1.41 1.41 0 0 0 .39-.965v-2.675a.442.442 0 0 0-.086-.263.454.454 0 0 0-.228-.162c-.567-.18-1.048-.882-1.049-1.74 0-.858.482-1.561 1.049-1.741a.443.443 0 0 0 .315-.426V8.13a1.419 1.419 0 0 0-.426-1.005 1.464 1.464 0 0 0-1.02-.419H14.38L6.663 4.064c-.141-.049-.292-.054-.432-.06-.038 0-.074-.002-.11-.004Zm.066.889a.495.495 0 0 1 .182.023l5.238 1.792H5.29l.506-1.508a.435.435 0 0 1 .39-.307h.002Zm-1.742 2.71h2.645v.425c0 .119.048.233.133.317a.458.458 0 0 0 .643 0A.444.444 0 0 0 8 8.024v-.426h13.554a.533.533 0 0 1 .384.153.518.518 0 0 1 .153.378v1.523c-.84.435-1.364 1.373-1.364 2.422 0 1.05.525 1.986 1.364 2.422v2.418a.51.51 0 0 1-.154.378.526.526 0 0 1-.383.151H8c.002-.102.001-.207 0-.312v-.157a.441.441 0 0 0-.277-.425.461.461 0 0 0-.504.1.446.446 0 0 0-.128.325v.47H4.445a.534.534 0 0 1-.384-.152.517.517 0 0 1-.154-.378v-2.419c.84-.435 1.364-1.373 1.364-2.422 0-1.05-.524-1.987-1.364-2.422V8.129a.51.51 0 0 1 .154-.377.527.527 0 0 1 .384-.152l.001-.002Zm9.99 10.738h6.258l-.49 1.46a.433.433 0 0 1-.224.264.447.447 0 0 1-.347.022l-5.197-1.746Zm-6.89-9.202a.458.458 0 0 0-.322.131.444.444 0 0 0-.133.316v.972c0 .119.048.232.133.316a.458.458 0 0 0 .643 0A.444.444 0 0 0 8 10.554v-.972a.441.441 0 0 0-.133-.316.455.455 0 0 0-.321-.131Zm0 2.43a.458.458 0 0 0-.322.131.444.444 0 0 0-.133.317v.972c0 .118.048.232.133.316a.459.459 0 0 0 .643 0A.444.444 0 0 0 8 12.985v-.973a.445.445 0 0 0-.133-.316.459.459 0 0 0-.321-.13Zm-.322 2.563a.459.459 0 0 1 .642 0 .444.444 0 0 1 .134.315v.973a.444.444 0 0 1-.133.316.458.458 0 0 1-.643 0 .444.444 0 0 1-.133-.316v-.972c0-.118.048-.232.133-.316Zm10.579-.684a1.492 1.492 0 0 0-1.861.181 1.436 1.436 0 0 0-.186 1.832c.162.24.392.425.662.535a1.496 1.496 0 0 0 1.608-.314 1.432 1.432 0 0 0 .32-1.582 1.458 1.458 0 0 0-.543-.652Zm-1.134.743a.572.572 0 0 1 .532-.053.56.56 0 0 1 .307.303c.028.067.042.14.04.213a.55.55 0 0 1-.348.516.574.574 0 0 1-.617-.121.554.554 0 0 1 .086-.858Zm-4.015-5.249c.292 0 .577.086.82.245.242.16.43.386.542.651a1.43 1.43 0 0 1-.32 1.582 1.496 1.496 0 0 1-1.606.315 1.47 1.47 0 0 1-.662-.533 1.436 1.436 0 0 1-.25-.806c.002-.385.157-.754.434-1.027a1.492 1.492 0 0 1 1.042-.427Zm0 .895a.572.572 0 0 0-.522.343.549.549 0 0 0 .122.607.57.57 0 0 0 .966-.391.543.543 0 0 0-.163-.397.56.56 0 0 0-.403-.162Zm-.322 4.502 4.33-4.262c.174-.18.456-.162.642 0a.444.444 0 0 1 0 .633l-4.329 4.261a.459.459 0 0 1-.636-.007.444.444 0 0 1-.007-.626Z" fill="#0D121A" />
                        </svg>

                        <div className='text-[13px] text-[#od121a]'> <div className='text-[13px] text-[#cfd0d1]'>Gift card or discount code? You can enter this at checkout</div></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutDispatch;
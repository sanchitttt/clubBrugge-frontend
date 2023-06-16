import Footer from "../components/footer";
import Header from "../components/header";
import { useState } from 'react';
import { CartIcon } from "../components/icons";
import Accordian from '../components/accordian';
import Carousel from '../components/carousel';
import { useQuery } from "react-query";
import axios from "axios";
import config from "../config";
import { useAppDispatch } from "../hooks";
import cartSlice from "../redux/features/cart/cartSlice";
import { Fragment } from 'react';

export interface AvailableUnits {
    "S"?: number,
    "M"?: number,
    "L"?: number,
    "XL"?: number,
    "XXL"?: number,
    "3XL"?: number,
    "4XL"?: number,
    "5XL"?: number,
    "128"?: number,
    "140"?: number,
    "152"?: number,
    "164"?: number,
    "31-34"?: number,
    "35-38"?: number,
    "39-42"?: number,
    "43-46"?: number,
    "47-50"?: number,
    "128 - JS"?: number,
    "149 - JM"?: number,
    "152 - JL"?: number,
    "164 - JXL"?: number,

}

interface Details {
    "images": Array<string>,
    "description"?: string,
    "characteristics"?: string,
    "washingInstructions"?: string
}

export interface MinimumProductDetails {
    "_id": string,
    "name": string,
    "availableUnits": AvailableUnits,
    "rating": number,
    "totalReviews": number,
    "price": number,
    "genderType": "men" | "women" | "kids" | "all",
    "coverImage": string,
    "details": Details
}

export interface OfficialCompetitionKit extends MinimumProductDetails {
    "competitionKit": 'home' | 'away' | 'third' | 'keeper',
    "color": string[],
}

export interface Clothing extends MinimumProductDetails {
    "clothingType"?: "collection" | "sportswear",
    "collection"?: string,
    "color"?: string[],
    "type": "hoodie" | "trousers" | "tshirt" | "polo" | "sweater" | "jacket" | "coat"
}

export interface FanArticles extends MinimumProductDetails {
    "fanItemType": "stadium" | "european" | "goldenShoes",
    "type": "scarves" | "flags" | "caps" | "beanies" | "tshirt"
}

type ValidProductFetchType = 'official-competition-uniforms' | 'clothing' | 'fan-articles' | 'new' | 'summer';

const fetchProduct = (type: ValidProductFetchType, id: string) => {
    try {
        console.log(type, id)
        if (type === 'official-competition-uniforms') {
            return axios.get(`${config.BACKEND_ENDPOINT}/officialCompetitionUniformProduct/${id}`)
        }
        else if (type === 'clothing') {
            return axios.get(`${config.BACKEND_ENDPOINT}/clothingProduct/${id}`)
        }
        else if (type === 'fan-articles') {
            return axios.get(`${config.BACKEND_ENDPOINT}/fanArticleProduct/${id}`)
        }
        else if (type === 'new') {
            return axios.get(`${config.BACKEND_ENDPOINT}/newProduct/${id}`)
        }
        else if (type === 'summer') {
            return axios.get(`${config.BACKEND_ENDPOINT}/summerProduct/${id}`)
        }
    } catch (error) {
        console.log(error);
    }
}

function ProductDetail() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<AvailableUnits | null>(null);
    const arr = window.location.href.split('/')
    const { data } = useQuery([arr[arr.length - 1]], () => fetchProduct(arr[arr.length - 2] as ValidProductFetchType, arr[arr.length - 1]))
    const dispatch = useAppDispatch();
    const { addToCart } = cartSlice.actions;
    let name: string | undefined;
    let availableUnits: AvailableUnits | undefined;
    let rating: number | undefined;
    let totalReviews: number | undefined;
    let price: number | undefined;
    let details: Details | undefined;
    if (data) {
        const { data: productDetails } = data;
        name = productDetails.name;
        availableUnits = productDetails.availableUnits;
        rating = productDetails.rating;
        totalReviews = productDetails.totalReviews;
        price = productDetails.price;
        details = productDetails.details;
    }



    return (
        <div className='w-[100vw] h-[100vh] bg-black flex flex-col'>
            <Header />
            {/**Desktop view */}
            {data && <div className='flex items-start bg-white justify-center gap-[30px] py-[50px] mobile:hidden desktop:flex'>
                <div id='imageList' className='flex flex-col gap-[10px]'>
                    {details && details.images.map((item, idx) => {
                        return <div className='w-[80px] h-[80px]' key={item}>
                            <img
                                onClick={() => setSelectedImage(idx)}
                                src={item}
                                alt='productImg'
                                width='100%'
                                height='100%'
                                className={`${selectedImage === idx && 'border-[2px] border-blue'}`}
                            />
                        </div>
                    })}
                </div>

                <div id='displayedImage' className='w-[30vw] h-[40vw] relative'>
                    <img
                        src={details && details.images[selectedImage]}
                        alt='productImgExpanded'
                    />
                    {details && details.images.length > 1 && <>

                        {selectedImage !== details.images.length - 1 &&
                            <button className='absolute top-[40%] left-[98%] bg-white rounded-full' style={{ transform: 'translate(-98%,-100%)' }}
                                onClick={() => setSelectedImage(selectedImage => selectedImage + 1)}
                            >
                                <svg fill="#0572ff" height="42px" width="42px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve" stroke="#0572ff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_2_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605 l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396 l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998 c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"></path> </g></svg>
                            </button>}
                        {selectedImage !== 0 &&
                            <button className='absolute top-[40%] left-[5px] rounded-full bg-white' style={{ transform: 'translate(0%,-100%)' }}
                                onClick={() => setSelectedImage(selectedImage => selectedImage - 1)}
                            >
                                <svg fill="#0572ff" height="42px" width="42px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve" stroke="#0572ff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_6_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394 c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998 c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0 c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"></path> </g></svg>
                            </button>}



                    </>}
                </div>

                <div id='productDetailsContainer flex flex-col'>
                    <div className='bebas text-[36px] uppercase'>
                        {name}
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-[18px] text-[#2a3548]'>{price}</div>
                        <div className='flex gap-[5px] items-center'>
                            {rating && rating > 4 ? <div className='text-[22px] text-blue'>★★★★★</div>
                                : rating && rating > 3 ? <div className='text-[22px] text-blue'>★★★★☆</div> :
                                    rating && rating > 2 ? <div className='text-[22px] text-blue'>★★★☆☆</div> : <></>
                            }
                            <div className='text-[13px] text-[#333]'>({totalReviews} reviews)</div>
                        </div>
                    </div>
                    <div className='text-[15px] text-black mt-[30px]'>
                        Sizes
                    </div>
                    <div className='flex gap-[5px] mt-[10px]'>
                        {availableUnits && Object.keys(availableUnits).map((objKey) => {
                            const propertyValue = availableUnits ? availableUnits[objKey as keyof AvailableUnits] : 0;
                            return <div
                                key={objKey}
                                className={`w-[40px] rounded-[3px] border-[1px] h-[40px] text-[13px] flex items-center justify-center ${selectedSize === objKey && 'bg-blue text-white'} ${propertyValue && propertyValue > 0 ? 'text-black border-black hover:bg-blue hover:text-white transition' : 'text-softGrey border-softGrey'}`}
                                onClick={() => setSelectedSize(objKey as AvailableUnits)}
                            >
                                {objKey}
                            </div>
                        })}
                    </div>
                    <div className='flex items-center justify-start py-[30px]'>
                        <button
                            onClick={() => {
                                if (!selectedSize) {
                                    window.alert("Select a size first")
                                }
                                else dispatch(addToCart({
                                    name: name as string,
                                    coverImage: details ? details.images[selectedImage] : '',
                                    quantity: 1,
                                    price: price as number,
                                    selectedSize: selectedSize as string,
                                    productId: arr[arr.length - 1]
                                }))
                            }}
                            aria-describedby="button"
                            className=' blueButton h-[50px] font-semibold w-[300px] gap-[10px] py-[20px] btn flex items-center  justify-center text-white uppercase tracking-wider'
                        // style={{ transform: 'translate(-50%,0%)' }}
                        >
                            <CartIcon />
                            In Shopping Basket ›

                        </button>
                    </div>
                    <div className='flex items-start flex-col '>
                        <div className='flex gap-[5px] items-center'>
                            <svg className="icon-shipping" width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.2678 11C16.9085 10.9978 16.558 10.8863 16.2612 10.6797C15.9644 10.4731 15.7349 10.1809 15.602 9.84048L15.5383 9.67457H8.97875L8.91502 9.84048C8.78394 10.1822 8.55483 10.4756 8.25764 10.6825C7.96045 10.8893 7.60899 11 7.24916 11C6.88933 11 6.53787 10.8893 6.24068 10.6825C5.94349 10.4756 5.71438 10.1822 5.5833 9.84048L5.51957 9.67457H3.58525C3.48544 9.67445 3.38976 9.63397 3.31918 9.562C3.2486 9.49003 3.2089 9.39246 3.20878 9.29069V7.37264C3.20878 7.27083 3.24845 7.17318 3.31905 7.10119C3.38965 7.0292 3.48541 6.98875 3.58525 6.98875C3.6851 6.98875 3.78085 7.0292 3.85146 7.10119C3.92206 7.17318 3.96172 7.27083 3.96172 7.37264V8.90634H5.47709L5.52906 8.71509C5.63429 8.33176 5.85959 7.99406 6.17061 7.7535C6.48163 7.51293 6.86128 7.38272 7.25165 7.38272C7.64201 7.38272 8.02166 7.51293 8.33268 7.7535C8.6437 7.99406 8.869 8.33176 8.97423 8.71509L9.0262 8.90634H13.5389V0.767772H3.58525C3.48541 0.767772 3.38965 0.727327 3.31905 0.655334C3.24845 0.583342 3.20878 0.485699 3.20878 0.383886C3.20878 0.282073 3.24845 0.18443 3.31905 0.112438C3.38965 0.0404452 3.48541 0 3.58525 0H13.9131C14.0109 0.000186819 14.1049 0.0391224 14.1751 0.108593C14.2453 0.178064 14.2864 0.272639 14.2895 0.372365V2.23281H19.2677C19.3423 2.23268 19.4152 2.25518 19.4771 2.29744C19.5391 2.33971 19.5873 2.39983 19.6157 2.47014L20.9715 5.80714C20.9902 5.85366 20.9999 5.90342 21 5.95369V9.29069C20.9999 9.39246 20.9602 9.49003 20.8896 9.562C20.819 9.63397 20.7233 9.67445 20.6235 9.67457H18.9965L18.9324 9.84048C18.7997 10.1808 18.5704 10.473 18.2738 10.6795C17.9773 10.8861 17.627 10.9977 17.2678 11V11ZM17.2678 8.15147C17.0667 8.15411 16.8708 8.21734 16.7048 8.33322C16.5387 8.44911 16.4101 8.61246 16.3349 8.80273C16.2597 8.99301 16.2413 9.20171 16.2821 9.40259C16.323 9.60347 16.4211 9.78755 16.5643 9.93168C16.7075 10.0758 16.8892 10.1736 17.0867 10.2126C17.2842 10.2517 17.4886 10.2303 17.6743 10.1512C17.8599 10.0721 18.0184 9.9388 18.13 9.76806C18.2415 9.59731 18.301 9.39675 18.301 9.1916C18.3016 9.05374 18.2752 8.91714 18.2234 8.78982C18.1716 8.66249 18.0953 8.547 17.9991 8.45012C17.9029 8.35324 17.7887 8.27692 17.6632 8.22564C17.5378 8.17435 17.4035 8.14914 17.2683 8.15147H17.2678ZM7.24871 8.15147C7.04754 8.15411 6.85163 8.21734 6.68562 8.33322C6.51961 8.44911 6.39091 8.61246 6.31571 8.80273C6.24051 8.99301 6.22217 9.20171 6.263 9.40259C6.30383 9.60347 6.40199 9.78755 6.54516 9.93168C6.68832 10.0758 6.87008 10.1736 7.06759 10.2126C7.26509 10.2517 7.46951 10.2303 7.65513 10.1512C7.84076 10.0721 7.9993 9.9388 8.11081 9.76806C8.22233 9.59731 8.28183 9.39675 8.28185 9.1916C8.28247 9.05374 8.25609 8.91714 8.20426 8.78982C8.15242 8.66249 8.07617 8.547 7.97998 8.45012C7.8838 8.35324 7.76961 8.27692 7.64411 8.22564C7.51861 8.17435 7.38434 8.14914 7.24916 8.15147H7.24871ZM17.2678 7.3837C17.658 7.38438 18.0373 7.51478 18.3482 7.75513C18.6591 7.99548 18.8847 8.33267 18.9907 8.71555L19.0426 8.9068H20.2466V6.33757H14.2895V8.9068H15.4931L15.5455 8.71555C15.6514 8.33259 15.8769 7.99532 16.1878 7.75495C16.4987 7.51457 16.8781 7.38423 17.2683 7.3837H17.2678ZM14.2891 5.5698H20.0604L19.0178 3.00058H14.2895L14.2891 5.5698ZM0.376451 5.33431C0.276666 5.334 0.181022 5.2936 0.110256 5.22186C0.0576099 5.16818 0.0217576 5.09977 0.00723296 5.02531C-0.00729169 4.95085 0.000163511 4.87366 0.0286561 4.80352C0.0571487 4.73338 0.105399 4.67342 0.167306 4.63124C0.229212 4.58906 0.301995 4.56654 0.376451 4.56654H7.46383C7.56362 4.56684 7.65926 4.60725 7.73003 4.67898C7.76519 4.71448 7.79305 4.75676 7.81199 4.80337C7.83092 4.84998 7.84055 4.89997 7.8403 4.95042C7.8403 5.05224 7.80064 5.14988 7.73004 5.22187C7.65944 5.29386 7.56368 5.33431 7.46383 5.33431H0.376451ZM2.00842 3.04344C1.90864 3.04313 1.81299 3.00273 1.74223 2.93099C1.67163 2.859 1.63197 2.76136 1.63197 2.65955C1.63197 2.55774 1.67163 2.4601 1.74223 2.38811C1.81299 2.31637 1.90864 2.27597 2.00842 2.27566H7.46383C7.56362 2.27597 7.65926 2.31637 7.73003 2.38811C7.80062 2.4601 7.84028 2.55774 7.84028 2.65955C7.84028 2.76136 7.80062 2.859 7.73003 2.93099C7.65926 3.00273 7.56362 3.04313 7.46383 3.04344H2.00842Z" fill="black"></path>
                            </svg>
                            <div className='flex gap-[5px] tracking-tight'>
                                <span className='font-medium text-[15px] text-[#2a3548]'>Free return </span>
                                <div className='text-[15px] text-normal text-[#2a3548]'> within 30 days!</div>
                            </div>
                        </div>


                        <div className='flex gap-[5px] items-center justify-center'>
                            <svg className="icon-wallet" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.18045 13C0.867576 12.9993 0.567698 12.8633 0.346461 12.6218C0.125224 12.3803 0.000645772 12.053 0 11.7115V1.28586C0.000647311 0.944587 0.125303 0.617526 0.34661 0.376457C0.567917 0.135387 0.867801 -7.31446e-07 1.18045 0H16.822C16.9767 0 17.1299 0.0332549 17.2728 0.0978755C17.4157 0.162496 17.5456 0.257216 17.655 0.37662C17.7644 0.496023 17.8511 0.637775 17.9103 0.793783C17.9695 0.949791 18 1.117 18 1.28586V11.7115C18 12.0532 17.8756 12.381 17.6543 12.6226C17.4329 12.8642 17.1326 13 16.8195 13H1.18045ZM0.725866 11.6661C0.724864 11.7315 0.73596 11.7964 0.758482 11.8569C0.781003 11.9175 0.814487 11.9724 0.856933 12.0185C0.89938 12.0646 0.949916 12.1008 1.00551 12.1251C1.0611 12.1494 1.1206 12.1611 1.18045 12.1597H16.822C16.8817 12.1611 16.9411 12.1494 16.9966 12.1251C17.052 12.1008 17.1024 12.0645 17.1447 12.0183C17.1869 11.9722 17.2202 11.9172 17.2424 11.8567C17.2647 11.7962 17.2755 11.7313 17.2741 11.6661V5.71701H0.728312L0.725866 11.6661ZM0.725866 4.93002H17.2766V3.36404H0.728312L0.725866 4.93002ZM1.17801 0.797658C1.11826 0.796201 1.05887 0.807973 1.00341 0.832259C0.947951 0.856546 0.897576 0.892837 0.855322 0.93896C0.813068 0.985083 0.779813 1.04008 0.757564 1.10061C0.735315 1.16115 0.72453 1.22599 0.725866 1.2912V2.57173H17.2766V1.2912C17.2779 1.22599 17.2671 1.16115 17.2449 1.10061C17.2226 1.04008 17.1894 0.985083 17.1471 0.93896C17.1049 0.892837 17.0545 0.856546 16.999 0.832259C16.9436 0.807973 16.8842 0.796201 16.8244 0.797658H1.17801ZM12.9336 10.1695C12.8364 10.1695 12.7431 10.1274 12.6744 10.0523C12.6056 9.97726 12.567 9.87547 12.567 9.76934C12.567 9.66321 12.6056 9.56143 12.6744 9.48638C12.7431 9.41134 12.8364 9.36918 12.9336 9.36918H15.5242C15.6208 9.36918 15.7134 9.41106 15.7817 9.4856C15.85 9.56015 15.8884 9.66125 15.8884 9.76667C15.8921 9.81979 15.8852 9.87315 15.8682 9.92307C15.8511 9.97299 15.8244 10.0183 15.7898 10.0558C15.7552 10.0933 15.7135 10.1222 15.6676 10.1405C15.6218 10.1587 15.5729 10.1659 15.5242 10.1615L12.9336 10.1695Z" fill="black"></path>
                            </svg>
                            <div className='flex gap-[5px] tracking-tight'>
                                <span className='font-medium text-[15px] text-[#2a3548]'>Delivery is free </span>
                                <div className='text-[15px] text-[#2a3548]'>with a club ID or from €100</div>
                            </div>
                        </div>

                        <div className='w-[600px] mt-[30px]'>
                            {details && Object.keys(details).map((item, idx) => {
                                if (item === 'description') {
                                    return <Fragment key={idx}>
                                        <div className='greyLine'></div>
                                        <Accordian heading='Description'>
                                            {details && details[item]}
                                        </Accordian>
                                    </Fragment>
                                }
                                if (item === 'characteristics') {
                                    return <Fragment key={idx}>
                                        <div className='greyLine'></div>
                                        <Accordian heading='Characteristics'>
                                            {details && details[item]}
                                        </Accordian>
                                    </Fragment>
                                }
                                if (item === 'washingInstructions') {
                                    return <Fragment key={idx}>
                                        <div className='greyLine'></div>
                                        <Accordian heading='Washing Instructions'>
                                            {details && details[item]}
                                        </Accordian>
                                    </Fragment>
                                }
                            })}
                        </div>
                    </div>
                </div>

            </div>}

            {/**Mobile view */}
            {data && < div className='flex flex-col bg-white relative mobile:flex desktop:hidden mt-[30px] '>
                <Carousel imageList={details && details.images} />
                <div className='mx-[7.5px] my-[5px]'>
                    <div className='bebas text-[34px] uppercase'>
                        {name}
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='text-[18px] text-[#2a3548]'>{price}</div>
                        <div className='flex gap-[5px] items-center'>
                            {rating && rating > 4 ? <div className='text-[22px] text-blue'>★★★★★</div>
                                : rating && rating > 3 ? <div className='text-[22px] text-blue'>★★★★☆</div> :
                                    rating && rating > 2 ? <div className='text-[22px] text-blue'>★★★☆☆</div> : <></>
                            }
                            <div className='text-[13px] text-[#333]'>({totalReviews} reviews)</div>
                        </div>
                    </div>
                    <div className='text-[15px] text-black mt-[30px]'>
                        Sizes
                    </div>
                    <div className='flex gap-[5px] mt-[10px]'>
                        {availableUnits && Object.keys(availableUnits).map((objKey) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            const propertyValue = availableUnits[objKey];
                            return <div
                                key={objKey}
                                className={`w-[40px] rounded-[3px] border-[1px] h-[40px] text-[13px] flex items-center justify-center  ${propertyValue > 0 ? 'text-black border-black hover:bg-blue hover:text-white transition' : 'text-softGrey border-softGrey'}`}
                                onClick={() => setSelectedSize(objKey as AvailableUnits)}
                            >
                                {objKey}
                            </div>
                        })}
                    </div>
                    <div className='flex items-start flex-col mt-[30px]'>
                        <div className='flex gap-[5px] items-center'>
                            <svg className="icon-shipping" width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.2678 11C16.9085 10.9978 16.558 10.8863 16.2612 10.6797C15.9644 10.4731 15.7349 10.1809 15.602 9.84048L15.5383 9.67457H8.97875L8.91502 9.84048C8.78394 10.1822 8.55483 10.4756 8.25764 10.6825C7.96045 10.8893 7.60899 11 7.24916 11C6.88933 11 6.53787 10.8893 6.24068 10.6825C5.94349 10.4756 5.71438 10.1822 5.5833 9.84048L5.51957 9.67457H3.58525C3.48544 9.67445 3.38976 9.63397 3.31918 9.562C3.2486 9.49003 3.2089 9.39246 3.20878 9.29069V7.37264C3.20878 7.27083 3.24845 7.17318 3.31905 7.10119C3.38965 7.0292 3.48541 6.98875 3.58525 6.98875C3.6851 6.98875 3.78085 7.0292 3.85146 7.10119C3.92206 7.17318 3.96172 7.27083 3.96172 7.37264V8.90634H5.47709L5.52906 8.71509C5.63429 8.33176 5.85959 7.99406 6.17061 7.7535C6.48163 7.51293 6.86128 7.38272 7.25165 7.38272C7.64201 7.38272 8.02166 7.51293 8.33268 7.7535C8.6437 7.99406 8.869 8.33176 8.97423 8.71509L9.0262 8.90634H13.5389V0.767772H3.58525C3.48541 0.767772 3.38965 0.727327 3.31905 0.655334C3.24845 0.583342 3.20878 0.485699 3.20878 0.383886C3.20878 0.282073 3.24845 0.18443 3.31905 0.112438C3.38965 0.0404452 3.48541 0 3.58525 0H13.9131C14.0109 0.000186819 14.1049 0.0391224 14.1751 0.108593C14.2453 0.178064 14.2864 0.272639 14.2895 0.372365V2.23281H19.2677C19.3423 2.23268 19.4152 2.25518 19.4771 2.29744C19.5391 2.33971 19.5873 2.39983 19.6157 2.47014L20.9715 5.80714C20.9902 5.85366 20.9999 5.90342 21 5.95369V9.29069C20.9999 9.39246 20.9602 9.49003 20.8896 9.562C20.819 9.63397 20.7233 9.67445 20.6235 9.67457H18.9965L18.9324 9.84048C18.7997 10.1808 18.5704 10.473 18.2738 10.6795C17.9773 10.8861 17.627 10.9977 17.2678 11V11ZM17.2678 8.15147C17.0667 8.15411 16.8708 8.21734 16.7048 8.33322C16.5387 8.44911 16.4101 8.61246 16.3349 8.80273C16.2597 8.99301 16.2413 9.20171 16.2821 9.40259C16.323 9.60347 16.4211 9.78755 16.5643 9.93168C16.7075 10.0758 16.8892 10.1736 17.0867 10.2126C17.2842 10.2517 17.4886 10.2303 17.6743 10.1512C17.8599 10.0721 18.0184 9.9388 18.13 9.76806C18.2415 9.59731 18.301 9.39675 18.301 9.1916C18.3016 9.05374 18.2752 8.91714 18.2234 8.78982C18.1716 8.66249 18.0953 8.547 17.9991 8.45012C17.9029 8.35324 17.7887 8.27692 17.6632 8.22564C17.5378 8.17435 17.4035 8.14914 17.2683 8.15147H17.2678ZM7.24871 8.15147C7.04754 8.15411 6.85163 8.21734 6.68562 8.33322C6.51961 8.44911 6.39091 8.61246 6.31571 8.80273C6.24051 8.99301 6.22217 9.20171 6.263 9.40259C6.30383 9.60347 6.40199 9.78755 6.54516 9.93168C6.68832 10.0758 6.87008 10.1736 7.06759 10.2126C7.26509 10.2517 7.46951 10.2303 7.65513 10.1512C7.84076 10.0721 7.9993 9.9388 8.11081 9.76806C8.22233 9.59731 8.28183 9.39675 8.28185 9.1916C8.28247 9.05374 8.25609 8.91714 8.20426 8.78982C8.15242 8.66249 8.07617 8.547 7.97998 8.45012C7.8838 8.35324 7.76961 8.27692 7.64411 8.22564C7.51861 8.17435 7.38434 8.14914 7.24916 8.15147H7.24871ZM17.2678 7.3837C17.658 7.38438 18.0373 7.51478 18.3482 7.75513C18.6591 7.99548 18.8847 8.33267 18.9907 8.71555L19.0426 8.9068H20.2466V6.33757H14.2895V8.9068H15.4931L15.5455 8.71555C15.6514 8.33259 15.8769 7.99532 16.1878 7.75495C16.4987 7.51457 16.8781 7.38423 17.2683 7.3837H17.2678ZM14.2891 5.5698H20.0604L19.0178 3.00058H14.2895L14.2891 5.5698ZM0.376451 5.33431C0.276666 5.334 0.181022 5.2936 0.110256 5.22186C0.0576099 5.16818 0.0217576 5.09977 0.00723296 5.02531C-0.00729169 4.95085 0.000163511 4.87366 0.0286561 4.80352C0.0571487 4.73338 0.105399 4.67342 0.167306 4.63124C0.229212 4.58906 0.301995 4.56654 0.376451 4.56654H7.46383C7.56362 4.56684 7.65926 4.60725 7.73003 4.67898C7.76519 4.71448 7.79305 4.75676 7.81199 4.80337C7.83092 4.84998 7.84055 4.89997 7.8403 4.95042C7.8403 5.05224 7.80064 5.14988 7.73004 5.22187C7.65944 5.29386 7.56368 5.33431 7.46383 5.33431H0.376451ZM2.00842 3.04344C1.90864 3.04313 1.81299 3.00273 1.74223 2.93099C1.67163 2.859 1.63197 2.76136 1.63197 2.65955C1.63197 2.55774 1.67163 2.4601 1.74223 2.38811C1.81299 2.31637 1.90864 2.27597 2.00842 2.27566H7.46383C7.56362 2.27597 7.65926 2.31637 7.73003 2.38811C7.80062 2.4601 7.84028 2.55774 7.84028 2.65955C7.84028 2.76136 7.80062 2.859 7.73003 2.93099C7.65926 3.00273 7.56362 3.04313 7.46383 3.04344H2.00842Z" fill="black"></path>
                            </svg>
                            <div className='flex gap-[5px]'>
                                <span className='font-medium text-[15px] text-[#2a3548]'>Free return </span>
                                <div className='text-[15px] text-normal text-[#2a3548]'> within 30 days!</div>
                            </div>
                        </div>


                        <div className='flex gap-[5px] items-center justify-center'>
                            <svg className="icon-wallet" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.18045 13C0.867576 12.9993 0.567698 12.8633 0.346461 12.6218C0.125224 12.3803 0.000645772 12.053 0 11.7115V1.28586C0.000647311 0.944587 0.125303 0.617526 0.34661 0.376457C0.567917 0.135387 0.867801 -7.31446e-07 1.18045 0H16.822C16.9767 0 17.1299 0.0332549 17.2728 0.0978755C17.4157 0.162496 17.5456 0.257216 17.655 0.37662C17.7644 0.496023 17.8511 0.637775 17.9103 0.793783C17.9695 0.949791 18 1.117 18 1.28586V11.7115C18 12.0532 17.8756 12.381 17.6543 12.6226C17.4329 12.8642 17.1326 13 16.8195 13H1.18045ZM0.725866 11.6661C0.724864 11.7315 0.73596 11.7964 0.758482 11.8569C0.781003 11.9175 0.814487 11.9724 0.856933 12.0185C0.89938 12.0646 0.949916 12.1008 1.00551 12.1251C1.0611 12.1494 1.1206 12.1611 1.18045 12.1597H16.822C16.8817 12.1611 16.9411 12.1494 16.9966 12.1251C17.052 12.1008 17.1024 12.0645 17.1447 12.0183C17.1869 11.9722 17.2202 11.9172 17.2424 11.8567C17.2647 11.7962 17.2755 11.7313 17.2741 11.6661V5.71701H0.728312L0.725866 11.6661ZM0.725866 4.93002H17.2766V3.36404H0.728312L0.725866 4.93002ZM1.17801 0.797658C1.11826 0.796201 1.05887 0.807973 1.00341 0.832259C0.947951 0.856546 0.897576 0.892837 0.855322 0.93896C0.813068 0.985083 0.779813 1.04008 0.757564 1.10061C0.735315 1.16115 0.72453 1.22599 0.725866 1.2912V2.57173H17.2766V1.2912C17.2779 1.22599 17.2671 1.16115 17.2449 1.10061C17.2226 1.04008 17.1894 0.985083 17.1471 0.93896C17.1049 0.892837 17.0545 0.856546 16.999 0.832259C16.9436 0.807973 16.8842 0.796201 16.8244 0.797658H1.17801ZM12.9336 10.1695C12.8364 10.1695 12.7431 10.1274 12.6744 10.0523C12.6056 9.97726 12.567 9.87547 12.567 9.76934C12.567 9.66321 12.6056 9.56143 12.6744 9.48638C12.7431 9.41134 12.8364 9.36918 12.9336 9.36918H15.5242C15.6208 9.36918 15.7134 9.41106 15.7817 9.4856C15.85 9.56015 15.8884 9.66125 15.8884 9.76667C15.8921 9.81979 15.8852 9.87315 15.8682 9.92307C15.8511 9.97299 15.8244 10.0183 15.7898 10.0558C15.7552 10.0933 15.7135 10.1222 15.6676 10.1405C15.6218 10.1587 15.5729 10.1659 15.5242 10.1615L12.9336 10.1695Z" fill="black"></path>
                            </svg>
                            <div className='flex gap-[5px] tracking-tight'>
                                <span className='font-medium text-[15px] text-[#2a3548]'>Delivery is free </span>
                                <div className='text-[15px] text-[#2a3548]'>with a club ID or from €100</div>
                            </div>
                        </div>

                        <div className='w-[100%] mt-[30px]' style={{ whiteSpace: 'break-spaces' }}>
                            {details && Object.keys(details).map((item, idx) => {
                                if (item === 'description') {

                                    return <Fragment key={idx}>
                                        <div className='greyLine'></div>
                                        <Accordian heading='Description'>
                                            {details && details[item]}
                                        </Accordian>
                                    </Fragment>
                                }
                                if (item === 'characteristics') {
                                    return <Fragment key={idx}>
                                        <div className='greyLine'></div>
                                        <Accordian heading='Characteristics'>
                                            {details && details[item]}
                                        </Accordian>
                                    </Fragment>
                                }
                                if (item === 'washingInstructions') {
                                    return <Fragment key={idx}>
                                        <div className='greyLine'></div>
                                        <Accordian heading='Washing Instructions'>
                                            {details && details[item]}
                                        </Accordian>
                                    </Fragment>
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className='fixed w-[100vw] bottom-[0px] h-[125px] rounded-tl-[15px] rounded-tr-[15px] bg-black flex items-center justify-center'>
                    <div className='flex items-center justify-start py-[30px]'
                        onClick={() => {
                            if (!selectedSize) {
                                window.alert("Select a size first")
                            }
                            else dispatch(addToCart({
                                name: name as string,
                                coverImage: details ? details.images[selectedImage] : '',
                                quantity: 1,
                                price: price as number,
                                selectedSize: selectedSize as string,
                                productId: arr[arr.length - 1]
                            }))
                        }}>
                        <button
                            aria-describedby="button"
                            className=' blueButton h-[50px] font-semibold w-[80vw] gap-[10px] py-[20px] btn flex items-center  justify-center text-white uppercase tracking-wider'
                        // style={{ transform: 'translate(-50%,0%)' }}
                        >
                            <CartIcon />
                            In Shopping Basket ›

                        </button>
                    </div>
                </div>
            </div>}
            <Footer />
        </div >
    )
}

export default ProductDetail
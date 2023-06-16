import axios from "axios";
import { useQuery } from "react-query";
import BlueButton, { BlackButton } from "../components/buttons";
import Footer from "../components/footer";
import Header from "../components/header";
import PersonalizeShirt from "../components/personalizeShirt";
import ProductCardV1 from "../components/productCards/v1";
import config from "../config";
// import { useState, useEffect } from 'react';


// const mockSummerData = [{
//     "name": "Swim shorts",
//     "rating": 4.3,
//     "totalReviews": "7",
//     "price": "30.00",
//     "coverImage": "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/Zwemshort.jpg?v=1671727930&width=823",
//     "details": {
//         "images": ["https://cdn.shopify.com/s/files/1/0629/7881/8265/products/Zwemshort.jpg?v=1671727930&width=823"],
//         "description": "These Club Brugge swimming shorts have two color sections, how could it be otherwise, blue and black. The swim shorts are spacious and wide, ideal for those who want to be active in and around the water."
//     }
// }, {
//     "name": "Towel Blue",
//     "rating": 5,
//     "totalReviews": "2",
//     "price": "35.00",
//     "coverImage": "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/handdoekblauw_720x.jpg?v=1673922777",
//     "details": {
//         "images": ["https://cdn.shopify.com/s/files/1/0629/7881/8265/products/handdoekblauw_720x.jpg?v=1673922777"],
//         "description": "Club bath towel in bright blue. The towel is in 1 colour, but the relief of the imprint makes the logo with slogan come into its own.\nPerfect for after swimming lessons, football training or on the beach.\nDimensions: 70 & 140 (L) cm"
//     }
// }, {
//     "name": "Leather coasters (4 pieces)",
//     "rating": 3.2,
//     "totalReviews": 3,
//     "price": "15.00",
//     "coverImage": "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/lederenonderzetters.jpg?v=1665091177&width=823",
//     "details": {
//         "images": ["https://cdn.shopify.com/s/files/1/0629/7881/8265/products/lederenonderzetters.jpg?v=1665091177&width=823", "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/lederenonderzetters2.jpg?v=1665091177&width=823"],
//         "description": "Four stylish leather coasters made of genuine Belgian leather with a diamter of 10 cm. Health!"
//     }
// }, {
//     "name": "Sports bag",
//     "rating": 5,
//     "totalReviews": 3,
//     "price": "20.00",
//     "coverImage": "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/ZwemzakC.jpg?v=1670452744&width=823",
//     "details": {
//         "images": ["https://cdn.shopify.com/s/files/1/0629/7881/8265/products/ZwemzakC.jpg?v=1670452744&width=823", "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/zwemzakB.jpg?v=1670452758&width=823", "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/zwemzak_f871281b-30b4-46b1-8a3f-ef9c2ccb05f8.jpg?v=1670452767&width=823"],
//         "description": "With this high quality bag you have your sports gear immediately at hand for the gym or the swimming pool. Finished with a waterproof button in a football patter, this bag with a monotone logo is a real must-have for those who want to support their Club in a subtle way."
//     }
// }, {
//     "name": "Wine cooler",
//     "rating": 3,
//     "totalReviews": 1,
//     "price": "20.00",
//     "coverImage": "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/20220921_ITEMS1_web.jpg?v=1665090940&width=823",
//     "details": {
//         "images": ["https://cdn.shopify.com/s/files/1/0629/7881/8265/products/20220921_ITEMS1_web.jpg?v=1665090940&width=823", "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/wijnkoeler-3.jpg?v=1665090940&width=823"],
//         "description": "As Club supporters, we naturally have a lot of victories to celebrate. This cooler is ideal for keeping wine, cava or champagne fresh."
//     }
// }, {
//     "name": "Zwem Shorts Kids",
//     "rating": 5,
//     "totalReviews": 1,
//     "price": "25.00",
//     "coverImage": "https://cdn.shopify.com/s/files/1/0629/7881/8265/products/zwemshort-kids.jpg?v=1662064950&width=823",
//     "details": {
//         "images": ["https://cdn.shopify.com/s/files/1/0629/7881/8265/products/zwemshort-kids.jpg?v=1662064950&width=823"],
//         "description": "Besides playing football, do you also like to swim? With these blue swimming shorts you will have hours of fun."
//     }
// }

// ]

const fetchSummer = () => {
    return axios.get(`${config.BACKEND_ENDPOINT}/summer`)
}

function Landing() {
    const { data } = useQuery({
        queryKey: 'summers',
        queryFn: fetchSummer
    });

    
    return (
        <div className='bg-black w-[100vw] mobile:flex gap-[30px]  desktop:block flex-col items-center '>
            <Header />
            <div className='flex flex-col gap-[25px] items-center justify-center bannerText mobile:flex desktop:hidden'
            >
                <div className="uppercase  text-[5vw] text-softWhite font-bold tracking-tight"
                >END OF SEASON SALE -40%</div>
                <div className='text-softWhite text-[3.5vw] font-white'>Everything from Macro at absolute stunt prices!</div>
                <BlueButton >To the action</BlueButton>
            </div>

            {/**For Desktop */}
            <div className="relative bannerImg-container">
                <img src="https://cdn.shopify.com/s/files/1/0629/7881/8265/files/20230428_ClubBrugge_EOS-Salebis_1600x800_d11aab5d-b99e-414a-952c-0e168f465f80.jpg?v=1684140969&width=1600"
                    className='banner-img'
                />
                <div className='flex flex-col gap-[25px] absolute top-[50%] left-[5%] bannerText mobile:hidden desktop:flex'
                    style={{ transform: 'translate(-5%,-50%)' }}
                >
                    <div className="uppercase text-[48px] bebas text-softWhite font-bold tracking-wide"
                    >END OF SEASON SALE -40%</div>
                    <div className='text-softWhite font-white'>Everything from Macro at absolute stunt prices!</div>
                    <BlueButton width='180px'>To the action</BlueButton>
                </div>
            </div>

            {/**Summer Temperatures */}
            <div className='mx-[5vw]'>

                {/**For Desktop */}
                <div className='mobile:hidden desktop:flex items-center justify-between '>
                    <div className="uppercase py-[5vw] text-[48px] text-softWhite bebas font-bold tracking-wide"
                    >Summer Temperatures</div>
                    <BlackButton>Show more</BlackButton>
                </div>
                {/**For Mobile */}
                <div className='mobile:flex desktop:hidden  py-[5vw] items-start justify-between '>
                    <div className='flex flex-col'>
                        <div className="uppercase  text-[30px] text-softWhite font-bold tracking-tighter"
                        >Summer </div>
                        <div className="uppercase text-[30px] text-softWhite font-bold tracking-tighter"
                        >Temperatures</div>
                    </div>
                    <BlackButton paddingX='12px'>Show more</BlackButton>
                </div>
                {/**For both */}
                <div className='flex desktop:justify-between mobile:justify-center items-center gap-[20px] flex-wrap'>
                    {data && Array.isArray(data.data) && data.data.slice(0, 4).map(({ name, rating, price, coverImage }) => {
                        return <ProductCardV1
                            key={name}
                            name={name}
                            rating={rating}
                            price={price}
                            src={coverImage}
                        />
                    })}
                </div>
            </div>

            {/**Personalize Shirt */}
            <div className='w-[100%] flex items-center justify-center pb-[0px]'>
                <PersonalizeShirt />
            </div>

            {/**Desktop Collections */}
            <div className='w-[100%] flex items-center mobile:hidden mt-[100px] desktop:flex desktop:justify-between px-[75px] flex-wrap rounded-[10px] gap-[50px] mb-[100px]'>
                <div className='relative desktop:w-[40vw] mobile:w-[100vw] h-[225px] rounded-[10px] lastSection'>
                    <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/Desktop_upcycling.jpg?v=1679650253'
                        width='100%'
                        height={'325px'}
                        className='rounded-[10px] opacity-75'
                    />
                    <div className='absolute top-[0%] left-[10px] flex flex-col gap-[15px]'>
                        <div className='text-[48px] bebas uppercase text-white'>New Arrivals!</div>
                        <div className='text-[16px] text-softWhite'>The latest t-shirts,sweaters and gadgets from Club Brugge</div>
                        <BlueButton width='290px' semibold>Discover the new items</BlueButton>
                    </div>
                </div>
                <div className='relative desktop:w-[40vw] mobile:w-[90vw] rounded-[10px] h-[225px] lastSection'>
                    <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/t/89/assets/pattern-cta.svg?v=173226956600117115451679663932'
                        width='100%'
                        height={'325px'}
                        className='rounded-[10px] opacity-75'
                    />
                    <div className='absolute top-[0%] left-[10px] flex flex-col gap-[15px]'>
                        <div className='text-[48px] bebas uppercase text-white tracking-tight leading-10'>THE PERFECT GIFT<br />FOR A CLUB FAN</div>
                        <div className='text-[16px] text-softWhite'>Are you looking for a gift for an<br />adult,child or baby? Do you<br />have a specific budget in mind?</div>
                        <BlueButton width='180px' semibold>Find your gift</BlueButton>
                    </div>
                </div>

                <div className='relative desktop:w-[40vw] mobile:w-[90vw] rounded-[10px] h-[225px] lastSection'>
                    <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/Schermafbeelding_2023-05-06_205350.jpg?v=1683399247'
                        width='100%'
                        height={'325px'}
                        className='rounded-[10px] opacity-75'
                    />
                    <div className='absolute top-[20%] left-[10px] flex flex-col gap-[15px]'>
                        <div className='text-[48px] bebas uppercase text-white tracking-tight leading-10'>CLUB BRUGGE DARTS</div>
                        <div className='text-[16px] text-softWhite'>Now hit your 180's FCB style.</div>
                        <BlueButton width='280px' semibold>Discover the collection</BlueButton>
                    </div>
                </div>

                <div className='relative desktop:w-[40vw] mobile:w-[90vw] rounded-[10px] h-[225px] lastSection'>
                    <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/1891_hoodie_crew_pants.jpg?v=1665648767'
                        width='100%'
                        height={'325px'}
                        className='rounded-[10px] opacity-75'
                    />
                    <div className='absolute top-[20%] left-[10px] flex flex-col gap-[15px]'>
                        <div className='text-[48px] bebas uppercase text-white tracking-tight leading-10'>1891-OUR NUMBER</div>
                        <div className='text-[16px] text-softWhite'>The popular collection is not in stock.</div>
                        <BlueButton width='220px' semibold>To the collection</BlueButton>
                    </div>
                </div>
            </div>
            {/**Mobile Collections */}
            <div className='w-[100%] flex flex-col justify-center items-center mb-[100px] desktop:hidden mobile:flex'>
                <div className='w-[90%] flex flex-col items-center justify-center gap-[50px]'>
                    <div className='relative w-[90vw] h-[225px] rounded-[10px] lastSection'>
                        <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/Desktop_upcycling.jpg?v=1679650253'
                            width='100%'
                            height={'325px'}
                            className='rounded-[10px] opacity-75'
                        />
                        <div className='absolute top-[0%] left-[10px] flex flex-col gap-[15px]'>
                            <div className='text-[48px] bebas uppercase text-white'>New Arrivals!</div>
                            <div className='text-[16px] text-softWhite'>The latest t-shirts,sweaters and gadgets from Club Brugge</div>
                            <BlueButton width='290px' semibold>Discover the new items</BlueButton>
                        </div>
                    </div>
                    <div className='relative w-[90vw] rounded-[10px] h-[225px] lastSection'>
                        <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/t/89/assets/pattern-cta.svg?v=173226956600117115451679663932'
                            width='100%'
                            height={'325px'}
                            className='rounded-[10px] opacity-75'
                        />
                        <div className='absolute top-[0%] left-[10px] flex flex-col gap-[15px]'>
                            <div className='text-[48px] bebas uppercase text-white tracking-tight leading-10'>THE PERFECT GIFT<br />FOR A CLUB FAN</div>
                            <div className='text-[16px] text-softWhite'>Are you looking for a gift for an<br />adult,child or baby? Do you<br />have a specific budget in mind?</div>
                            <BlueButton width='180px' semibold>Find your gift</BlueButton>
                        </div>
                    </div>

                    <div className='relative w-[90vw] rounded-[10px] h-[225px] lastSection'>
                        <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/Schermafbeelding_2023-05-06_205350.jpg?v=1683399247'
                            width='100%'
                            height={'325px'}
                            className='rounded-[10px] opacity-75'
                        />
                        <div className='absolute top-[20%] left-[10px] flex flex-col gap-[15px]'>
                            <div className='text-[48px] bebas uppercase text-white tracking-tight leading-10'>CLUB BRUGGE DARTS</div>
                            <div className='text-[16px] text-softWhite'>Now hit your 180's FCB style.</div>
                            <BlueButton width='280px' semibold>Discover the collection</BlueButton>
                        </div>
                    </div>

                    <div className='relative w-[90vw] rounded-[10px] h-[225px] lastSection'>
                        <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/1891_hoodie_crew_pants.jpg?v=1665648767'
                            width='100%'
                            height={'325px'}
                            className='rounded-[10px] opacity-75'
                        />
                        <div className='absolute top-[20%] left-[10px] flex flex-col gap-[15px]'>
                            <div className='text-[48px] bebas uppercase text-white tracking-tight leading-10'>1891-OUR NUMBER</div>
                            <div className='text-[16px] text-softWhite'>The popular collection is not in stock.</div>
                            <BlueButton width='220px' semibold>To the collection</BlueButton>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >

    )
}

export default Landing;
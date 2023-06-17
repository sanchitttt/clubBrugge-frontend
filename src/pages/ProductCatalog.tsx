import axios from "axios";
import Footer from "../components/footer"
import Header from "../components/header"
import ProductCardV2 from "../components/productCards/v2"
import ProductFilters, { ValidProductFilterType } from "../components/productFilters"
import config from "../config";
import { useQuery } from "react-query";
import { motion } from 'framer-motion';
import { useState } from 'react';



const fetchProducts = () => {
    const url = window.location.href;
    const validOptions = ['official-competition-uniforms', 'clothing', 'fan-articles', 'new', 'summer'];
    for (let i = 0; i < validOptions.length; i++) {
        if (url.includes(validOptions[i])) {
            const currentUrl = window.location.href;
            const searchParams = currentUrl.split('?')[1];
            if (searchParams) return axios.get(`${config.BACKEND_ENDPOINT}/${validOptions[i]}?${searchParams}`);
            return axios.get(`${config.BACKEND_ENDPOINT}/${validOptions[i]}`);
        }
    }
}


function ProductCatalog() {
    const { data } = useQuery({
        queryKey: ['products', window.location.href],
        queryFn: fetchProducts,
    });
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    let productFilterType = "official-competition-uniforms";
    const url = window.location.href;
    if (url.includes('official-competition-uniforms')) productFilterType = "official-competition-uniforms"
    else if (url.includes('clothing')) productFilterType = 'clothing'
    else if (url.includes('fan-articles')) productFilterType = 'fan-articles';
    else if (url.includes('collections')) productFilterType = 'collections';
    else if (url.includes('new')) productFilterType = 'new'
    else if(url.includes('summer')) productFilterType = 'summer'
    return (
        <motion.div
        >
            <Header />
            <div className=''>
                <div className='flex desktop:flex-row mobile:flex-col gap-[10px] bg-black py-[30px]'>
                    <div className='fOne desktop:text-[40px] mobile:text-[34px] mx-[20px] text-softWhite uppercase tracking-tighter'>
                        {productFilterType.split('-').join(' ')}
                    </div>
                    <button className='mobile:flex desktop:hidden border-[1px] w-[100px] flex justify-center justify-center gap-[10px] ml-[20px] py-[10px] '
                        onClick={() => setShowMobileFilters(true)}
                    >
                        <svg className="icon-filter " width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.541827 0L0.515673 0.00949376C0.498402 0.00949376 0.481131 0.0147682 0.466327 0.0184602C0.412399 0.0279142 0.36004 0.0456802 0.310885 0.0712032C0.218281 0.119492 0.140121 0.194441 0.0851987 0.287619C0.0302763 0.380798 0.000770501 0.488508 0 0.598633V3.02481C0.000667971 3.14745 0.036871 3.26685 0.103628 3.36659L7.45037 14.1225V25.4095C7.4505 25.5207 7.47998 25.6297 7.53544 25.7238C7.59089 25.8179 7.67006 25.8934 7.76386 25.9416C7.85766 25.9898 7.96227 26.0088 8.06568 25.9963C8.1691 25.9838 8.26712 25.9403 8.34848 25.871L13.3399 21.6252C13.4047 21.5699 13.457 21.4996 13.4929 21.4197C13.5288 21.3398 13.5473 21.2523 13.5472 21.1637V14.123L20.8964 3.36975C20.9634 3.27035 20.9996 3.15102 21 3.0285V0.602325C21.0002 0.520734 20.9846 0.439976 20.9542 0.365142C20.9238 0.290308 20.8792 0.223021 20.8232 0.167523C20.7673 0.112024 20.7012 0.0695177 20.6291 0.0426825C20.557 0.0158473 20.4805 0.00526521 20.4044 0.0116035H0.654337C0.617367 0.00466941 0.579845 0.00166608 0.542321 0.00263731L0.541827 0Z" fill="#0572FF"></path>
                        </svg>
                        <div className='text-[14px] text-[#fff]'>Filters</div>
                    </button>
                </div>
            </div>
            <div className='flex desktop:items-start mobile:justify-center mobile:items-center mt-[30px]'>
                <motion.div
                    className=''
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <ProductFilters setShowFilter={setShowMobileFilters} showMobileFilter={showMobileFilters} data={data?.data} type={productFilterType as ValidProductFilterType} />
                </motion.div>
                <div className='mt-[50px] relative desktop:grid desktop:grid-cols-3 mobile:flex mobile:flex-col mobile:items-center mobile:gap-[10px] mobile:mx-[30px] mobile:grid-cols-1 desktop:gap-y-[60px] w-[100%] mb-[70px]'>
                    {data && Array.isArray(data.data) && data.data.map(({ _id, coverImage, name, price, rating, totalReviews, availableUnits }, idx) => {
                        return <ProductCardV2
                            href={`/products/${productFilterType}/${_id}`}
                            key={idx}
                            src={coverImage}
                            name={name}
                            price={price}
                            rating={+rating}
                            totalReviews={+totalReviews}
                            availableUnits={availableUnits}

                        />
                    })}
                    {data && Array.isArray(data.data) &&
                        <motion.div
                            className='absolute left-[10px] top-[-40px] text-[13px] text-[#91a4c2]'
                            initial={{ opacity: 0, y: -15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            {data.data.length} products
                        </motion.div>
                    }
                </div>
            </div>
            <Footer />
        </motion.div>
    )
}

export default ProductCatalog
import { useState } from 'react';
import { CartIcon } from '../icons';

export type Types = 'Home' | 'Away' | 'Third' | 'Keeper A' | 'Keeper H';


const homeTypeVariants = ['Men', 'Women', 'Girl'];
const restVariants = ['Adult', 'Kids'];
const kidsSizes = ['128', '140', '152', '164'];
const restSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];
const printing = ["No", "Player Name", "Your Name"];
const playerNames = [
    "4-Ordonez",
    "5-Hendry",
    "6-Odoi",
    "7-Skov olsen",
    "8-Otash",
    "9-Judge",
    "10-Lang",
    "14-Meijer",
    "15-Seventeen",
    "17-Buchanan",
    "19-Sowah",
    "20-Vanaken",
    "21-Bursik",
    "22-Mignolet",
    "23-Dung",
    "26-Zipper",
    "27-Nielsen",
    "28-Boyata",
    "30-Perez",
    "33-Shinton",
    "44-Mechele",
    "58-Spileers",
    "62-Shion",
    "64-Sabbe",
    "68-Talbi",
    "70-Yaremchuk",
    "76-Vermant",
    "77-Women",
    "89-Audoor",
    "91-Lamb man",
    "94-Sulla",
    "98 - Sandra"
]


const shirtTypeConfig = [
    { text: 'Home', img: 'https://cdn.shopify.com/s/files/1/0629/7881/8265/files/home.png?v=17800260030505079237' },
    { text: 'Away', img: 'https://cdn.shopify.com/s/files/1/0629/7881/8265/files/away.png?v=8751984048536069227' },
    { text: 'Third', img: 'https://cdn.shopify.com/s/files/1/0629/7881/8265/files/third.png?v=2016416794370674113' },
    { text: 'Keeper A', img: 'https://cdn.shopify.com/s/files/1/0629/7881/8265/files/keeper-a.png?v=4129095138702418124' },
    { text: 'Keeper H', img: 'https://cdn.shopify.com/s/files/1/0629/7881/8265/files/keeper-h.png?v=746283444459193986' },
]

function PersonalizeShirt() {
    const [hoveredType, setHoveredType] = useState<Types>('Home');
    const [selectedVariant, setSelectedVariant] = useState('Men');
    const [selectedSize, setSelectedSize] = useState('S');
    const [printingStatus, setPrintingStatus] = useState('No');
    const [selectedBadge, setSelectedBadge] = useState('No');
    const [playerName, setPlayerName] = useState("");
    const [playerNumber, setPlayerNumber] = useState("");
    const [selectedPlayerFromDropdown, setSelectedPlayerFromDropdown] = useState("");

    const optionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlayerFromDropdown(e.target.value);
        const arr = e.target.value.split("-");
        setPlayerName(arr[1])
        setPlayerNumber(arr[0])
    }

    if (window.innerWidth <= 1100) {
        return <div className='flex items-center justify-center mb-[75px] relative w-[90vw]  bg-darkGrey rounded-[15px]'>
            <div className='w-[90%] desktop:h-[90%] mobile:h-[95%]'>
                <div className='flex mobile:flex-col desktop:flex-row  justify-between   '>
                    {/**Left Side */}
                    <div className="flex flex-col justify-center items-center ">
                        <div className='uppercase text-white text-[34px] bebas' style={{ textAlign: 'center' }}>Your official <br />match quality shirt!</div>
                        <div className='text-white text-[15px] mb-[20px]' style={{ textAlign: 'center' }}>Personalize your own shirt or opt for an official player shirt!</div>

                        {hoveredType === 'Home' ?
                            <div className='relative'>
                                <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/player_home.back_35416a25-5f16-4af4-9f6f-3e7d00c4301c.png?v=1674033187&width=600'

                                    alt='homeShirt'
                                // width='225px'
                                // height={'225px'}
                                />
                                {playerName && <div className='bebas text-white text-[8vw] absolute top-[70%] left-[50%] uppercase'
                                    style={{ transform: 'translate(-50%,-70%)' }}
                                >{playerName}
                                </div>
                                }
                                {
                                    playerNumber && <div className='bebas text-white text-[30vw] absolute top-[35%] left-[50%] uppercase'
                                        style={{ transform: 'translate(-50%,-35%)' }}
                                    >{playerNumber}
                                    </div>
                                }
                                {
                                    selectedBadge === 'JPL (full)' && <div className='absolute top-[10%] bg-[#fff] rounded-full left-[90%] uppercase'
                                        style={{ transform: 'translate(-90%,0%)' }}
                                    ><div className='w-[45px] h-[45px] flex items-center justify-center'>
                                            <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/pro-league-logo-7990FD21E6-seeklogo_2.png?v=1655910198&width=70' alt=''
                                                width='22.5px'
                                                height={'22.5px'}
                                            />
                                        </div>
                                    </div>
                                }
                                {
                                    selectedBadge === 'JPL (only)' && <div className='absolute top-[10%] bg-[#fff] rounded-full left-[90%] uppercase'
                                        style={{ transform: 'translate(-90%,0%)' }}
                                    ><div className='w-[45px] h-[45px] flex items-center justify-center'>
                                            <img
                                                src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/ProLeague_championsbadge_new.png?v=1663835989&width=70'
                                                alt=''
                                                width='22.5px'
                                                height={'22.5px'}

                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            : hoveredType === 'Away' ?
                                <div className='relative'>
                                    <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/player_away.back_3a3fbaa5-d2b3-49d0-a032-e6b891350201.png?v=1674033126&width=600'
                                        alt='awayShirt' />
                                    {playerName && <div className={`bebas text-black text-[8vw] absolute top-[70%] left-[50%] uppercase`}
                                        style={{ transform: 'translate(-50%,-70%)' }}
                                    >{playerName}
                                    </div>
                                    }
                                    {
                                        playerNumber && <div className='bebas text-black text-[30vw]  absolute top-[35%] left-[50%] uppercase'
                                            style={{ transform: 'translate(-50%,-35%)' }}
                                        >{playerNumber}
                                        </div>
                                    }
                                </div> :
                                hoveredType === 'Third' ?
                                    <div className='relative'>
                                        <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/player_third.back_589329ff-a9df-4a10-94c9-c65610a36776.png?v=1674033244&width=600'
                                            alt='thirdShirt' />
                                        {playerName && <div className='bebas text-white text-[8vw] absolute top-[70%] left-[50%] uppercase'
                                            style={{ transform: 'translate(-50%,-70%)' }}
                                        >{playerName}
                                        </div>
                                        }
                                        {
                                            playerNumber && <div className='bebas text-white text-[30vw]  absolute top-[35%] left-[50%] uppercase'
                                                style={{ transform: 'translate(-50%,-35%)' }}
                                            >{playerNumber}
                                            </div>
                                        }
                                    </div> :
                                    hoveredType === 'Keeper A' ?
                                        <div className='relative'>
                                            <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/keeper_yellow.back_514410e6-f6ef-4f90-82ab-ea05b033b8a7.png?v=1674032036&width=600'
                                                alt='keeperAShirt' />
                                            {playerName && <div className='bebas text-white text-[8vw] absolute top-[70%] left-[50%] uppercase'
                                                style={{ transform: 'translate(-50%,-70%)' }}
                                            >{playerName}
                                            </div>
                                            }
                                            {
                                                playerNumber && <div className='bebas text-white text-[30vw]  absolute top-[35%] left-[50%] uppercase'
                                                    style={{ transform: 'translate(-50%,-35%)' }}
                                                >{playerNumber}
                                                </div>
                                            }
                                        </div> :
                                        <div className='relative'>
                                            <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/keeper_red.back_0d50aeed-031d-47d7-a466-f6d00c2eabb5.png?v=1684157303&width=600'
                                                alt='keeperAShirt' />
                                            {playerName && <div className='bebas text-white text-[8vw] absolute top-[70%] left-[50%] uppercase'
                                                style={{ transform: 'translate(-50%,-70%)' }}
                                            >{playerName}
                                            </div>
                                            }
                                            {
                                                playerNumber && <div className='bebas text-white text-[30vw]  absolute top-[35%] left-[50%] uppercase'
                                                    style={{ transform: 'translate(-50%,-35%)' }}
                                                >{playerNumber}
                                                </div>
                                            }
                                        </div>
                        }
                        <div className='text-white text-[18px] w-[100%]'>$ 59.50
                            {(playerName || playerNumber) && (selectedBadge !== 'No') && <span className='text-[#c9d9f2] bg-midGrey text-[15px] ml-[10px] px-[5px]'>+22.50</span>}
                            {(playerName || playerNumber) && (selectedBadge === 'No') && <span className='text-[#c9d9f2] bg-midGrey text-[15px] ml-[10px] px-[5px]'>+15.00</span>}
                        </div>
                    </div>
                    <div className="flex-col flex gap-[30px] h-[175px] overflow-scroll">
                        <div className='flex flex-col gap-[-5px] justify-start items-start'>

                        </div>
                        <div className='flex flex-col gap-[20px]'>
                            <div className='flex gap-[5px] mb-[10px] flex-col'>
                                <div className='text-softGrey text-[13px] mr-[35px]'>Type</div>
                                <div className='flex gap-[10px] overflow-scroll'>
                                    {shirtTypeConfig.map(({ text, img }) => {
                                        return <button key={img} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[6px] py-[3px] rounded-[2px] ${hoveredType === text && 'bg-blue'}`}
                                            onClick={() => setHoveredType(text as Types)}
                                        >
                                            <div className='w-[18px] h-[18px] flex items-center justify-center rounded-full'>
                                                <img width={'100%'} height={'100%'} src={img} alt='' />
                                            </div>
                                            <div className="text-white text-[13px] whitespace-nowrap">{text}</div>
                                        </button>
                                    })}
                                </div>
                            </div>
                            <div className='flex gap-[5px] mb-[10px] flex-col'>

                                <div className='text-softGrey text-[13px] mr-[20px]'>Variant</div>
                                <div>
                                    <div className='flex gap-[5px]'>
                                        {hoveredType === 'Home' ?
                                            homeTypeVariants.map((item) => {
                                                return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[10px] py-[4px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedVariant === item && 'bg-blue'}`}
                                                    onClick={() => setSelectedVariant(item)}
                                                >
                                                    {item}
                                                </button>
                                            }) : restVariants.map((item) => {
                                                return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[10px] py-[4px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedVariant === item && 'bg-blue'}`}
                                                    onClick={() => setSelectedVariant(item)}
                                                >
                                                    {item}
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-[5px] mb-[10px] flex-col'>
                                <div className='text-softGrey text-[13px] mr-[35px]'>Sizes</div>
                                <div className='flex gap-[5px] overflow-scroll'>
                                    {selectedVariant === 'Girl' || selectedVariant === 'Kids' ?
                                        kidsSizes.map((item) => {
                                            return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[15px] py-[6px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedSize === item && 'bg-blue'}`}
                                                onClick={() => setSelectedSize(item)}
                                            >
                                                {item}
                                            </button>
                                        }) : restSizes.map((item) => {
                                            return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[15px] py-[6px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedSize === item && 'bg-blue'}`}
                                                onClick={() => setSelectedSize(item)}
                                            >
                                                {item}
                                            </button>
                                        })
                                    }
                                </div>
                            </div>
                            <div className='flex gap-[5px] mb-[25px] flex-col'>
                                <div className='text-softGrey text-[13px] mr-[15px]'>Printing</div>
                                <div className='flex gap-[5px]'>
                                    {printing.map((item) => {
                                        return <button key={item} className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[12px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${printingStatus === item && 'bg-blue'}`}
                                            onClick={() => {
                                                setPrintingStatus(item);
                                                setPlayerName("");
                                                setPlayerNumber("");
                                            }}
                                        >
                                            {item}
                                            {item !== 'No' && <div className='absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                +15,00
                                            </div>}

                                        </button>
                                    })}
                                </div>
                            </div>
                            {printingStatus === 'Player Name' &&
                                <div className='flex items-center justify-center'>
                                    <select value={selectedPlayerFromDropdown} onChange={optionChangeHandler} name='playerName' className='bg-midGrey text-[#c9d9f2] py-[5px] px-[30px] rounded-full'>
                                        <option disabled selected>Player</option>
                                        {playerNames.map((item) => {
                                            return <option className='bg-midGrey text-[#c9d9f2]' value={item}>{item}</option>
                                        })}
                                    </select>
                                </div>
                            }
                            {printingStatus === 'Your Name' &&
                                <div className='flex gap-[15px] '>
                                    <input
                                        className='bg-midGrey w-[150px] text-[#c9d9f2] py-[5px] px-[5px] rounded-full'
                                        type='text'
                                        value={playerName}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 12) setPlayerName(e.target.value);
                                        }}
                                        placeholder='Name'
                                        style={{ textAlign: 'center' }}
                                    />
                                    <input
                                        className='bg-midGrey text-[#c9d9f2] w-[100px] py-[5px] px-[5px] rounded-full'
                                        type='number'
                                        value={playerNumber}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 2) setPlayerNumber(e.target.value);
                                        }}
                                        placeholder='Number'
                                        style={{ textAlign: 'center' }}
                                    />
                                </div>
                            }
                            <div className='flex gap-[5px] mb-[10px] flex-col'>
                                <div className='text-softGrey text-[13px] mr-[20px]'>Badge</div>
                                <div className='flex gap-[5px]'>
                                    <button className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[12px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedBadge === 'No' && 'bg-blue'}`}
                                        onClick={() => setSelectedBadge('No')}
                                    >
                                        No
                                    </button>
                                    <button className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[30px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedBadge === 'JPL (only)' && 'bg-blue'}`}
                                        onClick={() => setSelectedBadge('JPL (only)')}
                                    >
                                        <img src="//cdn.shopify.com/s/files/1/0629/7881/8265/products/ProLeague_championsbadge_new.png?v=1663835989&amp;width=24" width="20"></img>
                                        <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                            {"JP (only)"}
                                            <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                +7.5
                                            </div>

                                        </div>
                                    </button>
                                    <button className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[30px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedBadge === 'JPL (full)' && 'bg-blue'}`}
                                        onClick={() => setSelectedBadge('JPL (full)')}
                                    >
                                        <img src="//cdn.shopify.com/s/files/1/0629/7881/8265/products/pro-league-logo-7990FD21E6-seeklogo_2.png?v=1655910198&amp;width=24" width="20" />
                                        <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                            {"JP (full)"}
                                            <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                +7.5
                                            </div>

                                        </div>
                                    </button>
                                </div>
                            </div>

                        </div>



                    </div>

                    <div className='flex items-center justify-center py-[30px]'>
                        <button
                            aria-describedby="button"
                            className=' blueButton h-[50px] font-semibold w-[300px] gap-[10px] py-[20px] btn flex items-center  justify-center text-white uppercase tracking-wider'
                            // style={{ transform: 'translate(-50%,0%)' }}
                        >
                            <CartIcon />
                            Shopping Basket ›

                        </button>
                    </div>

                    {/**Right Side */}

                </div>
            </div>
        </div >
    }
    else {


        return (
            <div className='flex items-center justify-center w-[90vw] desktop:h-[800px] mobile:h-[1500px] bg-darkGrey rounded-[15px]'>
                <div className='w-[90%] desktop:h-[90%] mobile:h-[95%]'>
                    <div className='flex mobile:flex-col desktop:flex-row  justify-between  mobile:gap-[100px] '>
                        {/**Left Side */}

                        <div className="flex-col flex gap-[30px]">
                            <div className='flex flex-col gap-[-5px]'>
                                <div className='uppercase text-white text-[48px] bebas'>Your official match quality shirt!</div>
                                <div className='text-white text-[15px] '>Personalize your own shirt or opt for an official player shirt!</div>
                                <div className='text-white text-[18px] '>$ 59.50
                                    {(playerName || playerNumber) && (selectedBadge !== 'No') && <span className='text-[#c9d9f2] bg-midGrey text-[15px] ml-[10px] px-[5px]'>+22.50</span>}
                                    {(playerName || playerNumber) && (selectedBadge === 'No') && <span className='text-[#c9d9f2] bg-midGrey text-[15px] ml-[10px] px-[5px]'>+15.00</span>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-[20px]'>
                                <div className='flex gap-[5px] mb-[10px]'>
                                    <div className='text-softGrey text-[13px] mr-[35px]'>Type</div>
                                    {shirtTypeConfig.map(({ text, img }) => {
                                        return <button key={img} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[6px] py-[3px] rounded-[2px] ${hoveredType === text && 'bg-blue'}`}
                                            onClick={() => setHoveredType(text as Types)}
                                        >
                                            <div className='w-[18px] h-[18px] flex items-center justify-center rounded-full'>
                                                <img width={'100%'} height={'100%'} src={img} alt='' />
                                            </div>
                                            <div className="text-white text-[13px] whitespace-nowrap">{text}</div>
                                        </button>
                                    })}
                                </div>
                                <div className='flex gap-[5px] mb-[10px]'>
                                    <div className='text-softGrey text-[13px] mr-[20px]'>Variant</div>
                                    <div className='flex gap-[5px]'>
                                        {hoveredType === 'Home' ?
                                            homeTypeVariants.map((item) => {
                                                return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[10px] py-[4px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedVariant === item && 'bg-blue'}`}
                                                    onClick={() => setSelectedVariant(item)}
                                                >
                                                    {item}
                                                </button>
                                            }) : restVariants.map((item) => {
                                                return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[10px] py-[4px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedVariant === item && 'bg-blue'}`}
                                                    onClick={() => setSelectedVariant(item)}
                                                >
                                                    {item}
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-[5px] mb-[10px]'>
                                    <div className='text-softGrey text-[13px] mr-[35px]'>Sizes</div>
                                    <div className='flex gap-[5px]'>
                                        {selectedVariant === 'Girl' || selectedVariant === 'Kids' ?
                                            kidsSizes.map((item) => {
                                                return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white px-[15px] py-[6px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedSize === item && 'bg-blue'}`}
                                                    onClick={() => setSelectedSize(item)}
                                                >
                                                    {item}
                                                </button>
                                            }) : restSizes.map((item) => {
                                                return <button key={item} className={`shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[15px] py-[6px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedSize === item && 'bg-blue'}`}
                                                    onClick={() => setSelectedSize(item)}
                                                >
                                                    {item}
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='flex gap-[5px] mb-[25px]'>
                                    <div className='text-softGrey text-[13px] mr-[15px]'>Printing</div>
                                    <div className='flex gap-[5px]'>
                                        {printing.map((item) => {
                                            return <button key={item} className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[12px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${printingStatus === item && 'bg-blue'}`}
                                                onClick={() => {
                                                    setPrintingStatus(item);
                                                    setPlayerName("");
                                                    setPlayerNumber("");
                                                }}
                                            >
                                                {item}
                                                {item !== 'No' && <div className='absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                    +15,00
                                                </div>}

                                            </button>
                                        })}
                                    </div>
                                </div>
                                {printingStatus === 'Player Name' &&
                                    <div className='ml-[70px]'>
                                        <select value={selectedPlayerFromDropdown} onChange={optionChangeHandler} name='playerName' className='bg-midGrey text-[#c9d9f2] py-[5px] px-[30px] rounded-full'>
                                            <option disabled selected>Player</option>
                                            {playerNames.map((item) => {
                                                return <option className='bg-midGrey text-[#c9d9f2]' value={item}>{item}</option>
                                            })}
                                        </select>
                                    </div>
                                }
                                {printingStatus === 'Your Name' &&
                                    <div className='flex gap-[15px] ml-[70px]'>
                                        <input
                                            className='bg-midGrey w-[250px] text-[#c9d9f2] py-[5px] px-[5px] rounded-full'
                                            type='text'
                                            value={playerName}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 12) setPlayerName(e.target.value);
                                            }}
                                            placeholder='Name'
                                            style={{ textAlign: 'center' }}
                                        />
                                        <input
                                            className='bg-midGrey text-[#c9d9f2] w-[100px] py-[5px] px-[5px] rounded-full'
                                            type='number'
                                            value={playerNumber}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 2) setPlayerNumber(e.target.value);
                                            }}
                                            placeholder='Number'
                                            style={{ textAlign: 'center' }}
                                        />
                                    </div>
                                }
                                <div className='flex gap-[5px] mb-[10px]'>
                                    <div className='text-softGrey text-[13px] mr-[20px]'>Badge</div>
                                    <div className='flex gap-[5px]'>
                                        <button className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[12px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedBadge === 'No' && 'bg-blue'}`}
                                            onClick={() => setSelectedBadge('No')}
                                        >
                                            No
                                        </button>
                                        <button className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[30px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedBadge === 'JPL (only)' && 'bg-blue'}`}
                                            onClick={() => setSelectedBadge('JPL (only)')}
                                        >
                                            <img src="//cdn.shopify.com/s/files/1/0629/7881/8265/products/ProLeague_championsbadge_new.png?v=1663835989&amp;width=24" width="20"></img>
                                            <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                {"JP (only)"}
                                                <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                    +7.5
                                                </div>

                                            </div>
                                        </button>
                                        <button className={`relative shirtTypeBlueHover flex gap-[5px] border-[1px] border-white  px-[30px] py-[5px] rounded-[2px] text-white text-[13px] whitespace-nowrap ${selectedBadge === 'JPL (full)' && 'bg-blue'}`}
                                            onClick={() => setSelectedBadge('JPL (full)')}
                                        >
                                            <img src="//cdn.shopify.com/s/files/1/0629/7881/8265/products/pro-league-logo-7990FD21E6-seeklogo_2.png?v=1655910198&amp;width=24" width="20" />
                                            <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                {"JP (full)"}
                                                <div className='flex flex-col absolute top-[110%] left-[50%] text-softGrey bg-midGrey rounded-full px-[10px]' style={{ transform: 'translate(-50%,0%)' }}>
                                                    +7.5
                                                </div>

                                            </div>
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className='mt-[75px]'>
                                <button
                                    aria-describedby="button"
                                    className='relative blueButton h-[50px] font-semibold w-[350px] gap-[10px] py-[20px] btn flex items-center  justify-center text-white uppercase tracking-wider'
                                // style={{ width: width && width }}
                                >
                                    <CartIcon />
                                    Shopping Basket ›

                                </button>
                            </div>

                        </div>

                        {/**Right Side */}
                        <div className="flex flex-col justify-center items-center">
                            {hoveredType === 'Home' ?
                                <div className='relative'>
                                    <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/player_home.back_35416a25-5f16-4af4-9f6f-3e7d00c4301c.png?v=1674033187&width=600'
                                        alt='homeShirt'
                                        width='600px'
                                        height={'600px'}
                                    />
                                    {playerName && <div className='bebas text-white text-[3vw] absolute top-[70%] left-[50%] uppercase'
                                        style={{ transform: 'translate(-50%,-70%)' }}
                                    >{playerName}
                                    </div>
                                    }
                                    {
                                        playerNumber && <div className='bebas text-white text-[10vw] absolute top-[35%] left-[50%] uppercase'
                                            style={{ transform: 'translate(-50%,-35%)' }}
                                        >{playerNumber}
                                        </div>
                                    }
                                    {
                                        selectedBadge === 'JPL (full)' && <div className='absolute top-[10%] bg-[#fff] rounded-full left-[90%] uppercase'
                                            style={{ transform: 'translate(-90%,0%)' }}
                                        ><div className='w-[120px] h-[120px] flex items-center justify-center'>
                                                <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/pro-league-logo-7990FD21E6-seeklogo_2.png?v=1655910198&width=70' alt='' />
                                            </div>
                                        </div>
                                    }
                                    {
                                        selectedBadge === 'JPL (only)' && <div className='absolute top-[10%] bg-[#fff] rounded-full left-[90%] uppercase'
                                            style={{ transform: 'translate(-90%,0%)' }}
                                        ><div className='w-[120px] h-[120px] flex items-center justify-center'>
                                                <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/ProLeague_championsbadge_new.png?v=1663835989&width=70' alt='' />
                                            </div>
                                        </div>
                                    }
                                </div>
                                : hoveredType === 'Away' ?
                                    <div className='relative'>
                                        <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/player_away.back_3a3fbaa5-d2b3-49d0-a032-e6b891350201.png?v=1674033126&width=600'
                                            alt='awayShirt' />
                                        {playerName && <div className={`bebas text-black text-[36px] absolute top-[70%] left-[50%] uppercase`}
                                            style={{ transform: 'translate(-50%,-70%)' }}
                                        >{playerName}
                                        </div>
                                        }
                                        {
                                            playerNumber && <div className='bebas text-black text-[180px] absolute top-[35%] left-[50%] uppercase'
                                                style={{ transform: 'translate(-50%,-35%)' }}
                                            >{playerNumber}
                                            </div>
                                        }
                                    </div> :
                                    hoveredType === 'Third' ?
                                        <div className='relative'>
                                            <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/player_third.back_589329ff-a9df-4a10-94c9-c65610a36776.png?v=1674033244&width=600'
                                                alt='thirdShirt' />
                                            {playerName && <div className='bebas text-white text-[36px] absolute top-[70%] left-[50%] uppercase'
                                                style={{ transform: 'translate(-50%,-70%)' }}
                                            >{playerName}
                                            </div>
                                            }
                                            {
                                                playerNumber && <div className='bebas text-white text-[180px] absolute top-[35%] left-[50%] uppercase'
                                                    style={{ transform: 'translate(-50%,-35%)' }}
                                                >{playerNumber}
                                                </div>
                                            }
                                        </div> :
                                        hoveredType === 'Keeper A' ?
                                            <div className='relative'>
                                                <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/products/keeper_yellow.back_514410e6-f6ef-4f90-82ab-ea05b033b8a7.png?v=1674032036&width=600'
                                                    alt='keeperAShirt' />
                                                {playerName && <div className='bebas text-white text-[36px] absolute top-[70%] left-[50%] uppercase'
                                                    style={{ transform: 'translate(-50%,-70%)' }}
                                                >{playerName}
                                                </div>
                                                }
                                                {
                                                    playerNumber && <div className='bebas text-white text-[180px] absolute top-[35%] left-[50%] uppercase'
                                                        style={{ transform: 'translate(-50%,-35%)' }}
                                                    >{playerNumber}
                                                    </div>
                                                }
                                            </div> :
                                            <div className='relative'>
                                                <img src='https://cdn.shopify.com/s/files/1/0629/7881/8265/files/keeper_red.back_0d50aeed-031d-47d7-a466-f6d00c2eabb5.png?v=1684157303&width=600'
                                                    alt='keeperAShirt' />
                                                {playerName && <div className='bebas text-white text-[36px] absolute top-[70%] left-[50%] uppercase'
                                                    style={{ transform: 'translate(-50%,-70%)' }}
                                                >{playerName}
                                                </div>
                                                }
                                                {
                                                    playerNumber && <div className='bebas text-white text-[180px] absolute top-[35%] left-[50%] uppercase'
                                                        style={{ transform: 'translate(-50%,-35%)' }}
                                                    >{playerNumber}
                                                    </div>
                                                }
                                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default PersonalizeShirt
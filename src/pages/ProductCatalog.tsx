import axios from "axios";
import Footer from "../components/footer"
import Header from "../components/header"
import ProductCardV2 from "../components/productCards/v2"
import ProductFilters, { ValidProductFilterType } from "../components/productFilters"
import config from "../config";
import { useQuery } from "react-query";
import { motion } from 'framer-motion';
import { useState } from 'react';

// const officialCompetitionKits = [
//     {
//         "competitionKit": "home",
//         "availableUnits": {
//             "S": 0,
//             "M": 0,
//             "L": 0,
//             "XL": 0,
//             "XXL": 0,
//             "3XL": 0,
//             "4XL": 0,
//             "5XL": 10
//         },
//         "genderType": "men",
//         "price": "59.50",
//         "color": ["blue", "black"],
//         "coverImage": "https://i.ibb.co/C8LbtjN/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/C8LbtjN/1.webp", "https://i.ibb.co/z6Dtbb8/2.webp", "https://i.ibb.co/Xk0X84H/3.webp", "https://i.ibb.co/F6KPD5S/4.webp", "https://i.ibb.co/c82Lb3G/5.webp", "https://i.ibb.co/JFx7fWq/6.webp", "https://i.ibb.co/XsYJQdr/7.webp"],
//             "description": "The Club Brugge Home Kit is a modern remake of the iconic shirt with which Club became the first Belgian team ever to play in the Champions League.The link with that legendary shirt from '92 is mainly in the retro details:\n        .The collar is a rounded V - neck without buttons,\n        but stands nicely upright.\n        .This year,\n        more stripes and more blue were chosen.\n        .Some subtle elements give the jersey a modern look : from the new 'No Sweat No Glory'\n        logo embroidered in the neck to the blue 1891 at the bottom of the side of the shirt\n        Thanks to Macron 's M Performance System technology, the polyester shirt feels very light. The breathable fabric ensures sufficient cooling during wear and makes it very comfortable to\n        wear.",
//             "characteristics": "Match quality: this is the shirt the players wear on the pitch,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,\n• Top quality from the Italian Macron,\n• 100% polyester,\n• Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\nWash at 30°C - do not tumble dry - do not dry clean - iron at low temperature.",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         },
//         "rating": "5",
//         "totalReviews": "15",
//         "name": "Home shirt"
//     },
//     {
//         "competitionKit": "home",
//         "availableUnits": {
//             "35-38": 10,
//             "39-42": 0,
//             "43-46": 10,
//             "47-50": 10
//         },
//         "genderType": "all",
//         "price": "11.20",
//         "color": ["blue"],
//         "rating": "5",
//         "name": "Home socks",
//         "totalReviews": "1",
//         "coverImage": "https://i.ibb.co/2P3K9FF/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/2P3K9FF/1.webp"],
//             "description": "The home socks for the 22/23 season are completely blue. The cuff of the stockings is finished with some black, fine stripes. This way they form 1 whole with the shirt and shorts."
//         }
//     },
//     {
//         "competitionKit": "home",
//         "color": ["black"],
//         "availableUnits": {
//             "S": 0,
//             "M": 0,
//             "L": 0,
//             "XL": 0,
//             "XXL": 0,
//             "3XL": 0
//         },
//         "rating": "5",
//         "totalReviews": "2",
//         "price": "27.30",
//         "name": "Home shorts",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/jvFvYGw/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/jvFvYGw/1.webp", "https://i.ibb.co/QbZQts2/2.webp", "https://i.ibb.co/vDRksY6/3.webp"],
//             "description": "The home short for the 22/23 season is black with a striking blue triangle running down the side in a point. The elastic is 'open' at the back and offers an extra comfortable feeling.",
//             "characteristics": "• Match quality: this is the short that the players wear on the field, \n• Top quality of the Italian Macron,\n •100% polyester, \n• Comfortable and breathable fabric: Macro Performance System, \n• Available in size S to 3XL \n• Washing at 30C- must not steam in the dryer  - iron at low temperature"
//         }
//     },
//     {
//         "competitionKit": "home",
//         "color": ["black", "blue"],
//         "availableUnits": {
//             "S": 0,
//             "M": 10,
//             "L": 10,
//             "XL": 10,
//             "XXL": 10,
//             "3XL": 10,
//             "4XL": 10,
//             "5XL": 10
//         },
//         "rating": "5",
//         "totalReviews": "2",
//         "price": "59.50",
//         "name": "Home shirt",
//         "genderType": "women",
//         "coverImage": "https://i.ibb.co/3zwFGR4/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/3zwFGR4/1.webp", "https://i.ibb.co/QbZQts2/2.webp", "https://i.ibb.co/vDRksY6/3.webp", "https://i.ibb.co/c82Lb3G/5.webp", "https://i.ibb.co/JFx7fWq/6.webp", "https://i.ibb.co/XsYJQdr/7.webp"],
//             "description": "Two Colours, One Family. Do you want to be part of the Blauw-Zwart family? Then our Home Kit is for you!\nThe Club Brugge Home Kit is a modern remake of the iconic shirt with which Club became the first Belgian team ever to play in the Champions League. The link with that legendary shirt from '92 is mainly in the retro details:\n.The collar is a rounded V-neck without buttons, but stands nicely upright. This year, more stripes and more blue were chosen.\n. Some subtle elements give the jersey a modern look: from the new 'No Sweat No Glory' logo embroidered in the neck to the blue 1891 at the bottom of the side of the shirt\nThanks to Macron's M Performance System technology, the polyester shirt feels very light. The breathable fabric ensures sufficient cooling during wear and makes it very comfortable to wear.",
//             "characteristics": "• Match quality: this is the shirt the players wear on the pitch,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,.\nTop quality from the Italian Macron,\n• 100% polyester,\n•Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\n",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "away",
//         "color": ["white", "blue"],
//         "availableUnits": {
//             "S": 0,
//             "M": 10,
//             "L": 10,
//             "XL": 10,
//             "XXL": 10,
//             "3XL": 10,
//             "4XL": 0,
//             "5XL": 10
//         },
//         "rating": "4.5",
//         "totalReviews": "15",
//         "price": "59.50",
//         "name": "Away shirt",
//         "genderType": "men",
//         "coverImage": "https://i.ibb.co/GJvvhZT/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/GJvvhZT/1.webp", "https://i.ibb.co/kQV2XML/2.webp", "https://i.ibb.co/LnQFstJ/3.webp", "https://i.ibb.co/6mjjySW/4.webp"],
//             "description": "Stylish and bold. We make an impression weverywhere we go. With this new white Away Kit we go full for the three points, wherever. \n In this classic white shirt you see: \n •No Sweat No Glory embroidered standing on the neck \n• 1891 embroidered on the side of the kit \n • A bold Blue-Black pattern on the white shirts",
//             "characteristics": "• Italian top quality from Macron \n •The same shirt in which the players play their matches \n • Slim fit \n • Korean collar \n • Softlock polyester met Micromesh rug (BAIMI)",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "away",
//         "color": ["white", "blue"],
//         "availableUnits": {
//             "128": 10,
//             "140": 10,
//             "152": 0,
//             "164": 0
//         },
//         "rating": "4.5",
//         "totalReviews": "6",
//         "price": "49.00",
//         "name": "Away shirt",
//         "genderType": "kids",
//         "coverImage": "https://i.ibb.co/MNWhdRw/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/MNWhdRw/1.webp", "https://i.ibb.co/Y2B4xNW/2.webp"],
//             "description": "Stylish and bold. We make an impression weverywhere we go. With this new white Away Kit we go full for the three points, wherever. \n In this classic white shirt you see: \n •No Sweat No Glory embroidered standing on the neck \n• 1891 embroidered on the side of the kit \n • A bold Blue-Black pattern on the white shirts",
//             "characteristics": "• Italian top quality from Macron \n •The same shirt in which the players play their matches \n • Slim fit \n • Korean collar \n • Softlock polyester met Micromesh rug (BAIMI)",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "away",
//         "color": ["white"],
//         "availableUnits": {
//             "S": 10,
//             "M": 0,
//             "L": 0,
//             "XL": 10,
//             "XXL": 10,
//             "3XL": 10
//         },
//         "rating": "5",
//         "totalReviews": "1",
//         "price": "27.30",
//         "name": "Away shorts",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/GJBNqf9/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/GJBNqf9/1.webp"],
//             "description": "Stylish and bold. We make an impression weverywhere we go. With this new white Away Kit we go full for the three points, wherever. \n In this classic white shirt you see: \n •No Sweat No Glory embroidered standing on the neck \n• 1891 embroidered on the side of the kit \n • A bold Blue-Black pattern on the white shirts",
//             "characteristics": "• Italian top quality from Macron \n •The same shirt in which the players play their matches \n • Slim fit \n • Korean collar \n • Softlock polyester met Micromesh rug (BAIMI)",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "third",
//         "color": ["black"],
//         "availableUnits": {
//             "S": 10,
//             "M": 10,
//             "L": 10,
//             "XL": 10,
//             "XXL": 0,
//             "3XL": 0,
//             "4XL": 0,
//             "5XL": 0
//         },
//         "rating": "4.5",
//         "totalReviews": "28",
//         "price": "59.50",
//         "name": "Third shirt",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/FbQVVCx/1.webp",
//         "details": {
//             "images": ["https://i.ibb.co/FbQVVCx/1.webp", "https://i.ibb.co/6RCMrpS/2.webp", "https://i.ibb.co/6FnNjY7/3.webp", "https://i.ibb.co/X7YgXVS/4.webp", "https://i.ibb.co/ZgS28vZ/image.png", "https://i.ibb.co/9bG46zC/image.png"],
//             "description": "For the first time in our history. Full black, Our third shirt completes the seasonal collection in our main colours: blue,black and white. Stylish for any occasion.\n On this shirt you see: \n • A minimalist design with a short collar and a nice fit\n• Just like the home and away shirt 'No Sweat No Glory' embroidered in the neck. 1891 is then again visible on the side\n• A light blue accent that was fished out of S19-20's third shirt and last year's Heritage shirt. It is also fully in line with the current training collection.\n Macron's M Performance System technology completes the design and ensures sufficient cooling and a comfortable feeling.",
//             "characteristics": "Match quality: this is the shirt the players wear on the pitch,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,\n• Top quality from the Italian Macron,\n• 100% polyester,\n• Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\nWash at 30°C - do not tumble dry - do not dry clean - iron at low temperature.",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "third",
//         "color": ["black"],
//         "availableUnits": {
//             "128": "10",
//             "149": "10",
//             "152": "10",
//             "164": "10"
//         },
//         "rating": "4.5",
//         "totalReviews": "4",
//         "price": "49.00",
//         "name": "Third shirt kids 22/23",
//         "genderType": "kids",
//         "coverImage": "https://i.ibb.co/Y2FNw03/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/FbQVVCx/1.webp", "https://i.ibb.co/TYWwVtz/image.png", "https://i.ibb.co/vD05nWn/image.png", "https://i.ibb.co/M2Kf1sK/image.png"],
//             "description": "For the first time in our history. Full black, Our third shirt completes the seasonal collection in our main colours: blue,black and white. Stylish for any occasion.\n On this shirt you see: \n • A minimalist design with a short collar and a nice fit\n• Just like the home and away shirt 'No Sweat No Glory' embroidered in the neck. 1891 is then again visible on the side\n• A light blue accent that was fished out of S19-20's third shirt and last year's Heritage shirt. It is also fully in line with the current training collection.\n Macron's M Performance System technology completes the design and ensures sufficient cooling and a comfortable feeling.",
//             "characteristics": "Match quality: this is the shirt the players wear on the pitch,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,\n• Top quality from the Italian Macron,\n• 100% polyester,\n• Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\nWash at 30°C - do not tumble dry - do not dry clean - iron at low temperature.",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "third",
//         "color": ["black"],
//         "availableUnits": {
//             "128 - JS": "10",
//             "149 - JM": "10",
//             "152 - JL": "10",
//             "164 - JXL": "10"
//         },
//         "rating": "4.5",
//         "totalReviews": "4",
//         "price": "49.00",
//         "name": "Third shorts kids 22/23",
//         "genderType": "kids",
//         "coverImage": "https://i.ibb.co/km5r6Rp/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/km5r6Rp/image.png"],
//             "description": "Are you going for a completely black look? These Third shorts complete our brand new Third Kit collection. With these shorts, all eyes will be on your stylish outfit, both in and outside the stadium.\n Thanks to Macron's Performance System technology, the shorts feel very light and also provide sufficient ventilation during exercises.",
//             "characteristics": "• Competition quality\n • Top quality from the Italian Macron,\n•100% polyester,\n•Comfortable and breathable fabric\n•Available in size 128-164\n•Wash at 30C - do not tumble dry - do not dry clean - iron at low temperature"
//         }
//     },
//     {
//         "competitionKit": "third",
//         "color": ["black"],
//         "availableUnits": {
//             "128 - JS": "10",
//             "149 - JM": "10",
//             "152 - JL": "10",
//             "164 - JXL": "10"
//         },
//         "rating": "0",
//         "totalReviews": "0",
//         "price": "11.20",
//         "name": "Third socks 22/23",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/NtCFj8W/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/NtCFj8W/image.png", "https://i.ibb.co/5F9g62r/image.png"],
//             "description": "The black competititon socks complete our third kit"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["yellow"],
//         "availableUnits": {
//             "128": "10",
//             "140": "10",
//             "152": "10"
//         },
//         "rating": "0",
//         "totalReviews": "0",
//         "price": "49",
//         "name": "Goalkeeper shirt kids 22/23",
//         "genderType": "kids",
//         "coverImage": "https://i.ibb.co/84b0fpk/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/84b0fpk/image.png", "https://i.ibb.co/hd9gWVS/image.png"],
//             "description": "Bruges are winning, everywhere we go! This year our goalkeepers will play the away games in this yellow goalkeeper shirt. A fluorescent yellow color was chosen, with a subtle army print on the chest. The print is in grey, which gives it that little bit extra.",
//             "characteristics": "Match quality: this is the shirt the goalkeepers wear on the field,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,\n• Top quality from the Italian Macron,\n• 100% polyester,\n• Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\nWash at 30°C - do not tumble dry - do not dry clean - iron at low temperature.",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["yellow"],
//         "availableUnits": {
//             "S": 0,
//             "M": 0,
//             "L": 10,
//             "XL": 10,
//             "XXL": 10,
//             "3XL": 10,
//             "4XL": 0,
//             "5XL": 10
//         },
//         "rating": "5",
//         "totalReviews": "1",
//         "price": "59.50",
//         "name": "Goalkeeper shirt adult 22/23",
//         "genderType": "men",
//         "coverImage": "https://i.ibb.co/TvVdXxm/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/TvVdXxm/image.png", "https://i.ibb.co/Y2YL3mk/image.png", "https://i.ibb.co/XXvLDc4/image.png", "https://i.ibb.co/DW1Bm3C/image.png"],
//             "description": "Bruges are winning, everywhere we go! This year our goalkeepers will play the away games in this yellow goalkeeper shirt. A fluorescent yellow color was chosen, with a subtle army print on the chest. The print is in grey, which gives it that little bit extra.",
//             "characteristics": "Match quality: this is the shirt the goalkeepers wear on the field,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,\n• Top quality from the Italian Macron,\n• 100% polyester,\n• Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\nWash at 30°C - do not tumble dry - do not dry clean - iron at low temperature.",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["red"],
//         "availableUnits": {
//             "128": 10,
//             "140": 0,
//             "152": 0
//         },
//         "rating": "5",
//         "totalReviews": "1",
//         "price": "49.00",
//         "name": "Keeper shirt red kids 22/23",
//         "genderType": "kids",
//         "coverImage": "https://i.ibb.co/hL46S1t/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/hL46S1t/image.png", "https://i.ibb.co/9VM63wy/image.png"],
//             "description": "In this red shirt, Simon Mignolet defends his goal in his own Jan Breydel stadium this season. It is a beautiful, vibrant red shirt with a striking design on the side that also contains the Macron logo. Do you put all the balls in this new outfit, just like Big Si?",
//             "characteristics": "Match quality: this is the shirt the goalkeepers wear on the field,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,\n• Top quality from the Italian Macron,\n• 100% polyester,\n• Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\nWash at 30°C - do not tumble dry - do not dry clean - iron at low temperature.",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["red"],
//         "availableUnits": {
//             "128": 10,
//             "140": 0,
//             "152": 0
//         },
//         "rating": "5",
//         "totalReviews": "2",
//         "price": "59.50",
//         "name": "Keepshirt red shirt 22/23",
//         "genderType": "men",
//         "coverImage": "https://i.ibb.co/412kvNw/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/412kvNw/image.png", "https://i.ibb.co/vvZLNHz/image.png", "https://i.ibb.co/5RsfRQX/image.png", "https://i.ibb.co/9VM63wy/image.png"],
//             "description": "In this red shirt, Simon Mignolet defends his goal in his own Jan Breydel stadium this season. It is a beautiful, vibrant red shirt with a striking design on the side that also contains the Macron logo. Do you put all the balls in this new outfit, just like Big Si?",
//             "characteristics": "Match quality: this is the shirt the goalkeepers wear on the field,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,\n• Top quality from the Italian Macron,\n• 100% polyester,\n• Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\nWash at 30°C - do not tumble dry - do not dry clean - iron at low temperature.",
//             "washingInstructions": "-Wash at 30C\n-Delicate program\n-Do not tumble dry"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["yellow"],
//         "availableUnits": {
//             "128": "10",
//             "149": "10",
//             "152": "10"
//         },
//         "rating": "0",
//         "totalReviews": "0",
//         "price": "24.50",
//         "name": "Goalkeeper short yellow kids 22/23",
//         "genderType": "kids",
//         "coverImage": "https://i.ibb.co/jLNJgtQ/image.png",
//         "details": {
//             "images": ["https: //i.ibb.co/jLNJgtQ/image.png"],
//             "description": "A goalkeeper outfit is not complete without matching shorts. Will you soon stop all the balls at training?"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["yellow"],
//         "availableUnits": {
//             "S": 0,
//             "M": 10,
//             "L": 0,
//             "XL": 10,
//             "XXL": 10,
//             "3XL": 10
//         },
//         "rating": "0",
//         "totalReviews": "0",
//         "price": "27.30",
//         "name": "Goalkeeper yellow shorts 22/23 ",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/KN28YR0/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/KN28YR0/image.png", "https://i.ibb.co/jLNJgtQ/image.png"],
//             "description": "A goalkeeper outfit is not complete without matching shorts. Will you soon stop all the balls at training?"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["red"],
//         "availableUnits": {
//             "S": 0,
//             "M": 0,
//             "L": 0,
//             "XL": 10,
//             "XXL": 10,
//             "3XL": 0
//         },
//         "rating": "0",
//         "totalReviews": "0",
//         "price": "27.30",
//         "name": "Goalkeeper red shorts 22/23 ",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/hHPzJZF/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/hHPzJZF/image.png", "https://i.ibb.co/k2GLXF5/image.png"],
//             "description": "A goalkeeper outfit is not complete without matching shorts. Will you soon stop all the balls at training?"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["yellow"],
//         "availableUnits": {
//             "35-38": "0",
//             "39-42": "10",
//             "43-46": "0",
//             "47-50": "10"
//         },
//         "rating": "0",
//         "totalReviews": "0",
//         "price": "11.20",
//         "name": "Goalkeeper yellow socks 22/23 ",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/NtCw3s1/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/NtCw3s1/image.png"],
//             "description": "A goalkeeper outfit is not complete without matching stockings. With these yellow goalkeeper socks, Mignolet keeps all balls out of the goal. You too soon?"
//         }
//     },
//     {
//         "competitionKit": "keeper",
//         "color": ["yellow"],
//         "availableUnits": {
//             "31-34": "10",
//             "35-38": "0",
//             "39-42": "10",
//             "43-46": "10",
//             "47-50": "10"
//         },
//         "rating": "5",
//         "totalReviews": "1",
//         "price": "11.20",
//         "name": "Goalkeeper red socks 22/23 ",
//         "genderType": "all",
//         "coverImage": "https://i.ibb.co/JQKR50T/image.png",
//         "details": {
//             "images": ["https://i.ibb.co/JQKR50T/image.png"],
//             "description": "A goalkeeper outfit is not complete without matching stockings. With these yellow goalkeeper socks, Mignolet keeps all balls out of the goal. You too soon?"
//         }
//     }
// ]

// const clothing = [{
//     "clothingType": "sportswear",
//     "name": "Training t-short navy 22/23",
//     "color": ["navy"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10,
//         "4XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "3",
//     "price": "35.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/Sv1Mxxz/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/Sv1Mxxz/image.png", "https://i.ibb.co/TqsvQQp/image.png", "https://i.ibb.co/G0gbnwC/image.png", "https://i.ibb.co/RhFGxpW/image.png"],
//         "description": "Our staff has navy as the main color this year. With this they make the difference between players and coaches clear. This t-shirt has a nice footbal print as a visual effect. Will we see you in this outfit soon?\nThe light blue accents on the side match the navy training pants and bermuda shorts (with pockets).\n Also available as a sweater",
//         "characteristics": "• This is the clothes in which the coaches give training,\n• Top quality from the Italian Macro, •\n 100% polyester,\n• Comfortable and breathable fabric: Macro Performance System\n• Available in size S to 5XL"
//     }

// },
// {
//     "clothingType": "sportswear",
//     "name": "Training t-shirt blue 21/22",
//     "color": ["navy"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 10,
//         "4XL": 0
//     },
//     "rating": "5",
//     "totalReviews": "2",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/qsP6zs9/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/qsP6zs9/image.png", "https://i.ibb.co/8dWwZGD/image.png", "https://i.ibb.co/jk78f4W/image.png"],
//         "description": "With this training T-shirt you feel like the new Hans Vanaken on the field!"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Training t-shirt light blue 22/23",
//     "color": ["lightBlue"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 10,
//         "4XL": 0
//     },
//     "rating": "5",
//     "totalReviews": "3",
//     "price": "35.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/SKdF3QP/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/SKdF3QP/image.png", "https://i.ibb.co/VqFz64D/image.png", "https://i.ibb.co/f2tKfqV/image.png"],
//         "description": "Will you soon be training in the same outfit as our players? Our player's training collection is bright light blue. This summery color offers the players a cool shirt and brings some innovation to the sports offer. The navy accents on the side match the navy track pants and bermuda shorts (with pockets).\nAlso available as a sweater.",
//         "characteristics": "• This is the clothes in which the coaches give training,\n• Top quality from the Italian Macro, •\n 100% polyester,\n• Comfortable and breathable fabric: Macro Performance System\n• Available in size S to 5XL"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Training t-shirt  blue 22/23",
//     "color": ["lightBlue"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "3",
//     "price": "35.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/ZG4xTsy/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/ZG4xTsy/image.png", "https://i.ibb.co/XZ8BSHk/image.png", "https://i.ibb.co/wK62j19/image.png"],
//         "description": "With this training T-shirt you will feel like the new Ferran Jutgla on the field!"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Training t-shirt grey kids",
//     "color": ["grey"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 0
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "22.5",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/fDVMT08/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/fDVMT08/image.png"]
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Training t-shirt black kids 22/23",
//     "color": ["black"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 0
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "22.5",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/TcJhqWM/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/TcJhqWM/image.png"]
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Polo black adult 22/23",
//     "color": ["black"],
//     "type": "polo",
//     "availableUnits": {
//         "S": 10,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 0
//     },
//     "rating": "4.5",
//     "totalReviews": "6",
//     "price": "30",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/sjh0FFt/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/sjh0FFt/image.png", "https://i.ibb.co/S3TPYzn/image.png", "https://i.ibb.co/BjXSj7Y/image.png"]
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Polo blue adult 21/22",
//     "color": ["blue"],
//     "type": "polo",
//     "availableUnits": {
//         "S": 10,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 0
//     },
//     "rating": "5",
//     "totalReviews": "2",
//     "price": "25",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/GMNvw4Y/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/GMNvw4Y/image.png", "https://i.ibb.co/tDwZ6P8/image.png", "https://i.ibb.co/JQLtRQq/image.png"],
//         "description": "Want to be stylishly dressed and support your favorite football club at the same time? This polo is the perfect combination"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Polo macron kids 19/20",
//     "color": ["red"],
//     "type": "polo",
//     "availableUnits": {
//         "128": "10",
//         "140": "10",
//         "152": "0",
//         "164": "10"
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "22.50",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/DbKJxJG/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/DbKJxJG/image.png"],
//         "description": "Burgandy polo. Kids sizes. 50% cotton, 50% polyester"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Polo black kids 22/23",
//     "color": ["black"],
//     "type": "polo",
//     "availableUnits": {
//         "128 - JS": "10",
//         "140 - JM": "10",
//         "152 - JU": "0",
//         "164 - JXL": "10"
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "27.00",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/6vq61Bv/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/6vq61Bv/image.png", "https://i.ibb.co/7XRQp0y/image.png"],
//         "description": "The black polo is part of the training collection 22/23. Will you wear it soon too?"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Polo blue macron adult",
//     "color": ["blue"],
//     "type": "polo",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "XL": 10
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "50.00",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/PYT1tL0/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/PYT1tL0/image.png"]
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Hoodie blue adult 22/23",
//     "color": ["blue"],
//     "type": "hoodie",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 0,
//         "3XL": 10
//     },
//     "rating": "4.5",
//     "totalReviews": "4",
//     "price": "45.50",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/PYT1tL0/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/PYT1tL0/image.png", "https://i.ibb.co/TYhqV7B/image.png", "https://i.ibb.co/PMGNjTT/image.png"],
//         "description": "This blue hoodie is ideal to wear inside and outside Jan Breydel."
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Hoodie macron yla 22/23",
//     "color": ["black"],
//     "type": "hoodie",
//     "availableUnits": {
//         "XS": 10,
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 0
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "66.50",
//     "genderType": "women",
//     "coverImage": "https://i.ibb.co/xMqbZn7/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/xMqbZn7/image.png", "https://i.ibb.co/k6HbMhg/image.png", "https://i.ibb.co/kBYg6C5/image.png"],
//         "description": "With this hoodie you show that you are a real YLA fan!"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Travel jacket hoodie navy adult 22/23",
//     "color": ["black"],
//     "type": "hoodie",
//     "availableUnits": {
//         "XS": 10,
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 0
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "66.50",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/nkBF6V7/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/nkBF6V7/image.png", "https://i.ibb.co/JpgKTDt/image.png", "https://i.ibb.co/nccTSxk/image.png", "https://i.ibb.co/tqPXbF6/image.png"],
//         "description": "With this hoodie you show that you are a real YLA fan!"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Sweater zip navy 22/23",
//     "color": ["lightBlue"],
//     "type": "sweater",
//     "availableUnits": {
//         "XS": 10,
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 10,
//         "3XL": 10,
//         "4XL": 10
//     },
//     "rating": "4.5",
//     "totalReviews": "6",
//     "price": "49",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/SJ5B7fZ/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/SJ5B7fZ/image.png", "https://i.ibb.co/y0pQ8rJ/image.png", "https://i.ibb.co/9bJrpY2/image.png"],
//         "description": "Will you soon be training in the same outfit as our players? Our player's training collection is bright light blue. The sweater is the complement to the t-shirt, where the round neck is a change with the past seasons. The navy accents on the side match the navy track pants and bermuda shorts (with pockets).",
//         "characteristics": "• Match quality: this is the shirt the players wear on the pitch,\n• No Sweat No Glory is embroidered in the neck, 1891 subtly on the side of the shirt,.\nTop quality from the Italian Macron,\n• 100% polyester,\n•Comfortable and breathable fabric: Macron Performance System,\n• Available in size S to 5XL,\n"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Sweater dames macron 1891",
//     "color": ["black"],
//     "type": "sweater",
//     "availableUnits": {
//         "XS": 10,
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 10,
//         "3XL": 10,
//         "4XL": 10
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "65",
//     "genderType": "women",
//     "coverImage": "https://i.ibb.co/ZcNzH4d/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/ZcNzH4d/image.png", "https://i.ibb.co/2cLDMy1/image.png"],
//         "description": "An ode to the legendary year 1891. This sweater will keep you warm while watching a club YLA game."
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Sweater zip navy kids 22/23",
//     "color": ["navy"],
//     "type": "sweater",
//     "availableUnits": {
//         "128 - JS": "10",
//         "140 - JM": "0",
//         "152 - JU": "0",
//         "164 - JXL": "0"
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "42",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/XV2SJxp/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/XV2SJxp/image.png"],
//         "description": "Our staff has navy as the main color this year. With this they make the difference between players and coaches clear. This sweater has ashort zipper and football print effect. The light blue accents on the side match the navy training pants and bermuda shorts. Will we see you in this outfit soon?\n Also available as a t-short",
//         "characteristics": "• This is the clothes in which the coaches give training,\n• Top quality from the Italian Macro, •\n 100% polyester,\n• Comfortable and breathable fabric: Macro Performance System\n• Available in size S to 5XL"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Sweater zip black kids 22/23",
//     "color": ["navy"],
//     "type": "sweater",
//     "availableUnits": {
//         "128 - JS": "10",
//         "140 - JM": "10",
//         "152 - JU": "10"
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "42",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/NTHKZk4/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/NTHKZk4/image.png", "https://i.ibb.co/FVT5XzJ/image.png", "https://i.ibb.co/J59BhR0/image.png", "https://i.ibb.co/Pr9rg4d/image.png"],
//         "description": "During our European campagin, these sweaters are used as 'warm-up' sweaters before the match when we play in our third kit. Will we see you in this outfit soon?\n Also available as a T-shirt.",
//         "characteristics": "• This is the clothes in which the coaches give training,\n• Top quality from the Italian Macro, •\n 100% polyester,\n• Comfortable and breathable fabric: Macro Performance System\n• Available in size JS to JL"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Bermuda short adult 22/23",
//     "color": ["navy"],
//     "type": "trousers",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 10
//     },
//     "rating": "4.5",
//     "totalReviews": "2",
//     "price": "42",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/w7gknJD/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/w7gknJD/image.png"],
//         "description": "The navy bermuda shorts are ideal for training or coming to competitions on sultry summer days."
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Pants nxt adults",
//     "color": ["navy"],
//     "type": "trousers",
//     "availableUnits": {
//         "XS": 10,
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "42",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/S5z0Dkw/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/S5z0Dkw/image.png", "https://i.ibb.co/9psSjPx/image.png", "https://i.ibb.co/VqgQ5Q8/image.png"],
//         "description": "Your next visit to The Nest will be in these NXT pants. This way you are completely in the modern, young look of club NXT"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Training pants 22/23",
//     "color": ["navy"],
//     "type": "trousers",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 10,
//         "3XL": 0
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "42",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/zV8K9XC/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/zV8K9XC/image.png"],
//         "description": "Sharpen your football skills in these navy training pants"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Travel Jacket Blue",
//     "color": ["blue"],
//     "type": "jacket",
//     "availableUnits": {
//         "M": 10,
//         "3XL": 0
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "37.50",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/Q614J1W/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/Q614J1W/image.png"]
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Travel Jacket Hoodie Navy Blue 22/23",
//     "color": ["blue"],
//     "type": "jacket",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 10,
//         "3XL": 0
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "63",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/nkBF6V7/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/nkBF6V7/image.png", "https://i.ibb.co/nccTSxk/image.png", "https://i.ibb.co/tqPXbF6/image.png"],
//         "description": "This travel jacket, with the Club logo on the chest, is ideal to wear inside and outside Jan Breydel"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Kids red raincoat",
//     "color": ["red"],
//     "type": "coat",
//     "availableUnits": {
//         "128": "10",
//         "140": "10"
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "60",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/nw5hnYk/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/nw5hnYk/image.png"],
//         "description": "Staff raincoat from Club Brugge. Kids sizes. 100% polyster"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Kids blue raincoat",
//     "color": ["blue"],
//     "type": "coat",
//     "availableUnits": {
//         "128": "10"
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "90",
//     "genderType": "kids",
//     "coverImage": "https://i.ibb.co/sRsrmpc/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/sRsrmpc/image.png", "https://i.ibb.co/WDLBFqN/image.png"],
//         "description": "Staff raincoat from Club Brugge. Kids sizes. 100% polyster"
//     }
// },
// {
//     "clothingType": "sportswear",
//     "name": "Winter coat adult 22/23",
//     "color": ["navy"],
//     "type": "coat",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 0,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "3",
//     "price": "54",
//     "genderType": "men",
//     "coverImage": "https://i.ibb.co/2S76MrD/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/2S76MrD/image.png", "https://i.ibb.co/FWHTZ3L/image.png", "https://i.ibb.co/v37yJwd/image.png"],
//         "description": "Long winter coat. Ideal for cheering on your favorite team in the stands, because it also keeps your legs warm"
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "T-shirt 1891 Refined Black",
//     "color": ["black"],
//     "availableUnits": {
//         "S": 0,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "type": "tshirt",
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/TvChdBP/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/TvChdBP/image.png", "https://i.ibb.co/syP9k34/image.png", "https://i.ibb.co/cgxCBQp/image.png"],
//         "description": "The iconic year 1891. Now processed on a black T-shirt"
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "T-shirt 1891 Refined Sand",
//     "color": ["sand"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "4.3",
//     "totalReviews": "3",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/L8M0RLW/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/L8M0RLW/image.png", "https://i.ibb.co/BrW4hp3/image.png", "https://i.ibb.co/YhQVfYB/image.png", "https://i.ibb.co/fFBp0bc/image.png"],
//         "description": "The iconic year 1891. Now processed on a black T-shirt"
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "T-shirt 1891 Iconic Dark Grey",
//     "color": ["sand"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/QbhDzY6/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/QbhDzY6/image.png", "https://i.ibb.co/9sjbsdM/image.png", "https://i.ibb.co/kGQRzz3/image.png"],
//         "description": "An ode to the legendary year 1891. This dark grey T-shirt shows that you are part of our family."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "T-shirt 1891 Iconic White",
//     "color": ["white"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/JFjdYQP/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/JFjdYQP/image.png"],
//         "description": "An ode to the legendary year 1891. This white T-shirt shows that you are part of our family."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "T-shirt 1891 Iconic Burgandy",
//     "color": ["red"],
//     "type": "tshirt",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/B41nxRx/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/B41nxRx/image.png", "https://i.ibb.co/g9bPgSY/image.png", "https://i.ibb.co/Y2rcZsc/image.png"],
//         "description": "An ode to the legendary year 1891. This Burgandy T-shirt shows that you are part of our family."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Hoodie 1891 Iconic Grey",
//     "color": ["grey"],
//     "type": "hoodie",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "8",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/GFWW081/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/GFWW081/image.png", "https://i.ibb.co/kBdq40K/image.png", "https://i.ibb.co/rxNfDhG/image.png"],
//         "description": "An ode to the legendary year 1891. This grey hoodie shows that you are part of our family."
//     }
// }, {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Hoodie 1891 Iconic Navy",
//     "color": ["grey"],
//     "type": "hoodie",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "4.3",
//     "totalReviews": "7",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/KbjTmTy/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/KbjTmTy/image.png", "https://i.ibb.co/KLG9Pwx/image.png"],
//         "description": "An ode to the legendary year 1891. This grey hoodie shows that you are part of our family."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Hoodie 1891 Refined Sand",
//     "color": ["sand"],
//     "type": "hoodie",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "4.3",
//     "totalReviews": "7",
//     "price": "25.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/P556rb4/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/P556rb4/image.png", "https://i.ibb.co/GpbYBLM/image.png", "https://i.ibb.co/NyKBL5R/image.png"],
//         "description": "An ode to the legendary year 1891. This refined sand color hoodie shows that you are part of our family."
//     }
// }, {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Hoodie 1891 Refined Skye Blue",
//     "color": ["lightBlue"],
//     "type": "hoodie",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "65.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/cvvjnRV/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/cvvjnRV/image.png", "https://i.ibb.co/0sxD46k/image.png", "https://i.ibb.co/d4S4MMd/image.png"],
//         "description": "This iconic year 1891. Now processed on a light blue hoodie"
//     }
// }, {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Hoodie 1891 Iconic Dark Grey",
//     "color": ["darkGrey"],
//     "type": "hoodie",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "totalReviews": "1",
//     "price": "65.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/WsD7fp0/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/WsD7fp0/image.png", "https://i.ibb.co/vLZP9Xq/image.png", "https://i.ibb.co/8XDPjwQ/image.png"],
//         "description": "An ode to the legendary year 1891. This black hoodie shows that you are part of our family."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Hoodie 1891 Iconic Burgundy",
//     "color": ["red"],
//     "type": "hoodie",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "4.5",
//     "totalReviews": "2",
//     "price": "65.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/VjB5j7N/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/VjB5j7N/image.png", "https://i.ibb.co/V3rrY7Q/image.png", "https://i.ibb.co/wY5vpVG/image.png", "https://i.ibb.co/jg9r7ds/image.png"],
//         "description": "An ode to the legendary year 1891. This red hoodie shows that you are part of our family."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Sweatpants 1891 Khaki",
//     "color": ["red"],
//     "type": "trousers",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "4.3",
//     "totalReviews": "2",
//     "price": "50.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/257hbY7/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/257hbY7/image.png"],
//         "description": "The iconic year 1891. Now processed on a khaki sweatpants"
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Sweatpants 1891 Khaki",
//     "color": ["red"],
//     "type": "trousers",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "4.3",
//     "totalReviews": "2",
//     "price": "50.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/bNr134K/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/bNr134K/image.png"],
//         "description": "The iconic year 1891. Now processed on a navy pants."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "1891",
//     "name": "Sweatpants 1891 Black",
//     "color": ["black"],
//     "type": "trousers",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "50.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/zrGSYsL/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/zrGSYsL/image.png", "https://i.ibb.co/Gxxw9rR/image.png"],
//         "description": "The iconic year 1891. Now processed on black sweatpants."
//     }
// },
// {
//     "clothingType": "collection",
//     "collection": "Big Si",
//     "name": "Sweater Big Si",
//     "color": ["black"],
//     "type": "sweater",
//     "availableUnits": {
//         "S": 0,
//         "M": 0,
//         "L": 0,
//         "XL": 0,
//         "XXL": 0,
//         "3XL": 0
//     },
//     "rating": "0",
//     "totalReviews": "0",
//     "price": "55.00",
//     "genderType": "all",
//     "coverImage": "https://i.ibb.co/1M1k24x/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/1M1k24x/image.png", "https://i.ibb.co/TktJZ9d/image.png", "https://i.ibb.co/FJhtHdX/image.png"],
//         "description": "The iconic year 1891. Now processed on black sweatpants."
//     }
// }

// ]

// const fanItems = [{
//     "fanItemType": "stadium",
//     "type": "scarves",
//     "name": "Scarf Club - SL Benfica (Round of 16)",
//     "price": "15.00",
//     "rating": "4.5",
//     "totalReviews": "11",
//     "coverImage": "https://i.ibb.co/zX1KxSY/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/zX1KxSY/image.png", "https://i.ibb.co/GR4w0P5/image.png"],
//         "description": "For the first time in our blue-black history, we have qualified for the 8th finals of the champion ball! Get the match scarf now and avoid queues at the points of sale around Jan Breydel on match day!"
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "scarves",
//     "name": "Scarf No Sweat No Glory",
//     "price": "15.00",
//     "rating": "5",
//     "totalReviews": "1",
//     "coverImage": "https://i.ibb.co/sWMJ4hj/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/sWMJ4hj/image.png", "https://i.ibb.co/tcDZ1Dk/image.png"],
//         "description": "You'll never walk alone, Wonderwall and so much more. With this scarf you are ready to sing all the songs loudly in the stadium"
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "scarves",
//     "name": "Scarf YLA",
//     "price": "15.00",
//     "rating": "5",
//     "totalReviews": "1",
//     "coverImage": "https://i.ibb.co/zS1xcpn/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/zS1xcpn/image.png"],
//         "description": "This scarf will keep you warm while watching a match of our women's team"
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "flags",
//     "name": "Flag Champions 2021-2022 (1*1.5m)",
//     "price": "20.00",
//     "rating": "0",
//     "totalReviews": "0",
//     "coverImage": "https://i.ibb.co/82R4gkB/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/82R4gkB/image.png"],
//         "description": "A flag that makes clear what we are: champions"
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "flags",
//     "name": "Flag Heritage Color",
//     "price": "15.00",
//     "rating": "5",
//     "totalReviews": "5",
//     "coverImage": "https://i.ibb.co/Y3ZjygH/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/Y3ZjygH/image.png"],
//         "description": "A healthy mind in a healthy body"
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "flags",
//     "name": "Flag 1891 (1.5 * 1m)",
//     "price": "15.00",
//     "rating": "5",
//     "totalReviews": "5",
//     "coverImage": "https://i.ibb.co/BsKsxzr/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/BsKsxzr/image.png"],
//         "description": "A healthy mind in a healthy body"
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "caps",
//     "name": "Cap Logo Striped",
//     "color": ["blue", "black"],
//     "price": "15.00",
//     "rating": "0",
//     "totalReviews": "0",
//     "coverImage": "https://i.ibb.co/BsKsxzr/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/BsKsxzr/image.png"],
//         "description": "A healthy mind in a healthy body"
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "caps",
//     "name": "Cap Logo Grey",
//     "color": ["grey"],
//     "price": "20.00",
//     "rating": "4.5",
//     "totalReviews": "5",
//     "coverImage": "https://i.ibb.co/wz2c327/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/wz2c327/image.png", "https://i.ibb.co/X8c6TM3/image.png"]
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "caps",
//     "name": "Cap RFCB Heritage",
//     "color": ["black"],
//     "price": "20.00",
//     "rating": "4.5",
//     "totalReviews": "4",
//     "coverImage": "https://i.ibb.co/rdh1Mkw/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/yyYYq0c/image.png", "https://i.ibb.co/dD3mmKh/image.png", "https://i.ibb.co/ysSSP1j/image.png"]
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "beanies",
//     "name": "Beanie 1891 navy",
//     "color": ["navy"],
//     "price": "20.00",
//     "rating": "0",
//     "totalReviews": "0",
//     "coverImage": "https://i.ibb.co/R0jZbwG/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/R0jZbwG/image.png", "https://i.ibb.co/V97BSRs/image.png"],
//         "description": "With this hip beanie,navy with 1891, you are ready to come to Jan Breydel even in ice-cold conditions."
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "beanies",
//     "name": "Beanie Navy Striped",
//     "color": ["navy"],
//     "price": "20.00",
//     "rating": "0",
//     "totalReviews": "0",
//     "coverImage": "https://i.ibb.co/7JT5ynW/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/7JT5ynW/image.png", "https://i.ibb.co/F3gZYSX/image.png"],
//         "description": "With this blue-black striped beanie, you are ready to come to Jan Breydel even in ice-cold conditions."
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "beanies",
//     "name": "Muts Away Days",
//     "color": ["white", "navy"],
//     "price": "20.00",
//     "rating": "0",
//     "totalReviews": "0",
//     "coverImage": "https://i.ibb.co/x6Jd5rz/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/x6Jd5rz/image.png", "https://i.ibb.co/DgTB5xr/image.png"],
//         "description": "With this hat, in the same motif as our away shirts, you to come to Jan Breydel even in ice-cold conditions."
//     }
// },
// {
//     "fanItemType": "stadium",
//     "type": "beanies",
//     "name": "Club Burgee PVC",
//     "price": "5",
//     "rating": "5",
//     "totalReviews": "1",
//     "coverImage": "https://i.ibb.co/Xj7WCR0/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/Xj7WCR0/image.png", "https://i.ibb.co/MNtCtkb/image.png"],
//         "description": "Brighten up your fridge with this Club Brugge magnet"
//     }
// },
// {
//     "fanItemType": "european",
//     "type": "scarves",
//     "name": "Banner Round of 16",
//     "price": "15.00",
//     "rating": "3.5",
//     "totalReviews": "2",
//     "coverImage": "https://i.ibb.co/5B0kG3Y/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/5B0kG3Y/image.png", "https://i.ibb.co/mF5tVN7/image.png"],
//         "description": "A banner in honor of our first winner in UEFA Champions League"
//     }
// },
// {
//     "fanItemType": "european",
//     "type": "scarves",
//     "name": "Scarf Club - FC Porto",
//     "price": "15.00",
//     "rating": "3",
//     "totalReviews": "2",
//     "coverImage": "https://i.ibb.co/CvsrHMz/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/CvsrHMz/image.png"],
//         "description": "Porto away. What a night we had there with the 0-4 win and a first 6 out of 6 in our Champions Leagure history.\nGet this souvenir and help us to attract the home match against the Portuguese."
//     }
// },
// {
//     "fanItemType": "european",
//     "type": "scarves",
//     "name": "Scarf Club - Bayer Leverkusen",
//     "price": "15.00",
//     "rating": "3",
//     "totalReviews": "2",
//     "coverImage": "https://i.ibb.co/Cs7BNcz/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/Cs7BNcz/image.png"],
//         "description": "In group B of the Champions League we meet the German tradition team Bayer Leverkusen, where our former defender Odilon Koussounou is in the team."
//     }
// },
// {
//     "fanItemType": "european",
//     "type": "scarves",
//     "name": "Banner Round of 16",
//     "price": "15.00",
//     "rating": "3.5",
//     "totalReviews": "2",
//     "coverImage": "https://i.ibb.co/5B0kG3Y/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/5B0kG3Y/image.png", "https://i.ibb.co/mF5tVN7/image.png"],
//         "description": "A banner in honor of our first winner in UEFA Champions League"
//     }
// },
// {
//     "fanItemType": "goldenShoes",
//     "type": "scarves",
//     "name": "Scarf Golden Shoe",
//     "price": "15.00",
//     "rating": "5",
//     "totalReviews": "4",
//     "coverImage": "https://i.ibb.co/vP7yP0M/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/vP7yP0M/image.png", "https://i.ibb.co/HnPTFsf/image.png"],
//         "description": "Did it. Our Simon Mignolet is the golden shoe of 2022! A feat as a keeper and after more than 30 years the rightful successor to Micheal Preud'homme."
//     }
// },
// {
//     "fanItemType": "goldenShoes",
//     "type": "tshirt",
//     "name": "T-Shirt Golden Shoes Adults",
//     "price": "22.00",
//     "availableUnits": {
//         "S": 10,
//         "M": 10,
//         "L": 10,
//         "XL": 10,
//         "XXL": 10,
//         "3XL": 10
//     },
//     "rating": "5",
//     "genderType": "all",
//     "totalReviews": "1",
//     "coverImage": "https://i.ibb.co/bFSzXvZ/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/bFSzXvZ/image.png", "https://i.ibb.co/6sS8RBm/image.png"],
//         "description": "Did it. Our Simon Mignolet is the golden shoe of 2022! A feat as a keeper and after more than 30 years the rightful successor to Micheal Preud'homme."
//     }
// },
// {
//     "fanItemType": "goldenShoes",
//     "type": "tshirt",
//     "name": "T-Shirt Golden Shoes Kids",
//     "price": "22.00",
//     "availableUnits": {
//         "128": "10",
//         "140": "10",
//         "152": "10"
//     },
//     "rating": "0",
//     "genderType": "all",
//     "totalReviews": "0",
//     "coverImage": "https://i.ibb.co/5k3dxK5/image.png",
//     "details": {
//         "images": ["https://i.ibb.co/5k3dxK5/image.png", "https://i.ibb.co/6sS8RBm/image.png"],
//         "description": "Did it. Our Simon Mignolet is the golden shoe of 2022! A feat as a keeper and after more than 30 years the rightful successor to Micheal Preud'homme."
//     }
// }
// ]

const fetchProducts = () => {
    const url = window.location.href;
    const validOptions = ['official-competition-uniforms', 'clothing', 'fan-articles', 'new'];
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
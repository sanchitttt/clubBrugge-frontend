import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

function Carousel({ imageList }: { imageList: string[] | undefined }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const myRef = useRef<HTMLDivElement | null>(null);
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (imageList) {
                if (selectedImage >= imageList.length - 1) {
                    setSelectedImage(0)
                }
                else {
                    setSelectedImage(selectedImage => selectedImage + 1);
                }
            }

        },
        onSwipedRight: () => {
            if (imageList) {
                if (selectedImage <= 0) {
                    setSelectedImage(imageList.length - 1)
                }
                else {
                    setSelectedImage(selectedImage => selectedImage - 1);
                }
            }
        }
    })

    const refPassthrough = (el: HTMLDivElement) => {
        // call useSwipeable ref prop with el
        handlers.ref(el);

        // set myRef el so you can access it yourself
        myRef.current = el;
    }
    if (!imageList) return null;
    return (
        <div className='relative flex items-center justify-center'
            {...handlers}
            ref={refPassthrough}
        >
            <img
                src={imageList[selectedImage]}
                alt='productImg'
                width=''
                height='auto'
            />
            <div className='absolute top-[90%] left-[50%] flex gap-[10px]' style={{ transform: 'translate(-50%,-90%)' }}>
                {imageList.map((item, idx) => {
                    return <button key={item} className={`w-[12px] h-[12px] rounded-full border-[1px] ${selectedImage === idx ? 'bg-white' : 'bg-transparent'}`}
                        onClick={() => setSelectedImage(idx)}
                    >
                    </button>
                })}
            </div>
        </div>
    )
}

export default Carousel;

interface ButtonProps {
    children: React.ReactNode,
    width?: string,
    paddingX?: string,
    semibold?: boolean
}

function BlueButton({ children, width, semibold }: ButtonProps) {
    return (
        <button
            aria-describedby="button"
            className={`relative blueButton btn justify-center flex items-center px-[10px] text-white uppercase tracking-wider ${semibold && 'font-semibold'}`}
            style={{ width: width && width, }}
        >
            {children} ›
        </button>
    )
}

export function BlackButton({ children, paddingX, width, }: ButtonProps) {
    return (
        <button
            aria-describedby="button"
            style={{ paddingLeft: paddingX, paddingRight: paddingX, width: width && width }}
            className='relative blackButton btn flex justify-center items-center uppercase '
        >
            {children} ›
        </button>
    )
}

export default BlueButton;
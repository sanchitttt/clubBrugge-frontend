function Category({ children, href }: { children: React.ReactNode, href?: string }) {
    return <a href={href} className='font-semibold text-softWhite text-[15px]  hover:text-blue transition mb-[30px]'>
        <button>  {children}</button>
    </a>
}

function CategoryItem({ children, href }: { children: React.ReactNode, href?: string }) {
    return <a href={href} className='text-softWhite text-[15px] hover:text-blue'>
        <button>  {children}</button>
    </a>
}


export function OfficialCompetitionUniforms() {
    return (
        <div className='flex gap-[150px] w-[100%] h-[100%] py-[30px] flex items-start transition justify-center'>
            <div className='flex flex-col'>
                <Category>Home</Category>
                <div className='flex flex-col gap-[10px]'>
                    <CategoryItem href='/products/official-competition-uniforms?gender=men&competitionKit=home'>Men</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=women&competitionKit=home'>Women</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=kids&competitionKit=home'>Children</CategoryItem>
                </div>
            </div>
            <div className='flex flex-col'>
                <Category>Away</Category>
                <div className='flex flex-col gap-[10px]'>
                    <CategoryItem href='/products/official-competition-uniforms?gender=men&competitionKit=away'>Men</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=women&competitionKit=away' >Women</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=kids&competitionKit=away'>Children</CategoryItem>
                </div>
            </div>
            <div className='flex flex-col'>
                <Category>Third</Category>
                <div className='flex flex-col gap-[10px]'>
                    <CategoryItem href='/products/official-competition-uniforms?gender=men&competitionKit=third'>Men</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=women&competitionKit=third'>Women</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=kids&competitionKit=third'>Children</CategoryItem>
                </div>
            </div>
            <div className='flex flex-col'>
                <Category>Keeper</Category>
                <div className='flex flex-col gap-[10px]'>
                    <CategoryItem href='/products/official-competition-uniforms?gender=men&competitionKit=keeper'>Men</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=women&competitionKit=keeper'>Women</CategoryItem>
                    <CategoryItem href='/products/official-competition-uniforms?gender=kids&competitionKit=keeper'>Children</CategoryItem>
                </div>
            </div>

        </div>
    )
}

export function Clothing() {
    return <div className='flex gap-[150px] w-[100%] h-[100%] flex items-start py-[30px] transition justify-center'>
        <div className='flex flex-col'>
            <Category>Collections</Category>
            <div className='flex flex-col gap-[10px]'>
                <CategoryItem href='/products/clothing?collectionType=1891'>1891</CategoryItem>
                <CategoryItem href='/products/clothing?collectionType=Big Si'>Big Si</CategoryItem>
            </div>
        </div>
        <div className='flex flex-col'>
            <Category href='/products/clothing?gender=men'>Men</Category>
            <div className='flex flex-col gap-[10px]'>
                <CategoryItem href='/products/clothing?clothingType=tshirt&gender=men'>T-shirts</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=polo&gender=men'>Polos</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=sweater&gender=men'>Sweaters</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=hoodie&gender=men'>Hoodies</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=trousers&gender=men'>Trousers</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=jacket&gender=men'>Jackets</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=coat&gender=men'>Coats</CategoryItem>
            </div>
        </div>
        <div className='flex flex-col'>
            <Category href='/products/clothing?gender=women'>Women</Category>
            <div className='flex flex-col gap-[10px]'>
                <CategoryItem href='/products/clothing?clothingType=tshirt&gender=women'>T-shirts</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=polo&gender=women'>Polos</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=sweater&gender=women'>Sweaters</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=hoodie&gender=women'>Hoodies</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=trousers&gender=women'>Trousers</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=jacket&gender=women'>Jackets</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=coat&gender=women'>Coats</CategoryItem>
            </div>
        </div>
        <div className='flex flex-col'>
            <Category href='/products/clothing?gender=kids'>Children</Category>
            <div className='flex flex-col gap-[10px]'>
                <CategoryItem href='/products/clothing?clothingType=tshort&gender=kids'>T-shirts</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=sweater&gender=kids'>Sweaters</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=hoodie&gender=kids'>Hoodies</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=trouser&gender=kids'>Trousers</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=jacket&gender=kids'>Jackets</CategoryItem>
                <CategoryItem href='/products/clothing?clothingType=coat&gender=kids'>Coats</CategoryItem>
            </div>
        </div>
    </div>
}

export function FanArticles() {
    return <div className='flex gap-[150px] w-[100%] h-[100%] flex items-start py-[30px] transition justify-center'>
        <div className='flex flex-col'>
            <Category>In the stadium</Category>
            <div className='flex flex-col gap-[10px]'>
                <CategoryItem>Scarves</CategoryItem>
                <CategoryItem>Flags</CategoryItem>
                <CategoryItem>Caps</CategoryItem>
            </div>
        </div>
        <div className='flex flex-col'>
            <Category>European</Category>
            <div className='flex flex-col gap-[10px]'>
                <CategoryItem>Scarves</CategoryItem>
                <CategoryItem>Gadgets</CategoryItem>
            </div>
        </div>
        <div className='flex flex-col'>
            <Category>Golden shoes</Category>
            <div className='flex flex-col gap-[10px]'>
                <CategoryItem>Alle items</CategoryItem>
            </div>
        </div>
    </div>
}


import Navbar from "../navbar";
import NavLinks from "../navlinks";
import SearchBar from "../searchBar";

function Header() {
    return (
        <>
            <Navbar />
            <NavLinks />
            {/**For mobile  */}
            <SearchBar className='desktop:hidden' />
        </>
    )
}

export default Header;
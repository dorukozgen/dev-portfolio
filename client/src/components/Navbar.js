import BackButton from "./BackButton";

function Navbar() {
    return (
        <nav className="flex items-center h-[5vh] min-h-[60px]">
            <BackButton className="ml-3"/>
        </nav>
    );
};

export default Navbar;
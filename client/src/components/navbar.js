import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return (
        <div className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/createRecipies">Create Recipies</Link>
            {cookies.access_token ? (
                <>
                    <Link to="/readRecipies">Read Recipies</Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to='/auth'>Login/signup</Link>
            )}
        </div>
    );
};

export default Navbar;

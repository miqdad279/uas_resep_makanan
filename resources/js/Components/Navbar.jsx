import { Link } from "@inertiajs/react"
import { useState } from "react";

const Navbar = ({ user, onSearch }) => {
    const currentPath = window.location.pathname;

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="navbar bg-[#F16039]">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost normal-case text-xl text-white" style={{ fontFamily: '' }}>Dapur Istimewa</Link>
            </div>
            <div className="flex-none gap-2">
                {currentPath === '/' && (
                    <form onSubmit={handleSearchSubmit}>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered w-24 md:w-auto"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </form>
                )}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {!user ? <img src="user.png" /> : <img src="man.png" />}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        {!user ?
                            <>
                                <li><Link href={route('login')} as="button">Login</Link></li>
                                <li><Link href={route('register')} as="button">Register</Link></li>
                            </> : <>
                                <li><Link href={route('profile.edit')} as="button" className="justify-between">Profile</Link></li>
                                <li><Link href={route('dashboard')} as="button" className="justify-between">Dashboard</Link></li>
                                <li><Link href={route('logout')} method="post" as="button" >Logout</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
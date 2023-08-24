import { Link, NavLink } from 'react-router-dom';
import logo1 from '../../public/logo1.png'
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import useSelectedClasses from '../Hooks/useSelectedClasses';

const NavBar = () => {
    const [isAdmin] = useAdmin();
    const { user, logOut } = useAuth();
    const [selectedClasses] = useSelectedClasses();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }

    const navOptions = <div className='lg:flex items-center font-bold gap-6'>
        <li><NavLink to={'/'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}><button>Home</button></NavLink></li>
        <li><NavLink to={'/services'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}><button>Services</button></NavLink></li>
        <li><NavLink to={'/classes'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}><button>Classes</button></NavLink></li>

        {
            isAdmin ?
                (<li><NavLink to={'/dashboard/admin-home'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}><button className="btn">
                    Dashboard
                </button></NavLink></li>)
                : user && (<li><NavLink to={'/dashboard/user-home'} className={({ isActive }) => isActive ? 'text-black' : 'text-gray-500'}><button className="btn">
                    Dashboard
                </button></NavLink></li>)
        }
    </div>

    return (
        <div className="py-4 bg-white px-4 lg:px-36 shadow-lg flex justify-between items-center">

            <div className="dropdown lg:hidden">
                <label tabIndex={0} className="btn btn-ghost ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className=" menu-compact dropdown-content mt-3 z-40 p-2 shadow bg-base-100 rounded-box w-52">
                    {navOptions}
                </ul>
            </div>


            <Link to={'/'}>
                <img className='h-[50px]' src={logo1} alt="AI-classroom" />
            </Link>

            <div className="navbar-center hidden lg:flex">
                <ul className=" menu-horizontal px-1 lg:space-x-6 text-md font-semibold">
                    {navOptions}
                </ul>
            </div>


            <div className='flex gap-4 items-center justify-center'>
                {
                    user && !isAdmin && (<Link to={'/dashboard/selected-classes'} className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{selectedClasses?.length || 0}</span>
                            </div>
                        </label>
                    </Link>)
                }

                {
                    user ? <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost btn-circle">
                            <div className=" rounded-full">
                                <div className="tooltip tooltip-left normal-case" data-tip={user.displayName}>
                                    <img className='rounded-full w-[40px] h-[40px]' src={user.photoURL} />
                                </div>
                            </div>
                        </button>
                        <ul className="z-10  dropdown-content shadow bg-base-100 rounded-box ">
                            <li><button onClick={handleLogOut} className="bg-[#4c77a1] hover:bg-[#538EC8] px-3 py-2 rounded-2xl font-bold text-gray-100">Logout</button></li>
                        </ul>
                    </div> : <Link to={'/login'}><button className="bg-[#4c77a1] hover:bg-[#538EC8] px-3 py-2 rounded-2xl font-bold text-gray-100">Login</button></Link>
                }

            </div>
        </div>
    );
};

export default NavBar;
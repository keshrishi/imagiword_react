import { NavLink ,useNavigate} from 'react-router-dom';
import {assets} from '../assets/assets'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
export const Navbar = () => {
    const {user,setShowLogin} = useContext(AppContext)
    const navigate = useNavigate();

    return (
      <div className='flex items-center justify-between py-4'>
        <NavLink to='/'>   
            <img src={assets.logo} className='w-28 sm:w-32 lg:w-40'></img>
        </NavLink>
        <div>
            {user ?
                <div className='flex text-center gap-2 sm:gap-3'>
                    <button onClick={() => navigate('/buy')} className='flex text-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105
                            transition-all duration-500'>
                        <img src={assets.credit_star} className='w-5'></img>
                        <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: 50</p>
                    </button>
                    <p className='flex items-center text-gray-600 max-sm:hidden pl-4'>
                        Hi, Rishikesh
                    </p>
                    <div className='relative group'>
                        <img src={assets.profile_icon} className='w-10 drop-shadow'></img>
                        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                <li className='py-2 px-2 cursor-pointer pr-10'>Logout</li>
                            </ul>
                        </div>
                    </div>

                </div>
                :
                <div className='flex items-center gap-2 sm:gap-5'>
                    
                    <p onClick={() => navigate('/buy')} className='cursor-pointer '>Pricing</p>
 
                    
                    <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full '
                    onClick={()=> {setShowLogin(true)}} >Login</button>
                </div>
            }
            
            
        </div>
      </div>
    );
  };
  
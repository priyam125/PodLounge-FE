import {Link} from 'react-router-dom'
import Logo from './icons/Logo'
import { containerStyles } from '../../utils'
import { logout } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'
import { RiLogoutCircleRFill } from "react-icons/ri";

const Navigation = () => {

  const { user, setUser } = useAuth();

  const isAuthenticated = !!user;

  const handleLogout = async () => {
    try {
      const response = await logout()
      setUser(response.data.user)
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <nav className={`${containerStyles} py-8 flex items-center justify-between`}>
        <Link className='text-white no-underline flex items-center gap-2 font-bold text-[22px]' to="/">
            <Logo className="" />
            <span>PodLounge</span>
        </Link>
        {isAuthenticated && <div className="flex items-center gap-3">
          <h3>{user?.name}</h3>
          <Link to="/" onClick={handleLogout}>
            <img src={user?.avatar} alt="avatar" className="w-[40px] h-[40px] rounded-[50%] object-cover border-[3px] border-[#0077ff] border-solid" />
          </Link>
          <button className='bg-none border-none outline-none cursor-pointer' onClick={handleLogout}><RiLogoutCircleRFill color='#0077ff' size={40}/></button>
        </div>}
       {/* {isAuthenticated && <button onClick={handleLogout}>Logout</button>} */}
    </nav>
  )
}

export default Navigation
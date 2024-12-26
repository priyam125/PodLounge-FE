import {Link} from 'react-router-dom'
import Logo from './icons/Logo'
import { containerStyles } from '../../utils'
import { logout } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'

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
    <nav className={`${containerStyles} py-5 flex items-center justify-between`}>
        <Link className='text-white no-underline flex items-center gap-2 font-bold text-[22px]' to="/">
            <Logo className="" />
            <span>PodLounge</span>
        </Link>
       {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </nav>
  )
}

export default Navigation
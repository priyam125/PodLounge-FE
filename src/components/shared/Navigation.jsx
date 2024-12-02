import {Link} from 'react-router-dom'
import Logo from './icons/Logo'
import { containerStyles } from '../../utils'

const Navigation = () => {
  return (
    <nav className={`${containerStyles} py-5`}>
        <Link className='text-white no-underline flex items-center gap-2 font-bold text-[22px]' to="/">
            <Logo className="" />
            <span>PodLounge</span>
        </Link>
    </nav>
  )
}

export default Navigation
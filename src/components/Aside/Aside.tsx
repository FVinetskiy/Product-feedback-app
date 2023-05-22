import {FC} from 'react'
import './Aside.scss'
import Filter from './Filter/Filter'
import Roadmap from './Roadmap/Roadmap'
import Logo from './logo/Logo'

const Aside: FC = () => {
  return (
    <aside className='aside'>
      <Logo />
      <Filter />
      <Roadmap />
    </aside>
  )
}

export default Aside

import {FC, useState} from 'react'
import './Logo.scss'
import Filter from '../Filter/Filter'
import Roadmap from '../Roadmap/Roadmap'

const Logo: FC = () => {
  const [activeBurger, setActiveBurger] = useState(false)

  const setBurger = () => {
    setActiveBurger(!activeBurger)
  }

  return (
    <div className='logo'>
      <div className='logo__content'>
        <h1 className='logo__title'>Frontend Mentor</h1>
        <p className='logo__text'>Feedback Board</p>
      </div>
      <button
        onClick={setBurger}
        className={activeBurger ? 'logo__button open' : 'logo__button'}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {activeBurger && (
        <div className='menu'>
          <div onClick={setBurger} className='menu__substrate'></div>
          <div className='menu__content'>
            <Filter />
            <Roadmap />
          </div>
        </div>
      )}
    </div>
  )
}

export default Logo

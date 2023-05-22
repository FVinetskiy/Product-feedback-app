import {Link} from 'react-router-dom'
import Select from '../Select/Select'
import {Suggestions} from '../icons/Suggestions'
import './Header.scss'
import {DataContext} from '../../context/dataContext'
import {FC, useContext} from 'react'

const Header:FC = () => {
  const {currentFeedback} = useContext(DataContext)
  return (
    <header className='header'>
      <div className='header__content'>
        <Suggestions className='header__svg' />
        <h2 className='header__title'>
          <span>{currentFeedback.length}</span>Suggestions
        </h2>
        <Select />
      </div>
      <Link to={'/add-feedback'} className='button'>
        + Add Feedback
      </Link>
    </header>
  )
}

export default Header

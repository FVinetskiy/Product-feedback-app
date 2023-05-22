import {Link} from 'react-router-dom'
import {Empty} from '../icons/Empty'
import './Emptiness.scss'
import { FC } from 'react'

const Emptiness:FC = () => {
  return (
    <div className='emptiness'>
      <Empty />
      <h2 className='emptiness__title'>There is no feedback yet.</h2>
      <p className='emptiness__text'>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Link to={'/add-feedback'} className='button'>
        + Add Feedback
      </Link>
    </div>
  )
}

export default Emptiness

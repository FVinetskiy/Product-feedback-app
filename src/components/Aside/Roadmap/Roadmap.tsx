import {FC, useContext} from 'react'
import {DataContext} from '../../../context/dataContext'
import './Roadmap.scss'
import {Link} from 'react-router-dom'

const Roadmap:FC = () => {
  const {Data} = useContext(DataContext)
  const lengthProgress = Data.productRequests?.filter(
    (item) => item.status === 'in-progress',
  ).length
  const lengthLive = Data.productRequests?.filter(
    (item) => item.status === 'live',
  ).length
  const lengthPlanned = Data.productRequests?.filter(
    (item) => item.status === 'planned',
  ).length

  return (
    <div className='roadmap'>
      <div className='roadmap__header'>
        <p className='roadmap__title'>Roadmap</p>
        <Link className='roadmap__link' to={'/roadmap'}>
          View
        </Link>
      </div>
      <div className='roadmap__main'>
        <ul className='roadmap-list'>
          <li className='roadmap-list__item'>
            Planned
            <span className='roadmap__number'>{lengthPlanned}</span>
          </li>
          <li className='roadmap-list__item'>
            In-Progress
            <span className='roadmap__number'>{lengthProgress}</span>
          </li>
          <li className='roadmap-list__item'>
            Live
            <span className='roadmap__number'>{lengthLive}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Roadmap

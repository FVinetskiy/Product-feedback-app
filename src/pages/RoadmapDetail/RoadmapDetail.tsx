import {Link, useNavigate} from 'react-router-dom'
import {FC, useContext} from 'react'
import {DataContext} from '../../context/dataContext'
import './RoadmapDetail.scss'
import DetailStatus from '../../components/DetailStatus/DetailStatus'

const RoadmapDetail: FC = () => {
  const navigate = useNavigate()
  const {Data} = useContext(DataContext)

  const newHaveIndexData = Data.productRequests.map((item, index) => {
    return {
      ...item,
      _id: index,
    }
  })

  const planned = newHaveIndexData.filter((item) => item.status === 'planned')

  const progress = newHaveIndexData.filter(
    (item) => item.status === 'in-progress',
  )
  const live = newHaveIndexData.filter((item) => item.status === 'live')

  return (
    <div className='container'>
      <div style={{width: '100%'}}>
        <div className='roadmap-head'>
          <div className='roadmap-head__content'>
            <button className='back' onClick={() => navigate(-1)}>
              Go back
            </button>
            <h1 className='roadmap-head__title'>Roadmap</h1>
          </div>
          <Link to={'/add-feedback'} className='button'>
            + Add Feedback
          </Link>
        </div>

        <ul className='detail-list'>
          <li className='detail-list__item'>
            <p className='detail-list__title'>Planned ({planned.length})</p>
            <p className='detail-list__text'>Ideas prioritized for research</p>
            {planned.map((item) => (
              <DetailStatus {...item} key={item.id}></DetailStatus>
            ))}
          </li>
          <li className='detail-list__item'>
            <p className='detail-list__title'>
              In-Progress ({progress.length})
            </p>
            <p className='detail-list__text'>Currently being developed</p>
            {progress.map((item) => (
              <DetailStatus {...item} key={item.id}></DetailStatus>
            ))}
          </li>
          <li className='detail-list__item'>
            <p className='detail-list__title'>Live ({live.length})</p>
            <p className='detail-list__text'>Released features</p>
            {live.map((item) => (
              <DetailStatus {...item} key={item.id}></DetailStatus>
            ))}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RoadmapDetail

import {FC, useContext} from 'react'
import './DetailStatus.scss'
import {Comments} from '../icons/Comments'
import {Link} from 'react-router-dom'
import {DataContext} from '../../context/dataContext'

type comment = {
  id: number
  content: string
  user: {
    image: string
    name: string
    username: string
  }
}

type PropsDetailStatus = {
  status: string
  title: string
  category: string
  upvotes: number
  comments?: comment[]
  description: string
  id: number
  _id: number
}

const DetailStatus: FC<PropsDetailStatus> = (item) => {
  const {flagCount, setFlagCount} = useContext(DataContext)
  const currentCount = flagCount[item._id].item

  const countIncrement = () => {
    const localCount = [...flagCount]
    localCount[item._id].active
      ? localCount[item._id].item++
      : localCount[item._id].item--
    localCount[item._id].active = !localCount[item._id].active
    setFlagCount(localCount)
  }

  return (
    <div className={`detail-status ${item.status}`}>
      <p className={`detail-status__status ${item.status}`}>{item.status}</p>
      <Link to={`/detail/${item.id}`} className='detail-status__title'>
        {item.title}
      </Link>
      <p className='detail-status__description'>{item.description}</p>
      <div className='detail-status__category'>{item.category}</div>
      <div className='detail-status__footer'>
        <button
          onClick={countIncrement}
          className={
            flagCount[item._id].active
              ? 'detail-status__upvotes active'
              : 'detail-status__upvotes'
          }>
          {currentCount}
        </button>
        <span className='detail-status__comments'>
          <Comments />
          {item.comments ? item.comments.length : 0}
        </span>
      </div>
    </div>
  )
}

export default DetailStatus

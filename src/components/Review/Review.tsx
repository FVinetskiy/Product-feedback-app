import {FC, useContext} from 'react'
import './Review.scss'
import {Comments} from '../icons/Comments'
import {Link} from 'react-router-dom'
import {DataContext} from '../../context/dataContext'

type subComment = {
  content: string
  replyingTo: string
  user: {
    image: string
    name: string
    username: string
  }
}

type comment = {
  id: number
  content: string
  user: {
    image: string
    name: string
    username: string
  }
  replies?: subComment[]
}

type PropsReview = {
  id: number
  title: string
  category: string
  upvotes: number
  status: string
  description: string
  comments?: comment[]
}

const Review: FC<PropsReview> = (review) => {
  const {flagCount, setFlagCount} = useContext(DataContext)
  const currentCount = flagCount[review.id - 1]?.item

  const repliesLength = review?.comments
    ?.map((comment) => comment?.replies?.length)
    .filter((i) => i !== undefined)
    .reduce((acc: number, num: any) => acc + num, 0)

  const countIncrement = (id: number) => {
  
    const localCount = [...flagCount]
    localCount[id - 1].active
      ? localCount[id - 1].item++
      : localCount[id - 1].item--
    localCount[id - 1].active = !localCount[id - 1].active
    setFlagCount(localCount)
  }

  const resultLengthComment = () => {
    if (review.comments?.length !== undefined && repliesLength !== undefined) {
      return review.comments?.length + repliesLength
    } else if (
      review.comments?.length !== undefined &&
      repliesLength === undefined
    ) {
      return review.comments?.length
    } else if (
      review.comments?.length === undefined &&
      repliesLength !== undefined
    ) {
      return repliesLength
    } else {
      return 0
    }
  }

  return (
    <div className='review'>
      <button
        onClick={() => countIncrement(review.id)}
        className={
          flagCount[review.id - 1]?.active
            ? 'review__upvotes active'
            : 'review__upvotes'
        }>
        {currentCount ? currentCount : 0}
      </button>
      <div className='review__content'>
        <Link to={`/detail/${review.id}`} className='review__title'>
          {review.title}
        </Link>
        <p className='review__description'>{review.description}</p>
        <div className='review__category'>{review.category}</div>
      </div>
      <span className='review__comments'>
        <Comments />
        {resultLengthComment()}
      </span>
    </div>
  )
}

export default Review

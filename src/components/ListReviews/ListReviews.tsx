import './Reviews.scss'
import {FC, useContext} from 'react'
import {DataContext} from '../../context/dataContext'
import './Reviews.scss'
import Review from '../Review/Review'
import Emptiness from '../Emptiness/Emptiness'

const ListReviews: FC = () => {
  const {Data, currentFeedback} = useContext(DataContext)

  return (
    <section>
      {Data.productRequests.length === 0 ? <Emptiness /> : null}
      {currentFeedback.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </section>
  )
}

export default ListReviews

import {FC, useContext} from 'react'
import {DataContext} from '../../context/dataContext'
import './ReviewPage.scss'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Review from '../../components/Review/Review'
import Comment from '../../components/Comment/Comment'
import {useForm} from 'react-hook-form'

const ReviewPage: FC = () => {
  const {
    reset,
    register,
    formState: {errors},
    handleSubmit,
  } = useForm()

  const {id} = useParams<{id: string | any}>()
  const {Data, currentFeedback, setCurrentFeedback, setActualFeedBack} =
    useContext(DataContext)
  const currentUser = Data.currentUser
  const detailReview = Data.productRequests[id - 1]
  const commentsLength = detailReview.comments?.length
  const comments = detailReview?.comments
  const navigate = useNavigate()
  const subCommentsLength = comments
    ?.map((i) => i.replies?.length)
    .filter((i) => i !== undefined)
    .reduce((acc: number, num: any) => acc + num, 0)

  const addComment = (data: any) => {
    const newComment = {
      content: data.addPost,
      id: Math.floor(Math.random() * 100),
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    }

    currentFeedback[id - 1].comments?.push(newComment)
    setCurrentFeedback(currentFeedback)
    reset()
  }

  return (
    <div className='container container--mini'>
      <div style={{width: '100%'}}>
        <div className='review-head'>
          <button className='back back--dark' onClick={() => navigate(-1)}>
            Go back
          </button>
          <Link
            onClick={() => setActualFeedBack(id)}
            to={'/edit-feedback'}
            className='edit'>
            Edit Feedback
          </Link>
        </div>

        <Review {...detailReview} />

        <div className='comments'>
          {
            <h2 className='comments__title'>
              <span>
                {commentsLength && subCommentsLength !== undefined
                  ? commentsLength + subCommentsLength
                  : 0}
              </span>
              Comments
            </h2>
          }
          {comments?.map((comment, index) => (
            <Comment {...comment} key={comment.id} commentsIndex={index} />
          ))}
        </div>

        <form onSubmit={handleSubmit(addComment)} className='add-comment'>
          <p className='add-comment__title'>Add Comment</p>
          <textarea
            {...register('addPost', {required: true})}
            maxLength={250}
            name='addPost'
            className={
              errors?.addPost
                ? 'add-comment__textarea error'
                : 'add-comment__textarea'
            }
            placeholder={
              errors?.addPost ? 'Can’t be empty' : 'Type your comment here'
            }></textarea>
          <div className='add-comment__footer'>
            <p className='add-comment__warning'>250 Characters left</p>
            <button onClick={handleSubmit(addComment)} className='button'>
              Post Comments
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewPage

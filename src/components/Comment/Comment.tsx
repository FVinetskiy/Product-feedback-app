import './Comment.scss'
import {FC, useState, useContext} from 'react'
import Answer from '../Answer/Answer'
import {useForm} from 'react-hook-form'
import {DataContext} from '../../context/dataContext'
import {useParams} from 'react-router-dom'

export type answer = {
  content: string
  replyingTo: string
  user: {
    image: string
    name: string
    username: string
  }
}

type commentCurrent = {
  id: number
  content: string
  user: {
    image: string
    name: string
    username: string
  }
  replies?: answer[] | undefined
  commentsIndex: number
}

const Comment: FC<commentCurrent> = (props) => {
  const {Data, currentFeedback, setCurrentFeedback} = useContext(DataContext)
  const currentUser = Data.currentUser
  const {id} = useParams<{id: any}>()

  const [reply, setReply] = useState(false)

  const {
    reset,
    register,
    formState: {errors},
    handleSubmit,
  } = useForm()

  const toggleReply = () => {
    setReply(!reply)
  }

  const addNewAnswerComment = handleSubmit((data) => {
    const copyCurrentFeedback = [...currentFeedback]
    const newAnswer = {
      content: data.addNewAnswer,
      replyingTo: props.user.username,
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    }

    setCurrentFeedback(
      // @ts-ignore: Unreachable code error
      copyCurrentFeedback[id - 1].comments[props.commentsIndex].replies?.push(
        newAnswer,
      ),
    )
    reset()
    toggleReply()
  })

  return (
    <div className='comments__item'>
      <div className='comments__main-content'>
        <div className='comments__avatar'>
          <img src={`.${props.user.image}`} alt='avatar' />
        </div>
        <div className='comments__content'>
          <div className='comments__head'>
            <div>
              <p className='comments__name'>{props.user.name}</p>
              <p className='comments__username'>{props.user.username}</p>
            </div>
            {props.user.name !== currentUser.name ? (
              <button onClick={toggleReply} className='comments__reply'>
                Reply
              </button>
            ) : null}
          </div>
          <p className='comments__text'>{props.content}</p>

          {reply ? (
            <form
              onSubmit={addNewAnswerComment}
              className='comments__reply-block'>
              <textarea
                className={
                  errors?.addNewAnswer
                    ? 'add-comment__textarea error'
                    : 'add-comment__textarea'
                }
                {...register('addNewAnswer', {required: true})}></textarea>
              <button onClick={addNewAnswerComment} className='button'>
                Post Reply
              </button>
            </form>
          ) : null}
        </div>
      </div>

      {props.replies?.map((answer, index) => (
        <Answer
          key={answer.content}
          {...answer}
          index={index}
          commentsIndex={props.commentsIndex}
        />
      ))}
    </div>
  )
}

export default Comment

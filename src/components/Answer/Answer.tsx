import {FC, useState, useContext} from 'react'
import './Answer.scss'
import {answer} from '../../context/dataContext'
import {DataContext} from '../../context/dataContext'
import {useParams} from 'react-router-dom'

export type answerDetail = {
  index: number
  content: string
  replyingTo: string
  user: {
    image: string
    name: string
    username: string
  }
  commentsIndex: number
}

const Answer: FC<answerDetail> = (props) => {
  const {Data, currentFeedback, setCurrentFeedback} = useContext(DataContext)
  const currentUser = Data.currentUser
  const [message, setMessage] = useState('')
  const [subReply, setSubReply] = useState(false)
  const {id} = useParams<{id: any}>()

  const toggleSubReply = () => {
    setSubReply(!subReply)
  }

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  const createNewAnswer = () => {
    const localCurrentFeedback = [...currentFeedback]
    const newAnswer: answer = {
      content: message,
      replyingTo:
        // @ts-ignore: Unreachable code error
        localCurrentFeedback[id - 1].comments[props.commentsIndex].replies[
          props.index
        ].user.name,
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
    }
    // @ts-ignore: Unreachable code error
    localCurrentFeedback[id - 1].comments[props.commentsIndex].replies?.push(
      newAnswer,
    )
    setCurrentFeedback(localCurrentFeedback)
    toggleSubReply()
  }

  return (
    <div className='answer'>
      <div className='comments__avatar'>
        <img src={`.${props.user.image}`} alt='avatar' />
      </div>
      <div className='answer__content'>
        <div className='comments__head'>
          <div>
            <p className='comments__name'>{props.user.name}</p>
            <p className='comments__username'>{props.user.username}</p>
          </div>
          {currentUser.name !== props.user.name ? (
            <button onClick={toggleSubReply} className='comments__reply'>
              Reply
            </button>
          ) : null}
        </div>
        <div className='comments__answer-block'>
          <span className='answer__replyingTo'>@{props.replyingTo}</span>
          <span className='comments__text'>{props.content}</span>
        </div>

        {subReply ? (
          <div className='comments__reply-block'>
            <textarea
              onChange={handleMessageChange}
              className='add-comment__textarea'></textarea>
            <button onClick={createNewAnswer} className='button'>
              Post Reply
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Answer

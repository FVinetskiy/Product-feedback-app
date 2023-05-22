import {useNavigate} from 'react-router-dom'
import './modal.scss'
import {NewFeedback} from '../icons/NewFeedback'
import CustomSelect from '../UI/CustomSelect/CustomSelect'
import {FC, useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import {DataContext} from '../../context/dataContext'

type SortListItem = {
  name: string
  id: number
}

const list: SortListItem[] = [
  {name: 'enhancement', id: 1},
  {name: 'feature', id: 2},
  {name: 'bug', id: 3},
]

const AddFeedback: FC = () => {
  // select
  const [activeSelect, setActiveSelect] = useState(list[0].name)
  const [open, setOpen] = useState(false)

  const {currentFeedback, setCurrentFeedback, flagCount, setFlagCount} =
    useContext(DataContext)
  const maxId = currentFeedback.reduce((acc, curr) =>
    acc.id > curr.id ? acc : curr,
  )

  const navigate = useNavigate()
  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm()

  const switchFilter = (index: number) => {
    setActiveSelect(list[index].name)
    setOpen(false)
  }

  const onSubmit = (data: any) => {
    const localFlagCount = [...flagCount]

    const newFeedBack = {
      id: maxId.id + 1,
      title: data.name,
      category: activeSelect,
      upvotes: 0,
      status: 'planned',
      comments: [],
      description: '',
    }

    localFlagCount.push({item: 0, active: false})
    currentFeedback.push(newFeedBack)
    setFlagCount(localFlagCount)
    setCurrentFeedback(currentFeedback)
    navigate('/')
  }

  return (
    <div className='add-feedback'>
      <button className='back back--dark' onClick={() => navigate(-1)}>
        Go back
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className='modalFeedback'>
        <NewFeedback className={'modalFeedback__svg'} />
        <p className='modalFeedback__title'>Create New Feedback</p>

        <div className='modalFeedback__title-block'>
          <p className='modalFeedback__subtitle'>Feedback Title</p>
          <p className='modalFeedback__text'>
            Add a short, descriptive headline
          </p>
        </div>

        <input
          {...register('name', {required: true})}
          className={errors?.name ? 'input error' : 'input'}
          type='text'
        />

        <div className='modalFeedback__title-block'>
          <p className='modalFeedback__subtitle'>Category</p>
          <p className='modalFeedback__text'>
            Choose a category for your feedback
          </p>
        </div>

        <CustomSelect
          active={activeSelect}
          switchFilter={switchFilter}
          tabindex={0}
          array={list}
          open={open}
          setOpen={setOpen}
        />

        <div className='modalFeedback__title-block'>
          <p className='modalFeedback__subtitle'>Feedback Detail</p>
          <p className='modalFeedback__text'>
            Include any specific comments on what should be improved, added,
            etc.
          </p>
        </div>
        <div className='modalFeedback__wrap-textarea'>
          <textarea
            {...register('textarea', {required: true})}
            className={
              errors?.textarea ? 'textarea error' : 'textarea'
            }></textarea>
          {errors?.name && (
            <p className='modalFeedback__error'>Can’t be empty</p>
          )}
          {errors?.textarea && (
            <p className='modalFeedback__error'>Can’t be empty</p>
          )}
        </div>

        <div className='add-feedback__footer'>
          <button onClick={() => navigate(-1)} className='cancel'>
            Cancel
          </button>
          <button className='button'>Add Feedback</button>
        </div>
      </form>
    </div>
  )
}

export default AddFeedback

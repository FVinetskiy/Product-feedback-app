import {useNavigate} from 'react-router-dom'
import './modal.scss'
import {Edit} from '../icons/Edit'
import {FC, useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import {DataContext} from '../../context/dataContext'
import CustomSelect from '../UI/CustomSelect/CustomSelect'

type SortListItem = {
  name: string
  id: number
}

const Category: SortListItem[] = [
  {name: 'planned', id: 1},
  {name: 'in-Progress', id: 2},
  {name: 'live', id: 3},
]

const Statuses: SortListItem[] = [
  {name: 'enhancement', id: 1},
  {name: 'feature', id: 2},
  {name: 'bug', id: 3},
]

const EditFeedback: FC = () => {
  const navigate = useNavigate()
  const [activeSelect, setActiveSelect] = useState(Statuses[0].name)
  const [open, setOpen] = useState(false)
  const [activeSelectCat, setActiveSelectCat] = useState(Category[0].name)
  const [openCategory, setOpenCategory] = useState(false)

  const {currentFeedback, actualFeedBack, setCurrentFeedback} =
    useContext(DataContext)
  const local = [...currentFeedback]
  const result = local.find((i) => i.id === Number(actualFeedBack))
  const updateArray = local.filter((i) => i.id !== Number(actualFeedBack))

  const [valueInput, setValue] = useState(result?.title)
  const [valueTextarea, setTextarea] = useState(result?.description)

  const setValueInput = (event: any) => {
    setValue(event.target.value)
  }

  const setValueTextarea = (event: any) => {
    setTextarea(event.target.value)
  }

  const switchFilter = (index: number) => {
    setActiveSelect(Statuses[index].name)
    setOpen(false)
  }

  const switchFilterCategory = (index: number) => {
    setActiveSelectCat(Category[index].name)
    setOpenCategory(false)
  }

  const {
    register,
    formState: {errors},
    handleSubmit,
  } = useForm()

  const deleteItem = () => {
    setCurrentFeedback(updateArray)
    navigate('/')
  }

  const onSubmit = () => {
    const newObj = {
      category: activeSelect,
      comments: result?.comments,
      description: valueTextarea,
      id: result?.id,
      status: activeSelect,
      title: valueInput,
      upvotes: result?.upvotes,
    }
    navigate('/')
    const newСurrentFeedback = currentFeedback.map((i) => {
      if (i.id === newObj.id) {
        return newObj
      }
      return i
    })
    setCurrentFeedback(newСurrentFeedback)
  }

  return (
    <div className='add-feedback'>
      <button className='back back--dark' onClick={() => navigate(-1)}>
        Go back
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className='modalFeedback'>
        <Edit className={'modalFeedback__svg'} />
        <p className='modalFeedback__title'>Editing ‘{result?.title}’</p>

        <div className='modalFeedback__title-block'>
          <p className='modalFeedback__subtitle'>Feedback Title</p>
          <p className='modalFeedback__text'>
            Add a short, descriptive headline
          </p>
        </div>

        <input
          {...register('name', {required: true})}
          tabIndex={1}
          className={errors?.name ? 'input error' : 'input'}
          type='text'
          value={valueInput}
          onChange={setValueInput}
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
          open={open}
          setOpen={setOpen}
          array={Statuses}
        />

        <div className='modalFeedback__title-block'>
          <p className='modalFeedback__subtitle'>Update Status</p>
          <p className='modalFeedback__text'>Change feedback state</p>
        </div>

        <CustomSelect
          active={activeSelectCat}
          switchFilter={switchFilterCategory}
          open={openCategory}
          setOpen={setOpenCategory}
          array={Category}
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
            {...register('text', {required: true})}
            tabIndex={4}
            value={valueTextarea}
            onChange={setValueTextarea}
            className={errors?.text ? 'textarea error' : 'textarea'}></textarea>

          {errors?.name && (
            <p className='modalFeedback__error'>Can’t be empty</p>
          )}
          {errors?.textarea && (
            <p className='modalFeedback__error'>Can’t be empty</p>
          )}
        </div>

        <div className='add-feedback__footer'>
          <button onClick={deleteItem} className='delete'>
            Delete
          </button>

          <div className='add-feedback__wrap-button'>
            <button onClick={() => navigate(-1)} className='cancel'>
              Cancel
            </button>
            <button onClick={handleSubmit(onSubmit)} className='button'>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditFeedback

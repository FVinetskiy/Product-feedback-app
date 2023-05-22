import {FC, useEffect, useRef, useState, useContext} from 'react'
import './Select.scss'
import {Check} from '../icons/Check'
import {DataContext} from '../../context/dataContext'

type SortListItem = {
  name: string
  id: number
}

const list: SortListItem[] = [
  {name: 'Most Upvotes', id: 1},
  {name: 'Least Upvotes', id: 2},
  {name: 'Most Comments', id: 3},
  {name: 'Least Comments', id: 4},
]

const Select: FC = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(list[0].name)
  const sortRef = useRef<HTMLDivElement>(null)
  const {currentFeedback, setCurrentFeedback} = useContext(DataContext)
  const copyCurrentFeedback = [...currentFeedback]

  const openList = () => {
    setOpen(!open)
  }

  useEffect(() => {
    setCurrentFeedback(
      copyCurrentFeedback.sort(function (a, b) {
        if (a.upvotes < b.upvotes) {
          return 1
        } else {
          return -1
        }
      }),
    )
    const handleClickOutside = (event: any) => {
      const path = event.composedPath().includes(sortRef.current)
      if (!path) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const arrCommentLength = copyCurrentFeedback.map(
    (item) => item.comments?.length,
  )

  const arrAnswersLength = copyCurrentFeedback.map((item) =>
    item.comments
      ?.map((i) => i.replies?.length)
      .filter((i) => i !== undefined)
      .reduce((acc: number, num: any) => acc + num, 0),
  )

  const combineArrays = (arrCommentLength: any, arrAnswersLength: any) => {
    for (let i = 0; i < arrCommentLength?.length; i++) {
      arrCommentLength[i] = arrCommentLength[i] + arrAnswersLength[i]
    }
    return arrCommentLength
  }
  const resultLength = combineArrays(arrCommentLength, arrAnswersLength)
  const newHaveIndexData = copyCurrentFeedback.map((item, index) => {
    return {
      ...item,
      totalLength: resultLength[index],
    }
  })

  const switchFilter = (index: number) => {
    setActive(list[index].name)
    setOpen(false)
    switch (index) {
      case 0:
        setCurrentFeedback(
          copyCurrentFeedback.sort(function (a, b) {
            if (a.upvotes < b.upvotes) {
              return 1
            } else {
              return -1
            }
          }),
        )
        break
      case 1:
        setCurrentFeedback(
          copyCurrentFeedback.sort(function (a, b) {
            if (a.upvotes > b.upvotes) {
              return 1
            } else {
              return -1
            }
          }),
        )
        break
      case 2:
        setCurrentFeedback(
          newHaveIndexData.sort(function (a, b) {
            if (a.totalLength < b.totalLength) {
              return 1
            } else {
              return -1
            }
          }),
        )
        break
      case 3:
        setCurrentFeedback(
          newHaveIndexData.sort(function (a, b) {
            if (a.totalLength > b.totalLength) {
              return 1
            } else {
              return -1
            }
          }),
        )
        break
    }
  }

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__head'>
        Sort by :
        <span className={open ? 'active' : ''} onClick={openList}>
          {active}
        </span>
      </div>
      {open && (
        <div className='sort__content'>
          {list.map((item, index) => (
            <button
              key={item.id}
              onClick={() => switchFilter(index)}
              className={'sort__button'}>
              {item.name}
              {item.name === active ? <Check /> : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select

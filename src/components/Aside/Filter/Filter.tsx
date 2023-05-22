import {FC, useContext} from 'react'
import './Filter.scss'
import {DataContext} from '../../../context/dataContext'

const Filter:FC = () => {
  const {Data, setCurrentFeedback, activeTabFilter, setActiveTabFilter} =
    useContext(DataContext)

  const ListButton = ['All', 'enhancement', 'feature', 'bug']

  const setItem = (index: number, item: string) => {
    setActiveTabFilter(index)
    const localData = [...Data.productRequests]

    if (item === 'All') {
      setCurrentFeedback(Data.productRequests)
    } else {
      const newStateFiltered = localData.filter((i) => i.category === item)
      setCurrentFeedback(newStateFiltered)
    }
  }

  return (
    <ul className='filter'>
      {ListButton.map((item, index) => (
        <li key={item} className='filter__item'>
          <button
            onClick={() => setItem(index, item)}
            className={
              activeTabFilter === index
                ? 'filter__button active'
                : 'filter__button '
            }>
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Filter

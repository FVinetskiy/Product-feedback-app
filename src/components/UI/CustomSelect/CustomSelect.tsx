import {FC} from 'react'
import './CustomSelect.scss'
import {Check} from '../../icons/Check'

type SortListItem = {
  name: string
  id: number
}

type typePropsSelect = {
  tabindex?: number
  array: SortListItem[]
  switchFilter: Function
  active: string
  open: boolean
  setOpen: Function
}

const CustomSelect: FC<typePropsSelect> = ({
  tabindex,
  array,
  switchFilter,
  active,
  open,
  setOpen,
}) => {
  const openList = () => {
    setOpen(!open)
  }

  return (
    <div className='custom-select'>
      <div
        tabIndex={tabindex}
        onClick={openList}
        className={
          open ? 'custom-select__content active' : 'custom-select__content'
        }>
        {active}
      </div>

      {open && (
        <div className='options'>
          {array?.map((item, index) => (
            <button
              key={item.id}
              onClick={() => switchFilter(index)}
              className={'options__button'}>
              {item.name}
              {item.name === active ? <Check /> : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect

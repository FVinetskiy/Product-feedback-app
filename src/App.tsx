import {FC, useState} from 'react'
import {DataContext} from './context/dataContext'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import RoadmapDetail from './pages/RoadmapDetail/RoadmapDetail'
import ReviewPage from './pages/ReviewPage/ReviewPage'
import AddFeedback from './components/Modal/AddFeedback'
import EditFeedback from './components/Modal/EditFeedback'
import MainData from '../data.json'

const App: FC = () => {
  const [Data, setData] = useState(MainData)

  const upvotes = Data.productRequests
    .map((i) => i.upvotes)
    .map((i: any) => (i = {item: i, active: false}))

  const [activeTabFilter, setActiveTabFilter] = useState(0)
  const [currentFeedback, setCurrentFeedback] = useState(Data.productRequests)
  const [currentIndexComment, setCurrentIndexComment] = useState(0)
  const [actualFeedBack, setActualFeedBack] = useState(0)

  const [flagCount, setFlagCount] = useState(upvotes)

  return (
    <DataContext.Provider
      value={{
        Data,
        setData,
        currentFeedback,
        activeTabFilter,
        setActiveTabFilter,
        setCurrentFeedback,
        flagCount,
        setFlagCount,
        currentIndexComment,
        setCurrentIndexComment,
        actualFeedBack,
        setActualFeedBack,
      }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/roadmap' element={<RoadmapDetail />} />
        <Route path='/detail/:id' element={<ReviewPage />} />
        <Route path='/add-feedback' element={<AddFeedback />} />
        <Route path='/edit-feedback' element={<EditFeedback />} />
      </Routes>
    </DataContext.Provider>
  )
}

export default App

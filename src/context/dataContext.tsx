import {createContext} from 'react'

export type answer = {
  content: string
  replyingTo: string
  user: {
    image: string
    name: string
    username: string
  }
}

export type comment = {
  id: number
  content: string
  user: {
    image: string
    name: string
    username: string
  }
  replies?: answer[]
}

export type CurrentContextType = {
  Data: {
    currentUser: {
      image: string
      name: string
      username: string
    }
    productRequests: {
      id: number
      title: string
      category: string
      upvotes: number
      status: string
      description: string
      comments?: comment[]
    }[]
  }
  setData: Function
  currentFeedback: {
    id: number
    title: string
    category: string
    upvotes: number
    status: string
    description: string
    comments?: comment[]
  }[]
  setCurrentFeedback: Function
  activeTabFilter: number
  setActiveTabFilter: Function
  flagCount: {
    item: number
    active: boolean
  }[]
  setFlagCount: Function
  setCurrentIndexComment: Function
  currentIndexComment: number
  actualFeedBack: number
  setActualFeedBack: Function
}

export const DataContext = createContext<CurrentContextType>(
  {} as CurrentContextType,
)

import Aside from '../../components/Aside/Aside'
import Header from '../../components/Header/Header'
import ListReviews from '../../components/ListReviews/ListReviews'

const Home = () => {
  return (
    <div className='container'>
      <Aside />
      <div className='header-wrapper'>
        <Header />
        <ListReviews />
      </div>
    </div>
  )
}

export default Home

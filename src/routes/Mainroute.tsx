import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Movies from '../Components/Movies'
import Service from '../Components/TvSeries'
import About from '../Components/Bookmark'

const Mainroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trend-rec" element={<Movies />} />
      <Route path="/tvseries" element={<Service />} />
      <Route path="/bookmark" element={<About />} />
    </Routes>
  )
}

export default Mainroute
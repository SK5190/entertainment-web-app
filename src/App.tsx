import Nav from "./Components/Nav"
import Mainroute from "./routes/Mainroute"
import { BookmarkProvider } from "./Components/BookmarkContext"

const App = () => {
  return (
    <BookmarkProvider>
      <div className="bg-[#10141E]  text-white  min-h-screen px-9  flex items-center">
        <Nav />
        <Mainroute />
      </div>
    </BookmarkProvider>
  )
}

export default App

import { BrowserRouter } from 'react-router'
import './App.css'
import Navbar from './Navbar/Navbar'
import Main from './Main/Main'
import Footer from './Footer/Footer'

function App() {
  

  return (
    <>
      <BrowserRouter>
          <nav><Navbar></Navbar></nav>
          <main><Main></Main></main>
          <footer><Footer></Footer></footer>
      </BrowserRouter>
    </>
  )
}




export default App

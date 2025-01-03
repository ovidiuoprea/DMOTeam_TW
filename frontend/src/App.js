
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn.js';
import HomePage from './pages/HomePage.js';
import SignUp from './pages/SignUp.js';
import ArticlePage from './pages/ArticlePage.jsx';
import ConferencePage from './pages/ConferencePage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/article/:article_id' element={<ArticlePage/>}></Route>
        <Route path='/conference/:conference_id' element={<ConferencePage/>}></Route>
        {/* <Route path='/article/:article_id' element={<ArticlePg/>}></Route> */}
      </Routes>
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

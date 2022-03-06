import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/Home'
import Message from './components/Message';

function App() {
  return (
    <>
    <Message user={"Usha"} side={"left"} message={"Hello friends!"}/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
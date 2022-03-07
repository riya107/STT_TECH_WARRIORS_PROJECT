import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './components/Home'
import Chat from './components/Chat'
import Message from './components/Message';

function App() {
  return (
    <>
    <Message side="left" message="This is it" user="ushasri"/>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/chat' element={<Chat/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
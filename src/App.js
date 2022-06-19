
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue('')

  return (
    <div className="app">

      {
        !user ? (
          <Login />
        ) : (
          <div className="app__body">
            <BrowserRouter>
              <Sidebar />
              <Routes>
                <Route exact path="/rooms/:roomid" element={<Chat />} />
                <Route exact path="/rooms/" element={<Chat />} />
              </Routes>
            </BrowserRouter>
          </div>

        )}



    </div>
  );
}

export default App;

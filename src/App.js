import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"
import Preview from './app/preview/page';
import Login from './app/login/login';
import Register from './app/register/page';
import Home from './app/home/page';
import Profile from './app/profile/page';
import Viewprofile from './app/viewprofile/page';
import Chat from './app/chat/page';
import Groups from './app/groups/page';
import Group from './app/group/page';
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Preview />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/viewprofile" element={<Viewprofile />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/group" element={<Group />} />
    </Routes>
   </Router>
  );
}

export default App;


import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage"
import Toolbar from './components/Toolbar';
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SubscriptionPage from './pages/SubscriptionPage';
import AdminPage from './pages/AdminPage';
import UpdateUserPage from './pages/UpdateUserPage';
import CreateUserPage from './pages/CreateUserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toolbar/>
          <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/subscription" element={<SubscriptionPage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/user/:id" element={<UpdateUserPage/>}/>
            <Route path="/create" element={<CreateUserPage/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './NotFound/NotFound';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RequireAuth from './pages/Login/RequireAuth';
import SignUp from './pages/Login/Signup';
import Orders from './pages/Orders/Orders';
import Header from './pages/Shared/Header';
import Shop from './pages/Shop/Shop';

function App() {
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/shop" element={<Shop></Shop>}></Route>
          <Route path="/cart" element={<RequireAuth><Cart></Cart></RequireAuth>}></Route>
          <Route path="/orders" element={<RequireAuth><Orders></Orders></RequireAuth>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </Header>

    </div>
  );
}

export default App;

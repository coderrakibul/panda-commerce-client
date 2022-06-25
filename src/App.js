import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './NotFound/NotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import RequireAuth from './pages/Login/RequireAuth';
import SignUp from './pages/Login/Signup';
import Orders from './pages/Orders/Orders';
import Header from './pages/Shared/Header';
import Shop from './pages/Shop/Shop';
import Carts from './pages/Cart/Carts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile/Profile';
import Payment from './pages/Orders/Payment';



function App() {
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/shop" element={<Shop></Shop>}></Route>
          <Route path="/cart" element={<RequireAuth><Carts></Carts></RequireAuth>}></Route>
          <Route path="/orders" element={<RequireAuth><Orders></Orders></RequireAuth>}></Route>
          <Route path="/payment/:id" element={<Payment></Payment>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
        <ToastContainer></ToastContainer>
      </Header>

    </div>
  );
}

export default App;

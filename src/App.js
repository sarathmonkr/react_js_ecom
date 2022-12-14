import { Route, Routes } from 'react-router-dom';
import './App.css';
import  List  from './Components/List';
import  AddItem  from './Components/AddItem';
import  SideBar  from './Components/SideBar';
import Cart from './Components/Cart';
import EditItem from './Components/EditItem'

function App() {
    return (
    <div className="App">
      <SideBar/>
      <Routes>
        <Route path='/' element={<List/>}></Route>
      </Routes>
      <Routes>
        <Route path='additem' element={<AddItem/>}></Route>
      </Routes>
      <Routes>
        <Route path='edit' element={<EditItem/>}></Route>
      </Routes>
      <Routes>
        <Route path='cart' element={<Cart/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
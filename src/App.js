import { Routes, Route } from 'react-router-dom';
import Home from './component/routes/home/home.component';
import Navigation from './component/routes/navigation/navigation.component';

const Shop = () => {
  return <h1>I am the shop page</h1>;
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Navigation/>}>
        <Route  index element={<Home />} />
        <Route path='/shop' index element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;

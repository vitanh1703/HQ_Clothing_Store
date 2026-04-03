// import Login from './components/Login'; 
// import './App.css'

// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }

// export default App

import Navbar from './components/Header';
import ProductsPage from './components/ProductsPage';

function App() {
  return (
    <>
      <Navbar />
      <ProductsPage />
    </>
  );
}
export default App
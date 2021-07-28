import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Menu from './Menu';
import Dashboard from './Dashboard';
import Footer from './Footer';
import {BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from 'react-router-dom';
import Register from './Register';
import Error from './Error';
import Login from './Login';
import RoutesC from './RoutesC';

function App(props) {
  
  return (
    <div class="wrapper">

      
      <RoutesC  />
    
    </div>
  );
}

// const Public = ({component: Component, ...rest}) =>{
//   return(
//     <Route  {...rest}
//       render ={(props => Component)}
//     />
//   );

// }
 const Private = () =>{
  
 }


export default App;

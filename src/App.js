import React from 'react';
import Register from './Register';
import LoginForm from './LoginForm';
import Home from './Home';
import { Route} from "react-router-dom";
//import history  from './history';
import { BrowserRouter} from "react-router-dom";

function App() {
  
  

  return (
     <BrowserRouter>  
          
          <Route exact path="/" component={LoginForm} /> 
           
              <Route exact path="/home" component={Home}  />
             
              <Route exact path="/register" component={Register} />
   
         
              
          </BrowserRouter>       
     
  );
}

export default App;

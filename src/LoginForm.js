import React from 'react';
import { Link,Router,withRouter} from "react-router-dom";
import './LoginForm.css';
import axios from 'axios';
import history from './history';
import Navbar from './Navbar';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
   
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  
  
    

  class LoginForm extends React.Component {

    
    constructor(props) {
      super(props);
  
      this.state = {
       
        email: null,
        password: null,
        formErrors: {
         
          email: "",
          password: ""

         
        }
      };
    }
    
    handleSubmit =async e => {
      e.preventDefault();
      
      if (formValid(this.state)) {
      
        console.log(`
          --SUBMITTING--
         
          Email: ${this.state.email}
          Password: ${this.state.password}

         
        `);
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/login",
          {
            
            email : this.state.email,
            passcode : this.state.password
        }
        
         );
        
         console.log(data);
         history.push('/home');
         
      } else {
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      }
      
    };

   
    
    handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      let formErrors = { ...this.state.formErrors };
  
      switch (name) {
        
        case "email":
          formErrors.email = emailRegex.test(value)
            ? ""
            : "invalid email address";
          break;
        case "password":
          formErrors.password =
            value.length < 6 ? "minimum 6 characaters required" : "";
          break;
        default:
          break;
      }
  
      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };
  
        
    render() {
      const { formErrors } = this.state;

     
                  

      return (
       <Router history={history}>
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Login to Continue!</h1>
            <form onSubmit={this.handleSubmit} noValidate>
             
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  className={formErrors.password.length > 0 ? "error" : null}
                  placeholder="Password"
                  type="password"
                  name="password"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
              <div className="createAccount">
                <button type="submit" >Login</button>
                   
                 
              </div>
              <div className="space1">
                <h4>If you are a new user </h4>
               </div>
               <div className="Link">
               
               <Link to="/register" >Register</Link>
                </div>
               
            </form>
           
          </div>
          <Navbar/>
        </div>
        </Router>
      );
    }
  }
  
 
  export default withRouter(LoginForm);

import { useState, useEffect } from "react";
import './App.css';


function App() {
   
  const initialValues = { 
  name: "", 
  email: "",  
  mobile: "", 
  accept: "", 
  gender: "", 
  password: "", 
  confirmPassword: "" };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isRegister, setIsRegister] = useState(false);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    
  };
  
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const data =new FormData(e.target)
    console.log(Object.fromEntries(data.entries()));

    setFormErrors(validate(formValues));
    setIsRegister(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isRegister) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Username is required!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.mobile) {
      errors.mobile = "Mobile is required!";
    } else if (!values.mobile === [0-9]) {
      errors.mobile = "This is not a valid mobile format!";
    }
    else if(values.mobile.length > 10) {
      errors.mobile = "Mobile length must not greter than 10";
    }

    if (!values.gender) {
      errors.gender = "Choose one option";
    } 
    
    if (!values.accept) {
      errors.accept = "Please mark the check box";
    }
    else if(values.accept !== " ") {
      errors.accept = " Checked";
    } 
   
    

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required";
    }
    else if(values.confirmPassword !== values.password) {
      errors.confirmPassword = "Confirm Password must be equal to password";

    }
    return errors;

  };
  return (

    <div className="container">
      {Object.keys(formErrors).length === 0 && isRegister ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(undefined, 2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        {/* <center>
        <h1>Login Form</h1>
        </center> */}
        <div className="ui divider"> </div>
        <div className="ui form">
        <center>
        <h2>Login Form</h2>
        </center>
          <div className="field">
            <label>Name</label> <br/>
            <input type="text" name="name" placeholder="Name"  value={formValues.name} onChange={handleChange} />
          </div>
          <p>{formErrors.name}</p>

          <div className="field">
          <label>Email</label><br/>
          <input type="email" name="email" placeholder="Email"  value={formValues.email} onChange={handleChange} />
          </div>
          <p>{formErrors.email}</p>

          <div className="field">
            <label>Mobile</label><br/>
            <input type="number" name="mobile" placeholder="Mobile" value={formValues.mobile} onChange={handleChange} />
          </div>
          <p>{formErrors.mobile}</p>

          <div className="gender-type">
            <label>Gender</label><br/>
            <input type="radio" name="gender"  value={formValues.gender} onChange={handleChange} />Male
            <input type="radio" name="gender"  value={formValues.gender} onChange={handleChange} />Female
          </div>
          <p>{formErrors.gender}</p>


           <div className="field">
            <label>Password</label><br/>
            <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
          </div>
          <p>{formErrors.password}</p> 

          <div className="field">
            <label>Confirm Password</label><br/>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formValues.confirmPassword} onChange={handleChange} />
          </div>
          <p>{formErrors.confirmPassword}</p>

          <div className="accept-type">
            <label className="checkbox-inline">
            <input type="checkbox" name="accept" value={formValues.accept} onChange={handleChange}  />Accept terms conditions
            </label><br/>
          </div>
          <p>{formErrors.accept}</p>

          <button className="btn btn-sm btn-danger">Register</button>
          </div>
        
      </form>
      </div>
      
  );
}

export default App;

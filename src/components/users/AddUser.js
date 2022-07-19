import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    
    username: "",
    email: "",
     
    city : ""
    
  
  });

  // const {  username, email, city  } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target)
  };

  const onSubmit = async e => {
    e.preventDefault();
    const userdata = {
      ...user,
      address : {city: user.city}
    }
    await axios.post("https://jsonplaceholder.typicode.com/users", userdata);
    history.push("/");
    console.log(userdata)
  };
  
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Username"
              name="username"
              value={user.username}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Email address"
              name="email"
              value={user.email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="city"
              className="form-control form-control-lg"
              placeholder="Enter Your city"
              name="city"
              value={user.city}
              onChange={e => onInputChange(e)}
            />
          </div>
          
         
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

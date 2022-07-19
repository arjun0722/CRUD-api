import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setAdd(true)
    setEdit(false)
    setView(false)
    setShow(true);
    setUser({})
  }

const [edit,setEdit] = useState(false)
const[view,setView] = useState(false)
const [add,setAdd] = useState(false)


 

   const handleView = (id,type) => {
    if(type==="view"){
      
      setEdit(false)
      setView(true)
    }else if (type === "edit"){
      
      setEdit(true)
      setView(false)
    }
    setAdd(false)

   const currentuser = users.filter(user => user.id === id)
     setShow(true);
     setUser({...currentuser[0], city: currentuser[0].address.city})
    console.log(currentuser[0])
   }
  const [users, setUsers] = useState([]);


  const [user, setUser] = useState({
    
    username: "",
    email: "",
     
    city : ""
    
  
  });

  const loadUsers = async () => {
    
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(result.data);
  };
  console.log(users)
  useEffect(() => {
    loadUsers();
  }, []);
  const deleteUser = async (id) => {
    // await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    // // loadUsers();
    // console.log("dummy")
    const userfilter = users.filter(user => user.id !== id)
    setUsers(userfilter)
    console.log(userfilter)
  };
  const onsavechange = e=> {
    const userdata = {
      ...user,
      address : {city: user.city}
      
    }
    setUsers( [userdata, ...users])
handleClose()
  }

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(e.target.value)
  };
  return (
    <div className="container">
      <button onClick={handleShow} className="btn btn-primary mt-2 float-right ">Add User</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{view ? 'View' : (edit ? 'Edit' : 'Add')} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
              value={user.username}
              onChange={e => onInputChange(e)}
              name= "username"
                type="username"
                placeholder="username"
                autoFocus
                disabled={view}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              value = {user.email}
              name="email"
              onChange={e => onInputChange(e)}
                type="email"
                placeholder="name@example.com"
                autoFocus
                disabled={view}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>City</Form.Label>
              <Form.Control
              value={user.city}
              name = "city"
              onChange={e => onInputChange(e)}
                type="city"
                placeholder="city"
                autoFocus
                disabled={view}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
               {view ? '' :<Button onClick={onsavechange} variant="primary" >
          { (edit ? 'Update' : 'Save')} Changes
</Button> }
        </Modal.Footer>
      </Modal>
      <div className="py-4">
        <h1>Home Page</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>
                 
                    <button  onClick={()=>handleView(user.id,"view")} className="btn btn-primary mr-2">View</button>
                    <button  onClick={()=>handleView(user.id,"edit")} className="btn btn-outline-primary mr-2">Edit</button>
                 
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

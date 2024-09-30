import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Items from './Items';
import axios from 'axios';
import { useFormik } from 'formik';
import {fromValidation} from './schemas/Index'

const initialValues = {
  Email: '',
  name: '',
  contact: ''

}

export default function API() {

  const {values,error,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values)
    }
  })
  console.log(error)

  var [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [update, Setupdate] = useState({})
  const [post, createpost] = useState({
    Email: '',
    name: '',
    contact: ''
  })

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const api = `https://64dc92e1e64a8525a0f6b640.mockapi.io/student`;

  const getAPIdata = async () => {
    try {
      const response = await axios.get(api);
      const reversedData = [...response.data].reverse(); // Reverse the data here
      setData(reversedData); // Set the reversed data to state
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (e) => {
    e.preventDefault();
    axios.put(`${api}/${update.id}`, update)
      .then((response) => {
        console.log(response)
        toast.success('Submited!')
        getAPIdata();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Kindly Fill the form completely!')
      });


  }
  const deleteUser = (id) => {

    axios.delete(`${api}/${id}`)
      .then((response) => {
        console.log(response)
        toast.success('Deleted Successfully!')
        getAPIdata();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Cannot delete now!')
      });

  }


  const createUser = (e) => {

    e.preventDefault();
    axios.post(api, post, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Create successful:", response.data);
        toast.success('Post Created!')
        getAPIdata();
      })
      .catch((error) => {
        console.error("Error creating data:", error);
        toast.error('Post Not Created!')
      });
  };

  useEffect(() => {
    getAPIdata();
    // updateAPIdata();
  }, []);


  function decrement() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      toast.success('Previous Page!')

    }
  }

  function increment() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      toast.success('Next Page!')

    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };


  const selectUser = (item) => {
    setShowForm(!showForm);
    Setupdate(item)

  }
  function showCreate() {
    setShowCreateForm(!showCreateForm);

  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;



  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 display-1 fw-bold">Student Data</h1>
      <div className='d-flex py-2'>
        <a href='#createApost'><button className='btn btn-primary' onClick={showCreate}>Create a Post</button></a>
      </div>
      <table className="table table-light table-striped ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((currentElement, index) => (
            <Items key={index} getdata={currentElement} data={data} selectUser={selectUser} deleteUser={deleteUser} />
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className="d-flex justify-content-between">
        <button
          disabled={currentPage === 1}
          onClick={decrement}
          className='btn btn-primary'
        >
          PREVIOUS
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={increment}
          className='btn btn-primary'
        >
          NEXT
        </button>
      </div>

      {/* Filter  */}
      <div className="mb-3">
        <label htmlFor="itemsPerPage" className="form-label">Items per page:</label>
        <select
          id="itemsPerPage"
          className="form-select"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>


      {/* update form  */}
      {showForm && (
        <form className='p-5 '  >
          <div className='d-flex justify-content-center py-2'><h2 className='fw-bold'>Update Form</h2></div>
          <div className="mb-3">
            <label htmlFor="id#" className="form-label" >Email</label>
            <input type="email" className="form-control" id="id#" aria-describedby="emailHelp" value={update.Email} onChange={(e) => Setupdate({ ...update, Email: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={update.name} onChange={(e) => Setupdate({ ...update, name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="idnum" className="form-label">ID</label>
            <input type="number" className="form-control" id="idnum" value={update.id} onChange={(e) => Setupdate({ ...update, id: e.target.value })} />
          </div>
          <div className="mb-3">
            <label htmlFor="num" className="form-label">Contact</label>
            <input type="tel" className="form-control" id="num" value={update.contact} onChange={(e) => Setupdate({ ...update, contact: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary" onClick={updateUser}>Submit</button>
        </form>
      )}

        {/* create form  */}
      {showCreateForm && (

        <form className='p-5' onSubmit={createUser} id='createApost'>
          <div className='d-flex justify-content-center py-2'><h2 className='fw-bold'>Create a Post</h2></div>
          <div className="mb-3">
            <label htmlFor="id#" className="form-label" >Email</label>
            <input type="email" className="form-control" id="postEmail" value={values.Email} aria-describedby="emailHelp"  onChange={(e) => { createpost({ ...post, Email: handleChange}) }}  onBlur={handleBlur} required />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="postName" value={values.name} onChange={(e) => { createpost({ ...post, name: handleChange}) }} required onBlur={handleBlur} />
          </div>
          <div className="mb-3">
            <label htmlFor="num" className="form-label">Contact</label>
            <input type="tel" className="form-control" id="postContact" value={values.contact}  onChange={(e) => { createpost({ ...post, contact: handleChange}) }}  onBlur={handleBlur} />
          </div>

          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      )}



    </div>
  );
}
// export function selectUser(id) {
//   console.warn(`ASD`, data[id])
//   let item = data[id];
//   ETID(item.id)
//   SETNAME(item.name)
//   SETEMAIL(item.email)
//   SETCONTACT(item.Contact)

// }
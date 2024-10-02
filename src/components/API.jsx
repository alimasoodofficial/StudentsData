import React, { useEffect, useState, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Items from './Items';
import axios from 'axios';
import { useFormik } from 'formik';
import { fromValidation } from './schemas/Index'
import UpdatePost from './UpdatePost';


export default function API() {
  // const [post, createpost] = useState({
  //   Email: '',
  //   name: '',
  //   contact: ''
  // })

  // formik form validation 
  const { values, errors,touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      Email: '',
      name: '',
      contact: ''
    },
    validationSchema: fromValidation,
    onSubmit: (values) => {
      console.log(values)
      axios.post(api, values, {
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
    }
  })

  var [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [update, Setupdate] = useState({})


  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const api = `https://64dc92e1e64a8525a0f6b640.mockapi.io/student`;

  const getAPIdata = async () => {
    try {
      const response = await axios.get(api);
      const reversedData = [...response.data].reverse();
      setData(reversedData);
    } catch (error) {
      console.log(error);
      response.data.avatar = 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg'
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
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((currentElement, index) => (
            <Items key={index} getdata={currentElement} data={data} selectUser={selectUser} deleteUser={deleteUser} picture={"https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"} />
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


      

      {/* create form  */}
      {showCreateForm && (

        <form className='p-5' onSubmit={handleSubmit} id='createApost'>
          <div className='d-flex justify-content-center py-2'><h2 className='fw-bold'>Create a Post</h2></div>
          <div className="mb-3">
            <label htmlFor="id#" className="form-label" >Email</label>
            <input type="email" className="form-control" id="postEmail" name='Email' value={values.Email} aria-describedby="emailHelp" onChange={handleChange} />
            {errors.Email && touched.Email ? (
             <div className='text-danger fw-bold pt-2'>{errors.Email}</div>
           ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="postName" name='name' value={values.name} onChange={handleChange} />
            {errors.name && touched.name ? (
             <div className='text-danger fw-bold pt-2'>{errors.name}</div>
           ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="num" className="form-label">Contact</label>
            <input type="tel" className="form-control" id="postContact" name='contact' value={values.contact} onChange={handleChange} onBlur={handleBlur} />
            {errors.contact && touched.contact ? (
             <div className='text-danger fw-bold pt-2'>{errors.contact}</div>
           ) : null}
          </div>
          

          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      )}


      <UpdatePost Setupdate={Setupdate} update={update} updateUser={updateUser}/>
    </div>
  );
}

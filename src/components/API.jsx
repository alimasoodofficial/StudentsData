import React, { useEffect, useState, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Items from './Items';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function API() {



  var [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);

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
      <div className='d-flex justify-content-center'>
        <h1 className="text-center mb-4 display-1 fw-bold ">Student Data</h1>
      </div>
      <div className='d-flex py-2'>
        <Link to="/createpost"><button className='btn btn-primary' >Create a Post</button></Link>
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








    </div>
  );
}

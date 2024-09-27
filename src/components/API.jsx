import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Items from './Items';
import axios from 'axios';



export default function API() {
  const notify = () => toast('Here is your toast.');

  var [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [update, Setupdate] = useState({})

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const api = `https://64dc92e1e64a8525a0f6b640.mockapi.io/student`;

  const getAPIdata = async () => {
    try {
      const response = await axios.get(api);
      setData(response.data);


    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = (e)=> {
    e.preventDefault();
    axios.put(`${api}/${update.id}`,update)
    .then((response)=>{
      console.log(response)
      toast.success('Submited!')
      getAPIdata();
    })
    .catch((error) => {
      console.log(error);
      toast.error('Kindly Fill the form completely!')
    });


  }

  useEffect(() => {
    getAPIdata();
    // updateAPIdata();
  }, []);


  function decrement() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      toast.success('Previous Decrement!')

    }
  }

  function increment() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      toast.success('Previous Increment!')

    }
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  // const valueChange = (e) => {
  //   setItemsPerPage(e.target.value);
  //   // setCurrentPage(1);
  // };
  // const handleInputChange = (e) => {
  //   Setupdate({
  //     ...update,
  //     [e.target.name]: e.target.value, 
  //   });
  // };

  const selectUser = (item) => {
    console.log(`DATA`, item)
    Setupdate(item)

  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;



  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 display-1 fw-bold">Student Data</h1>

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
            <Items key={index} getdata={currentElement} data={data} selectUser={selectUser} />
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



      <form className='p-5'>
        <div className="mb-3">
          <label htmlFor="id#" className="form-label" >Email</label>
          <input type="email" className="form-control" id="id#" aria-describedby="emailHelp" value={update.Email} onChange={(e)=>Setupdate({ ...update, Email: e.target.value })}  />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={update.name} onChange={(e)=>Setupdate({ ...update, name: e.target.value })}   />
        </div>
        <div className="mb-3">
          <label htmlFor="idnum" className="form-label">ID</label>
          <input type="number" className="form-control" id="idnum" value={update.id} onChange={(e)=>Setupdate({ ...update, id: e.target.value })}  />
        </div>
        <div className="mb-3">
          <label htmlFor="num" className="form-label">Contact</label>
          <input type="tel" className="form-control" id="num" value={update.contact} onChange={ (e)=> Setupdate({ ...update, contact: e.target.value })}  />
        </div>

        <button type="submit" className="btn btn-primary" onClick={updateUser}>Submit</button>
      </form>



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
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { fromValidation } from './schemas/Index'
import axios from 'axios';
import toast from 'react-hot-toast';
import getAPIdata from './FetchApi'


export default function UpdatePost() {
  let location = useLocation();
  const navigate = useNavigate()

  const gettingdata = location.state.getdata
  const api = `https://64dc92e1e64a8525a0f6b640.mockapi.io/student`;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      Email: gettingdata.Email,
      name: gettingdata.name,
      contact: gettingdata.contact
    },
    validationSchema: fromValidation,
    onSubmit: (values) => {
      axios.put(`${api}/${gettingdata.id}`, values)
        .then((response) => {
          console.log(`Response:`,response)
          toast.success('Updated!')
          getAPIdata();
        })
        .then(navigate('/', { replace: true }))
       
        .catch((error) => {
          console.log("error" ,error);
          toast.error('Not Updated !')
        });
    }
  })

  return (
    <div>
      <div className='pt-5 ps-5'>
        <Link to={'/'}><button className='btn btn-danger '>Go back</button></Link>
      </div>
      {/* update form  */}
      <form className='p-5 ' onSubmit={handleSubmit} >
        <div className='d-flex justify-content-center py-2'><h2 className='fw-bold'>Update Form</h2></div>
        <div className="mb-3">
          <input type="email" className="form-control" name='Email' aria-describedby="emailHelp" value={values.Email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control"value={values.name} name='name' onChange={handleChange} />
        </div>
     
        <div className="mb-3">
          <input type="tel" className="form-control"  value={values.contact} name='contact' onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

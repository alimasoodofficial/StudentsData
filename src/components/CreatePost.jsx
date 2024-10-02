import { useFormik } from 'formik';
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { fromValidation } from './schemas/Index';
import axios from 'axios';
import toast from 'react-hot-toast';
import getAPIdata from './FetchApi'



export default function CreatePost() {

    const api = `https://64dc92e1e64a8525a0f6b640.mockapi.io/student`;
    const navigate = useNavigate()
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            Email: '',
            name: '',
            contact: ''
        },
        validationSchema: fromValidation,
        onSubmit: (values) => {
            axios.post(api, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    getAPIdata();
                    console.log("Create successful:", response.data);

                })
                .then(navigate('/', { replace: true }))
                .then(toast.success('Post Created!')
            )
                .catch((error) => {
                    console.error("Error creating data:", error);
                    // toast.error('There is an error!')
                });
        }
    })
    return (
        <div>   <div className='pt-5 ps-5'><Link to={-1}><button className='btn btn-danger '>Go back</button></Link></div>
                

            <form className='p-5' onSubmit={handleSubmit} >
                <div className='d-flex justify-content-center py-2'><h2 className='fw-bold display-3'>Create From</h2></div>
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
        </div>
    )
}

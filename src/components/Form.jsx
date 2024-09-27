import React, { useState } from 'react'

export default function Form() {

  return (
    <>

<form className='p-5'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">{id}</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">ID</label>
    <input type="number" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Contact</label>
    <input type="tel" className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </>
  )
}

import React from 'react'
import { useLocation } from 'react-router-dom';



export default function UpdatePost({Setupdate,update,updateUser}) {
    let location = useLocation();
    console.log(location)


  return (
    <div>
      {/* update form  */}
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
    </div>
  )
}

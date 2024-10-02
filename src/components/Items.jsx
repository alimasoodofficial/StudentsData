import React from 'react';
import { Link } from "react-router-dom";

// import {selectUser} from './API'


const Items = ({ getdata, selectUser, deleteUser, picture }) => {

  return (
    <>
      <tr>
        <td>{getdata?.id}</td>
        <td>
          <img
            src={getdata.avatar ? getdata.avatar : picture} width="50px" alt='IMG' onError={(e) => { e.target.onerror = null; e.target.src = picture; }} />
        </td>
        <td>{getdata?.name}</td>
        <td>{getdata?.Email}</td>
        <td>{getdata?.contact}</td>
        <td><Link to='/updatepost'><button className='btn btn-success mx-1' onClick={() => selectUser(getdata)}>Edit</button></Link>
          <button className='btn btn-danger' onClick={() => deleteUser(getdata?.id)} >Delete</button>
        </td>
      </tr>

    </>


  );

};

export default Items;

import React from 'react';
import { Link, useNavigate } from "react-router-dom";

// import {selectUser} from './API'


const Items = ({ getdata, selectUser, deleteUser, picture }) => {
  const navigate = useNavigate()
  function  selectinguser (){
    selectUser(getdata)
    navigate('/updatepost',{replace:true,state:{getdata}})
  }

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
        <td className='p-1'><button className='btn btn-success  btn-sm my-1 w-100' onClick={selectinguser}>Edit</button>
          <button className='btn btn-danger btn-sm my-1 w-100' onClick={() => deleteUser(getdata?.id)} >Delete</button>
        </td>
      </tr>

    </>


  );

};

export default Items;

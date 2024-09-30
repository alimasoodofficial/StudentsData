import React from 'react';
// import {selectUser} from './API'


const Items = ({ getdata, selectUser, deleteUser }) => {

  return (
    <>
      <tr>
        <td>{getdata?.id}</td>
        <td>{getdata?.name}</td>
        <td>{getdata?.Email}</td>
        <td>{getdata?.contact}</td>
        <td><button className='btn btn-success mx-1' onClick={() => selectUser(getdata)}>Edit</button>
          <button className='btn btn-danger' onClick={() => deleteUser(getdata?.id)} >Delete</button>
        </td>
      </tr>

    </>


  );

};

export default Items;

import React from 'react';
// import {selectUser} from './API'


const Items = ({ getdata, selectUser }) => {

  return (
    <>
      <tr>
        <td>{getdata.id}</td>
        <td>{getdata.name}</td>
        <td>{getdata.Email}</td>
        <td>{getdata.contact}</td>
        <td><button className='btn btn-danger' onClick={() => selectUser(getdata)}>Edit</button></td>
      </tr>

    </>
    

  );

};

export default Items;

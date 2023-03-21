/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Sidebar from '../Sidebar';

const MatrixIncome = () => {
 
  return (
    <div className="content">
      <Sidebar />
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <h3 className='text-white'>Matrix Income</h3>
                <table class="table table-dark ">
               
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Income</th>
      <th scope="col">From User</th>
      <th scope="col">Matrix</th>
    </tr>
  </thead>
  <tbody>
    <tr></tr>
  </tbody>


                </table>
                </div>
            </div>
          <div className='container-fluid pt-4 px-4'>
            <div className="bg-secondary rounded-top p-4 dark">
              <div className="row">
                <div className="col-12 col-sm-6 text-center text-sm-start">
                  Contact Address :
                  <a href="" target="_blank">0x4De84A....ff6331cB</a>
                </div>

              </div>
            </div>
          </div>
          <br />
        </div>
  );
}

export default MatrixIncome;
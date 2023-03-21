/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Sidebar from '../Sidebar';

const IncomeReferral = () => {
 
  return (
    <div className="content">
      <Sidebar />
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                <table class="table table-dark table-striped">
                    <h3 className='text-white'>Referral Income</h3>
               
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Income</th>
      <th scope="col">From User</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <th scope="row">1</th>
        <td>05-January 2023</td>
        <td>28.50</td>
        <td>737251</td>
        <td><a className='btn btn-success'>Transaction</a></td>
    </tr>
    <tr>
        <th scope="row">2</th>
        <td>06-January 2023</td>
        <td>28.50</td>
        <td>95710</td>
        <td><a className='btn btn-success'>Transaction</a></td>
    </tr>
    <tr>
        <th scope="row">3</th>
        <td>07-January 2023</td>
        <td>28.50</td>
        <td>73832</td>
        <td><a className='btn btn-success'>Transaction</a></td>

    </tr>
    <tr>
        <th scope="row">4</th>
        <td>08-January 2023</td>
        <td>28.50</td>
        <td>848362</td>
        <td><a className='btn btn-success'>Transaction</a></td>
        </tr>
        <tr>
        <th scope="row">5</th>
        <td>09-January 2023</td>
        <td>28.50</td>
        <td>737251</td>
        <td><a className='btn btn-success'>Transaction</a></td>
    </tr>
    <tr>
        <th scope="row"></th>
        <td>Total Bonus</td>
        <td>114</td>
        </tr>
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

export default IncomeReferral;
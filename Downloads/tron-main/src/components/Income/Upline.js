/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Sidebar from '../Sidebar';

const UplineIncome = () => {
 
  return (
    <div className="content">
      <Sidebar />
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                <table class="table table-dark table-striped">
               
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Income</th>
      <th scope="col">From User</th>
      <th scope="col">Level (Package)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <th scope="row">1</th>
        <td>30-November 001</td>
        <td>19.0</td>
        <td>737251</td>
        <td><a className='btn btn-success'>Transaction</a></td>
    </tr>
    <tr>
        <th scope="row">2</th>
        <td>30-November 001</td>
        <td>19.0</td>
        <td>95710</td>
        <td><a className='btn btn-success'>Transaction</a></td>
    </tr>
    <tr>
        <th scope="row">3</th>
        <td>30-November 001</td>
        <td>28.5</td>
        <td>73832</td>
        <td><a className='btn btn-success'>Transaction</a></td>
        </tr>
        <tr>
        <th scope="row">4</th>
        <td>30-November 001</td>
        <td>28.5</td>
        <td>84832</td>
        <td><a className='btn btn-success'>Transaction</a></td>
        </tr>

    <tr>
        <th scope="row"></th>
        <td>Total Bonus</td>
        <td>95.0</td>
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

export default UplineIncome;
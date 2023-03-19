import React from 'react';
import Sidebar from './Sidebar';

const Referral = () => {
 
  return (
    <div className="content">
      <Sidebar />
       

            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                <table class="table table-dark table-striped">
               
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User Id</th>
      <th scope="col">Total Investment</th>
      <th scope="col">Registration Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <th scope="row">1</th>
        <td>737251</td>
        <td></td>
        <td>2021-08-24 12:00:00</td>
    </tr>
    <tr>
        <th scope="row">2</th>
        <td>737251</td>
        <td></td>
        <td>2021-08-24 12:00:00</td>
    </tr>

    <tr>
        <th scope="row">3</th>
        <td>737251</td>
        <td></td>
        <td>2021-08-24 12:00:00</td>

    </tr>

    <tr>
        <th scope="row">4</th>
        <td>737251</td>
        <td></td>
        <td>2021-08-24 12:00:00</td>

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

export default Referral;
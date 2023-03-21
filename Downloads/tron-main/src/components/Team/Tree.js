/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Sidebar";


const Tree = () => {
    return (
        <div className="content">
    <Sidebar />
             
    
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                   {/* Image here */}
                     <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card bg-secondary border-0">
                            <div className="card-body text-center">
                                <img src="https://i.imgur.com/1Q9ZQ2r.png" alt="..." className="img-fluid rounded-circle mb-3" />
                                <h5 className="card-title mb-0">User Name</h5>
                                <div className="card-text text-black-50">User Id</div>
                                </div>
                                </div>
                                </div>
                                
                    </div>
                </div>
              <div className='container-fluid pt-4 px-4'>
                <div className="bg-secondary rounded-top p-4 dark">
                  <div className="row">
                    <div className="col-12 col-sm-6 text-center text-sm-start">
                      Contact 
                      
                      Address :
                      <a href="" target="_blank">0x4De84A....ff6331cB</a>
                    </div>
    
                  </div>
                </div>
              </div>
              <br />
            </div>
      );

    }

    export default Tree;

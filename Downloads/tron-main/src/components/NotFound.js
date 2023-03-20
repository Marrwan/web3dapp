import React from 'react';
import Sidebar from './Sidebar';

const NotFound = () => (
    // Style a 404 using bootstrap 5
    // https://getbootstrap.com/docs/5.0/examples/404/

    <div className="container-fluid  d-flex p-0 reg-form">
        <div className="container-fluid">
            <Sidebar />
            <div className="row h-100 align-items-center justify-content-center" style={{ minheight: '100vh' }}>
                <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
                    <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                        <h1>404</h1>
                            <p className="Home">
                                 NotFound
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

);

export default NotFound;
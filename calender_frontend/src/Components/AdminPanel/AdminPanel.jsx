import React, { useState } from 'react';
import AdminNav from '../NavBar/AdminNav'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'
import Carousel from 'react-bootstrap/Carousel';
const AdminModule = () => {
  return (
    <div>
        <AdminNav/>
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      />
        <Carousel>
        
        

        <Carousel.Item interval={2500} className='corosel_main margin_top'>
            <div className='row1'>
              <div className='side_image'>
                <img src={img1} alt="" />
              </div>
              <div className='c-right'>
                  <div className="main_head overflow-hidden">
                      <h1 className='heading drop-in'>Company<span style={{color: 'rgba(178, 77, 255, 0.9)'}}> Management</span></h1>
                  </div>
                  <p className='para drop-in-2'>Admins should be able to add companies. Each company entry should include:<br/>
                  </p>
                  <ul>
                    <li>•	Name: Name of the company.</li>
                    <li>•	Location: Physical or operational location.</li>
                    <li>•	LinkedIn Profile: A link to the company’s LinkedIn page.</li>
                    <li>•	Emails: One or more email addresses for communication.</li>
                    <li>•	Phone Numbers: Contact numbers for representatives.</li>
                    <li>•	Comments: Notes or additional information about the company.</li>
                    <li>•	Communication Periodicity: The default time interval for scheduled communications (e.g., every 2 weeks).</li>
                  </ul>
              </div>
            </div>
        </Carousel.Item>

        <Carousel.Item interval={2500} className='corosel_main margin_top'>
            <div className='row1'>
              <div className='side_image'>
                <img src={img2} alt="image 2" />
              </div>
              <div className='c-right'>
                  <div className="main_head overflow-hidden">
                      <h1 className='heading drop-in'>Company<span style={{color: 'rgba(178, 77, 255, 0.9)'}}> Management</span></h1>
                  </div>
                  <p className='para drop-in-2'>Admins should be able to edit, and delete companies. Each company entry should include:<br/>
                  </p>
              </div>
            </div>
        </Carousel.Item>
        <Carousel.Item interval={2500} className='corosel_main margin_top'>
            <div className='row1'>
              <div className='side_image'>
                <img src={img3} alt="image 3" />
              </div>
              <div className='c-right'>
                  <div className="main_head overflow-hidden">
                    <h1 className='drop-in'>Communication<span style={{color: 'rgb(110, 77, 255)'}}>  Method</span> Management</h1>       
                  </div>
                  <p className='para drop-in-2'>Admins should define the available communication methods in the system. Each method should include:<br/></p>
                  <ul>
                    <li>•	Name: E.g., "Visit" or "LinkedIn Post."</li>
                    <li>•	Description: E.g., "Visit to company premises."</li>
                    <li>•	Sequence: Determines the order of communication (e.g., LinkedIn Post → LinkedIn Message → Email → Phone Call → Other).</li>
                    <li>•	Mandatory Flag: Indicates whether a communication method is mandatory in the sequence.</li>
                  </ul>
              </div>
            </div>
        </Carousel.Item>
        <Carousel.Item interval={2500} className='corosel_main margin_top'>
            <div className='row1'>
              <div className='side_image'>
                <img src={img4} alt="image 4" />
              </div>
              <div className='c-right'>
                  <div className="main_head overflow-hidden">
                    <h1 className='drop-in'>Communication<span style={{color: 'rgb(110, 77, 255)'}}>  Method</span> Management</h1>       
                  </div>
                  <p className='para drop-in-2'>By default, the system should include these methods in the following order:<br/></p>
                  <ol type="1">
                    <li>LinkedIn Post</li>
                    <li>LinkedIn Message</li>
                    <li>Email</li>
                    <li>Phone Call</li>
                    <li>Other</li>
                  </ol>
              </div>
            </div>
        </Carousel.Item>
        </Carousel>
    </div>
  );
};

export default AdminModule;

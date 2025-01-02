import React, { useState } from 'react';
import './About.css'
import img1 from './img1.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'
import img5 from './img5.png'
import img6 from './img6.png'
import img7 from './img7.png'
import Carousel from 'react-bootstrap/Carousel';
import Head from '../NavBar/Head';
const AdminModule = () => {
  return (
    <div>
        <Head/>
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
                      <h1 className='heading drop-in'>Dashboard<span style={{color: 'rgba(178, 77, 255, 0.9)'}}> View</span></h1>
                  </div>
                  <p className='para drop-in-2'>The dashboard provides a grid-like view where each row represents a company. Columns include:<br/>
                  </p>
                  <p className='para drop-in-2'>Click on a "Communication Performed" button to log a new communication. <br/>o	In the action modal: </p>
                  <ul>
                    <li>•	select Type of Communication: E.g., LinkedIn Post, Email.</li>
                    <li>•	Input Date of Communication: Date when the communication occurred.</li>
                    <li>•	Add Notes: Additional comments about the communication.</li>
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
                      <h1 className='heading drop-in'><span style={{color: 'rgba(178, 77, 255, 0.9)'}}> Notification</span></h1>
                  </div>
                  <p className='para drop-in-2'>A dedicated section displays overdue and due communications:<br/>
                  </p>
                  <ul>
                    <li>•	Overdue Communications Grid: Lists companies with overdue actions.</li>
                    <li>•	Today’s Communications Grid: Lists companies with tasks due today.</li>
                    <li>•	Next Communications Grid: Lists companies with tasks Next actions.</li>
                  </ul>
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
                    <h1 className='drop-in'>Calendar<span style={{color: 'rgb(110, 77, 255)'}}>  View</span></h1>       
                  </div>
                  <p className='para drop-in-2'>A calendar interface that allows users to: View Past Communications: Dates and methods of previous interactions.
<br/></p>
                  <ul>
                    <li>•	Red Highlight: Indicates overdue communication.</li>
                    <li>•	Yellow Highlight: Indicates communication due today.</li>
                    <li>•	Blue Highlight: Indicates Next communication.</li>
                  </ul>
              </div>
            </div>
        </Carousel.Item>
        <Carousel.Item interval={2500} className='corosel_main margin_top'>
            <div className='row1'>
              <div className='side_image_2'>
                
                <img src={img4} alt="image 4" />
                <img src={img5} alt="image5" />
              </div>
              <div className='c-right'>
                  <div className="main_head overflow-hidden">
                    <h1 className='drop-in'>Engagement<span style={{color: 'rgb(110, 77, 255)'}}>  Effectiveness</span> Dashboard</h1>
                    <h1 style={{margin: '10px'}}><span style={{color: 'rgba(178, 77, 255, 0.9)'}}> &</span></h1>
                    <h1 className='drop-in'>Real-Time<span style={{color: 'rgb(110, 77, 255)'}}>  Activity</span> Log</h1>   
                  </div>
                  <p className='para drop-in-2'>o	A visual representation (e.g., bar chart or pie chart) showing the frequency of each communication method (e.g., LinkedIn Post, Email) used over a selected time frame.
o	Users can filter by company, date range, or communication method.
<br/></p>
              </div>
            </div>
        </Carousel.Item>
        <Carousel.Item interval={2500} className='corosel_main margin_top'>
            <div className='row1'>
              <div className='side_image_2'>
                
                <img src={img6} alt="image 4" />
                <img src={img7} alt="image5" />
              </div>
              <div className='c-right'>
                  <div className="main_head overflow-hidden">
                    <h1 className='drop-in'>Communication<span style={{color: 'rgb(110, 77, 255)'}}>  Frequency</span> Report</h1>
                    <h1 style={{margin: '10px'}}><span style={{color: 'rgba(178, 77, 255, 0.9)'}}> &</span></h1>
                    <h1 className='drop-in'>Overdue<span style={{color: 'rgb(110, 77, 255)'}}>  Communication</span> Trends</h1>   
                  </div>
                  <p className='para drop-in-2'>o	A visual representation (e.g., bar chart or pie chart) showing the frequency of each communication method (e.g., LinkedIn Post, Email) used over a selected time frame.<br/>o	Users can filter by company, date range, or communication method.<br/></p>              
                </div>
            </div>
        </Carousel.Item>
        </Carousel>
    </div>
  );
};

export default AdminModule;

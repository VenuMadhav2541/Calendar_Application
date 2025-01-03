import React, { useState, useEffect } from 'react';
import './About.css';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';

import Carousel from 'react-bootstrap/Carousel';
import Head from '../NavBar/Head';
import Loading from '../Loading'; // Import the Loading component

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds (for demonstration purposes)
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className='scroll'>
      <Head />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      />
      {loading && <Loading />} {/* Conditionally render the Loading component */}
      <Carousel>
        <Carousel.Item interval={2500} className="corosel_main margin_top">
          <div className="row1">
            <div className="side_image">
              <img src={img1} alt="" />
            </div>
            <div className="c-right">
              <div className="main_head overflow-hidden">
                <h1 className="heading drop-in">
                  Dashboard<span style={{ color: 'rgba(178, 77, 255, 0.9)' }}> View</span>
                </h1>
              </div>
              <p className="para drop-in-2">
                The dashboard provides a grid-like view where each row represents a company. Columns include:
                <br />
              </p>
              <p className="para drop-in-2">
                Click on a "Communication Performed" button to log a new communication. <br />o In the action modal:{' '}
              </p>
              <ul>
                <li>• select Type of Communication: E.g., LinkedIn Post, Email.</li>
                <li>• Input Date of Communication: Date when the communication occurred.</li>
                <li>• Add Notes: Additional comments about the communication.</li>
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
                  <p className='para drop-in-2'>A calendar interface that allows users to: View Past Communications: Dates and methods of previous interactions.<br/></p>
                  <ul>
                    <li>•	Red Highlight: Indicates overdue communication.</li>
                    <li>•	Yellow Highlight: Indicates communication due today.</li>
                    <li>•	Blue Highlight: Indicates Next communication.</li>
                  </ul>
              </div>
            </div>
        </Carousel.Item>
        </Carousel>
    </div>
  );
};

export default About;

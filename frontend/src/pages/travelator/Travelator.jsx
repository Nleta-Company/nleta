import React from 'react';
import { Link } from 'react-router-dom';
import './Travelator.css';

function Travelator() {
  return (
    <main>
      <section className="travelator-hero">
        <h1>Lift / Escalator Inspection</h1>
        <p>Ensuring Smooth and Safe Passenger Movement with NLETA's Comprehensive Inspection Services</p>
      </section>

      <section className="travelator-content">
        <p>Travelators, also known as moving walkways, are essential in high-traffic areas like airports, shopping malls, and transit hubs, where they provide efficient movement for passengers. At the National Lifts and Escalator Testing Agency (NLETA), we understand the critical importance of maintaining safe and operational travelators, which is why our Travelator Inspection service focuses on ensuring their flawless functionality, safety, and reliability.</p>
        <p>Our inspection process begins with a comprehensive safety compliance check. NLETA's expert inspectors review the travelator's adherence to national and international safety standards, verifying that safety mechanisms such as speed controls, emergency stop buttons, and barriers are in place and functioning correctly. Each travelator undergoes a thorough mechanical and structural assessment, where our team examines key components such as motors, drive systems, and support structures. By identifying potential wear and tear, misalignment, or damage early, we prevent possible hazards and enhance the longevity of these systems.</p>
      </section>

      <section className="travelator-services">
        <h2>Our Other Inspection Services</h2>
        <div className="services-cards">
          <Link to="/lift-inspection" className="service-card-link">
            <div className="service-card-big">
              <img src="b_files/2016_rinascente_shopping_mall_milan-rs260741_image_w1200_h630.webp" alt="Lift" className="service-card-img" />
              <div className="service-card-icon">🛗</div>
              <h3>Lift Inspection</h3>
              <p>Comprehensive testing, inspection and certification services for all types of lifts ensuring safety and compliance with IS 14665 and other applicable standards.</p>
              <span className="learn-more">Learn More →</span>
            </div>
          </Link>
          <Link to="/escalator-inspection" className="service-card-link">
            <div className="service-card-big">
              <img src="b_files/2016_rinascente_shopping_mall_milan-rs260741_image_w1200_h630.webp" alt="Escalator" className="service-card-img" />
              <div className="service-card-icon">🪜</div>
              <h3>Escalator Inspection</h3>
              <p>Expert escalator inspection and certification services ensuring passenger safety and compliance with national and international safety standards.</p>
              <span className="learn-more">Learn More →</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Travelator;

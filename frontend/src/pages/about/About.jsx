import React from 'react';
import './About.css';

function About() {
  return (
    <main>
      <section className="about-hero">
        
      <img
  src="/b_files/aboutmain.png"
  alt="NLETA"
  className="about-hero-img"
/>
        <div className="about-hero-text">
          <h1>About NLETA</h1>
          <p>uday trusted partner in lift and escalator safety & certification</p>
        </div>
      </section>

      <section className="about-intro">
        <p>Ensuring that your lifts comply with the safety and regulatory requirements of the country you are operating in is a crucial part of gaining market access. Our lift and elevator certification services help you obtain the relevant certification you need to assure the safety, performance and integrity of your lifts.</p>
      </section>

      <section className="about-pillars">
        <h2>National Lift Escalator Testing Agency</h2>
        <div className="pillars-grid">
          {[
            { title: 'Industry Experts', text: 'Our team has extensive experience in providing Testing, Inspection, Certification, and Training Services across all sectors in INDIA and over the Globe as well.' },
            { title: 'Quality Assurance', text: 'All of our services are backed by an extensive list of nationally recognised Accreditations and Industry Body Memberships.' },
            { title: 'National Service Provider', text: 'NLETA is a national provider of Testing, Inspection, Certification, and Training Services.' },
            { title: 'Online Inspection Database', text: 'All of our Testing, Inspection, and Certification customers are automatically granted with access to our online inspection database to download examination reports for any equipment certified by NLETA.' },
          ].map((item, i) => (
            <div key={i} className="pillar-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>   
      </section>

      <section className="about-why">
<img
  src="/b_files/about.jpg"
  alt="Lift inspection"
  className="about-section-img"
/>
        <h2>Why Lift(s)/ Escalator(s) certification necessary from NLETA?</h2>
        <div className="why-list">
          {[
            'Assure the safety, performance and integrity of your lift(s) Escalator(s) and their components.',
            'Achieve the required certification of the country you are operating in and ensure compliance with all applicable regulatory requirements and safety standards.',
            'Ensure that your lift and its components are regularly assessed, tested and inspected at the right time and in-line with standards, such as the European lifts directive compliance audit.',
            'Verify the design of your lifts according to international design codes.',
          ].map((item, i) => (
            <div key={i} className="why-item">
              <span className="why-icon">✔</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-trusted">
        <h2>Trusted Certification Services for all Brands and Designs</h2>
        <p>As the world's leading inspection, testing, verification and certification company, we are accredited to provide conformity assessments and certification of lifts in many countries, including the European lifts directive compliance audit.</p>
        <p>Our unique global reach and qualified inspectors offer you the unrivaled expertise needed to understand the legal and regulatory requirements your lifts must meet throughout the world. Plus, we know exactly when and how your lifts need to be inspected to remain in compliance.</p>
      </section>

      <section className="about-services">
        <h2>Our lift and elevator certification services include:</h2>
        <div className="services-list">
          {[
            { title: 'Design Verification', text: 'Evaluating design, drawings and specifications against the applicable codes, standards, purchase specification and statutory requirements.' },
            { title: 'Type-Approval of Lifts', text: 'Testing and inspections against specifications, codes, directives and industry standards for your lifts and their components.' },
            { title: 'Inspections and Audits', text: 'Complete examination of mechanical, structural, electrical and safety systems, including wire ropes and chains.' },
            { title: 'Testing of Lifts', text: 'Independent witnessing of equipment performance tests to guarantee that performance values are met.' },
          ].map((item, i) => (
            <div key={i} className="service-item">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <div className="about-cta">
          <p>Contact us today to find out how our lift and elevator certification services can help you obtain the relevant certification you need to assure the safety, performance and integrity of your lifts and elevators.</p>
        </div>
      </section>
    </main>
  );
}

export default About;

import React, { useState } from 'react';
import '../escalatorInspection/InspectionPage.css';

const sidebarItems = ['Residential', 'Commercial', 'Industrial', 'Hospital'];

const content = {
  Residential: {
    title: 'Residential Lift',
    text: [
      'We understand that the safety and reliability of residential lifts are paramount for the well-being of your family and residents. Our comprehensive Residential Lift Inspection services are designed to ensure that your lifts operate smoothly, efficiently, and above all, safely.',
    ],
    sections: [
      {
        heading: 'Why Regular Inspection is Essential?',
        text: 'Residential lifts play a crucial role in enhancing mobility and convenience within homes and residential buildings. However, like any mechanical system, they are subject to wear and tear over time. Regular inspections not only ensure compliance with safety regulations but also help in identifying potential issues before they become major problems. This proactive approach can prevent accidents, reduce downtime, and extend the lifespan of your lift.',
      },
      {
        heading: 'Our Inspection Process',
        text: 'Our team of certified and experienced inspectors follows a meticulous process to evaluate every aspect of your residential lift. With some important adaptations for the Indian market, the standards were published on January 10, 2023, with a transition period until December 21, 2025.',
      },
    ],
    points: [
      'Safety Systems Check: We thoroughly examine all safety features, including emergency brakes, alarm systems, and door interlocks.',
      'Mechanical Components Review: Our inspection covers all mechanical elements such as the motor, cables, pulleys, and gears.',
      'Electrical Systems Evaluation: We inspect the lift\'s electrical systems, including wiring, control panels, and lighting.',
      'Operational Testing: We conduct a series of operational tests to assess the lift\'s performance, including speed and stopping accuracy.',
      'Compliance Verification: Our inspection ensures compliance with all relevant local and national safety regulations.',
    ],
    postSections: [
      {
        heading: 'Post-Inspection Reporting',
        text: 'After the inspection, we provide a detailed report outlining our findings. This report includes:',
      },
    ],
    postPoints: [
      'Condition Summary: A clear overview of the lift\'s current condition.',
      'Identified Issues: A list of any issues or potential risks detected during the inspection.',
      'Recommended Actions: Practical recommendations for repairs, maintenance, or upgrades.',
      'Certification: Upon successful completion, we issue a certification of compliance.',
    ],
  },
  Commercial: {
    title: 'Commercial Lift',
    text: [
      'We understand the critical role that industrial lifts play in your operations. Ensuring the safety, reliability, and efficiency of these essential machines is paramount to maintaining a secure and productive environment. Our Industrial Lift Inspection services are designed to provide comprehensive assessments, helping you meet regulatory standards and keep your equipment in optimal condition.',
    ],
    sections: [
      {
        heading: 'Why Choose NLETA for Commercial Lift Inspection?',
        text: '',
      },
    ],
    points: [
      'Expertise and Experience: With years of experience in lift and escalator inspection, our team of certified professionals brings a wealth of knowledge and expertise to every inspection.',
      'Comprehensive Inspections: Our inspections cover all aspects of your industrial lift, from mechanical components to electrical systems including hoist cables, brakes, and control systems.',
      'Regulatory Compliance: We ensure that your industrial lifts comply with local and international safety regulations, including regular maintenance schedules, load testing, and emergency protocols.',
      'Detailed Reporting: After each inspection, we provide a detailed report outlining our findings, including any areas of concern and recommended actions.',
      'Preventative Maintenance Guidance: Beyond inspections, we offer guidance on preventative maintenance strategies to help you extend the lifespan of your industrial lifts.',
    ],
    postSections: [
      {
        heading: 'Our Inspection Process',
        text: '',
      },
    ],
    postPoints: [
      'Initial Consultation: We begin by understanding your specific needs, the type of lifts in use, and any particular concerns you may have.',
      'On-Site Inspection: Our technicians conduct a thorough on-site inspection, examining all critical components and testing the lift\'s functionality.',
      'Safety and Performance Testing: We perform load tests, emergency stop tests, and other safety checks to ensure the lift can handle its intended workload.',
      'Compliance Check: We review your lift\'s compliance with all relevant safety standards and regulations.',
      'Final Report and Recommendations: After the inspection, we provide a detailed report highlighting any issues found and offering practical solutions.',
    ],
  },
  Industrial: {
    title: 'Industrial Lift Inspection',
    text: [
      'Industrial lifts operate in demanding environments such as factories, warehouses, and manufacturing plants. These lifts carry heavy loads and must meet stringent safety requirements to protect workers and equipment.',
      'NLETA\'s industrial lift inspection covers all aspects of heavy-duty lift systems including hydraulic systems, load-bearing structures, safety interlocks, and overload protection mechanisms.',
      'Our certified inspectors are experienced in industrial environments and understand the unique challenges these lifts face. We ensure full compliance with occupational safety standards and industry regulations.',
    ],
    points: ['Heavy load capacity testing', 'Hydraulic system inspection', 'Overload protection testing', 'Safety interlock verification', 'Structural load analysis', 'Occupational safety compliance'],
  },
  Hospital: {
    title: 'Hospital Lift',
    text: [
      'We understand the critical importance of reliable and safe hospital lifts. In a healthcare environment, where every second counts, the seamless operation of lifts can make the difference between life and death. Our Hospital Lift Inspection service is designed to ensure that these essential systems operate with the highest standards of safety, efficiency, and reliability.',
    ],
    sections: [
      {
        heading: 'Why Hospital Lift Inspection is Crucial',
        text: 'Hospital lifts are not just a means of transportation; they are lifelines. These lifts are responsible for safely transporting patients, medical staff, and essential equipment between floors. Any malfunction or delay can have serious consequences, potentially compromising patient care and safety.',
      },
      {
        heading: 'Regular inspections are vital to:',
        text: 'With some important adaptations for the Indian market, the standards were published on January 10, 2023, with a transition period until December 21, 2025.',
      },
    ],
    points: [
      'Ensure Patient Safety: Our inspections guarantee that lifts operate smoothly, minimizing the risk of sudden stops or entrapments that could harm patients.',
      'Maintain Operational Efficiency: We assess lift performance to ensure quick and efficient transport, reducing waiting times and ensuring timely medical interventions.',
      'Compliance with Regulations: NLETA ensures that hospital lifts meet all national safety standards and regulations, protecting your facility from legal liabilities.',
      'Preventative Maintenance: Early detection of wear and tear prevents costly repairs and ensures uninterrupted service.',
    ],
    postSections: [
      {
        heading: 'Our Comprehensive Inspection Process',
        text: "NLETA's Hospital Lift Inspection service is thorough, covering every aspect of lift operation:",
      },
    ],
    postPoints: [
      'Safety Mechanisms: We test emergency brakes, alarm systems, and communication devices to ensure they function properly in an emergency.',
      'Load Testing: We assess the lift\'s capacity to handle its maximum load, ensuring it can safely transport patients, including those on stretchers and in wheelchairs.',
      'Door Operation: We check that doors open and close smoothly, without delay, and that sensors effectively prevent them from closing on passengers.',
      'Speed and Levelling: We measure lift speed and ensure accurate levelling at each floor, crucial for patient safety and accessibility.',
      'Control Systems: We examine the control systems to ensure they respond correctly to commands and that backup systems are in place in case of power failure.',
      'Cleanliness and Hygiene: Given the importance of infection control in hospitals, we inspect the lift\'s cleanliness, ensuring it meets the highest hygiene standards.',
    ],
  },
};

function LiftInspection() {
  const [active, setActive] = useState('Residential');
  const current = content[active];

  return (
    <main>
      <section className="inspection-hero">
        <img src={`${process.env.PUBLIC_URL}/b_files/Elevators in Commercial Buildings 1536.jpg`} alt="Lift Inspection" className="inspection-hero-img-bg" />
        <h1>Lift Inspection</h1>
        <p>Comprehensive Testing, Inspection and Certification Services for All Types of Lifts</p>
      </section>

      <div className="inspection-layout">
        <aside className="inspection-sidebar">
          <h3>Lift Categories</h3>
          <ul>
            {sidebarItems.map(item => (
              <li key={item}>
                <button className={active === item ? 'active' : ''} onClick={() => setActive(item)}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="inspection-content">
          <h2>{current.title}</h2>
          {current.text.map((p, i) => <p key={i}>{p}</p>)}
          {current.sections && current.sections.map((s, i) => (
            <div key={i}>
              <h3>{s.heading}</h3>
              {s.text && <p>{s.text}</p>}
            </div>
          ))}
          <div className="inspection-points">
            {current.points.map((point, i) => (
              <div key={i} className="inspection-point">
                <span className="point-icon">✔</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
          {current.postSections && current.postSections.map((s, i) => (
            <div key={i}>
              <h3>{s.heading}</h3>
              {s.text && <p>{s.text}</p>}
            </div>
          ))}
          {current.postPoints && (
            <div className="inspection-points">
              {current.postPoints.map((point, i) => (
                <div key={i} className="inspection-point">
                  <span className="point-icon">✔</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default LiftInspection;

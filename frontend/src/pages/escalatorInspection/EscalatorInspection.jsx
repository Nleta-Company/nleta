import React, { useState } from 'react';
import './InspectionPage.css';

const sidebarItems = ['MASS Rapid Transit System', 'Escalator Commercial', 'Travelators', 'Moving Walks', 'Others'];

const content = {
  'MASS Rapid Transit System': {
    title: 'MASS Rapid Transit System',
    text: [
      'We understand the critical importance of safety and reliability in MASS Rapid Transit Systems (MRTS). These systems are the lifelines of urban mobility, facilitating the movement of millions daily. To ensure uninterrupted service and the safety of passengers, rigorous inspection and testing are paramount.',
    ],
    sections: [
      {
        heading: 'Comprehensive Inspection Services',
        text: 'Our MRTS inspection services are designed to meet the highest standards of safety and performance. We offer a full range of inspection services that include:',
      },
    ],
    points: [
      'Structural Integrity Checks: Assessment of tracks, tunnels, and supporting infrastructure to ensure they meet the required safety standards and are free from defects that could compromise passenger safety.',
      'Mechanical and Electrical System Audits: Detailed inspections of all mechanical and electrical components, including motors, braking systems, control systems, and power supply units, to ensure they function optimally under all conditions.',
      'Elevator and Escalator Safety Testing: Inspection of all lifts and escalators within the transit system, ensuring they comply with safety regulations and operate smoothly and reliably.',
      'Emergency Response Systems Evaluation: Verification of the functionality and accessibility of emergency response systems, including fire alarms, communication systems, and evacuation routes, to ensure readiness in case of emergencies.',
      'Routine Maintenance Assessments: Evaluation of maintenance schedules and procedures to ensure that all components are serviced regularly and meet the required standards for safe operation.',
    ],
  },
  'Escalator Commercial': {
    title: 'Commercial Escalator Inspection',
    text: [
      'Commercial escalators in shopping malls, airports, and office complexes are subject to constant use and must maintain peak performance at all times. NLETA offers thorough inspection services to ensure these escalators operate safely and efficiently.',
      'Our inspection covers all mechanical and electrical components, safety devices, and structural elements. We verify compliance with IS 14665 and other applicable standards, providing detailed reports and certification.',
      'Regular commercial escalator inspections help prevent accidents, reduce maintenance costs, and ensure a positive experience for shoppers and visitors.',
    ],
    points: ['Mechanical component inspection', 'Electrical system assessment', 'Safety device verification', 'Structural examination', 'Performance testing', 'Compliance certification'],
  },
  'Travelators': {
    title: 'Travelators',
    text: [
      'Travelators, often used in high-traffic areas such as airports, shopping malls, and multi-story buildings, play a vital role in the smooth movement of people and goods. Ensuring these systems are in optimal working condition is paramount to public safety and operational efficiency.',
    ],
    sections: [
      {
        heading: 'Why Travelators Inspections Are Essential',
        text: 'Travelators are complex mechanical systems that require regular and thorough inspections to prevent malfunctions and ensure compliance with safety standards. Neglecting proper maintenance can lead to operational failures, posing significant risks to users and potentially causing costly downtime for your facility. Our inspection services are designed to:',
      },
    ],
    points: ['Specialized system assessment', 'Drive mechanism inspection', 'Safety system verification', 'Structural integrity check', 'Performance evaluation', 'Maintenance recommendations'],
    postSections: [
      {
        heading: 'Reporting and Recommendations',
        text: 'After completing the inspection, we provide a detailed report outlining our findings, including any potential issues, safety concerns, and areas that require attention. Our team will offer expert recommendations for maintenance, repairs, or upgrades to ensure your travelator systems continue to operate safely and efficiently.',
      },
      {
        heading: 'Trust NLETA for Reliable Travelators Inspections',
        text: 'With years of experience in lift and escalator safety, NLETA is a trusted partner for travelator inspections across the industry. Our commitment to safety, quality, and customer satisfaction ensures that your systems are always in top condition.',
      },
    ],
  },
  'Moving Walks': {
    title: 'Moving Walks',
    text: [
      'We understand the crucial role that moving walks play in modern infrastructure, seamlessly transporting large volumes of people in airports, malls, and transit systems. To ensure their safety and reliability, our Moving Walks Inspection service is designed to meet the highest standards of performance and compliance.',
    ],
    sections: [
      {
        heading: 'Comprehensive Inspection Process',
        text: 'Our team of certified inspectors conducts thorough evaluations of moving walks, focusing on critical aspects such as:',
      },
    ],
    points: ['Pallet system inspection', 'Drive unit assessment', 'Handrail system testing', 'Emergency stop testing', 'Speed control verification', 'Safety barrier inspection'],
    postSections: [
      {
        heading: 'Compliance with Standards',
        text: "NLETA's inspections are carried out in strict accordance with national and international safety standards. We ensure that all moving walks comply with the latest regulations and guidelines, helping you avoid potential legal issues and costly downtimes.",
      },
      {
        heading: 'Detailed Reporting',
        text: 'After the inspection, we provide a comprehensive report detailing our findings, including any identified issues and recommended corrective actions. This report serves as a valuable tool for maintenance teams, helping them address problems before they escalate.',
      },
    ],
  },
  'Others': {
    title: 'Other Escalator Systems Inspection',
    text: [
      'NLETA provides inspection services for all types of escalator and moving walkway systems not covered under standard categories. This includes custom-built systems, heritage installations, and specialized escalators in unique environments.',
      'Our flexible inspection approach allows us to assess any escalator system against applicable standards and provide tailored recommendations for safety improvements and compliance.',
      'We work with manufacturers, building owners, and operators to develop customized inspection protocols that address the specific requirements of each unique system.',
    ],
    points: ['Custom system assessment', 'Heritage installation inspection', 'Tailored inspection protocols', 'Safety improvement recommendations', 'Compliance verification', 'Operator training support'],
  },
};

function EscalatorInspection() {
  const [active, setActive] = useState('MASS Rapid Transit System');
  const current = content[active];

  return (
    <main>
      <section className="inspection-hero">
        <img src={`${process.env.PUBLIC_URL}/b_files/esc.jpg`} alt="Escalator Inspection" className="inspection-hero-img-bg" />
        <h1>Escalator Inspection</h1>
        <p>Expert Escalator Inspection and Certification Services for All Types of Escalator Systems</p>
      </section>

      <div className="inspection-layout">
        <aside className="inspection-sidebar">
          <h3>Escalator Categories</h3>
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
          {!current.sections && <h3>Key Inspection Areas</h3>}
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

export default EscalatorInspection;

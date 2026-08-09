import React, { useState } from 'react';
import '../escalatorInspection/InspectionPage.css';

const sidebarItems = [
  'Mock Drills',
  'Emergency Rescue Training',
  'Safety Inspections',
  'Standard Compliance Inspections',
  'Load Test Inspections',
  'Vibration Test Inspections',
  'Efficiency Determination Test',
  'Insulation Resistance Test',
  'Losses Test',
  'Safety Assessments Test',
  'Drop Test',
];

const content = {
  'Mock Drills': {
    title: 'Mock Drills',
    text: ['NLETA conducts structured mock drill exercises to simulate emergency scenarios in lift and escalator environments. These drills help building management teams and operators respond effectively during real emergencies, minimizing risk to passengers and staff.'],
    points: ['Simulated entrapment scenarios', 'Evacuation procedure testing', 'Response time evaluation', 'Staff coordination assessment', 'Post-drill debriefing and reporting'],
  },
  'Emergency Rescue Training': {
    title: 'Emergency Rescue Training',
    text: ['Our Emergency Rescue Training program equips lift operators, maintenance personnel, and building staff with the skills and knowledge required to safely rescue passengers during lift failures or emergencies.'],
    points: ['Hands-on rescue technique training', 'Use of emergency release mechanisms', 'Communication protocols during emergencies', 'First aid and passenger assistance', 'Certification upon completion'],
  },
  'Safety Inspections': {
    title: 'Safety Inspections',
    text: ['NLETA performs comprehensive safety inspections for lifts and escalators to identify hazards, verify safety device functionality, and ensure compliance with applicable Indian and international standards.'],
    points: ['Safety device functionality checks', 'Structural and mechanical assessment', 'Electrical system review', 'Compliance with IS 17900 and BS EN 81', 'Detailed inspection report and certification'],
  },
  'Standard Compliance Inspections': {
    title: 'Standard Compliance Inspections',
    text: ['Our Standard Compliance Inspections verify that lift and escalator installations meet all required national and international regulatory standards, helping facility owners avoid legal liabilities and ensure passenger safety.'],
    points: ['IS 17900-1 and IS 17900-2 compliance', 'ISO 8100 series verification', 'Documentation and records review', 'Third-party certification support', 'Gap analysis and corrective action guidance'],
  },
  'Load Test Inspections': {
    title: 'Load Test Inspections',
    text: ['Load testing is a critical part of lift certification. NLETA conducts rigorous load tests to verify that lifts can safely carry their rated capacity under all operating conditions, including overload scenarios.'],
    points: ['Rated load capacity verification', 'Overload protection testing', 'Dynamic and static load tests', 'Brake performance under load', 'Compliance with load test standards'],
  },
  'Vibration Test Inspections': {
    title: 'Vibration Test Inspections',
    text: ['Excessive vibration in lifts and escalators can indicate mechanical wear, misalignment, or structural issues. NLETA uses calibrated measurement equipment to assess vibration levels and identify root causes.'],
    points: ['Vibration level measurement', 'Drive system analysis', 'Guide rail alignment check', 'Bearing and motor assessment', 'Recommendations for vibration reduction'],
  },
  'Efficiency Determination Test': {
    title: 'Efficiency Determination Test',
    text: ['NLETA evaluates the energy efficiency of lift systems to help operators reduce power consumption, lower operating costs, and meet green building requirements. Our tests measure actual performance against design specifications.'],
    points: ['Energy consumption measurement', 'Motor and drive efficiency analysis', 'Standby power assessment', 'Comparison against design benchmarks', 'Energy optimization recommendations'],
  },
  'Insulation Resistance Test': {
    title: 'Insulation Resistance Test',
    text: ['Insulation resistance testing ensures that the electrical systems within lifts and escalators are safe from short circuits, leakage currents, and potential electrical hazards. NLETA performs these tests as part of periodic safety assessments.'],
    points: ['Wiring insulation resistance measurement', 'Motor winding insulation check', 'Control panel insulation assessment', 'Earth continuity verification', 'Compliance with electrical safety standards'],
  },
  'Losses Test': {
    title: 'Losses Test',
    text: ['The Losses Test measures energy losses within lift drive systems, motors, and control units. Identifying and minimizing these losses improves overall system efficiency and reduces operational costs for building owners.'],
    points: ['Iron and copper loss measurement', 'Drive system loss analysis', 'Heat dissipation assessment', 'Efficiency ratio calculation', 'Reporting and improvement recommendations'],
  },
  'Safety Assessments Test': {
    title: 'Safety Assessments Test',
    text: ['NLETA conducts holistic safety assessments that evaluate the overall risk profile of a lift or escalator installation. These assessments go beyond standard inspections to identify systemic risks and recommend preventive measures.'],
    points: ['Risk identification and classification', 'Safety system redundancy review', 'Failure mode and effect analysis', 'Compliance gap assessment', 'Prioritized corrective action plan'],
  },
  'Drop Test': {
    title: 'Drop Test',
    text: ["The Drop Test verifies the performance of safety gears and overspeed governors by simulating a free-fall condition. This critical test ensures that the lift's emergency braking systems will activate correctly in the event of a rope failure or overspeed situation."],
    points: ['Safety gear activation verification', 'Overspeed governor response testing', 'Stopping distance measurement', 'Structural integrity post-test assessment', 'Certification of safety gear performance'],
  },
};

function AssessmentDetail() {
  const [active, setActive] = useState(null);
  const current = active ? content[active] : null;

  return (
    <main>
      <section className="inspection-hero">
        <h1>Assessments</h1>
        <p>Comprehensive Testing, Assessment and Certification Services for Lifts and Escalators</p>
      </section>

      <div className="inspection-layout">
        <aside className="inspection-sidebar">
          <h3>Assessment Categories</h3>
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
          {!current && (
            <p style={{ color: '#171145', opacity: 0.5 }}>Select a category from the sidebar to view details.</p>
          )}
          {current && (
            <>
              <h2>{current.title}</h2>
              {current.text.map((p, i) => <p key={i}>{p}</p>)}
              <div className="inspection-points">
                {current.points.map((point, i) => (
                  <div key={i} className="inspection-point">
                    <span className="point-icon">✔</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default AssessmentDetail;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import '../escalatorInspection/InspectionPage.css';
import './ProjectsTrainings.css';

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
    text: [
      'At the National Lifts and Escalator Testing Agency (NLETA), we believe that safety is not just a requirement but a responsibility. In critical situations, the difference between safety and disaster often comes down to one thing: preparedness. This is where our Mock Drills Training program plays a vital role.',
    ],
    sections: [
      {
        heading: 'Why Mock Drills Matter',
        text: "Emergencies can strike at any time, and when they do, immediate, well-coordinated action is crucial. Whether it's a fire, power failure, mechanical breakdown, or other unforeseen incidents, mock drills equip your team with the skills and confidence to respond swiftly and effectively. Our mock drills simulate real-life scenarios in a controlled environment, helping participants to:",
      },
    ],
    points: [
      'Recognize and React: Learn to quickly identify emergencies and respond with appropriate actions.',
      'Practice Evacuation Procedures: Master the steps required to evacuate safely and efficiently, ensuring the well-being of everyone involved.',
      'Operate Emergency Systems: Gain hands-on experience with emergency systems, such as alarms, intercoms, and safety brakes.',
      'Coordinate with Emergency Services: Understand the protocol for communicating with emergency responders, ensuring a seamless rescue operation.',
    ],
    postSections: [
      {
        heading: 'Tailored Training for Every Facility',
        text: "No two buildings or facilities are the same, and neither are their safety needs. That's why NLETA's Mock Drills Training is tailored to the specific requirements of your facility. We conduct a thorough assessment to design scenarios that are realistic and relevant, ensuring your team is prepared for any situation that may arise.",
      },
    ],
  },
  'Emergency Rescue Training': {
    title: 'Emergency Rescue Training',
    text: [
      'At the National Lifts and Escalator Testing Agency (NLETA), we understand that safety is paramount in every aspect of lift and escalator operations. Our Emergency Rescue Training program is meticulously designed to equip professionals with the knowledge and skills necessary to effectively respond to emergencies involving lifts and escalators.',
    ],
    sections: [
      {
        heading: 'Why Emergency Rescue Training is Essential',
        text: 'Lifts and escalators are integral to modern buildings, ensuring the smooth movement of people. However, in the event of a malfunction or power failure, these systems can pose significant risks.',
      },
    ],
    points: [
      'First Responders: To safely and efficiently handle situations where passengers are trapped.',
      'Building Maintenance Teams: To understand the correct protocols and procedures during an emergency.',
      'Facility Managers: To ensure that the premises are compliant with safety regulations and that staff are prepared for any emergency.',
    ],
    postSections: [
      {
        heading: 'Who Should Attend?',
        text: 'Our Emergency Rescue Training is ideal for: Lift and escalator technicians, Facility and property managers, Security personnel, First responders and emergency service teams, and Health and safety officers.',
      },
      {
        heading: 'Benefits',
        text: '',
      },
    ],
    postPoints: [
      'Enhanced Safety: Equip your team with the skills to handle emergencies effectively, reducing the risk of injury or fatalities.',
      'Regulatory Compliance: Ensure that your building meets all safety and legal requirements.',
      'Confidence and Preparedness: Empower your staff with the knowledge to act swiftly and correctly in emergencies, minimizing panic and confusion.',
    ],
  },
  'Safety Inspections': {
    title: 'Safety Inspections',
    text: [
      'At NLETA, safety inspections are the cornerstone of our services. We perform thorough, systematic evaluations of lift and escalator installations to identify potential hazards, verify the functionality of all safety devices, and ensure full compliance with applicable Indian and international standards.',
    ],
    sections: [
      {
        heading: 'What Our Safety Inspections Cover',
        text: 'Our certified inspectors examine every critical aspect of your lift or escalator system, leaving nothing to chance:',
      },
    ],
    points: [
      'Safety Device Verification: Testing of emergency brakes, overspeed governors, door interlocks, and buffer systems.',
      'Structural and Mechanical Assessment: Evaluation of guide rails, suspension ropes, pulleys, and load-bearing components.',
      'Electrical System Review: Inspection of control panels, wiring, lighting, and earthing continuity.',
      'Operational Performance Testing: Assessment of ride quality, levelling accuracy, and door operation.',
      'Compliance with IS 17900 and BS EN 81: Verification against all applicable national and international standards.',
    ],
    postSections: [
      {
        heading: 'After the Inspection',
        text: 'We provide a comprehensive written report detailing all findings, non-conformities, and recommended corrective actions. Upon successful completion, NLETA issues a formal safety certification valid for the prescribed regulatory period.',
      },
    ],
  },
  'Standard Compliance Inspections': {
    title: 'Standard Compliance Inspections',
    text: [
      'Regulatory compliance is not optional — it is a legal and moral obligation for every building owner and facility manager. NLETA Standard Compliance Inspections ensure that your lift and escalator installations fully conform to all applicable national and international safety regulations, protecting your passengers, your staff, and your organisation from liability.',
    ],
    sections: [
      {
        heading: 'Standards We Inspect Against',
        text: 'Our inspectors are trained and certified to assess compliance with a wide range of standards, including:',
      },
    ],
    points: [
      'IS 17900-1 and IS 17900-2: Indian Standards for lift safety rules and design calculations.',
      'ISO 8100-1 and ISO 8100-2: International Organisation for Standardization lift standards.',
      'BS EN 81 Series: European safety standards widely adopted in India for modern installations.',
      'BIS Certification Requirements: Bureau of Indian Standards type-testing and certification obligations.',
      'Local Municipal and State Regulations: Compliance with jurisdiction-specific lift bylaws and periodic inspection mandates.',
    ],
    postSections: [
      {
        heading: 'Gap Analysis and Corrective Guidance',
        text: 'Where non-conformities are identified, NLETA provides a detailed gap analysis report with prioritised corrective actions, helping you achieve full compliance efficiently and cost-effectively.',
      },
    ],
  },
  'Load Test Inspections': {
    title: 'Load Test Inspections',
    text: [
      "A lift must be able to safely carry its rated load under all operating conditions — including overload situations. NLETA's Load Test Inspections provide definitive verification of a lift's structural and mechanical capacity, forming an essential part of both new installation acceptance and periodic safety certification.",
    ],
    sections: [
      {
        heading: 'Our Load Testing Process',
        text: 'NLETA follows a rigorous, standards-based methodology for all load tests:',
      },
    ],
    points: [
      'Static Load Test: The lift is loaded to 100% and 125% of its rated capacity to verify structural integrity and brake holding performance.',
      'Dynamic Load Test: The lift is operated at full rated load through a series of starts, stops, and floor-to-floor runs to assess drive system performance.',
      'Overload Protection Test: Verification that the overload detection system activates correctly and prevents operation when the rated capacity is exceeded.',
      "Brake Performance Test: Assessment of the braking system's ability to hold and stop the car safely under full load.",
      'Safety Gear Activation: Confirmation that safety gears engage correctly under simulated overload and overspeed conditions.',
    ],
    postSections: [
      {
        heading: 'Certification',
        text: 'On successful completion of all load tests, NLETA issues a Load Test Certificate confirming that the lift meets the required capacity and safety standards as per IS 17900 and other applicable codes.',
      },
    ],
  },
  'Vibration Test Inspections': {
    title: 'Vibration Test Inspections',
    text: [
      "Excessive vibration in a lift is more than a comfort issue — it is a warning sign of underlying mechanical problems that, if left unaddressed, can lead to component failure, accelerated wear, and safety incidents. NLETA's Vibration Test Inspections use precision measurement equipment to quantify vibration levels and pinpoint their root causes.",
    ],
    sections: [
      {
        heading: 'Why Vibration Testing Matters',
        text: 'Vibration in lift systems can originate from multiple sources and manifest in different ways. Our inspectors assess:',
      },
    ],
    points: [
      'Ride Quality Measurement: Quantification of horizontal and vertical vibration levels experienced by passengers during travel.',
      'Drive System Analysis: Inspection of the motor, gearbox, and drive sheave for imbalance, misalignment, or wear.',
      'Guide Rail Assessment: Evaluation of rail joints, fixings, and alignment that can cause periodic vibration impulses.',
      'Rope and Pulley Inspection: Checking suspension ropes and pulleys for uneven wear or improper tensioning.',
      "Control System Review: Assessment of the drive controller's acceleration and deceleration profiles for smoothness.",
    ],
    postSections: [
      {
        heading: 'Reporting and Recommendations',
        text: 'Following the vibration test, NLETA provides a detailed report including measured vibration data, comparison against acceptable limits per EN 12015/12016 and IS standards, identified root causes, and specific maintenance or adjustment recommendations to restore optimal ride quality.',
      },
    ],
  },
  'Efficiency Determination Test': {
    title: 'Efficiency Determination Test',
    text: [
      "With energy costs rising and sustainability becoming a key priority for building owners, understanding the energy performance of your lift system has never been more important. NLETA's Efficiency Determination Test provides an accurate, data-driven assessment of your lift's energy consumption and overall operational efficiency.",
    ],
    sections: [
      {
        heading: 'What We Measure',
        text: 'Our efficiency testing covers all aspects of energy consumption across the lift system:',
      },
    ],
    points: [
      'Active Energy Consumption: Measurement of energy consumed during up and down travel under rated load conditions.',
      'Standby and Idle Power: Assessment of energy drawn by the system during standby, door-open, and lighting states.',
      'Motor and Drive Efficiency: Evaluation of the traction motor and variable frequency drive against their rated efficiency specifications.',
      'Regenerative Capability: Where applicable, verification that regenerative drives are returning energy to the building supply correctly.',
      "Energy Use Intensity (EUI): Calculation of the lift's energy use intensity for benchmarking against industry standards and green building rating systems.",
    ],
    postSections: [
      {
        heading: 'Benefits for Building Owners',
        text: 'The Efficiency Determination Test report provides actionable insights to reduce energy bills, support ISO 50001 energy management compliance, and contribute to green building certifications such as IGBC and LEED. NLETA also provides recommendations for upgrades — such as LED lighting, standby mode optimisation, and drive modernisation — that can deliver significant long-term savings.',
      },
    ],
  },
  'Insulation Resistance Test': {
    title: 'Insulation Resistance Test',
    text: [
      "Electrical insulation degradation is one of the leading causes of lift system failures, short circuits, and electrical hazards. NLETA's Insulation Resistance Test is a critical preventive measure that identifies deteriorating insulation before it leads to equipment damage, service disruption, or risk to passengers and maintenance personnel.",
    ],
    sections: [
      {
        heading: 'Our Testing Methodology',
        text: 'Using calibrated high-voltage insulation resistance testers, our engineers measure the resistance of all electrical insulation within the lift system:',
      },
    ],
    points: [
      'Motor Winding Insulation: Measurement of phase-to-phase and phase-to-earth insulation resistance of the traction motor windings.',
      'Control Panel and Wiring: Testing of all control circuit wiring, including travelling cables, for insulation integrity.',
      'Door Operator Circuits: Insulation resistance checks on door motor windings and associated wiring.',
      'Earth Continuity Verification: Confirmation that all metallic enclosures and components are correctly bonded to earth.',
      'Comparison Against Baseline: Results are compared against previous test records and minimum acceptable values per IS and IEC standards.',
    ],
    postSections: [
      {
        heading: 'Frequency and Compliance',
        text: "Insulation resistance testing is recommended as part of every periodic safety inspection and is mandatory following any rewiring, motor replacement, or flood/water ingress event. NLETA's test reports provide a documented compliance record for regulatory and insurance purposes.",
      },
    ],
  },
  'Losses Test': {
    title: 'Losses Test',
    text: [
      "Energy losses within a lift's drive system directly impact operating costs and system longevity. NLETA's Losses Test provides a precise measurement of all energy losses across the motor, gearbox, and drive electronics, enabling building owners and maintenance teams to identify inefficiencies and take targeted corrective action.",
    ],
    sections: [
      {
        heading: 'Types of Losses We Measure',
        text: 'Our engineers use calibrated power analysers and thermal imaging equipment to quantify:',
      },
    ],
    points: [
      'Iron (Core) Losses: Hysteresis and eddy current losses within the motor stator core, which increase with age and magnetic degradation.',
      'Copper (Winding) Losses: Resistive losses in the motor windings due to current flow, which increase with winding resistance as insulation ages.',
      'Mechanical Losses: Friction losses in bearings, gearbox, and sheave assemblies identified through thermal imaging and vibration analysis.',
      'Drive Electronics Losses: Switching and conduction losses within the variable frequency drive or soft-starter unit.',
      'Standby Losses: Continuous power draw from control systems, lighting, and ventilation during non-operational periods.',
    ],
    postSections: [
      {
        heading: 'Outcome',
        text: "The Losses Test report provides a complete energy loss breakdown with efficiency ratios for each subsystem. NLETA's engineers recommend targeted interventions — such as bearing replacement, gearbox oil change, drive parameter optimisation, or motor rewinding — to restore system efficiency and reduce operating costs.",
      },
    ],
  },
  'Safety Assessments Test': {
    title: 'Safety Assessments Test',
    text: [
      "A Safety Assessment goes beyond a standard periodic inspection. It is a structured, risk-based evaluation of the entire lift or escalator installation, designed to identify systemic safety risks, assess the adequacy of existing safeguards, and provide a prioritised plan for risk reduction. NLETA's Safety Assessments are conducted by senior certified engineers with extensive field experience.",
    ],
    sections: [
      {
        heading: 'Our Risk-Based Assessment Approach',
        text: 'NLETA follows a structured methodology aligned with ISO 14798 (Lifts, Escalators and Moving Walks — Risk Assessment and Reduction Methodology):',
      },
    ],
    points: [
      'Hazard Identification: Systematic identification of all potential hazards associated with the installation, including mechanical, electrical, structural, and operational risks.',
      'Risk Estimation: Quantification of the likelihood and severity of each identified hazard using a standardised risk matrix.',
      'Risk Evaluation: Comparison of estimated risk levels against acceptable risk criteria defined in applicable standards.',
      'Safeguard Adequacy Review: Assessment of whether existing safety measures are sufficient to reduce risks to acceptable levels.',
      'Corrective Action Plan: A prioritised list of recommended risk reduction measures, categorised by urgency and estimated cost of implementation.',
    ],
    postSections: [
      {
        heading: 'Who Benefits from a Safety Assessment?',
        text: "Safety Assessments are particularly valuable for ageing installations approaching or beyond their design life, lifts that have undergone significant modifications, facilities seeking to upgrade to current standards, and building owners requiring documented due diligence for insurance or legal purposes. NLETA's assessment report provides a defensible, third-party record of your commitment to passenger safety.",
      },
    ],
  },
  'Drop Test': {
    title: 'Drop Test',
    text: [
      "The Drop Test — also known as the Safety Gear Test — is one of the most critical tests in lift safety certification. It directly verifies that the lift car's emergency braking system will arrest a free-fall or overspeed descent, protecting passengers from the consequences of rope failure or drive system malfunction. NLETA conducts Drop Tests in strict accordance with IS 17900-2 and BS EN 81-20 requirements.",
    ],
    sections: [
      {
        heading: 'How the Drop Test Works',
        text: "The test is performed on the installed lift under controlled conditions by NLETA's certified engineers:",
      },
    ],
    points: [
      'Overspeed Governor Triggering: The overspeed governor is manually triggered or allowed to activate at the set tripping speed to initiate the safety gear engagement sequence.',
      'Safety Gear Engagement: The safety gear jaws engage the guide rails, bringing the car to a controlled stop within the maximum permissible stopping distance.',
      'Stopping Distance Measurement: The actual stopping distance is measured and compared against the maximum values permitted by the applicable standard for the rated speed and load.',
      'Deceleration Assessment: The deceleration experienced during stopping is measured to ensure it remains within safe limits for passengers.',
      'Post-Test Structural Inspection: Following the drop test, the guide rails, safety gear components, and car structure are inspected for damage or deformation.',
    ],
    postSections: [
      {
        heading: 'Certification and Frequency',
        text: 'A successful Drop Test results in the issuance of a Safety Gear Test Certificate by NLETA. This certificate is a mandatory requirement for new installation acceptance and is required periodically — typically every five years — as part of ongoing safety certification. NLETA coordinates all aspects of the test, including pre-test preparation, execution, post-test inspection, and certification documentation.',
      },
    ],
  },
};

const amcPoints = ['Elevator Company', 'Maintenance', 'Coordination', 'Awareness', 'Safety'];
const customerPoints = ['Compliance', 'Maintenance', 'Preparedness', 'Awareness', 'Management'];

function WorkCard({ item }) {
  const amcBodyRef = useRef(null);
  const amcArrowRef = useRef(null);
  const custBodyRef = useRef(null);
  const custArrowRef = useRef(null);
  const amcRating = item.amcRating || 5;
  const customerRating = item.customerRating || 5;

  function toggleAmc() {
    const body = amcBodyRef.current;
    const arrow = amcArrowRef.current;
    if (!body) return;
    const isHidden = body.style.display === 'none' || body.style.display === '';
    body.style.display = isHidden ? 'flex' : 'none';
    arrow.textContent = isHidden ? '▲' : '▼';
  }

  function toggleCust() {
    const body = custBodyRef.current;
    const arrow = custArrowRef.current;
    if (!body) return;
    const isHidden = body.style.display === 'none' || body.style.display === '';
    body.style.display = isHidden ? 'flex' : 'none';
    arrow.textContent = isHidden ? '▲' : '▼';
  }

  return (
    <div className="work-location-card">
      <div className="work-card-top">
        <span className="work-location-icon">🏢</span>
        <h3>{item.name}</h3>
        {(item.floors > 0 || item.units > 0) && (
          <div className="work-meta">
            {item.floors > 0 && <span>🏢 {item.floors} Floors</span>}
            {item.units > 0 && <span>🛗 {item.units} Units</span>}
          </div>
        )}
      </div>
      <div className="work-card-body">
        <div className="work-dropdown amc">
          <button className="work-dropdown-btn" onClick={toggleAmc}>
            <span className="work-rating-title">AMC Rating</span>
            <div className="work-stars">
              {[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= amcRating ? 'filled' : ''}`}>★</span>)}
            </div>
            <span className="work-dropdown-arrow" ref={amcArrowRef}>▼</span>
          </button>
          <div className="work-dropdown-body" ref={amcBodyRef} style={{ display: 'none', flexDirection: 'column', gap: '0.3rem' }}>
            {amcPoints.map((pt, idx) => (
              <div key={idx} className="work-point-row">
                <span className="work-point-dot" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="work-dropdown cust">
          <button className="work-dropdown-btn" onClick={toggleCust}>
            <span className="work-rating-title">Customer Rating</span>
            <div className="work-stars">
              {[1,2,3,4,5].map(s => <span key={s} className={`star ${s <= customerRating ? 'filled' : ''}`}>★</span>)}
            </div>
            <span className="work-dropdown-arrow" ref={custArrowRef}>▼</span>
          </button>
          <div className="work-dropdown-body" ref={custBodyRef} style={{ display: 'none', flexDirection: 'column', gap: '0.3rem' }}>
            {customerPoints.map((pt, idx) => (
              <div key={idx} className="work-point-row">
                <span className="work-point-dot" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsTrainings() {
  const [active, setActive] = useState(null);
  const current = active ? content[active] : null;
  const location = useLocation();
  const navigate = useNavigate();
  const [dbProjects, setDbProjects] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);

  useEffect(() => {
    setActive(null);
    fetchProjects();
    fetchOngoing();
  }, [location]);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setDbProjects(data);
  };

  const fetchOngoing = async () => {
    const { data } = await supabase.from('ongoing_projects').select('*').order('created_at', { ascending: false });
    if (data) setOngoingProjects(data);
  };

  return (
    <main>
      <section className="inspection-hero">
      <img className="inspection-hero-img-bg" src="/b_files/training.jpeg" alt="Technicians" />
        <h1>{active || 'Projects & Trainings'}</h1>
        <p>Empowering Safety Through Expert Training, Rigorous Testing & Certified Inspections</p>
      </section>

      <div className="inspection-layout full-width">

        <div className="inspection-content">
          {!current ? (
            <>
              <section className="assess-section">
                <h2>Projects</h2>
                <p>NLETA has successfully executed a wide range of lift and escalator safety projects across India, serving residential societies, commercial complexes, hospitals, government buildings, and public infrastructure. Below are some of the key projects undertaken by our team.</p>
                <div className="projects-grid">
                  {[
                    { title: 'Delhi Metro', logo: '/b_files/p1.png' },
                    { title: 'Bangalore Metro', logo: '/b_files/p2.png' },
                    { title: 'Chennai International Airport', logo: '/b_files/p3.png' },
                    { title: 'Mumbai Metro', logo: '/b_files/p4.png' },
                    { title: 'Ambani Antilia', logo: '/b_files/ant.png' },
                    { title: 'India Bulls', logo: '/b_files/p5.png' },
                    { title: 'Indian Railways', logo: '/b_files/p6.png' },
                    { title: 'Kolkata Metro', logo: '/b_files/p7.png' },
                    { title: 'Delhi PWD', logo: '/b_files/p8.png' },
                    { title: 'Civic Center Delhi', logo: '/b_files/civic.jpg' },
                    { title: 'Delhi Metro Airport Express Line', logo: '/b_files/p1.png' },
                    { title: 'Supreme Court of India', logo: '/b_files/p9.png' },
                    { title: 'Hotel Rajhans — Haryana Tourism', logo: '/b_files/p10.png' },
                    { title: 'Government of Haryana', logo: '/b_files/p11.png' },
                    { title: 'Reliance Mart', logo: '/b_files/p12.png' },
                    { title: 'Bihar PWD', logo: '/b_files/p13.png' },
                    { title: 'RDSO', logo: '/b_files/p14.png' },
                    { title: 'BJP Bhavan', logo: '/b_files/p15.png' },
                  ].map((p, i) => (
                    <div key={i} className="project-card">
                      <div className="project-icon">
                        <img src={p.logo} alt={p.title} className="project-logo" />
                      </div>
                      <h3>{p.title}</h3>
                    </div>
                  ))}
                </div>
              </section>

              <section className="assess-section">
                <h2>Training Programme</h2>
                <p>Our training programmes have been successfully conducted at the following institutions and organisations across India.</p>
                <div className="projects-grid">
                  {[
                    { title: 'AKGEC College', logo: '/b_files/t1.png' },
                    { title: 'Chitkara University', logo: '/b_files/t2.png' },
                    { title: 'Virgo Aluminium', logo: '/b_files/t3.png' },
                    { title: 'JVM Group', logo: '/b_files/t4.png' },
                    { title: 'Aryans Model School, Dadri', logo: '/b_files/ary.jpg' },
                    { title: 'Sunfood Tech', logo: '/b_files/sun.jpg' },
                    { title: 'Bikano Foods', logo: '/b_files/t6.png' },
                  ].map((p, i) => (
                    <div key={i} className="project-card location-card">
                      <div className="project-icon">
                        <img src={p.logo} alt={p.title} className="project-logo" />
                      </div>
                      <h3>{p.title}</h3>
                    </div>
                  ))}
                </div>
              </section>

              <section className="assess-section">
                <div className="our-work-header">
                  <h2>Our Work</h2>
                  <button className="admin-login-btn" onClick={() => navigate('/projects-admin')}>
                    Admin Login 🔒
                  </button>
                </div>
                <p>NLETA has successfully delivered lift safety solutions across India. Here are key locations where our work has made a difference.</p>

                <div className="our-work-grid">
                  {dbProjects.map((item) => (
                    <WorkCard key={item.id} item={item} />
                  ))}
                </div>
              </section>

              {ongoingProjects.length > 0 && (
                <section className="assess-section">
                  <h2>Ongoing Work</h2>
                  <p>Projects currently being executed by NLETA across India.</p>
                  <div className="ongoing-grid">
                    {ongoingProjects.map((item, i) => (
                      <div key={item.id} className="ongoing-card">
                        <span className="ongoing-pulse" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

    </main>
  );
}

export default ProjectsTrainings;

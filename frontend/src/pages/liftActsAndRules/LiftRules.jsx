import React, { useState } from 'react';
import '../escalatorInspection/InspectionPage.css';
import '../projectsTrainings/ProjectsTrainings.css';

const sidebarItems = [
  'Safety Component Rules',
  'Maintenance Rules',
  'Emergency Operation Rules',
  'Load and Speed Rules',
  'Machine Room Rules',
  'Electrical Safety Rules',
  'Accessibility Rules',
  'Record Keeping Rules',
];

const content = {
  'Safety Component Rules': {
    title: 'Safety Component Rules',
    text: ['Safety components are the critical devices within a lift that protect passengers in the event of a malfunction or failure. Indian standards and state lift rules specify strict requirements for the selection, testing, certification, and installation of these components.'],
    sections: [{ heading: 'Mandatory Safety Components', text: 'The following safety components must be present, correctly installed, and certified in every lift installation:' }],
    points: [
      'Landing and Car Door Locking Devices: Must prevent the lift from moving unless all doors are fully closed and locked.',
      'Safety Gears: Must arrest the car in the event of overspeed or rope failure, stopping it within the maximum permissible distance.',
      'Overspeed Governor: Must trigger the safety gear when the car speed exceeds the set tripping speed.',
      'Buffers: Must absorb the kinetic energy of the car or counterweight in the event of travel beyond the terminal landing.',
      'PESSRAL: Programmable electronic safety-related systems must be designed and certified to the required Safety Integrity Level (SIL).',
    ],
    postSections: [{ heading: 'Certification Requirement', text: 'All safety components must carry a valid type examination certificate from a BIS-accredited Certification Body for Lifts (LCB). Uncertified components may not be used in new installations or as replacements in existing installations after the transition period ends on December 21, 2025.' }],
  },
  'Maintenance Rules': {
    title: 'Maintenance Rules',
    text: ['Regular and systematic maintenance is a legal requirement for all lift installations in India. State lift acts and IS 17900 specify the minimum maintenance obligations that building owners and maintenance contractors must fulfil to keep lifts in safe operating condition.'],
    sections: [{ heading: 'Key Maintenance Obligations', text: 'Building owners and maintenance contractors must comply with the following maintenance rules:' }],
    points: [
      'Maintenance Contract: Every lift must be covered by a maintenance contract with a licensed maintenance contractor at all times.',
      'Maintenance Frequency: Routine maintenance visits must be carried out at intervals not exceeding those specified in the maintenance contract and applicable standards — typically monthly.',
      'Maintenance Log: All maintenance activities must be recorded in the lift log book, including the date, work carried out, and the name and signature of the technician.',
      'Defect Reporting: Any defect that affects the safe operation of the lift must be reported to the building owner immediately and the lift taken out of service until the defect is rectified.',
      'Spare Parts: Only certified spare parts that meet the requirements of the applicable standards may be used in maintenance and repairs.',
    ],
    postSections: [{ heading: 'Owner Responsibility', text: 'The building owner is ultimately responsible for ensuring that the lift is properly maintained and that a valid maintenance contract is in place at all times. Failure to maintain a lift in safe working order is a criminal offence under most state lift acts.' }],
  },
  'Emergency Operation Rules': {
    title: 'Emergency Operation Rules',
    text: ['Lifts must be equipped with a range of emergency systems and must be capable of being operated safely in emergency conditions. Indian standards and state lift rules specify the minimum requirements for emergency operation features.'],
    sections: [{ heading: 'Required Emergency Features', text: 'Every lift must be equipped with the following emergency operation features:' }],
    points: [
      'Emergency Lighting: Battery-backed emergency lighting must illuminate the car interior for a minimum period in the event of a mains power failure.',
      'Alarm Device: An audible alarm must be provided in the car, operable by passengers, to summon assistance in the event of entrapment.',
      'Two-Way Communication: A two-way voice communication system must connect the car to a permanently attended location or an automatic emergency call centre.',
      'Manual Rescue Operation: The lift must be capable of being moved manually by trained personnel to release trapped passengers in the event of a power failure.',
      'Firefighter Operation: Lifts in buildings above a specified height must include a firefighter operation mode, allowing fire service personnel to take control of the lift.',
    ],
    postSections: [{ heading: 'Emergency Procedure Training', text: "Building management and maintenance staff must be trained in the correct emergency rescue procedures for the specific lift installation. NLETA's Emergency Rescue Training and Mock Drills programs provide this training in compliance with regulatory requirements." }],
  },
  'Load and Speed Rules': {
    title: 'Load and Speed Rules',
    text: ['Every lift is designed and certified for a specific rated load and rated speed. Indian standards and state lift rules specify strict requirements governing the rated load, rated speed, and the testing that must be carried out to verify compliance.'],
    sections: [{ heading: 'Key Load and Speed Requirements', text: 'The following rules apply to the rated load and speed of lift installations:' }],
    points: [
      'Rated Load Plate: The rated load in kilograms and the maximum number of persons must be clearly displayed on a plate inside the car.',
      'Overload Protection: An overload detection device must prevent the lift from moving when the load in the car exceeds the rated load.',
      'Load Testing: Every new installation must undergo a load test at 100% and 125% of rated load before commissioning.',
      'Speed Governor Setting: The overspeed governor must be set to trip at a speed not exceeding 115% of the rated speed.',
      'Speed Verification: The actual car speed must be measured during the acceptance inspection and verified to be within the permitted tolerance of the rated speed.',
    ],
    postSections: [{ heading: 'Periodic Load Testing', text: 'In addition to the acceptance load test, periodic load tests are required at intervals specified by the applicable state lift rules — typically every five years. NLETA conducts load tests in strict accordance with IS 17900-2 and issues the required Load Test Certificate upon successful completion.' }],
  },
  'Machine Room Rules': {
    title: 'Machine Room Rules',
    text: ['The machine room houses the drive machinery, control equipment, and other critical components of the lift system. Indian standards and state lift rules specify detailed requirements for the design, construction, and management of lift machine rooms to ensure the safety of maintenance personnel and the reliability of the equipment.'],
    sections: [{ heading: 'Machine Room Requirements', text: 'The following rules apply to lift machine rooms:' }],
    points: [
      'Dedicated Access: The machine room must be accessible only to authorised personnel and must be kept locked at all times when not in use.',
      'Minimum Dimensions: The machine room must provide sufficient space for safe access to all equipment, with minimum headroom and working clearances as specified in IS 17900.',
      'Ventilation and Temperature: Adequate ventilation must be provided to maintain the temperature within the machine room within the limits specified by the equipment manufacturer.',
      'Lighting: Permanent artificial lighting of at least 200 lux must be provided at floor level throughout the machine room.',
      'Fire Protection: Appropriate fire detection and suppression measures must be provided in the machine room in accordance with the National Building Code fire safety requirements.',
    ],
    postSections: [{ heading: 'Machine Room-Less Lifts', text: 'Modern machine room-less (MRL) lifts house the drive machinery within the lift shaft. IS 17900 specifies equivalent requirements for the access, working space, and environmental conditions for MRL installations, ensuring the same level of safety for maintenance personnel.' }],
  },
  'Electrical Safety Rules': {
    title: 'Electrical Safety Rules',
    text: ['Lifts are complex electrical systems, and electrical faults are a significant cause of lift failures and safety incidents. Indian standards and state lift rules specify comprehensive electrical safety requirements that must be met by all lift installations.'],
    sections: [{ heading: 'Key Electrical Safety Requirements', text: 'The following electrical safety rules apply to all lift installations:' }],
    points: [
      'Main Switch: A clearly identified main isolating switch must be provided in the machine room to isolate all electrical supply to the lift equipment.',
      'Earth Bonding: All metallic enclosures, conduits, and structural components must be bonded to the protective earth conductor.',
      'Insulation: All electrical wiring must be insulated to the standard required for the voltage and environmental conditions of the installation.',
      'Short Circuit Protection: Appropriate fuses or circuit breakers must protect all circuits against short circuit and overload conditions.',
      'Travelling Cable: The travelling cable connecting the car to the fixed wiring must be rated for the flexing duty and environmental conditions of the installation.',
    ],
    postSections: [{ heading: 'Periodic Electrical Testing', text: 'Insulation resistance testing and earth continuity verification must be carried out as part of every periodic safety inspection. NLETA conducts these tests using calibrated instruments and provides a documented test record as part of the inspection report.' }],
  },
  'Accessibility Rules': {
    title: 'Accessibility Rules',
    text: ['Ensuring that lifts are accessible to all users, including persons with disabilities, elderly passengers, and those with mobility impairments, is both a legal requirement and a social responsibility. Indian standards and the Rights of Persons with Disabilities Act, 2016 specify accessibility requirements for lift installations in public buildings.'],
    sections: [{ heading: 'Key Accessibility Requirements', text: 'The following accessibility rules apply to lifts in public and commercial buildings:' }],
    points: [
      'Minimum Car Dimensions: The car must be large enough to accommodate a wheelchair user, with minimum internal dimensions as specified in IS 17900 and NBC Part 8.',
      'Door Width: The clear opening width of the car and landing doors must be sufficient to allow wheelchair access — typically a minimum of 900mm.',
      'Landing Controls: Landing call buttons must be positioned at a height accessible to wheelchair users, with tactile and Braille markings.',
      'Car Controls: Car operating panel buttons must include tactile and Braille floor designations, and an audible floor announcement system must be provided.',
      'Levelling Accuracy: The lift must level accurately at each floor to within ±10mm to eliminate trip hazards for wheelchair users and persons with mobility impairments.',
    ],
    postSections: [{ heading: 'Legal Obligation', text: 'Under the Rights of Persons with Disabilities Act, 2016, all public buildings must be made accessible to persons with disabilities. Building owners who fail to provide accessible lift facilities may face legal action under this Act. NLETA can assess your installation against accessibility requirements and advise on any necessary modifications.' }],
  },
  'Record Keeping Rules': {
    title: 'Record Keeping Rules',
    text: ['Maintaining accurate and complete records is a legal requirement for all lift installations in India. State lift acts and IS 17900 specify the records that must be kept, the period for which they must be retained, and the circumstances in which they must be made available to inspectors and authorities.'],
    sections: [{ heading: 'Required Records', text: 'The following records must be maintained for every lift installation:' }],
    points: [
      'Lift Log Book: A log book must be maintained recording all maintenance visits, repairs, modifications, inspections, and accidents involving the lift.',
      'Approved Drawings: The approved installation drawings and specifications must be retained for the operational life of the installation.',
      'Safety Component Certificates: Type examination certificates for all safety components must be retained and made available to inspectors on request.',
      'Inspection Certificates: All periodic inspection certificates must be retained, with the current valid certificate displayed inside the car.',
      'Accident Records: Records of all accidents, entrapments, and near-miss incidents must be maintained and reported to the state authority as required.',
    ],
    postSections: [{ heading: 'Retention Period', text: 'Most state lift acts require records to be retained for a minimum of five years, or for the operational life of the installation in the case of drawings and safety component certificates. NLETA provides copies of all inspection reports and certificates to building owners for their records, supporting full compliance with record keeping requirements.' }],
  },
};

function LiftRules() {
  const [active, setActive] = useState(null);
  const current = active ? content[active] : null;

  return (
    <main>
      <section className="inspection-hero">
        <h1>{active || 'Lift Rules'}</h1>
        <p>Technical and Operational Rules Governing Lift Installations in India</p>
      </section>

      <div className="inspection-layout">
        <aside className="inspection-sidebar">
          <h3>Lift Rules</h3>
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
          {!current ? (
            <section className="assess-section">
              <h2>Overview</h2>
              <p>Lift rules in India cover the technical and operational requirements that govern how lifts must be designed, installed, maintained, and operated throughout their service life. These rules are derived from Indian Standards, state lift acts, and the National Building Code, and are enforced through the periodic inspection and certification regime.</p>
              <p>Select a topic from the sidebar to explore the specific rules and technical requirements in detail.</p>
            </section>
          ) : (
            <>
              <h2>{current.title}</h2>
              {current.text.map((p, i) => <p key={i}>{p}</p>)}
              {current.sections && current.sections.map((s, i) => (
                <div key={i}><h3>{s.heading}</h3>{s.text && <p>{s.text}</p>}</div>
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
                <div key={i}><h3>{s.heading}</h3>{s.text && <p>{s.text}</p>}</div>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default LiftRules;

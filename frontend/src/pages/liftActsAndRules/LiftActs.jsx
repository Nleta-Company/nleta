import React, { useState } from 'react';
import '../escalatorInspection/InspectionPage.css';
import '../projectsTrainings/ProjectsTrainings.css';

const sidebarItems = [
  'National Building Code',
  'IS 17900 Standards',
  'State Lift Acts',
  'BIS Certification Rules',
  'Periodic Inspection Rules',
  'Installation Approval Rules',
  'Operator Licensing Rules',
  'Penalty and Enforcement',
];

const content = {
  'National Building Code': {
    title: 'National Building Code of India',
    text: ['The National Building Code of India (NBC) is a comprehensive building standard that provides guidelines for regulating building construction activities across the country. Part 8 of the NBC specifically addresses lifts, escalators, and moving walks, laying down the minimum requirements for their design, installation, operation, and maintenance.'],
    sections: [{ heading: 'Key Provisions for Lifts and Escalators', text: 'The NBC establishes baseline requirements that all lift and escalator installations in India must meet:' }],
    points: [
      'Design Standards: All lifts must be designed in accordance with IS 14665 or IS 17900 series standards, ensuring structural and mechanical safety.',
      'Installation Requirements: Lifts must be installed by licensed contractors and inspected by an approved third-party agency before commissioning.',
      'Machine Room Specifications: The code specifies minimum dimensions, ventilation, lighting, and access requirements for lift machine rooms.',
      'Fire Safety Integration: Lifts must be integrated with the building fire alarm system and include firefighter operation modes as per NBC fire safety provisions.',
      'Accessibility Compliance: At least one lift in every multi-storey building must comply with accessibility requirements for persons with disabilities.',
    ],
    postSections: [{ heading: 'Applicability', text: 'The NBC applies to all new constructions and major renovations across India. State governments and local bodies are expected to adopt and enforce the NBC provisions through their respective building bylaws and lift regulations.' }],
  },
  'IS 17900 Standards': {
    title: 'IS 17900 Standards',
    text: ['IS 17900 is the most significant recent development in Indian lift standards. Published by the Bureau of Indian Standards (BIS) on January 10, 2023, it is based on the internationally recognised ISO 8100 series and represents a major modernisation of lift safety requirements in India.'],
    sections: [{ heading: 'The Two Parts of IS 17900', text: 'IS 17900 is divided into two complementary parts, each addressing a distinct aspect of lift safety:' }],
    points: [
      'IS 17900-1 (Safety Rules): Covers the essential health and safety requirements for the design, manufacture, installation, and commissioning of new electric traction and hydraulic lifts.',
      'IS 17900-2 (Design Rules and Testing): Specifies design calculations, examinations, and tests for lift components, including type testing and certification requirements for safety components.',
      'Transition Period: A transition period runs until December 21, 2025, during which installations may comply with either IS 17900 or the earlier IS 14665 standard.',
      'Safety Component Certification: Eight categories of safety components must be type tested and certified by an accredited Certification Body for Lifts (LCB) before use.',
      'Model Lift Certification: Complete lift designs may be certified as model lifts, simplifying the acceptance inspection process for series-produced installations.',
    ],
    postSections: [{ heading: 'Impact on the Industry', text: 'IS 17900 brings Indian lift safety requirements in line with global best practices. It places greater responsibility on manufacturers, installers, and building owners to ensure that all components and installations are properly certified, inspected, and maintained throughout their service life.' }],
  },
  'State Lift Acts': {
    title: 'State Lift Acts',
    text: ['In India, the regulation of lifts and escalators is primarily a state subject. Most states have enacted their own Lift Acts or Lift Rules that govern the installation, operation, inspection, and maintenance of lifts within their jurisdiction.'],
    sections: [{ heading: 'Common Provisions Across State Lift Acts', text: 'Despite variations in detail, most state lift acts share the following key provisions:' }],
    points: [
      'Registration: Every lift must be registered with the designated state authority before it is put into service.',
      'Approved Installer: Lifts may only be installed by contractors holding a valid licence issued by the state government.',
      'Pre-Commissioning Inspection: A lift must pass an inspection by a government-approved inspector or third-party agency before it is permitted to operate.',
      'Periodic Inspection: Lifts must undergo mandatory periodic inspections — typically annually — by an approved inspection body.',
      'Accident Reporting: Any accident or entrapment involving a lift must be reported to the state authority within a specified timeframe.',
    ],
    stateSections: [
      {
        heading: 'Uttar Pradesh Lift Act',
        text: 'The Uttar Pradesh Lift and Escalator Act governs the installation, operation, maintenance, and inspection of lifts across UP. Every lift must be registered with the Chief Inspector of Lifts before commissioning. Installation and maintenance must be carried out by licensed contractors only. Annual inspections are mandatory, and all accidents must be reported to the Chief Inspector within 24 hours.',
        link: 'https://prsindia.org/files/bills_acts/acts_states/uttar-pradesh/2024/Act4of2024UP.pdf',
      },
      {
        heading: 'Delhi Lift Act',
        text: 'The Delhi Lift Act regulates lifts in the National Capital Territory of Delhi. Lifts must be registered with the relevant municipal authority and a fitness certificate obtained before commissioning. The certificate must be renewed annually and displayed inside the lift car at all times. Only licensed contractors may install or carry out major repairs.',
        link: 'https://labour.delhi.gov.in/labour/delhi-lifts-rules-1942-extended-nct-delhi',
      },
      {
        heading: 'Haryana Lift Act',
        text: 'The Haryana Lift and Escalator Act governs lifts across Haryana, including rapidly growing cities like Gurugram and Faridabad. All lifts must be registered with the Director of Factories, Haryana. Pre-use inspection by a competent person is mandatory, and annual periodic inspections are required to maintain a valid certificate.',
        link: 'https://ceiharyana.com/UserManual/Haryana-Lifts-and-Escalators-Act-2008.pdf',
      },
      {
        heading: 'Karnataka Lift Act',
        text: 'The Karnataka Lifts Act is administered by the Department of Factories, Boilers, Industrial Safety and Health. Installation plans must be approved before work begins. A competency certificate must be obtained before the lift is used and renewed annually. The Inspector has powers to investigate accidents and prohibit use of unsafe lifts.',
        link: 'https://dpal.karnataka.gov.in/storage/pdf-files/acts%20alpha%20and%20dept%20wise%20acts/9%20of%202013%20(E).pdf',
      },
      {
        heading: 'Himachal Pradesh Lift Act',
        text: "The Himachal Pradesh Lift and Escalator Act is particularly relevant to the state's growing hospitality sector. Lifts must be registered and inspected before commissioning. Given the mountainous terrain and seismic activity in HP, additional structural and safety considerations apply to lift installations in the state.",
        link: 'https://www.indiacode.nic.in/bitstream/123456789/5343/1/the_himachal_pradesh_lifts_act%2C_2007.pdf',
      },
      {
        heading: 'Maharashtra Lift Act',
        text: 'The Maharashtra Lifts Act is one of the most comprehensive pieces of state lift legislation in India. Installation drawings must be approved before work begins. Only licensed contractors may install or maintain lifts. A fitness certificate must be obtained before commissioning and renewed annually. A log book must be maintained recording all maintenance, repairs, inspections, and incidents.',
        link: 'https://www.indiacode.nic.in/bitstream/123456789/21983/1/the_maharashtra_lifts_act_1939.pdf',
      },
    ],
  },
  'BIS Certification Rules': {
    title: 'BIS Certification Rules',
    text: ['The Bureau of Indian Standards (BIS) is the national standards body of India, operating under the Bureau of Indian Standards Act, 2016. BIS plays a central role in the certification of lift components and systems.'],
    sections: [{ heading: 'BIS Certification for Lift Components', text: 'Under IS 17900-2, the following safety components must be type tested and certified before they can be used in lift installations in India:' }],
    points: [
      'Landing and Car Door Locking Devices: Must carry a valid type examination certificate from an accredited LCB.',
      'Safety Gears and Overspeed Governors: Must be tested in an accredited laboratory and certified for the specific speed and load range.',
      'Buffers: Must be certified for the rated speed and impact energy of the installation.',
      'PESSRAL (SIL-rated Electronic Safety Circuits): Must be assessed and certified to the required Safety Integrity Level.',
      'Ascending Car Overspeed Protection and Unintended Car Movement Protection: Must be certified as functioning correctly across the full range of operating conditions.',
    ],
    postSections: [{ heading: 'Certification Bodies for Lifts (LCBs)', text: 'BIS accredits Certification Bodies for Lifts (LCBs) to issue type examination certificates for safety components. NLETA works closely with accredited LCBs to support manufacturers and installers in obtaining the required certifications.' }],
  },
  'Periodic Inspection Rules': {
    title: 'Periodic Inspection Rules',
    text: ['Periodic inspection is a mandatory legal requirement for all lifts and escalators in India. It is the primary mechanism through which the ongoing safety and compliance of installed systems is verified throughout their operational life.'],
    sections: [{ heading: 'Key Requirements for Periodic Inspections', text: 'The following requirements apply to periodic inspections across most Indian jurisdictions:' }],
    points: [
      'Frequency: Most state regulations require annual inspections, with some high-risk categories such as hospital and public transport lifts requiring more frequent assessments.',
      'Approved Inspector: Inspections must be carried out by a government-approved inspector or an accredited third-party inspection body such as NLETA.',
      'Scope of Inspection: The inspection must cover all safety devices, mechanical and electrical components, structural elements, and operational performance.',
      'Certificate Display: A valid periodic inspection certificate must be displayed inside the lift car at all times.',
      'Defect Rectification: Any defects identified during the inspection must be rectified within the timeframe specified by the inspector before the certificate is issued or renewed.',
    ],
    postSections: [{ heading: 'NLETA and Periodic Inspections', text: 'NLETA is an accredited third-party inspection body authorised to conduct periodic inspections and issue certificates across multiple Indian states.' }],
  },
  'Installation Approval Rules': {
    title: 'Installation Approval Rules',
    text: ['Before a new lift or escalator can be put into service in India, it must pass a pre-commissioning inspection and receive formal approval from the relevant authority.'],
    sections: [{ heading: 'The Installation Approval Process', text: 'The typical installation approval process involves the following steps:' }],
    points: [
      'Plan Approval: Lift drawings and specifications must be submitted to and approved by the state lift authority or local body before installation begins.',
      'Licensed Installer: The installation must be carried out by a contractor holding a valid installation licence issued by the state government.',
      'Completion Notice: Upon completion of installation, the owner or installer must notify the authority and request a pre-commissioning inspection.',
      'Pre-Commissioning Inspection: A government inspector or accredited third-party body inspects the installation against the approved drawings and applicable standards.',
      'Commissioning Certificate: Only after the inspection is passed and all defects are rectified will a commissioning certificate be issued.',
    ],
    postSections: [{ heading: 'Documentation Requirements', text: "The owner must maintain a lift log book, approved drawings, test certificates for all safety components, the installer's completion certificate, and the commissioning inspection certificate." }],
  },
  'Operator Licensing Rules': {
    title: 'Operator Licensing Rules',
    text: ['In many Indian states, lifts above a certain capacity or speed must be operated by a licensed lift operator. Operator licensing rules ensure that persons responsible for day-to-day operation have the necessary knowledge and skills.'],
    sections: [{ heading: 'Licensing Requirements', text: 'The specific requirements for lift operator licences vary by state, but typically include:' }],
    points: [
      'Minimum Age: Operators must be at least 18 years of age.',
      'Technical Training: Applicants must complete an approved training course covering lift operation, safety procedures, and emergency response.',
      'Written Examination: A written test administered by the state authority to verify knowledge of lift operation and safety rules.',
      'Practical Assessment: A practical demonstration of competence in operating the lift and responding to simulated emergency situations.',
      'Licence Renewal: Licences are typically valid for a fixed period and must be renewed through a refresher training and reassessment process.',
    ],
    postSections: [{ heading: 'NLETA Training Support', text: "NLETA's Emergency Rescue Training and Mock Drills programs are designed to complement the formal operator licensing process, providing practical hands-on training." }],
  },
  'Penalty and Enforcement': {
    title: 'Penalty and Enforcement',
    text: ['Indian lift legislation provides for a range of penalties and enforcement measures to ensure compliance with safety requirements. Building owners, operators, and installers who fail to comply face significant legal and financial consequences.'],
    sections: [{ heading: 'Common Penalties Under State Lift Acts', text: 'While the specific penalties vary by state, the following types of enforcement action are commonly provided for under Indian lift legislation:' }],
    points: [
      'Fines: Monetary penalties for operating a lift without a valid registration, commissioning certificate, or periodic inspection certificate.',
      'Prosecution: Criminal prosecution of building owners or operators in cases of serious non-compliance or where non-compliance has contributed to an accident or injury.',
      'Lift Sealing: State authorities have the power to seal and prohibit the use of a lift that is found to be unsafe or operating without the required certificates.',
      'Licence Cancellation: The installation licence of a contractor found to have carried out substandard work may be suspended or cancelled.',
      'Accident Liability: Building owners may face civil liability for injuries or fatalities resulting from lift accidents where negligence or non-compliance is established.',
    ],
    postSections: [{ heading: 'Staying Compliant with NLETA', text: "NLETA's inspection, certification, and training services are designed to help building owners, facility managers, and operators achieve and maintain compliance, protecting both their passengers and their legal position." }],
  },
  'Prevailing Standards': {
    title: 'Prevailing Standards',
    text: ['The following Indian and international standards govern the design, installation, inspection, and maintenance of lifts, escalators, and related equipment in India.'],
    standards: [
      'IS-14665 – Specifications for Passenger Lifts.',
      'BS EN-81-1 – Safety Rules for the construction and Installation of Lift - Part 1.',
      'IEC 60364 – Standard on Electrical Installation for Building.',
      'IS 15330 – Installation and Maintenance of Lift without conventional Machine Room – Code of Practice.',
      'IS 8216 – Directive for inspection of Lift Wire Ropes.',
      'IS 14665: Part 1 – Electric Traction lifts – Guidelines for outline dimensions of Passenger, Goods, Service and Hospital Lifts.',
      'IS 14665: Part 2: Sec 1 and 2 – Electric Traction Lifts – Code of Practice for Installation, Operation and Maintenance.',
      'IS 14665: Part 3: Sec 1 and 2 – Safety Rules and Regulations.',
      'IS 14665: Part 4: Sec 1 to 9 – Electric Traction lifts – Components.',
      'IS 14665: Part 5 – Directive for Inspections and Manual.',
      'IEC 60034: Part 1 – Rotating Electrical Machines – Rating and Performance.',
      'IEC 60034: Part 2-1 – Rotating Electrical Machines – Standard method for determining losses and efficiency.',
      'BS EN 12385-5 – Steel Wire ropes. Safety standard ropes for Lifts.',
      'BS EN 61000:6:3 – Electromagnetic compatibility (EMC) – Emission standard.',
      'BS EN 61000:6:1 – Electromagnetic compatibility (EMC) – Immunity standard.',
      'BS EN 12015 – Electromagnetic compatibility – Product Family Standards for Lifts, Escalators.',
      'ISO 7465 – Passenger Lifts and Service Lifts. Guide Rails for Car & Counterweight – T Type.',
      'BS EN ISO 1461 – Hot dip galvanized coating on fabricated iron and steel articles.',
      'BS 5655: Part 10 – Lifts and Service Lifts, Specification for testing and examination.',
      'EN 81-71 – Safety Rules for construction and installation of lifts – Vandal resistance lifts.',
      'IEC 60227: 6 – Polyvinyl chloride insulated cables up to 450/750 V – Lift Cables.',
    ],
  },
};

function LiftActs() {
  const [active, setActive] = useState(null);
  const current = active ? content[active] : null;

  return (
    <main>
      <section className="inspection-hero">
        <img src="b_files/lift.jpg" alt="Lift" className="inspection-hero-img-bg" />
        <h1>{active || 'Lift Acts & Standards'}</h1>
        <p>Legislative Framework Governing Lifts and Escalators in India</p>
      </section>

      <div className="inspection-layout">
        <aside className="inspection-sidebar">
          <h3>Lift Acts & Standards</h3>
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
              <p>The regulation of lifts and escalators in India is governed by a combination of national standards, state legislation, and municipal bylaws. Together, these form a comprehensive legal framework designed to ensure the safety of passengers, protect building owners from liability, and maintain public confidence in vertical transportation systems.</p>
              <p>Select a topic from the sidebar to explore the specific acts and legislative provisions in detail.</p>
              <h3 style={{marginTop:'2rem'}}>Prevailing Standards</h3>
              <p>The following Indian and international standards govern the design, installation, inspection, and maintenance of lifts, escalators, and related equipment in India.</p>
              <div className="standards-list" style={{marginTop:'1rem'}}>
                {content['Prevailing Standards'].standards.map((s, i) => (
                  <div key={i} className="standard-item">
                    <strong>{s.split('–')[0]}</strong>– {s.split('–')[1]}
                  </div>
                ))}
              </div>
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
              {current.stateSections && current.stateSections.map((s, i) => (
                <div key={i} style={{ marginTop: '1.5rem' }}>
                  <h3>{s.heading}</h3>
                  <p>{s.text}</p>
                  {s.link && (
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="read-more-link-small">
                      Read More →
                    </a>
                  )}
                </div>
              ))}
              {current.standards && (
                <div className="standards-list">
                  {current.standards.map((s, i) => (
                    <div key={i} className="standard-item">
                      <strong>{s.split('–')[0]}</strong>–{s.split('–')[1]}
                    </div>
                  ))}
                </div>
              )}
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

export default LiftActs;

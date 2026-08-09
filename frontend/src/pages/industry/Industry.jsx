import React from 'react';
import './Industry.css';

function Industry() {
  return (
    <main>
      <section className="industry-hero">
       <img src="/b_files/ind.jpg" alt="Industry" className="industry-hero-img" loading="eager" fetchpriority="high" />
      </section>

      <section className="industry-section">
        <h2>Abstract</h2>
        <p>The recent rapid growth of the construction industry in India has led to a growing demand for vertical-transportation (VT) systems throughout the country. New construction, along with the operation of more and more lifts and escalators, is leading to a greater need for well-trained specialists, regulations and standards so these transport systems are associated with as few accidents and injuries as possible.</p>
        <p>In this context, the Bureau of Indian Standards (BIS) has developed two important Indian Standards (IS) largely based on the International Organization for Standardization (ISO) lift standards ISO 8100-1 and ISO 8100-2.</p>
        <p>With some important adaptations for the Indian market, the standards were published on January 10, 2023, with a transition period until December 21, 2025, as:</p>
        <ul className="industry-list">
          <li>IS 17900-1 Lifts for the Transport of Persons and Goods — Part 1: Safety Rules, and</li>
          <li>IS 17900-2 Lifts for the Transport of Persons and Goods — Part 2: Design Rules, Calculations, Examinations and Tests of Lift Components.</li>
        </ul>
        <p>The resulting need for type testing and certification of safety components for lifts, described in Part 2, conflicts with the local lift components manufacturing and installer industry, some of which is not yet sufficiently prepared for this.</p>
        <p>This article deals with the requirements that must be met before the standards can be fully and exclusively applied.</p>
      </section>

      <section className="industry-section industry-img-section">
        <img src={`${process.env.PUBLIC_URL}b_files/WhatsApp Image 2026-03-24 at 09.53.09.jpeg`} alt="Industry" className="industry-section-img" loading="lazy" />
        <h2>Introduction</h2>
        <p>Social expectations regarding safety in everyday life are different in various regions of the world but are continuously converging. This can also be seen in the further developed regulations and stricter legal requirements being introduced worldwide. These generally specify how the expectations for the required safety level are to be met. The decisive factor is usually a specific technical standard, as well as the specifications on how compliance with these standards is to be ensured, for example: at what point in time compliance must be checked, by which institutions, with what training and education, at what intervals and to what extent. In addition, it must also be clarified in which cases and under which conditions deviations from such a prescribed technical standard are permitted.</p>
        <p>Maintaining a well-functioning safety concept, therefore, requires a legislative authority that creates a legal framework and a functioning market surveillance system.</p>
        <p>It must be ensured that, firstly, safe lifts are installed, and secondly, that they are operated safely. For the former, developers, manufacturers, installation companies and approved/accredited Conformity Assessment Bodies (CABs) are the key stakeholders. For safe operation, it is the owners/operators, maintenance companies and approved third-party testing and inspection bodies for periodic inspections. The rules for the individual responsibilities of the various parties involved must be specified by the legislator.</p>
        <p>A lift consists of many individual parts. Some of these are commonly known as safety components. What these safety components have in common is that they are not necessarily required for simple transportation of passengers from one floor to another; this could be achieved without having them installed. What's common to them is that all have the task of safeguarding against conditions that could lead to serious accidents.</p>
      </section>

      <section className="industry-section">
        <h2>Safety Components for Lifts</h2>
        <p>Such safety components for lifts that shall be type tested and certified as per Indian standards are:</p>
        <div className="components-grid">
          {[
            'Landing and car door locking devices',
            'Safety gears',
            'Overspeed governors',
            'Buffers',
            'PESSRAL (SIL-rated circuits)',
            'Ascending car overspeed protection means',
            'Unintended car movement protection means',
            'Rupture valve/one-way restrictors',
          ].map((item, i) => (
            <div key={i} className="component-item">
              <span className="component-icon">✔</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <h3>Design Calculations and Verifications</h3>
        <p>Furthermore, design calculations and verifications are foreseen for:</p>
        <div className="components-grid">
          {[
            'Guide rails',
            'Evaluation of traction',
            'Evaluation of safety factor on suspension ropes',
            'Ram, cylinder, rigid pipes and fittings',
            'Calculations against over pressure',
            'Calculations of jacks against buckling',
          ].map((item, i) => (
            <div key={i} className="component-item">
              <span className="component-icon">✔</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="industry-section">
        <h2>Model Lifts & Certification</h2>
        <p>Practically, as described in the European Lifts Directive, or in certain ISO Technical Specifications, even the design of complete lifts can be certified as so called "model lifts." Such a model lift represents a defined range of lifts whose technical compliance documentation shows how essential health and safety requirements will be met. This means that also a series-produced lift with certain characteristics (speed, load capacity, lifting height, etc.), which is designed and then inspected and tested as a representative specimen lift with all its permitted variations and configurations, can be certified.</p>
        <p>This is useful to the extent that certain steps during the acceptance inspection of an installed lift of that series, such as calculations and fitting of safety components, as well as the acceptable installation dimensions, can be considered as already checked if such a model lift certificate is provided.</p>
        <p>Due to the importance of safety components installed in lifts and the expected guarantee that they will function reliably in an emergency, extensive and precise testing is necessary to achieve the requested, acceptable safety level and to be certified. However, such comprehensive tests and inspections are difficult or impossible to carry out during the acceptance test on an installed lift system on-site.</p>
        <p>Furthermore, if compliance with regulations and standards has been ascertained in such an approved laboratory, then accredited CABs may issue type examination certificates for the design of these safety components based on the reports issued in the approved laboratory. In certain ISO Standards or ISO Technical Specifications, these CABs are called Certification Bodies for Lifts (LCBs).</p>
        <p>It is therefore planned to set up at least one national, local laboratory that meets the requirements and provides the necessary measurement technology. This laboratory must then also be accredited, i.e., fulfill the applicable requirements of ISO/IEC 17025.</p>
        <p>However, the inspections and tests carried out in the accredited laboratory must be done either by the laboratory's own sufficiently qualified and approved personnel or under the supervision of the qualified conformity assessment personnel of an LCB. In most cases, the tests can be performed at the manufacturer's premises if the measurement equipment is calibrated, and all other accreditation requirements are observed. Based on the issued test report, a certificate with the necessary details can then be issued by the LCB.</p>
      </section>
    </main>
  );
}

export default Industry;

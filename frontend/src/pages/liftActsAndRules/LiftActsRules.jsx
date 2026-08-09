import React from 'react';
import { Link } from 'react-router-dom';
import '../travelator/Travelator.css';

function LiftActsRules() {
  return (
    <main>
      <section className="travelator-hero">
        <h1>Lift Acts and Rules</h1>
        <p>Comprehensive Regulatory Framework Governing Lifts and Escalators in India</p>
      </section>

      <section className="travelator-content">
        <p>The safe installation, operation, and maintenance of lifts and escalators in India is governed by a robust framework of national standards, state legislation, and technical rules. Understanding and complying with these requirements is the legal responsibility of every building owner, facility manager, installer, and operator.</p>
        <p>NLETA helps you navigate this regulatory landscape with confidence. Explore the two key pillars of India's lift regulatory framework below — the Acts that establish the legal obligations, and the Rules that define the technical and operational requirements.</p>
      </section>

      <section className="travelator-services">
        <h2>Explore the Regulatory Framework</h2>
        <div className="services-cards">
          <Link to="/lift-acts" className="service-card-link">
            <div className="service-card-big">
              <div className="service-card-icon">⚖️</div>
              <h3>Lift Acts</h3>
              <p>Explore the national and state legislation governing lifts in India, including the National Building Code, IS 17900 standards, state lift acts, BIS certification rules, and enforcement provisions.</p>
              <span className="learn-more">Explore Acts →</span>
            </div>
          </Link>
          <Link to="/lift-rules" className="service-card-link">
            <div className="service-card-big">
              <div className="service-card-icon">📋</div>
              <h3>Lift Rules</h3>
              <p>Discover the technical and operational rules that govern lift installations — covering safety components, maintenance obligations, emergency operation, load and speed requirements, and record keeping.</p>
              <span className="learn-more">Explore Rules →</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LiftActsRules;

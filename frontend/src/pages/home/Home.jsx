import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const heroSlides = [
  { src: "b_files/front.jpeg", text: "Government Certified Testing Training Institute Under Skill India Mission" },
  { src: "b_files/front 2.png", text: "Your Trusted Consultant for Lift & Escalator" },
  { src: "b_files/front3.png", text: "Lift Mock Drill in Progress Safety First" },
  { src: "b_files/front5.png", text: "" }
];
const previewVideo = "b_files/WhatsApp Video 2026-03-24 at 09.53.13.mp4";

const standards = [
  "IS-14665 – Specifications for Passenger Lifts.",
  "BS EN-81-1 – Safety Rules for the construction and Installation of Lift - Part 1.",
  "IEC 60364 – Standard on Electrical Installation for Building.",
  "IS 15330 – Installation and Maintenance of Lift without conventional Machine Room – Code of Practice.",
  "IS 8216 – Directive for inspection of Lift Wire Ropes.",
  "IS 14665: Part 1 – Electric Traction lifts – Guidelines for outline dimensions of Passenger, Goods, Service and Hospital Lifts.",
  "IS 14665: Part 2: Sec 1 and 2 – Electric Traction Lifts – Code of Practice for Installation, Operation and Maintenance.",
  "IS 14665: Part 3: Sec 1 and 2 – Safety Rules and Regulations.",
  "IS 14665: Part 4: Sec 1 to 9 – Electric Traction lifts – Components.",
  "IS 14665: Part 5 – Directive for Inspections and Manual.",
  "IEC 60034: Part 1 – Rotating Electrical Machines – Rating and Performance.",
  "IEC 60034: Part 2-1 – Rotating Electrical Machines – Standard method for determining losses and efficiency.",
  "BS EN 12385-5 – Steel Wire ropes. Safety standard ropes for Lifts.",
  "BS EN 61000:6:3 – Electromagnetic compatibility (EMC) – Emission standard.",
  "BS EN 61000:6:1 – Electromagnetic compatibility (EMC) – Immunity standard.",
  "BS EN 12015 – Electromagnetic compatibility – Product Family Standards for Lifts, Escalators.",
  "ISO 7465 – Passenger Lifts and Service Lifts. Guide Rails for Car & Counterweight – T Type.",
  "BS EN ISO 1461 – Hot dip galvanized coating on fabricated iron and steel articles.",
  "BS 5655: Part 10 – Lifts and Service Lifts, Specification for testing and examination.",
  "EN 81-71 – Safety Rules for construction and installation of lifts – Vandal resistance lifts.",
  "IEC 60227: 6 – Polyvinyl chloride insulated cables up to 450/750 V – Lift Cables.",
];

function Home() {
  const [news, setNews] = useState([]);
  const [showOldNews, setShowOldNews] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [openYearStates, setOpenYearStates] = useState({});
  const [selectedState, setSelectedState] = useState('All');

  // Get all unique states from news
  const allStates = ['All', ...new Set(news.map(n => n.state).filter(Boolean))].sort();

  // Toggle state-wise dropdown - opens/closes ALL years together
  const toggleYearStates = () => {
    const anyOpen = Object.values(openYearStates).some(v => v);
    const newState = {};
    visibleYears.forEach(year => { newState[year] = !anyOpen; });
    setOpenYearStates(newState);
  };

  // Calculate state-wise totals across all years
  const getStateTotal = (state) => {
    if (state === 'All') return news.length;
    return news.filter(n => n.state === state).length;
  };

  // Scroll to top when component mounts (fixes mobile auto-scroll issue)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const prevSlide = () => setSlideIndex(i => (i - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setSlideIndex(i => (i + 1) % heroSlides.length);

  useEffect(() => {
    supabase.from('news').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setNews(data); });
  }, []);

  // Automatic image slide - advances every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(i => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || news.length === 0) return;
    let animId;
    const step = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
        el.scrollTop = 0;
      } else {
        el.scrollTop += 0.5;
      }
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    return () => { cancelAnimationFrame(animId); el.removeEventListener('mouseenter', pause); el.removeEventListener('mouseleave', resume); };
  }, [news]);

  const totalCases = news.length;
  const fatalCases = news.reduce((sum, n) => sum + (parseInt(n.fatal) || 0), 0);
  const injuredCases = news.reduce((sum, n) => sum + (parseInt(n.injured) || 0), 0);
  const trappedCases = news.reduce((sum, n) => sum + (parseInt(n.trapped) || 0), 0);
  const otherCases = news.reduce((sum, n) => sum + (parseInt(n.other) || 0), 0);

  const currentYear = new Date().getFullYear();

  // Shared date → timestamp helper (used by all sort/filter logic)
  const getTime = (d) => {
    if (!d) return 0;
    const yearMatch = d.match(/\b\d{4}\b/)?.[0];
    const monthNames = {
      jan: 0, january: 0, feb: 1, february: 1,
      mar: 2, march: 2, apr: 3, april: 3, may: 4,
      jun: 5, june: 5, jul: 6, july: 6,
      aug: 7, august: 7, sep: 8, sept: 8, september: 8,
      oct: 9, october: 9, nov: 10, november: 10,
      dec: 11, december: 11,
    };
    const numParts = d.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
    if (numParts) {
      const day = Math.min(Math.max(parseInt(numParts[1], 10) || 1, 1), 31);
      const month = Math.min(Math.max((parseInt(numParts[2], 10) || 1) - 1, 0), 11);
      const year = parseInt(numParts[3], 10) || 0;
      return new Date(year, month, day).getTime();
    }
    const monthStr = d.match(/(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)/i)?.[0];
    const month = monthStr ? (monthNames[monthStr.toLowerCase()] ?? 0) : 0;
    const yearNum = parseInt(yearMatch, 10) || 0;
    return new Date(yearNum, month, 1).getTime();
  };

  const grouped = news.reduce((g, item) => {
    const year = item.date?.match(/\b\d{4}\b/)?.[0] || 'Other';
    if (!g[year]) g[year] = [];
    g[year].push(item);
    return g;
  }, {});
  const visibleYears = Object.keys(grouped).filter(y => !isNaN(parseInt(y)) && parseInt(y) >= currentYear - 3).sort((a, b) => b - a);
  const recentNews = news.filter(item => {
    const y = parseInt(item.date?.match(/\b\d{4}\b/)?.[0]);
    return !isNaN(y) && y >= currentYear - 3;
  });
  const oldNews = news.filter(item => {
    const y = parseInt(item.date?.match(/\b\d{4}\b/)?.[0]);
    return !isNaN(y) && y < currentYear - 3;
  }).sort((a, b) => getTime(b.date) - getTime(a.date));

  return (
    <>
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-single">
            {heroSlides.map((slide, i) => (
              <img key={i} src={slide.src} alt="NLETA" className={`hero-single-img${slideIndex === i ? ' active' : ''}`} />
            ))}
            {heroSlides.map((slide, i) => (
              slideIndex === i && <div key={i} className="hero-overlay"><p>{slide.text}</p></div>
            ))}
            <button className="hero-arrow left" onClick={prevSlide}>&#10094;</button>
            <button className="hero-arrow right" onClick={nextSlide}>&#10095;</button>
            <div className="hero-dots">
              {heroSlides.map((_, i) => (
                <button key={i} className={`hero-dot${slideIndex === i ? ' active' : ''}`} onClick={() => setSlideIndex(i)} />
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="about-section page-section">
          <h2>About NLETA</h2>
          <h3>Know Our Story</h3>
          <p>The recent rapid growth of the construction industry in India has led to a growing demand for vertical-transportation (VT) systems throughout the country. New construction, along with the operation of more and more Lifts, Escalators, Travelators and other passenger transport systems. It is leading to a greater need for well-trained specialists to adhere regulations and standard Compliance for the same. We are market leader to help Elevator industry and the society to minimise associated accidents and injuries as possible.</p>
          <p>The Bureau of Indian Standards (BIS) published several Indian Standards (IS) for Lifts and Escalators, including IS 4591 and IS 14665. These standards are intended to ensure the safety of passengers and service engineers.</p>
        </section>

        {/* What Sets Us Apart */}
        <section className="advantages-section page-section">
          <h2>What Sets Us Apart?</h2>
          <div className="advantages-grid">
            {[
              { title: 'Industry Experts', text: 'Our team has extensive experience in providing Testing, Inspection, Certification, and Training Services across India and globally. Our passionate experts work closely with customers through mock drills and emergency trainings.' },
              { title: 'Quality Assurance', text: 'All services are backed by nationally recognised Accreditations including ISO 9001, ISO 14001, OHSAS 18001. Our exclusive inspection plan covers all safety and standard compliances.' },
              { title: 'National Service Provider', text: 'We are a national provider of Testing, Inspection, Certification, and Training Services. Our qualified engineers work closely with customers to keep equipment and people safe and compliant.' },
              { title: 'Online Inspection Database', text: 'All Testing, Inspection, and Certification customers get access to our online inspection database to download examination reports for any equipment.' },
            ].map((item, i) => (
              <div key={i} className="advantage-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Cover */}
        <section className="cover-section page-section">
          <h2>What We Cover</h2>
          <h3>What should be covered during a thorough NLETA Inspections?</h3>
          <div className="cover-list">
            {[
              { title: 'Risk Assessment', text: 'Undertaking a risk assessment includes routinely checking for hazards in lifting operations. Inspectors will identify the hazards and restricted areas while specifying the number of competent people required. They also dispatch the procedures for emergency, recovery and contingency plans while selecting the lifting equipment and check that the lifting appliances comply with applicable international standards and industry-accepted codes of practice.' },
              { title: 'Work Environment Conditions', text: 'While planning for the procedure of the job project the work environment is examined and accounted for in the execution process. The parameters that are ticked off the list cover weather, noise, visibility, terrain types, site access and surrounding operations. In case of a change in plans the contingency procedure will be prepared in advance.' },
              { title: 'Equipment Standards', text: 'Examination of relevant equipment standards which can be followed consist of the following:', points: ['Verification of documentation', 'Review of the previous inspection reports', 'Maintenance and equipment history', 'Use of lifting appliance in relation to lifespan analysis', 'Test of all functions, safety functions, and limit switches', 'Test of all emergency operation systems and functions', 'Measurement of wear and tear', 'Visual inspection', 'Wire rope sheave and wire rope inspection', 'Reporting and signing for completed control'] },
              { title: 'Measuring the Wear Level', text: 'Inspectors look out for whether your equipment has been damaged by charring, excessive abrasion and has corrosion spots. These warning signs are taken seriously and include the mandated disposal of impaired rigging gear.' },
              { title: 'Periodic Testing', text: 'To ensure that materials are safe and reliable, material testing, laboratory testing and field testing are undertaken to proof test lifting equipment before it is brought into service. Laboratory testing is used as a follow-up if field testing of construction equipment is done later. Field testing is an on-site process to test the equipment physical properties and strength through a combination of visual inspection and non-destructive methods to protect the equipment from damage.' },
            ].map((item, i) => (
              <div key={i} className="cover-item">
                <h3>{item.title}</h3>
                <p className={item.points ? 'cover-item-intro' : ''}>{item.text}</p>
                {item.points && (
                  <ul className="cover-points">
                    {item.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>


        {/* News */}
        <section className="news-section page-section" id="news-events">
          <div className="news-section-header">
            <h2>Latest News</h2>
            <button className="admin-login-btn" onClick={() => navigate('/news-admin')}>
              News Admin Login 🔒
            </button>
          </div>
          <h3>Accident & Incident Reports</h3>

          {/* Overall stats */}
          <div className="news-stats">

            <div className="news-stat">
              <span className="stat-num">
                {totalCases}
              </span>
              <span className="stat-label">
                Total Cases
              </span>
            </div>

            <div className="news-stat fatal">
              <span className="stat-num">
                {fatalCases}
              </span>
              <span className="stat-label">
                Fatal Cases
              </span>
            </div>

            <div className="news-stat injured">
              <span className="stat-num">
                {injuredCases}
              </span>
              <span className="stat-label">
                Injured Cases
              </span>
            </div>

            <div className="news-stat trapped">
              <span className="stat-num">
                {trappedCases}
              </span>
              <span className="stat-label">
                Trapped Cases
              </span>
            </div>

            <div className="news-stat other">
              <span className="stat-num">
                {otherCases}
              </span>
              <span className="stat-label">
                Other Cases
              </span>
            </div>

          </div>
          <div className="old-news-btn-wrap">
            <button className="old-news-btn" onClick={() => setShowOldNews(true)}>
              📰 Old News (Before 2023)
            </button>
          </div>

          {/* State Filter */}
          <div className="state-filter-wrap">
            <label>Select State:</label>
            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="state-filter-select">
              {allStates.map(state => (
                <option key={state} value={state}>
                  {state === 'All' ? 'All States' : `${state} (${getStateTotal(state)} incidents)`}
                </option>
              ))}
            </select>
          </div>

          {/* Yearly stats boxes - last 4 years with state-wise incidents */}
          <div className="yearly-stats">
            {visibleYears.map(year => {
              // Calculate state-wise data for this year
              const yearNews = grouped[year] || [];
              const stateData = {};
              yearNews.forEach(item => {
                const state = item.state || 'Unknown';
                if (!stateData[state]) stateData[state] = { incidents: 0, fatal: 0, injured: 0, trapped: 0, other: 0 };
                stateData[state].incidents++;
                stateData[state].fatal += parseInt(item.fatal) || 0;
                stateData[state].injured += parseInt(item.injured) || 0;
                stateData[state].trapped += parseInt(item.trapped) || 0;
                stateData[state].other += parseInt(item.other) || 0;
              });
              const topStates = Object.entries(stateData).sort((a, b) => b[1].incidents - a[1].incidents);
              const isOpen = openYearStates[year] || false;

              // Filter by selected state
              const filteredStates = selectedState === 'All'
                ? topStates
                : topStates.filter(([state]) => state === selectedState);

              return (
                <div key={year} className="yearly-stat-box">
                  <div className="yearly-year">{year}</div>
                  <div className="yearly-row"><span>Total Cases</span><strong>{yearNews.length}</strong></div>
                  <div className="yearly-row fatal"><span>Fatal</span><strong>{yearNews.reduce((s, n) => s + (parseInt(n.fatal) || 0), 0)}</strong></div>
                  <div className="yearly-row injured"><span>Injured</span><strong>{yearNews.reduce((s, n) => s + (parseInt(n.injured) || 0), 0)}</strong></div>
                  <div className="yearly-row trapped"><span>Trapped</span><strong>{yearNews.reduce((s, n) => s + (parseInt(n.trapped) || 0), 0)}</strong></div>
                  <div className="yearly-row other"><span>Other</span><strong>{yearNews.reduce((s, n) => s + (parseInt(n.other) || 0), 0)}</strong></div>
                  {topStates.length > 0 && (
                    <div className="yearly-state-section">
                      <button className="yearly-state-toggle" onClick={toggleYearStates}>
                        <span className="yearly-state-title">All States</span>
                        <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
                      </button>
                      {isOpen && (
                        <div className="yearly-state-list">
                          {filteredStates.length > 0 ? filteredStates.map(([state, data]) => (
                            <div key={state} className="yearly-state-row">
                              <span className="yearly-state-name">{state}</span>
                              <span className="yearly-state-count">
                                {data.incidents} case{data.incidents !== 1 ? 's' : ''}
                                {data.fatal > 0 && <span className="state-badge fatal">F:{data.fatal}</span>}
                                {data.injured > 0 && <span className="state-badge injured">I:{data.injured}</span>}
                                {data.trapped > 0 && <span className="state-badge trapped">T:{data.trapped}</span>}
                                {data.other > 0 && <span className="state-badge other">O:{data.other}</span>}
                              </span>
                            </div>
                          )) : (
                            <div className="yearly-state-row"><span className="yearly-state-name">No data for {selectedState}</span></div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 5-column auto-scroll news boxes - only recent news (2024+) */}
          <div className="news-grid-wrap" ref={scrollRef}>
            <div className="news-auto-grid">
              {[...recentNews].sort((a, b) => getTime(b.date) - getTime(a.date)).map((item, i) => (
                item.link
                  ? <a key={i} href={item.link} target="_blank" rel="noreferrer" className="news-box">
                    <div className="news-box-date">{item.date}</div>
                    {item.state && <div className="news-box-state">📍 {item.state}</div>}
                    <div className="news-box-title">{item.title}</div>
                    {(item.fatal > 0 || item.injured > 0 || item.trapped > 0 || item.other > 0) && (
                      <div className="news-box-badges">
                        {item.fatal > 0 && <span className="news-case-badge fatal">Fatal: {item.fatal}</span>}
                        {item.injured > 0 && <span className="news-case-badge injured">Injured: {item.injured}</span>}
                        {item.trapped > 0 && <span className="news-case-badge trapped">Trapped: {item.trapped}</span>}
                        {item.other > 0 && <span className="news-case-badge other">Other: {item.other}</span>}
                      </div>
                    )}
                  </a>
                  : <div key={i} className="news-box">
                    <div className="news-box-date">{item.date}</div>
                    {item.state && <div className="news-box-state">📍 {item.state}</div>}
                    <div className="news-box-title">{item.title}</div>
                    {(item.fatal > 0 || item.injured > 0 || item.trapped > 0 || item.other > 0) && (
                      <div className="news-box-badges">
                        {item.fatal > 0 && <span className="news-case-badge fatal">Fatal: {item.fatal}</span>}
                        {item.injured > 0 && <span className="news-case-badge injured">Injured: {item.injured}</span>}
                        {item.trapped > 0 && <span className="news-case-badge trapped">Trapped: {item.trapped}</span>}
                        {item.other > 0 && <span className="news-case-badge other">Other: {item.other}</span>}
                      </div>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Old News Modal */}
        {showOldNews && (
          <div className="old-news-overlay" onClick={() => setShowOldNews(false)}>
            <div className="old-news-modal" onClick={e => e.stopPropagation()}>
              <div className="old-news-header">
                <h3>Old News — Before 2023</h3>
                <button className="old-news-close" onClick={() => setShowOldNews(false)}>&times;</button>
              </div>
              <div className="old-news-body">
                {oldNews.length === 0 ? (
                  <p className="old-news-empty">No news records found before 2024.</p>
                ) : (
                  <div className="old-news-grid">
                    {oldNews.map((item, i) => (
                      item.link
                        ? <a key={i} href={item.link} target="_blank" rel="noreferrer" className="news-box">
                          <div className="news-box-date">{item.date}</div>
                          {item.state && <div className="news-box-state">📍 {item.state}</div>}
                          <div className="news-box-title">{item.title}</div>
                          {(item.fatal > 0 || item.injured > 0 || item.trapped > 0 || item.other > 0) && (
                            <div className="news-box-badges">
                              {item.fatal > 0 && <span className="news-case-badge fatal">Fatal: {item.fatal}</span>}
                              {item.injured > 0 && <span className="news-case-badge injured">Injured: {item.injured}</span>}
                              {item.trapped > 0 && <span className="news-case-badge trapped">Trapped: {item.trapped}</span>}
                              {item.other > 0 && <span className="news-case-badge other">Other: {item.other}</span>}
                            </div>
                          )}
                        </a>
                        : <div key={i} className="news-box">
                          <div className="news-box-date">{item.date}</div>
                          {item.state && <div className="news-box-state">📍 {item.state}</div>}
                          <div className="news-box-title">{item.title}</div>
                          {(item.fatal > 0 || item.injured > 0 || item.trapped > 0 || item.other > 0) && (
                            <div className="news-box-badges">
                              {item.fatal > 0 && <span className="news-case-badge fatal">Fatal: {item.fatal}</span>}
                              {item.injured > 0 && <span className="news-case-badge injured">Injured: {item.injured}</span>}
                              {item.trapped > 0 && <span className="news-case-badge trapped">Trapped: {item.trapped}</span>}
                              {item.other > 0 && <span className="news-case-badge other">Other: {item.other}</span>}
                            </div>
                          )}
                        </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Standards section removed - moved to Lift Acts page */}
      </main>
    </>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import emailjs from '@emailjs/browser';
import './NewsAdmin.css';

const PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function NewsAdmin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState('news');

  const [news, setNews] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const [form, setForm] = useState({
    date: '',
    title: '',
    text: '',
    link: '',
    state: '',
    fatal: 0,
    injured: 0,
    trapped: 0,
    other: 0
  });

  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [openYear, setOpenYear] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  /*
   * =========================================================
   * LOAD DATA
   * =========================================================
   */

  useEffect(() => {
    if (sessionStorage.getItem('nleta_admin')) {
      setAuthed(true);
      fetchNews();
      fetchEnquiries();
    }
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading news:', error);
      setMsg('❌ Failed to load news: ' + error.message);
      return;
    }

    if (data) {
      setNews(data);
    }
  };

  const fetchEnquiries = async () => {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading enquiries:', error);
      return;
    }

    if (data) {
      setEnquiries(data);
    }
  };

  /*
   * =========================================================
   * LOGIN
   * =========================================================
   */

  const login = () => {
    setPassError('');

    if (pass === PASSWORD) {
      sessionStorage.setItem('nleta_admin', '1');
      setAuthed(true);

      fetchNews();
      fetchEnquiries();
    } else {
      setPassError('Incorrect password');
    }
  };

  /*
   * =========================================================
   * TEXT NORMALIZATION
   * =========================================================
   */

  const normalizeText = (text) => {
    if (!text) return '';

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  /*
   * =========================================================
   * TEXT SIMILARITY
   * =========================================================
   */

  const similarity = (a, b) => {
    const s1 = normalizeText(a);
    const s2 = normalizeText(b);

    if (!s1 || !s2) return 0;

    if (s1 === s2) return 1;

    const words1 = new Set(s1.split(' '));
    const words2 = new Set(s2.split(' '));

    const intersection = [...words1].filter(word =>
      words2.has(word)
    ).length;

    const union = new Set([
      ...words1,
      ...words2
    ]).size;

    return union > 0 ? intersection / union : 0;
  };

  /*
   * =========================================================
   * DATE NUMBER
   * =========================================================
   */

  const getDateNumber = (dateStr) => {
    if (!dateStr) return 0;

    const yearMatch = dateStr.match(/\b\d{4}\b/);

    const year = yearMatch
      ? parseInt(yearMatch[0], 10)
      : 0;

    const monthMatch = dateStr.match(
      /(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)/i
    );

    const monthNames = {
      jan: 0,
      january: 0,

      feb: 1,
      february: 1,

      mar: 2,
      march: 2,

      apr: 3,
      april: 3,

      may: 4,

      jun: 5,
      june: 5,

      jul: 6,
      july: 6,

      aug: 7,
      august: 7,

      sep: 8,
      sept: 8,
      september: 8,

      oct: 9,
      october: 9,

      nov: 10,
      november: 10,

      dec: 11,
      december: 11
    };

    const month = monthMatch
      ? (monthNames[monthMatch[0].toLowerCase()] ?? 0)
      : 0;

    return year * 12 + month;
  };

  /*
   * =========================================================
   * DUPLICATE CHECK
   *
   * IMPORTANT:
   * Same state alone is NOT duplicate.
   * Same victim count alone is NOT duplicate.
   *
   * Strong duplicate conditions:
   *
   * 1. Same title + same date + same state
   * 2. Same title + same date when state isn't provided
   * 3. Very similar text + same date + same state
   * =========================================================
   */

  const isDuplicate = (form, newsList) => {
    const newTitle = normalizeText(form.title);
    const newText = normalizeText(form.text);
    const newDate = normalizeText(form.date);
    const newState = normalizeText(form.state);

    if (!newTitle && !newText) {
      return null;
    }

    const match = newsList.find((item) => {
      const existingTitle = normalizeText(item.title);
      const existingText = normalizeText(item.text);
      const existingDate = normalizeText(item.date);
      const existingState = normalizeText(item.state);

      /*
       * -----------------------------------------
       * CONDITION 1
       * Exact title + exact date + same state
       * -----------------------------------------
       */

      const exactTitleDateState =
        newTitle &&
        existingTitle &&
        newTitle === existingTitle &&
        newDate &&
        existingDate &&
        newDate === existingDate &&
        newState &&
        existingState &&
        newState === existingState;

      /*
       * -----------------------------------------
       * CONDITION 2
       * Exact title + exact date
       *
       * Used when state is not available.
       * -----------------------------------------
       */

      const exactTitleDate =
        newTitle &&
        existingTitle &&
        newTitle === existingTitle &&
        newDate &&
        existingDate &&
        newDate === existingDate &&
        (!newState || !existingState);

      /*
       * -----------------------------------------
       * CONDITION 3
       * Very similar content + same date + state
       *
       * 90% similarity is intentionally high
       * to avoid false duplicate warnings.
       * -----------------------------------------
       */

      const textSim = similarity(
        newText,
        existingText
      );

      const sameDate =
        newDate &&
        existingDate &&
        newDate === existingDate;

      const sameState =
        newState &&
        existingState &&
        newState === existingState;

      const similarTextSameDateState =
        textSim >= 0.90 &&
        sameDate &&
        sameState;

      return (
        exactTitleDateState ||
        exactTitleDate ||
        similarTextSameDateState
      );
    });

    if (match) {
      console.log(
        '🚨 DUPLICATE NEWS DETECTED'
      );

      console.log(
        'Existing ID:',
        match.id
      );

      console.log(
        'Existing title:',
        match.title
      );

      console.log(
        'Existing date:',
        match.date
      );

      console.log(
        'Existing state:',
        match.state
      );

      return match;
    }

    return null;
  };

  /*
   * =========================================================
   * RESET FORM
   * =========================================================
   */

  const resetForm = () => {
    setForm({
      date: '',
      title: '',
      text: '',
      link: '',
      state: '',
      fatal: 0,
      injured: 0,
      trapped: 0,
      other: 0
    });

    setEditId(null);
  };

  /*
   * =========================================================
   * SAVE / UPDATE NEWS
   * =========================================================
   */

  const save = async () => {
    setMsg('');

    /*
     * Required fields
     */

    if (!form.title || !form.date || !form.text) {
      setMsg(
        '❌ Please enter date, title and news content.'
      );

      setTimeout(() => {
        setMsg('');
      }, 5000);

      return;
    }

    /*
     * Remove the current item when editing.
     *
     * This prevents an item from being detected
     * as its own duplicate.
     */

    const existingNews = news.filter(
      item => item.id !== editId
    );

    /*
     * Only perform duplicate check for NEW news.
     *
     * Editing an existing news item is allowed.
     */

    if (
      editId === null &&
      existingNews.length > 0
    ) {
      const duplicate = isDuplicate(
        form,
        existingNews
      );

      if (duplicate) {
        setMsg(
          `❌ This news appears to be a duplicate of existing news: "${duplicate.title}"`
        );

        setTimeout(() => {
          setMsg('');
        }, 7000);

        return;
      }
    }

    setLoading(true);

    /*
     * Convert number fields properly.
     */

    const payload = {
      ...form,

      fatal:
        parseInt(form.fatal, 10) || 0,

      injured:
        parseInt(form.injured, 10) || 0,

      trapped:
        parseInt(form.trapped, 10) || 0,

      other:
        parseInt(form.other, 10) || 0
    };

    let error;

    /*
     * UPDATE
     */

    if (editId !== null) {
      const result = await supabase
        .from('news')
        .update(payload)
        .eq('id', editId);

      error = result.error;
    }

    /*
     * INSERT
     */

    else {
      const result = await supabase
        .from('news')
        .insert([payload]);

      error = result.error;
    }

    /*
     * DATABASE ERROR
     */

    if (error) {
      console.error(
        'Supabase news error:',
        error
      );

      setMsg(
        '❌ Error: ' + error.message
      );
    }

    /*
     * SUCCESS
     */

    else {
      setMsg(
        editId
          ? '✅ News updated! Live on website now.'
          : '✅ News added! Live on website now.'
      );

      resetForm();

      await fetchNews();
    }

    setLoading(false);

    setTimeout(() => {
      setMsg('');
    }, 8000);
  };

  /*
   * =========================================================
   * EDIT NEWS
   * =========================================================
   */

  const edit = (item) => {
    setForm({
      date: item.date || '',
      title: item.title || '',
      text: item.text || '',
      link: item.link || '',
      state: item.state || '',

      fatal:
        item.fatal || 0,

      injured:
        item.injured || 0,

      trapped:
        item.trapped || 0,

      other:
        item.other || 0
    });

    setEditId(item.id);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /*
   * =========================================================
   * SEND DELETE OTP
   * =========================================================
   */

  const sendOtp = async () => {
    setOtpError('');

    const otpCode = String(
      Math.floor(
        100000 +
        Math.random() * 900000
      )
    );

    sessionStorage.setItem(
      'nleta_delete_otp',
      otpCode
    );

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'inspnleta@gmail.com',

          otp_code: otpCode,

          message:
            `Your OTP for deleting news is: ${otpCode}. Valid for 5 minutes.`,

          subject:
            'NLETA Admin - OTP for Delete Action'
        },
        EMAILJS_PUBLIC_KEY
      );

      setOtpSent(true);
    }

    catch (err) {
      console.error(
        'EmailJS error:',
        err
      );

      setOtpError(
        'Failed: ' +
        (
          err?.text ||
          err?.message ||
          'Check console'
        )
      );
    }
  };

  /*
   * =========================================================
   * CONFIRM DELETE
   * =========================================================
   */

  const confirmDelete = async () => {
    if (
      !otpInput ||
      otpInput.length !== 6
    ) {
      setOtpError(
        'Enter valid 6-digit OTP'
      );

      return;
    }

    const savedOtp =
      sessionStorage.getItem(
        'nleta_delete_otp'
      );

    if (savedOtp !== otpInput) {
      setOtpError(
        'Invalid OTP'
      );

      return;
    }

    setLoading(true);

    try {
      const { error } =
        await supabase
          .from('news')
          .delete()
          .eq('id', pendingDeleteId);

      if (error) {
        throw error;
      }

      setMsg(
        '✅ News deleted!'
      );

      setPendingDeleteId(null);
      setOtpSent(false);
      setOtpInput('');
      setOtpError('');

      sessionStorage.removeItem(
        'nleta_delete_otp'
      );

      await fetchNews();

      setTimeout(() => {
        setMsg('');
      }, 3000);
    }

    catch (error) {
      console.error(
        'Delete error:',
        error
      );

      setOtpError(
        'Delete failed: ' +
        (
          error?.message ||
          'Unknown error'
        )
      );
    }
    setLoading(false);
  };

  /*
   * =========================================================
   * REQUEST DELETE
   * =========================================================
   */

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setOtpInput('');
    setOtpError('');
    sendOtp();
  };

  /*
   * =========================================================
   * CLOSE OTP MODAL
   * =========================================================
   */

  const closeOtpModal = () => {
    setPendingDeleteId(null);

    setOtpSent(false);

    setOtpInput('');

    setOtpError('');

    sessionStorage.removeItem(
      'nleta_delete_otp'
    );
  };

  /*
   * =========================================================
   * DELETE ENQUIRY
   * =========================================================
   */

  const deleteEnquiry = async (id) => {
    if (
      !window.confirm(
        'Delete this enquiry?'
      )
    ) {
      return;
    }

    const { error } =
      await supabase
        .from('enquiries')
        .delete()
        .eq('id', id);

    if (error) {
      setMsg(
        '❌ Failed to delete enquiry: ' +
        error.message
      );
      return;
    }
    await fetchEnquiries();
  };

  /*
   * =========================================================
   * GROUP NEWS BY YEAR
   * =========================================================
   */

  const grouped = news.reduce(
    (groups, item) => {
      const year =
        item.date
          ?.match(/\d{4}/)?.[0] ||
        'Other';

      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(item);
      return groups;
    },
    {}
  );

  const years =
    Object.keys(grouped).sort(
      (a, b) => b - a
    );

  /*
   * =========================================================
   * LOGIN SCREEN
   * =========================================================
   */

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h2>News Admin</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={pass}
            onChange={e =>
              setPass(e.target.value)
            }
            onKeyDown={e =>
              e.key === 'Enter' &&
              login()
            }
          />

          {passError && (
            <p className="admin-error">
              {passError}
            </p>
          )}

          <button onClick={login}>
            Login
          </button>

        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * STATISTICS
   * =========================================================
   */

  const totalCases =
    news.length;

  const fatalTotal =
    news.reduce(
      (sum, n) =>
        sum +
        (parseInt(n.fatal, 10) || 0),
      0
    );

  const injuredTotal =
    news.reduce(
      (sum, n) =>
        sum +
        (parseInt(n.injured, 10) || 0),
      0
    );

  const trappedTotal =
    news.reduce(
      (sum, n) =>
        sum +
        (parseInt(n.trapped, 10) || 0),
      0
    );

  const otherTotal =
    news.reduce(
      (sum, n) =>
        sum +
        (parseInt(n.other, 10) || 0),
      0
    );

  /*
   * =========================================================
   * MAIN PAGE
   * =========================================================
   */

  return (
    <div className="admin-page">

      {/* =================================================
          TABS
          ================================================= */}

      <div className="admin-tabs">

        <button
          className={
            activeTab === 'news'
              ? 'tab-active'
              : ''
          }
          onClick={() =>
            setActiveTab('news')
          }
        >
          News Management
        </button>

        <button
          className={
            activeTab === 'states'
              ? 'tab-active'
              : ''
          }
          onClick={() =>
            setActiveTab('states')
          }
        >
          State-wise Incidents
        </button>

        <button
          className={
            activeTab === 'enquiries'
              ? 'tab-active'
              : ''
          }
          onClick={() =>
            setActiveTab('enquiries')
          }
        >
          Enquiries ({enquiries.length})
        </button>

        <button
          className="admin-logout"
          onClick={() => {
            sessionStorage.removeItem(
              'nleta_admin'
            );

            setAuthed(false);
          }}
        >
          Logout
        </button>
      </div>

      {/* =================================================
          MESSAGE
          ================================================= */}

      {msg && (
        <div className="admin-msg">
          {msg}
        </div>
      )}

      {/* =================================================
          NEWS TAB
          ================================================= */}

      {activeTab === 'news' ? (
        <>
          {/* =============================================
              STATISTICS
              ============================================= */}

          <div className="admin-stats">
            <div className="admin-stat">
              Total Incident:{' '}
              <strong>
                {totalCases}
              </strong>
            </div>

            <div className="admin-stat fatal">
              Fatal:{' '}
              <strong>
                {fatalTotal}
              </strong>
            </div>

            <div className="admin-stat injured">
              Injured:{' '}
              <strong>
                {injuredTotal}
              </strong>
            </div>

            <div className="admin-stat trapped">
              Trapped:{' '}
              <strong>
                {trappedTotal}
              </strong>
            </div>

            <div className="admin-stat other">
              Other:{' '}
              <strong>
                {otherTotal}
              </strong>
            </div>
          </div>

          {/* =============================================
              NEWS FORM
              ============================================= */}

          <div className="admin-form">
            <h3>
              {editId
                ? 'Edit News'
                : 'Add News'}
            </h3>

            <input
              placeholder="Date (e.g. March 2024)"
              value={form.date}
              onChange={e =>
                setForm({
                  ...form,
                  date: e.target.value
                })
              }
            />

            <input
              placeholder="Title"
              value={form.title}
              onChange={e =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
            />

            <textarea
              placeholder="News content..."
              value={form.text}
              onChange={e =>
                setForm({
                  ...form,
                  text: e.target.value
                })
              }
              rows={4}
            />

            <input
              placeholder="Link URL (optional)"
              value={form.link}
              onChange={e =>
                setForm({
                  ...form,
                  link: e.target.value
                })
              }
            />

            <select
              value={form.state}
              onChange={e =>
                setForm({
                  ...form,
                  state: e.target.value
                })
              }
            >
              <option value="">
                -- Select State --
              </option>

              {[
                'Andhra Pradesh',
                'Arunachal Pradesh',
                'Assam',
                'Bihar',
                'Chhattisgarh',
                'Goa',
                'Gujarat',
                'Haryana',
                'Himachal Pradesh',
                'Jharkhand',
                'Karnataka',
                'Kerala',
                'Madhya Pradesh',
                'Maharashtra',
                'Manipur',
                'Meghalaya',
                'Mizoram',
                'Nagaland',
                'Odisha',
                'Punjab',
                'Rajasthan',
                'Sikkim',
                'Tamil Nadu',
                'Telangana',
                'Tripura',
                'Uttar Pradesh',
                'Uttarakhand',
                'West Bengal',
                'Delhi',
                'Jammu & Kashmir',
                'Ladakh',
                'Chandigarh',
                'Puducherry'
              ].map(state => (
                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>
              ))}
            </select>

            {/* =========================================
                CASE INPUTS
                ========================================= */}

            <div className="admin-case-inputs">
              <div className="admin-case-input">
                <label className="fatal-label">
                  Fatal
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.fatal}
                  onChange={e =>
                    setForm({
                      ...form,
                      fatal:
                        e.target.value
                    })
                  }
                />
              </div>

              <div className="admin-case-input">
                <label className="injured-label">
                  Injured
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.injured}
                  onChange={e =>
                    setForm({
                      ...form,
                      injured:
                        e.target.value
                    })
                  }
                />
              </div>

              <div className="admin-case-input">
                <label className="trapped-label">
                  Trapped
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.trapped}
                  onChange={e =>
                    setForm({
                      ...form,
                      trapped:
                        e.target.value
                    })
                  }
                />
              </div>

              <div className="admin-case-input">

                <label className="other-label">
                  Other
                </label>

                <input
                  type="number"
                  min="0"
                  value={form.other}
                  onChange={e =>
                    setForm({
                      ...form,
                      other:
                        e.target.value
                    })
                  }
                />
              </div>
            </div>

            {/* =========================================
                FORM BUTTONS
                ========================================= */}

            <div className="admin-form-btns">

              <button
                className="btn-save"
                onClick={save}
                disabled={loading}
              >
                {loading
                  ? 'Saving...'
                  : editId
                    ? 'Update'
                    : 'Add News'}
              </button>

              {editId && (
                <button
                  className="btn-cancel"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </div>

          {/* =============================================
              NEWS LIST
              ============================================= */}

          <div className="admin-news-list">

            <h3>
              News by Year
            </h3>

            {years.map(year => (

              <div
                key={year}
                className="year-group"
              >

                <button
                  className="year-toggle"
                  onClick={() =>
                    setOpenYear(
                      openYear === year
                        ? null
                        : year
                    )
                  }
                >
                  {year}{' '}

                  <span>
                    ({grouped[year].length} news)
                  </span>{' '}

                  {openYear === year
                    ? '▲'
                    : '▼'}
                </button>

                {openYear === year && (
                  <div className="year-news">
                    {grouped[year].map(item => (
                      <div
                        key={item.id}
                        className="admin-news-item"
                      >
                        <div className="admin-news-meta">
                          <span className="admin-news-date">
                            {item.date}
                          </span>

                          {item.state && (
                            <span className="admin-news-state">
                              📍 {item.state}
                            </span>
                          )}

                          {item.fatal > 0 && (
                            <span className="admin-badge fatal">
                              Fatal: {item.fatal}
                            </span>
                          )}

                          {item.injured > 0 && (
                            <span className="admin-badge injured">
                              Injured: {item.injured}
                            </span>
                          )}

                          {item.trapped > 0 && (
                            <span className="admin-badge trapped">
                              Trapped: {item.trapped}
                            </span>
                          )}

                          {item.other > 0 && (
                            <span className="admin-badge other">
                              Other: {item.other}
                            </span>
                          )}

                        </div>

                        <h4>
                          {item.title}
                        </h4>

                        <p>
                          {item.text}
                        </p>

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-link"
                          >
                            🔗 {item.link}
                          </a>
                        )}

                        <div className="admin-news-actions">
                          <button
                            className="btn-edit"
                            onClick={() =>
                              edit(item)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn-delete"
                            onClick={() =>
                              requestDelete(item.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>

      ) : activeTab === 'states' ? (

        <StateIncidents
          news={news}
        />

      ) : (

        /* =================================================
           ENQUIRIES
           ================================================= */

        <div className="enquiries-list">

          <h3>
            Contact Enquiries ({enquiries.length})
          </h3>

          {enquiries.length === 0 ? (

            <p className="no-data">
              No enquiries yet
            </p>

          ) : (

            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {enquiries.map(enquiry => (

                  <tr key={enquiry.id}>

                    <td>
                      {new Date(
                        enquiry.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {enquiry.name}
                    </td>

                    <td>
                      {enquiry.email}
                    </td>

                    <td>
                      {enquiry.phone || '—'}
                    </td>

                    <td>
                      {enquiry.message}
                    </td>

                    <td>

                      <button
                        className="btn-delete-small"
                        onClick={() =>
                          deleteEnquiry(
                            enquiry.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* =================================================
          OTP DELETE MODAL
          ================================================= */}

      {pendingDeleteId !== null && (

        <div
          className="otp-overlay"
          onClick={closeOtpModal}
        >

          <div
            className="otp-modal"
            onClick={e =>
              e.stopPropagation()
            }
          >

            <h3>
              Verify to Delete
            </h3>

            <p>
              An OTP has been sent to your email.
            </p>

            {!otpSent ? (

              <button
                className="btn-resend"
                onClick={sendOtp}
              >
                Resend OTP
              </button>

            ) : (

              <p className="otp-sent-msg">
                ✓ OTP sent! Check your email.
              </p>

            )}

            <input
              className="otp-input"
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otpInput}
              onChange={e =>
                setOtpInput(
                  e.target.value.replace(
                    /\D/g,
                    ''
                  )
                )
              }
            />

            {otpError && (
              <p className="admin-error">
                {otpError}
              </p>
            )}

            <div className="otp-btns">
              <button
                className="btn-confirm-delete"
                onClick={confirmDelete}
                disabled={
                  loading ||
                  !otpSent
                }
              >
                {loading
                  ? 'Verifying...'
                  : 'Confirm Delete'}
              </button>

              <button
                className="btn-cancel"
                onClick={closeOtpModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*
 * =========================================================
 * STATE INCIDENTS
 * =========================================================
 */

function StateIncidents({ news }) {
  const stateMap = {};
  news.forEach(item => {
    const state =
      item.state || 'Unknown';
    if (!stateMap[state]) {
      stateMap[state] = {
        incidents: 0,
        fatal: 0,
        injured: 0,
        trapped: 0,
        other: 0
      };

    }

    stateMap[state].incidents++;

    stateMap[state].fatal +=
      parseInt(item.fatal, 10) || 0;

    stateMap[state].injured +=
      parseInt(item.injured, 10) || 0;

    stateMap[state].trapped +=
      parseInt(item.trapped, 10) || 0;

    stateMap[state].other +=
      parseInt(item.other, 10) || 0;

  });

  const rows =
    Object.entries(stateMap)
      .sort(
        (a, b) =>
          b[1].incidents -
          a[1].incidents
      );

  const maxIncidents =
    rows[0]?.[1].incidents || 1;

  return (
    <div className="state-incidents">
      <h3>
        State-wise Incident Summary
      </h3>

      <div className="state-table-wrap">
        <table className="state-table">
          <thead>
            <tr>
              <th>#</th>
              <th>State</th>
              <th>Incidents</th>
              <th>Fatal</th>
              <th>Injured</th>
              <th>Trapped</th>
              <th>Other</th>
              <th>Incident Bar</th>
            </tr>
          </thead>
          <tbody>

            {rows.map(
              ([state, data], index) => (
                <tr key={state}>
                  <td>
                    {index + 1}
                  </td>
                  <td className="state-name">
                    {state}
                  </td>

                  <td>
                    <span className="badge-incidents">
                      {data.incidents}
                    </span>
                  </td>

                  <td>
                    {data.fatal > 0 ? (
                      <span className="badge-fatal">
                        {data.fatal}
                      </span>
                    ) : (
                      <span className="zero">
                        —
                      </span>
                    )}
                  </td>

                  <td>
                    {data.injured > 0 ? (
                      <span className="badge-injured">
                        {data.injured}
                      </span>
                    ) : (
                      <span className="zero">
                        —
                      </span>
                    )}
                  </td>

                  <td>
                    {data.trapped > 0 ? (
                      <span className="badge-trapped">
                        {data.trapped}
                      </span>
                    ) : (
                      <span className="zero">
                        —
                      </span>
                    )}
                  </td>

                  <td>
                    {data.other > 0 ? (
                      <span className="badge-other">
                        {data.other}
                      </span>
                    ) : (
                      <span className="zero">
                        —
                      </span>
                    )}
                  </td>

                  <td className="bar-cell">
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width:
                            `${
                              (data.incidents /
                                maxIncidents) *
                              100
                            }%`
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewsAdmin;
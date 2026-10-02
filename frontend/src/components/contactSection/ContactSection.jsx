import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import './ContactSection.css';

function ContactSection() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formMsg, setFormMsg] = useState({
    text: '',
    type: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * Send email through Node.js + Nodemailer
   */
  const sendNotificationEmail = async () => {

    const response = await fetch('/api/contact-email', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone || 'Not provided',
        message: form.message
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {

      throw new Error(
        data.message ||
        'Failed to send notification email.'
      );
    }

    return data;
  };


  /*
   * Form Submit
   */
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    setFormMsg({
      text: '',
      type: ''
    });

    try {

      /*
       * STEP 1
       * Save directly to Supabase
       */
      const { error } = await supabase
        .from('enquiries')
        .insert([form]);

      if (error) {
        throw error;
      }


      /*
       * STEP 2
       * Send email through backend
       */
      await sendNotificationEmail();


      /*
       * STEP 3
       * Success
       */
      setFormMsg({
        text:
          'Message sent successfully! We will get back to you soon.',
        type: 'success'
      });


      /*
       * Clear form
       */
      setForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (err) {

      console.error(
        'Contact form submission failed:',
        err
      );

      setFormMsg({
        text:
          err.message ||
          'Error sending message. Please try again.',
        type: 'error'
      });

    } finally {

      setIsSubmitting(false);

      setTimeout(() => {

        setFormMsg({
          text: '',
          type: ''
        });

      }, 5000);
    }
  };


  return (

    <div className="contact-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="contact-header">

        <h2>
          Contact Us
        </h2>

        <p className="contact-subtitle">
          Get in touch with our team for any queries or assistance
        </p>

      </div>


      {/* ==========================================
          CONTACT CONTENT
      ========================================== */}

      <div className="contact-content">


        {/* ========================================
            CONTACT INFORMATION
        ======================================== */}

        <div className="contact-info">

          <h3>
            Get In Touch
          </h3>


          {/* ADDRESS */}

          <div className="info-item">

            <div className="info-icon">
              📍
            </div>

            <div>

              <strong>
                Address
              </strong>

              <p>
                A-32, Commercial Complex
                <br />
                1st Floor, Govindpuram,
                <br />
                Ghaziabad
              </p>

            </div>

          </div>


          {/* PHONE */}

          <div className="info-item">

            <div className="info-icon">
              📞
            </div>

            <div>

              <strong>
                Phone
              </strong>

              <p>
                +91 9990029597
                <br />
                +91 9211693664
              </p>

            </div>

          </div>


          {/* EMAIL */}

          <div className="info-item">

            <div className="info-icon">
              ✉️
            </div>

            <div>

              <strong>
                Email
              </strong>

              <p>
                info@nleta.org.in
                <br />
                inspnleta@gmail.com
                <br />
                legalnleta@gmail.com
              </p>

            </div>

          </div>


          {/* SOCIAL LINKS */}

          <div className="social-links">

            <a
              href="https://www.facebook.com/profile.php?id=61581650639831"
              target="_blank"
              rel="noreferrer"
              className="social-btn facebook"
            >
              f
            </a>

            <a
              href="https://www.instagram.com/nleta82/"
              target="_blank"
              rel="noreferrer"
              className="social-btn instagram"
            >
              in
            </a>

            <a
              href="https://www.linkedin.com/in/national-lift-escalator-testing-agency-1b3258380/"
              target="_blank"
              rel="noreferrer"
              className="social-btn linkedin"
            >
              Li
            </a>

            <a
              href="https://www.youtube.com/@NationalLiftEscalatorTestingAg"
              target="_blank"
              rel="noreferrer"
              className="social-btn youtube"
            >
              ▶
            </a>

            <a
              href="https://x.com/testin40124"
              target="_blank"
              rel="noreferrer"
              className="social-btn twitter"
            >
              𝕏
            </a>

          </div>

        </div>


        {/* ========================================
            CONTACT FORM
        ======================================== */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >


          {/* NAME + PHONE */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Name *
              </label>

              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
                required
              />

            </div>


            <div className="form-group">

              <label>
                Phone
              </label>

              <input
                type="tel"
                placeholder="Your phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value
                  })
                }
              />

            </div>

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email *
            </label>

            <input
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              required
            />

          </div>


          {/* MESSAGE */}

          <div className="form-group">

            <label>
              Message *
            </label>

            <div className="msg-box-wrap">

              <textarea
                rows="4"
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value
                  })
                }
                required
              />

              <div className="msg-suggestions">

                {[
                  'Lift/Escalator Accident',
                  'Incident Reporting',
                  'Lift/Escalator Frequent Failure',
                  'Unsafe Conditions & Environments',
                  'Risk Assessment Awareness Programs & Mock Drills'
                ].map((s) => (

                  <button
                    type="button"
                    key={s}
                    className="msg-chip"
                    onClick={() =>
                      setForm({
                        ...form,
                        message: s
                      })
                    }
                  >
                    {s}
                  </button>

                ))}

              </div>

            </div>

          </div>


          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >

            {isSubmitting
              ? 'Sending...'
              : 'Send Message →'
            }

          </button>


          {/* SUCCESS / ERROR MESSAGE */}

          {formMsg.text && (

            <div
              className={`form-message ${formMsg.type}`}
            >
              {formMsg.text}
            </div>

          )}

        </form>

      </div>

    </div>
  );
}

export default ContactSection;
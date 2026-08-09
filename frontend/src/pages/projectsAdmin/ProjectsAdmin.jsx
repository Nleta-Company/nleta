import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import '../newsAdmin/NewsAdmin.css';

const PASSWORD = process.env.REACT_APP_PROJECTS_ADMIN_PASSWORD;

function ProjectsAdmin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState('clients');
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', amcRating: 5, customerRating: 5, floors: '', units: '' });
  const [editId, setEditId] = useState(null);
  const [ongoing, setOngoing] = useState([]);
  const [ongoingName, setOngoingName] = useState('');
  const [ongoingEditId, setOngoingEditId] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('nleta_projects_admin')) { setAuthed(true); fetchProjects(); fetchOngoing(); }
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
  };

  const fetchOngoing = async () => {
    const { data } = await supabase.from('ongoing_projects').select('*').order('created_at', { ascending: false });
    if (data) setOngoing(data);
  };

  const saveOngoing = async () => {
    if (!ongoingName.trim()) return;
    setLoading(true);
    let error;
    if (ongoingEditId !== null) {
      ({ error } = await supabase.from('ongoing_projects').update({ name: ongoingName }).eq('id', ongoingEditId));
    } else {
      ({ error } = await supabase.from('ongoing_projects').insert([{ name: ongoingName }]));
    }
    if (error) { setMsg('❌ Error: ' + error.message); }
    else { setMsg(ongoingEditId ? '✅ Updated!' : '✅ Ongoing project added!'); setOngoingName(''); setOngoingEditId(null); await fetchOngoing(); }
    setLoading(false);
    setTimeout(() => setMsg(''), 4000);
  };

  const deleteOngoing = async (id) => {
    if (!window.confirm('Delete this ongoing project?')) return;
    const { error } = await supabase.from('ongoing_projects').delete().eq('id', id);
    if (error) { setMsg('❌ Error: ' + error.message); return; }
    setMsg('✅ Deleted!'); await fetchOngoing(); setTimeout(() => setMsg(''), 3000);
  };

  const login = () => {
    if (pass === PASSWORD) { sessionStorage.setItem('nleta_projects_admin', '1'); setAuthed(true); fetchProjects(); fetchOngoing(); }
    else setPassError('Incorrect password');
  };

  const save = async () => {
    if (!form.name) return;
    setLoading(true);
    const payload = { 
      name: form.name, 
      amcRating: parseInt(form.amcRating) || 5, 
      customerRating: parseInt(form.customerRating) || 5,
      floors: parseInt(form.floors) || 0,
      units: parseInt(form.units) || 0
    };
    let error;
    if (editId !== null) {
      ({ error } = await supabase.from('projects').update(payload).eq('id', editId));
    } else {
      ({ error } = await supabase.from('projects').insert([payload]));
    }
    if (error) {
      setMsg('❌ Error: ' + error.message);
    } else {
      setMsg(editId ? '✅ Updated! Live on website now.' : '✅ Added! Live on website now.');
      setForm({ name: '', amcRating: 5, customerRating: 5, floors: '', units: '' });
      setEditId(null);
      await fetchProjects();
    }
    setLoading(false);
    setTimeout(() => setMsg(''), 8000);
  };

  const edit = (item) => {
    setForm({ 
      name: item.name, 
      amcRating: item.amcRating || 5, 
      customerRating: item.customerRating || 5,
      floors: item.floors || '',
      units: item.units || ''
    });
    setEditId(item.id);
    window.scrollTo(0, 0);
  };

  const deleteClient = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) { setMsg('❌ Error: ' + error.message); return; }
    setMsg('✅ Client deleted!');
    await fetchProjects();
    setTimeout(() => setMsg(''), 3000);
  };

  if (!authed) return (
    <div className="admin-login">
      <div className="admin-login-box">
        <h2>Admin Rating</h2>
        <input type="password" placeholder="Enter password" value={pass}
          onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} />
        {passError && <p className="admin-error">{passError}</p>}
        <button onClick={login}>Login</button>
      </div>
    </div>
  );

  const totalProjects = projects.length;

  return (
    <div className="admin-page">

      <div className="admin-tabs">
        <button className={activeTab === 'clients' ? 'tab-active' : ''} onClick={() => setActiveTab('clients')}>Clients</button>
        <button className={activeTab === 'ongoing' ? 'tab-active' : ''} onClick={() => setActiveTab('ongoing')}>Ongoing Projects</button>
        <button className="admin-logout" onClick={() => { sessionStorage.removeItem('nleta_projects_admin'); setAuthed(false); }}>Logout</button>
      </div>

      {msg && <div className="admin-msg">{msg}</div>}

      {activeTab === 'ongoing' ? (
        <>
          <div className="admin-form">
            <h3>{ongoingEditId ? 'Edit' : 'Add'} Ongoing Project</h3>
            <input placeholder="Project name (e.g. Savfab Tower, Noida)" value={ongoingName} onChange={e => setOngoingName(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveOngoing()} />
            <div className="admin-form-btns">
              <button className="btn-save" onClick={saveOngoing} disabled={loading}>{loading ? 'Saving...' : ongoingEditId ? 'Update' : 'Add'}</button>
              {ongoingEditId && <button className="btn-cancel" onClick={() => { setOngoingName(''); setOngoingEditId(null); }}>Cancel</button>}
            </div>
          </div>
          <div className="admin-news-list">
            <h3>Ongoing Projects ({ongoing.length})</h3>
            {ongoing.length === 0 ? <p className="no-data">No ongoing projects yet.</p> : ongoing.map((item, i) => (
              <div key={item.id} className="admin-news-item">
                <div className="admin-news-meta"><span className="admin-news-date">#{i + 1}</span></div>
                <h4>{item.name}</h4>
                <div className="admin-news-actions">
                  <button className="btn-edit" onClick={() => { setOngoingName(item.name); setOngoingEditId(item.id); window.scrollTo(0,0); }}>Edit</button>
                  <button className="btn-delete" onClick={() => deleteOngoing(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
      <div className="admin-stats">
        <div className="admin-stat">Total: <strong>{totalProjects}</strong></div>
      </div>

      <div className="admin-form">
        <h3>{editId ? 'Edit' : 'Add'} Client</h3>
        <div className="admin-form-input-row">
          <input 
            placeholder="Client Name (e.g. Savfab Build Tech)"
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
          {editId && (
            <button className="btn-edit-inline" onClick={() => { setForm({ name: '', amcRating: 5, customerRating: 5, floors: '', units: '' }); setEditId(null); }}>
              Cancel Edit
            </button>
          )}
        </div>
        <div className="admin-rating-input">
          <label>AMC Rating:</label>
          <select value={form.amcRating} onChange={e => setForm({...form, amcRating: e.target.value})}>
            <option value="0">Nill</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <div className="rating-criteria">
            <strong>AMC Rating Criteria:</strong>
            <ul>
              <li>[Elevator company]</li>
              <li>[Maintenance]</li>
              <li>[Coordination]</li>
              <li>[Awareness]</li>
              <li>[Safety]</li>
            </ul>
          </div>
        </div>
        <div className="admin-rating-input">
          <label>Customer Rating:</label>
          <select value={form.customerRating} onChange={e => setForm({...form, customerRating: e.target.value})}>
            <option value="0">Nill</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <div className="rating-criteria">
            <strong>Customer Rating Criteria:</strong>
            <ul>
              <li>[Compliance]</li>
              <li>[Maintenance]</li>
              <li>[Preparedness]</li>
              <li>[Awareness]</li>
              <li>[Management]</li>
              
            </ul>
          </div>
        </div>
        <div className="admin-case-inputs">
          <div className="admin-case-input"><label>No. of Floors (lift / escalator)</label><input type="number" min="0" placeholder="0" value={form.floors} onChange={e => setForm({...form, floors: e.target.value})} /></div>
          <div className="admin-case-input"><label>No. of Units</label><input type="number" min="0" placeholder="0" value={form.units} onChange={e => setForm({...form, units: e.target.value})} /></div>
        </div>
        <div className="admin-form-btns">
          <button className="btn-save" onClick={save} disabled={loading}>{loading ? 'Saving...' : editId ? 'Update' : 'Add'}</button>
          {editId && <button className="btn-cancel" onClick={() => { setForm({ name: '', amcRating: 5, customerRating: 5, floors: '', units: '' }); setEditId(null); }}>Cancel</button>}
        </div>
      </div>

      <div className="admin-news-list">
        <h3>Clients ({totalProjects})</h3>
        {totalProjects === 0 ? (
          <p className="no-data">No entries added yet.</p>
        ) : (
          <div className="projects-table-wrap">
            {projects.map((item, i) => (
              <div key={item.id} className="admin-news-item">
                <div className="admin-news-meta">
                  <span className="admin-news-date">#{i + 1}</span>
                  <span className="admin-badge" style={{background: 'none', color: '#171145', padding: '0'}}>
                    {item.amcRating === 0 ? 'AMC: Nill' : `AMC: ${'★'.repeat(item.amcRating || 5)}${'☆'.repeat(5 - (item.amcRating || 5))}`}
                  </span>
                  <span className="admin-badge" style={{background: 'none', color: '#FF8C00', padding: '0'}}>
                    {item.customerRating === 0 ? 'Customer: Nill' : `Customer: ${'★'.repeat(item.customerRating || 5)}${'☆'.repeat(5 - (item.customerRating || 5))}`}
                  </span>
                </div>
                <h4>{item.name}</h4>
                <div style={{fontSize:'0.85rem', color:'#555', marginBottom:'0.4rem'}}>
                  {item.floors > 0 && <span style={{marginRight:'1rem'}}>🏢 Floors: <strong>{item.floors}</strong></span>}
                  {item.units > 0 && <span>🛗 Units: <strong>{item.units}</strong></span>}
                </div>
                <div className="admin-news-actions">
                  <button className="btn-edit" onClick={() => edit(item)}>Edit</button>
          <button className="btn-delete" onClick={() => deleteClient(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}

export default ProjectsAdmin;
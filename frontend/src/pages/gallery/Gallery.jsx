import React, { useState } from 'react';
import './Gallery.css';

const images = [
  { src: `${process.env.PUBLIC_URL}/b_files/image.jpeg`, caption: 'NLETA Project' },
  { src: `${process.env.PUBLIC_URL}/b_files/2.jpeg`, caption: 'NLETA Project' },
  { src: `${process.env.PUBLIC_URL}/b_files/3.jpeg`, caption: 'NLETA Project' },
  { src: `${process.env.PUBLIC_URL}/b_files/4.png`, caption: 'NLETA Project' },
  { src: `${process.env.PUBLIC_URL}/b_files/5.jpeg`, caption: 'NLETA Project' },
  { src: `${process.env.PUBLIC_URL}/b_files/22.jpg`, caption: 'NLETA Project' },
  { src: `${process.env.PUBLIC_URL}/b_files/7.jpeg`, caption: 'NLETA Project' },
  { src: `${process.env.PUBLIC_URL}/b_files/8.jpeg`, caption: 'NLETA Project' },

];

const videos = [
  { src: `${process.env.PUBLIC_URL}/b_files/10.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/11.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/12.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/13.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/14.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/15.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/16.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/ai.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/Mediavideo.mp4` },
  { src: `${process.env.PUBLIC_URL}/b_files/Media.mp4` },
];

function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [tab, setTab] = useState('all');

  const filtered = tab === 'videos' ? [] : images;
  const showVideos = tab === 'all' || tab === 'videos';

  return (
    <main className="gallery-main">
      <section className="gallery-hero">
        <h1>Gallery</h1>
        <p>A visual journey through NLETA's projects, inspections & training programmes</p>
      </section>

      <div className="gallery-page">
        <div className="gallery-tabs">
          <button className={tab === 'all' ? 'active' : ''} onClick={() => setTab('all')}>All</button>
          <button className={tab === 'photos' ? 'active' : ''} onClick={() => setTab('photos')}>Photos</button>
          <button className={tab === 'videos' ? 'active' : ''} onClick={() => setTab('videos')}>Videos</button>
        </div>

        {filtered.length > 0 && (
          <>
            <h2 className="gallery-section-title">📸 Photos</h2>
            <div className="gallery-grid">
              {filtered.map((item, i) => (
                <div key={i} className="gallery-item" onClick={() => setLightbox({ type: 'image', ...item })}>
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <div className="gallery-overlay" />
                </div>
              ))}
            </div>
          </>
        )}

        {showVideos && (
          <>
            <h2 className="gallery-section-title">🎬 Videos</h2>
            <div className="gallery-video-grid">
              {videos.map((v, i) => (
                <div key={i} className="gallery-video-card">
                  <div className="gallery-video-wrap">
                    <video src={v.src} controls className="gallery-video" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>&times;</button>
            <img src={lightbox.src} alt="NLETA" />
          </div>
        </div>
      )}
    </main>
  );
}

export default Gallery;

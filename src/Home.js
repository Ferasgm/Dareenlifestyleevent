import React, { useState } from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="fade-in">
              Welcome to <span>DAREEN</span> Lifestyle
            </h1>
            <p className="fade-in delay">
              Celebrating Moments with Elegance, Creativity & Joy
            </p>
            <a href="#graduation" className="hero-button fade-in delay-2">
              Explore Our Work
            </a>
          </div>
        </div>
      </section>

      <GallerySection
        id="graduation"
        title="Graduation Events"
        images={['graduation1.jpg', 'graduation6.jpg']}
        videos={['graduationV1.mp4', 'graduationV2.mp4', 'graduationV3.mp4', 'graduationV6.mp4', 'graduationV7.mp4']}
      />

      <GallerySection
        id="birthday"
        title="Birthday Events"
        images={[
          'birthday1.jpg', 'birthday2.jpg', 'birthday3.jpg', 'birthday4.jpg',
          'birthday5.jpg', 'birthday6.jpg', 'birthday7.jpg', 'birthday8.jpg',
          'birthday9.jpg', 'birthday10.jpg'
        ]}
        videos={['birthdayV1.mp4', 'birthdayV2.mp4', 'birthdayV3.mp4', 'birthdayV4.mp4', 'birthdayV5.mp4', 'birthdayV6.mp4', 'birthdayV7.mp4', 'birthdayV17.mp4']}
      />

      <GallerySection
        id="corporate"
        title="National Day Events"
        images={['NationalDay9.jpg', 'NationalDay11.jpg', 'NationalDay13.jpg', 'NationalDay14.jpg', 'NationalDay15.jpg']}
        videos={['NationalDayV1.mp4', 'NationalDayV2.mp4', 'NationalDayV3.mp4', 'NationalDayV4.mp4', 'NationalDayV5.mp4', 'NationalDayV6.mp4', 'NationalDayV7.mp4', 'NationalDayV8.mp4']}
      />

      <GallerySection
        id="FoundingDay"
        title="Founding Day Events"
        images={[
          'FoundingDay1.jpg', 'FoundingDay2.jpg', 'FoundingDay3.jpg', 'FoundingDay4.jpg', 'FoundingDay5.jpg',
          'FoundingDay6.jpg', 'FoundingDay7.jpg', 'FoundingDay8.jpg', 'FoundingDay9.jpg',
          'FoundingDay10.jpg', 'FoundingDay11.jpg', 'FoundingDay12.jpg'
        ]}
        videos={['FoundingDayV4.mp4', 'FoundingDayV2.mp4', 'FoundingDayV3.mp4', 'FoundingDayV1.mp4', 'FoundingDayV5.mp4', 'FoundingDayV6.mp4', 'FoundingDayV7.mp4', 'FoundingDayV8.mp4', 'FoundingDayV9.mp4']}
      />

      <GallerySection
        id="TableSettingDesigns"
        title="Table Setting Designs"
        images={['Breakfast1.jpg', 'Breakfast2.jpg', 'TableSettingDesigns1.jpg']}
        videos={['BreakfastV1.mp4', 'BreakfastV2.mp4', 'BreakfastV3.mp4', 'TableSettingDesignsV1.mp4', 'TableSettingDesignsV2.mp4', 'TableSettingDesignsV3.mp4']}
      />

      <GallerySection
        id="Camp&TripEvents"
        title="Camp&TripEvent"
        images={['Camp&TripEvent1.jpg', 'Camp&TripEvent2.jpg', 'Camp&TripEvent4.jpg', 'Camp&TripEvent5.jpg', 'Camp&TripEvent6.jpg', 'Camp&TripEvent7.jpg', 'Camp&TripEvent8.jpg', 'Camp&TripEvent9.jpg']}
        videos={['Camp&TripEventVideo1.mp4', 'Camp&TripEventVideo2.mp4', 'Camp&TripEventVideo3.mp4', 'Camp&TripEventVideo4.mp4', 'Camp&TripEventVideo5.mp4', 'Camp&TripEventVideo6.mp4', 'Camp&TripEventVideo7.mp4', 'Camp&TripEventVideo8.mp4']}
      />
    </div>
  );
}

function GallerySection({ id, title, images = [], videos = [] }) {
  const [activeVideos, setActiveVideos] = useState({});
  const [filter, setFilter] = useState('all');
  const fallbackTimers = React.useRef({});
  const videoRefs = React.useRef({});

  const isFullscreen = (index) => {
    const el = videoRefs.current[index];
    return (
      document.fullscreenElement === el ||
      document.webkitFullscreenElement === el
    );
  };

  const clearFallback = (index) => {
    if (fallbackTimers.current[index]) {
      clearTimeout(fallbackTimers.current[index]);
      delete fallbackTimers.current[index];
    }
  };

  const revealVideo = (index) => {
    setActiveVideos((prev) => ({ ...prev, [index]: true }));

    // Safety net: if the video hasn't actually started playing within
    // 5s (autoplay blocked, slow load, etc.), blur it again automatically.
    clearFallback(index);
    fallbackTimers.current[index] = setTimeout(() => {
      if (isFullscreen(index)) return;
      setActiveVideos((prev) => ({ ...prev, [index]: false }));
    }, 5000);
  };

  const handleActuallyPlaying = (index) => {
    // Real playback confirmed — cancel the fallback timer and stay unblurred.
    clearFallback(index);
    setActiveVideos((prev) => ({ ...prev, [index]: true }));
  };

  const reblurAfterEnd = (index) => {
    clearFallback(index);
    fallbackTimers.current[index] = setTimeout(() => {
      if (isFullscreen(index)) return;
      setActiveVideos((prev) => ({ ...prev, [index]: false }));
    }, 5000);
  };

  React.useEffect(() => {
    const activeTimers = fallbackTimers.current;
    return () => {
      Object.values(activeTimers).forEach(clearTimeout);
    };
  }, []);

  const showVideos = filter === 'all' || filter === 'videos';
  const showImages = filter === 'all' || filter === 'photos';

  return (
    <section id={id} className="section">
      <h2>{title}</h2>

      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'is-active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'photos' ? 'is-active' : ''}
          onClick={() => setFilter('photos')}
        >
          Photos
        </button>
        <button
          className={filter === 'videos' ? 'is-active' : ''}
          onClick={() => setFilter('videos')}
        >
          Videos
        </button>
      </div>

      <div className="horizontal-scroll">
        {showVideos && videos.map((vid, index) => {
          const isActive = !!activeVideos[index];
          return (
            <div
              key={index}
              className={`media-card video-card ${isActive ? 'is-active' : ''}`}
              onClick={() => revealVideo(index)}
            >
              <span className="media-badge">
                <i className="badge-icon">&#9654;</i> Video
              </span>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                controls={isActive}
                autoPlay={isActive}
                muted={!isActive}
                preload="metadata"
                onClick={(e) => isActive && e.stopPropagation()}
                onPlay={() => handleActuallyPlaying(index)}
                onEnded={() => reblurAfterEnd(index)}
                onFullscreenChange={() => {
                  const el = videoRefs.current[index];
                  const stillFullscreen = document.fullscreenElement === el;
                  if (!stillFullscreen && el && el.ended) {
                    reblurAfterEnd(index);
                  }
                }}
              >
                <source src={`${process.env.PUBLIC_URL}/videos/${vid}`} type="video/mp4" />
              </video>
              {!isActive && <span className="play-overlay">&#9654;</span>}
            </div>
          );
        })}

        {showImages && images.map((img, index) => (
          <div key={index} className="media-card photo-card">
            <span className="media-badge">
              <i className="badge-icon">&#128247;</i> Photo
            </span>
            <img
              src={`${process.env.PUBLIC_URL}/images/${img}`}
              alt={`${title} ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
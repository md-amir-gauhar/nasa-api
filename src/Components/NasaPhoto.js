import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

const apiKey = process.env.REACT_APP_NASA_KEY;

function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );

      const data = await res.json();
      console.log(data);
      setPhotoData(data);
    };

    fetchPhoto();
  }, []);

  if (!photoData) return <div />;

  return (
    <>
      <NavBar />
      <div className="nasa-photo">
        {photoData.media_type === 'image' ? (
          <img className="photo" src={photoData.url} alt={photoData.title} />
        ) : (
          <iframe
            title="space-video"
            src={photoData.url}
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
            className="photo"
          />
        )}

        <div>
          <h2>{photoData.title}</h2>
          <p className="date">{photoData.date}</p>
          <p className="explanation">{photoData.explanation}</p>
        </div>
      </div>
    </>
  );
}

export default NasaPhoto;

import React, { useEffect, useRef, useState } from 'react';
import '../CSS/CV.css';
import cvFile from '../assets/CV.pdf';

const CV = () => {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // If the iframe doesn't fire load within X ms, show the fallback UI.
    const t = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 1500);
    return () => clearTimeout(t);
  }, [loaded]);

  const onLoad = () => {
    // Some browsers will still trigger load even when they open PDF in a viewer,
    // but this is a reasonable signal to hide the fallback.
    setLoaded(true);
    setFailed(false);
  };

  return (
    <section id="cv" className="section cv-section">
      <div className="container">
        <h2>Curriculum Vitae</h2>
        <p className="cv-intro">You can read my CV below. If your browser can't display PDFs inline, use the Open in new tab link.</p>

        <div className="cv-frame">
          {!failed && (
            <iframe
              ref={iframeRef}
              title="Filmon Mehari CV"
              src={cvFile}
              className="cv-iframe"
              loading="lazy"
              onLoad={onLoad}
            />
          )}

          {failed && (
            <div className="cv-fallback">
              <p>Inline PDF preview isn't available in your browser. Open the CV in a new tab to view it.</p>
              <div className="cv-actions">
                <a href={cvFile} target="_blank" rel="noopener noreferrer" className="btn">Open in new tab</a>
                <a href={cvFile} download className="btn outline">Download PDF</a>
              </div>
            </div>
          )}
        </div>

        {/* keep actions visible even if iframe loaded */}
        <div className="cv-actions subtle">
          <a href={cvFile} target="_blank" rel="noopener noreferrer" className="btn">Open in new tab</a>
          <a href={cvFile} download className="btn outline">Download PDF</a>
        </div>
      </div>
    </section>
  );
};

export default CV;

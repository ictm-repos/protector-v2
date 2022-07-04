import React from 'react';
import ReactDOM from 'react-dom/client';
import VideoPlayer from './VideoPlayer';
const protectedTag = document.querySelector("[protect-video-with]")
const root = ReactDOM.createRoot(protectedTag);
const apiKey = protectedTag.getAttribute('protect-video-with');
root.render(
  <React.StrictMode>
    <VideoPlayer apiKey={apiKey} />
  </React.StrictMode>
);

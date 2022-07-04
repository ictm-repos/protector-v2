import { useEffect, useRef, useState } from 'react'

function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz01234567890_-"
  const first = alphabet[Math.floor(Math.random() * 25)]
  return first + alphabet[Math.floor(Math.random() * alphabet.length)]
}
function generateRandomColor() {
  const colorItems = "01234567890abcdef"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += colorItems[Math.floor(Math.random() * 15)]
  }
  return color
}

function generateRandomName() {
  let length = Math.random() * 10
  let randomString = ""
  for (let i = 0; i < length; i++) {
    randomString += generateRandomLetter()
  }
  return randomString
}
function getCredentialEl(
  {
    phone = "+998996672106",
    email = "jurayevmansurbek667@gmail.com",
    top = 0,
    left = 0
  }
) {
  let tagName = generateRandomName()
  let nameEl = document.createElement(tagName)

  nameEl.setAttribute('style', `
        position:absolute;
        width:100px;
        top:${top}px;
        font-size:7px;
        font-family:monospace;
        letter-spaceing:4px;
        left:${left}px;
        color:${generateRandomColor()};
        opacity:0.6;
    `)
  nameEl.textContent = `${phone} ${email}`
  return nameEl
}

function VideoPlayer({ apiKey }) {
  const videoRef = useRef()
  const containerRef = useRef()
  const [playing, setIsPlaying] = useState(false)
  const [isVisiblePanel, setIsVisiblePanel] = useState(true)
  useEffect(() => {
    console.log(apiKey)
  }, [apiKey])

  useEffect(() => {
    const interval = setInterval(() => {
      let containerEl = document.querySelector(".container")

      let top = Math.random() * (containerEl.clientHeight - 200)
      let left = Math.random() * (containerEl.clientWidth - 200)

      let credentialEl = getCredentialEl({ top, left })
      containerEl.appendChild(credentialEl)
      const timeout = setTimeout(() => {
        credentialEl.remove()
        clearTimeout(timeout)
      }, 9900)
    }, 10000)
    return () => {
      clearInterval(interval)
    };
  }, []);
  const fullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  const handleContextMenu = (event) => {
    event.preventDefault()
  }

  return (
    <div className="container"
      ref={containerRef}
      onContextMenu={handleContextMenu}
      style={{
        display: "flex",
        position: "relative",
        userSelect: "none",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <video
        ref={videoRef}
        style={{ width: "100%" }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        src='http://localhost:8081/api/video/4/stream'>
      </video>
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        transition: "opacity .4s,visibility .4s",
        opacity: isVisiblePanel ? 1 : 0,
        visibility: isVisiblePanel ? 'visible' : 'hidden',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
        onDoubleClick={fullScreen}
        onClick={() => { playing ? videoRef.current.pause() : videoRef.current.play() }}
      // onMouseMove={() => {
      //   console.log("Mouse move")
      //   setIsVisiblePanel(true)
      //   const timer = setTimeout(() => {
      //     setIsVisiblePanel(false);
      //     clearTimeout(timer)

      //   }, 3000)
      // }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "auto",
            background: "linear-gradient(transparent, white)"
          }}
          className='middle__section'>
          <div
            style={{
              cursor: "pointer"
            }}
          >
            {
              playing ?
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0.416667V9.58333C10 9.69618 9.95877 9.79384 9.8763 9.8763C9.79384 9.95877 9.69618 10 9.58333 10H6.25C6.13715 10 6.0395 9.95877 5.95703 9.8763C5.87457 9.79384 5.83333 9.69618 5.83333 9.58333V0.416667C5.83333 0.303819 5.87457 0.206163 5.95703 0.123698C6.0395 0.0412326 6.13715 0 6.25 0H9.58333C9.69618 0 9.79384 0.0412326 9.8763 0.123698C9.95877 0.206163 10 0.303819 10 0.416667ZM4.16667 0.416667V9.58333C4.16667 9.69618 4.12543 9.79384 4.04297 9.8763C3.9605 9.95877 3.86285 10 3.75 10H0.416667C0.303819 10 0.206163 9.95877 0.123698 9.8763C0.0412326 9.79384 0 9.69618 0 9.58333V0.416667C0 0.303819 0.0412326 0.206163 0.123698 0.123698C0.206163 0.0412326 0.303819 0 0.416667 0H3.75C3.86285 0 3.9605 0.0412326 4.04297 0.123698C4.12543 0.206163 4.16667 0.303819 4.16667 0.416667Z" fill="black" />
                </svg>
                : <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.833336 0L9.16667 5L0.833336 10V0Z" fill="black" />
                </svg>
            }
          </div>
        </div>
        {/* Control buttons in overlay tag */}
      </div>
    </div>
  );
}

export default VideoPlayer;

import { useEffect, useRef, useState } from 'react'
import './App.css'

import bar from './assets/svg/82bar.svg'
import mainArtwork from './assets/svg/main.svg'
import round from './assets/svg/round.svg'
import background from './assets/img/bg.png'
import mister8 from './assets/img/mister8.png'
import fleekMedia from './assets/figma/fleek-media.svg'
import partnerLeft from './assets/figma/partner-left-round.svg'
import atlanta from './assets/figma/atlanta.svg'
import partnerRight from './assets/figma/partner-right-round.svg'
import citiesData from './assets/cities.json'

const cities = citiesData.cities.map((item) => ({
  city: item.city,
  date: item.date,
  bookingUrl: item.links.find(
    (link) => link.platform === 'telegram' && link.label !== 'Чат',
  )?.url,
}))

const featuredNames = new Set(['МОСКВА', 'САНКТ-ПЕТЕРБУРГ'])
const regularCities = cities.filter(({ city }) => !featuredNames.has(city))
const featuredCities = cities.filter(({ city }) => featuredNames.has(city))
const mobileCities = [...featuredCities, ...regularCities]
const middleIndex = Math.ceil(regularCities.length / 2)

const marqueeItems = Array.from({ length: 8 }, (_, index) => (
  <span key={index}>FORTUNA 812 TOUR</span>
))

const bootLines = [
  'ubuntu@fortuna:~$ sudo apt update',
  'Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease',
  'Hit:2 http://security.ubuntu.com/ubuntu noble-security InRelease',
  'Get:3 http://packages.812.tour stable InRelease [8,120 B]',
  'Fetched 8,120 B in 0s (81.2 kB/s)',
  'Reading package lists... Done',
  'Building dependency tree... Done',
  'Reading state information... Done',
  'ubuntu@fortuna:~$ sudo apt install fortuna-812-tour',
  'Reading package indexes... Done',
  'Resolving tour dependencies... Done',
  'The following additional packages will be installed:',
  '  fortuna-core city-index visual-engine vhs-driver',
  'Suggested packages:',
  '  telegram-booking partner-links trajan-fonts',
  'The following NEW packages will be installed:',
  '  fortuna-812-tour fortuna-core city-index visual-engine vhs-driver',
  '0 upgraded, 5 newly installed, 0 to remove and 0 not upgraded.',
  'Need to get 8.12 MB of archives.',
  'After this operation, 30.10 MB of additional disk space will be used.',
  'Get:1 http://packages.812.tour fortuna-core [812 kB]',
  'Get:2 http://packages.812.tour visual-engine [3,010 kB]',
  'Get:3 http://packages.812.tour vhs-driver [1,112 kB]',
  'Get:4 http://packages.812.tour city-index [3,186 kB]',
  'Fetched 8.12 MB in 0s (24.11 MB/s)',
  'Selecting previously unselected package fortuna-core.',
  'Reading database ... 81%',
  'Preparing to unpack .../fortuna-core_8.1.2_all.deb ...',
  'Unpacking fortuna-core (8.1.2) ...',
  'Processing triggers for visual-engine (3.0.10) ...',
  'Setting up vhs-driver (1.1.2) ...',
  'Setting up city-index (24.11) ...',
  'Indexing 24 tour destinations ... Done',
  'Enabling telegram-booking.service ... Done',
  'Linking partner channels ... Done',
  'systemctl daemon-reload ... Done',
  'Setting up fortuna-812-tour (8.1.2) ...',
  'Starting fortuna-812-tour.service ...',
  '[ OK ] FORTUNA 812 TOUR is ready',
]

function BootLoader({ step, exiting }) {
  const progress = Math.round((step / bootLines.length) * 100)

  return (
    <div
      className={`boot-loader${exiting ? ' boot-loader--exit' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Загрузка сайта: ${progress}%`}
    >
      <div className="boot-loader__terminal">
        <div className="boot-loader__output">
          {bootLines.slice(0, step).map((line, index) => (
            <div
              className={`boot-loader__line${
                line.startsWith('ubuntu@')
                  ? ' boot-loader__line--prompt'
                  : line.startsWith('[ OK ]')
                    ? ' boot-loader__line--success'
                    : ''
              }`}
              key={line}
            >
              {line}
              {index === step - 1 && step < bootLines.length && (
                <span className="boot-loader__cursor" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

function Marquee({ position }) {
  return (
    <div className={`marquee marquee--${position}`} aria-hidden="true">
      <div className="marquee__track">{marqueeItems}</div>
    </div>
  )
}

function CitiesColumn({ items, side }) {
  return (
    <ol className={`dates dates--${side}`}>
      {items.map(({ city, date, bookingUrl }, index) => (
        <li
          key={`${city}-${date}`}
          style={{
            '--v-offset': `${index * 1.15}vw`,
            '--v-offset-negative': `${index * -1.15}vw`,
            '--v-offset-mobile': `${index * 0.48}vw`,
            '--v-offset-mobile-negative': `${index * -0.48}vw`,
          }}
        >
          <a
            className="city-link"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Забронировать билет: ${city}, ${date} — Telegram`}
          >
            <span className="booking-label">БРОНЬ</span>
            <span className="city-name">{city}</span>
            <time>{date}</time>
          </a>
        </li>
      ))}
    </ol>
  )
}

function FeaturedCities() {
  return (
    <div className="featured-cities">
      {featuredCities.map(({ city, date, bookingUrl }) => (
        <div className="featured-city" key={`${city}-${date}`}>
          <a
            className="featured-city__link"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Забронировать билет: ${city}, ${date} — Telegram`}
          >
            <span className="booking-label">БРОНЬ</span>
            <span className="city-name">{city}</span>
            <time>{date}</time>
          </a>
        </div>
      ))}
    </div>
  )
}

function MobileCities() {
  return (
    <ol className="mobile-cities">
      {mobileCities.map(({ city, date, bookingUrl }) => (
        <li className="mobile-city" key={`${city}-${date}`}>
          <a
            className="mobile-city__link"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Забронировать билет: ${city}, ${date} — Telegram`}
          >
            <time>{date}</time>
            <span className="city-name">{city}</span>
            <span className="booking-label">БРОНЬ</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

function App() {
  const scrollRef = useRef(null)
  const moveToScreenRef = useRef(() => {})
  const [bootStep, setBootStep] = useState(1)
  const [bootPhase, setBootPhase] = useState('loading')
  const [bootVisible, setBootVisible] = useState(true)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    let currentStep = 1
    let exitTimer
    let hideTimer

    const interval = window.setInterval(
      () => {
        currentStep += 1
        setBootStep(Math.min(currentStep, bootLines.length))

        if (currentStep < bootLines.length) return

        window.clearInterval(interval)
        exitTimer = window.setTimeout(
          () => setBootPhase('exit'),
          reducedMotion ? 0 : 100,
        )
        hideTimer = window.setTimeout(
          () => setBootVisible(false),
          reducedMotion ? 40 : 650,
        )
      },
      reducedMotion ? 12 : 40,
    )

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(exitTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    const desktop = window.matchMedia('(min-width: 701px)')
    let locked = false
    let animationFinished = true
    let animationFrame
    let releaseTimer

    const scheduleUnlock = () => {
      window.clearTimeout(releaseTimer)
      releaseTimer = window.setTimeout(() => {
        if (animationFinished) locked = false
      }, 180)
    }

    const moveToScreen = (index) => {
      if (locked) return

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const target = index * container.clientHeight

      if (reducedMotion) {
        container.scrollTop = target
        return
      }

      locked = true
      animationFinished = false
      const start = container.scrollTop
      const distance = target - start
      const duration = 1800
      const startedAt = window.performance.now()

      container.style.scrollSnapType = 'none'

      const animate = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 0.5 - Math.cos(Math.PI * progress) / 2

        container.scrollTop = start + distance * eased

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(animate)
          return
        }

        container.scrollTop = target
        container.style.scrollSnapType = ''
        animationFinished = true
        scheduleUnlock()
      }

      animationFrame = window.requestAnimationFrame(animate)
    }

    moveToScreenRef.current = moveToScreen

    const handleWheel = (event) => {
      if (!desktop.matches) return

      event.preventDefault()

      if (Math.abs(event.deltaY) < 4) return

      if (locked) {
        scheduleUnlock()
        return
      }

      const currentScreen =
        container.scrollTop >= container.clientHeight / 2 ? 1 : 0
      const nextScreen = event.deltaY > 0 ? 1 : 0

      if (nextScreen !== currentScreen) moveToScreen(nextScreen)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(releaseTimer)
      moveToScreenRef.current = () => {}
      container.style.scrollSnapType = ''
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <>
      {bootVisible && (
        <BootLoader step={bootStep} exiting={bootPhase === 'exit'} />
      )}

      <main
        className="poster"
        ref={scrollRef}
        aria-hidden={bootVisible}
        inert={bootVisible}
      >
        <div className="jpeg-damage" aria-hidden="true">
          <span className="jpeg-damage__slice jpeg-damage__slice--one" />
          <span className="jpeg-damage__slice jpeg-damage__slice--two" />
          <span className="jpeg-damage__slice jpeg-damage__slice--three" />
          <span className="jpeg-damage__slice jpeg-damage__slice--four" />
          <span className="jpeg-damage__slice jpeg-damage__slice--five" />
        </div>

        <div className="poster__canvas">
        <Marquee position="top" />

        <section className="visual" aria-label="FORTUNA 812">
          <img className="visual__bar" src={bar} alt="" draggable={false} />
          <img
            className="visual__background"
            src={background}
            alt=""
            draggable={false}
          />
          <img
            className="visual__artwork"
            src={mainArtwork}
            alt="FORTUNA 812"
            draggable={false}
          />
          <div className="portrait">
            <img
              className="portrait__image"
              src={mister8}
              alt=""
              draggable={false}
            />
            <img
              className="portrait__round"
              src={round}
              alt=""
              draggable={false}
            />
          </div>
        </section>

        <button
          className="scroll-cue"
          type="button"
          aria-label="Перейти к списку городов"
          onClick={() => moveToScreenRef.current(1)}
        >
          листай 8низ
        </button>

        <section className="tour" aria-label="Даты тура">
          <CitiesColumn items={regularCities.slice(0, middleIndex)} side="left" />
          <CitiesColumn items={regularCities.slice(middleIndex)} side="right" />
          <FeaturedCities />
          <MobileCities />
        </section>

        <Marquee position="bottom" />

        <footer className="partners" aria-label="Партнеры тура">
          <a
            className="partner-link partners__fleek"
            href="https://t.me/wearefleekmedia"
            target="_blank"
            rel="noreferrer"
          >
            <img src={fleekMedia} alt="Fleek Media" draggable={false} />
          </a>
          <a
            className="partner-link partners__left"
            href="https://t.me/booking_812"
            target="_blank"
            rel="noreferrer"
          >
            <img src={partnerLeft} alt="812 Booking" draggable={false} />
          </a>
          <a
            className="partner-link partners__atlanta"
            href="https://t.me/atlantaact"
            target="_blank"
            rel="noreferrer"
          >
            <img src={atlanta} alt="Atlanta Act" draggable={false} />
          </a>
          <a
            className="partner-link partners__right"
            href="https://t.me/eightofeight"
            target="_blank"
            rel="noreferrer"
          >
            <img src={partnerRight} alt="812" draggable={false} />
          </a>
        </footer>
      </div>

      <div className="snap-point snap-point--poster" aria-hidden="true" />
      <div className="snap-point snap-point--cities" aria-hidden="true" />
      </main>
    </>
  )
}

export default App

import { useEffect } from 'react'
import './Memories.css'

import citiesData from './assets/cities.json'

const asciiLogo = String.raw`___________.___  ________  ___ ______________ ___________________   ____ _____________
\_   _____/|   |/  _____/ /   |   \__    ___/ \__    ___/\_____  \ |    |   \______   \
 |    __)_ |   /   \  ___/    ~    \|    |      |    |    /   |   \|    |   /|       _/
 |        \|   \    \_\  \    Y    /|    |      |    |   /    |    \    |  / |    |   \
/_______  /|___|\______  /\___|_  / |____|      |____|   \_______  /______/  |____|_  /
        \/             \/       \/                               \/                 \/`

const asciiSignature = `         https://eightour.com
[ 8 ]             WE ARE             [ 8 ]
[ 8 ]              EIGHT             [ 8 ]`

const asciiLogoLines = asciiLogo.split('\n')
const asciiLines = [...asciiLogoLines, '', ...asciiSignature.split('\n')]

const mobileAsciiLogo = String.raw`___________.___  ________  ___ ______________
\_   _____/|   |/  _____/ /   |   \__    ___/
 |    __)_ |   /   \  ___/    ~    \|    |
 |        \|   \    \_\  \    Y    /|    |
/_______  /|___|\______  /\___|_  / |____|
        \/             \/       \/
___________________   ____ _____________
\__    ___/\_____  \ |    |   \______   \
  |    |    /   |   \|    |   /|       _/
  |    |   /    |    \    |  / |    |   \
  |____|   \_______  /______/  |____|_  /
                   \/                 \/`

const mobileAsciiLogoLines = mobileAsciiLogo.split('\n')
const mobileAsciiLines = [
  ...mobileAsciiLogoLines,
  '',
  ...asciiSignature.split('\n'),
]
const asciiPrintLength = Math.max(asciiLines.length, mobileAsciiLines.length)

const transliteration = {
  А: 'a',
  Б: 'b',
  В: 'v',
  Г: 'g',
  Д: 'd',
  Е: 'e',
  Ё: 'yo',
  Ж: 'zh',
  З: 'z',
  И: 'i',
  Й: 'y',
  К: 'k',
  Л: 'l',
  М: 'm',
  Н: 'n',
  О: 'o',
  П: 'p',
  Р: 'r',
  С: 's',
  Т: 't',
  У: 'u',
  Ф: 'f',
  Х: 'h',
  Ц: 'ts',
  Ч: 'ch',
  Ш: 'sh',
  Щ: 'sch',
  Ъ: '',
  Ы: 'y',
  Ь: '',
  Э: 'e',
  Ю: 'yu',
  Я: 'ya',
}

const slugifyCity = (city) =>
  [...city]
    .map((character) => transliteration[character] ?? character.toLowerCase())
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const cities = citiesData.cities.map(({ city, date }) => ({
  city,
  date,
  slug: slugifyCity(city),
}))

function AsciiOutput({ startOrder = 1 }) {
  const renderLines = (lines, logoLineCount, variant) => (
    <div
      className={`terminal-ascii terminal-ascii--${variant}`}
      aria-label="EIGHT TOUR"
    >
      {lines.map((line, index) => (
        <div
          className={`terminal-print terminal-ascii__line ${
            index > logoLineCount ? 'terminal-ascii__signature' : ''
          }`}
          style={{ '--print-order': startOrder + index }}
          key={`${variant}-${index}-${line}`}
        >
          {line}
        </div>
      ))}
    </div>
  )

  return (
    <>
      {renderLines(asciiLines, asciiLogoLines.length, 'desktop')}
      {renderLines(mobileAsciiLines, mobileAsciiLogoLines.length, 'mobile')}
    </>
  )
}

function MemoriesIndex() {
  const memoriesBase = `${import.meta.env.BASE_URL}memories/`
  const treeStartOrder = asciiPrintLength + 1

  return (
    <div className="memories__terminal">
      <div
        className="terminal-command terminal-print"
        style={{ '--print-order': 0 }}
      >
        <span className="terminal-command__user">fortuna@812</span>
        :~/memories$ select city
        <span className="memories__cursor" aria-hidden="true" />
      </div>

      <AsciiOutput />

      <section className="memory-tree" aria-label="Города тура">
        <div
          className="memory-tree__root terminal-print"
          style={{ '--print-order': treeStartOrder }}
        >
          FORTUNA_812_TOUR/
        </div>
        <div
          className="memory-tree__folder terminal-print"
          style={{ '--print-order': treeStartOrder + 1 }}
        >
          └── CITIES/
        </div>
        <ol className="memory-tree__list">
          {cities.map(({ city, date, slug }, index) => {
            const lastCity = index === cities.length - 1

            return (
              <li
                className="memory-tree__item terminal-print"
                style={{ '--print-order': treeStartOrder + index + 2 }}
                key={`${city}-${date}`}
              >
                <div className="memory-tree__directory">
                  <div className="memory-tree__directory-row">
                    <span className="memory-tree__branch">
                      {lastCity ? '    └──' : '    ├──'}
                    </span>
                    <time>{date}</time>
                    <span>{city}/</span>
                  </div>
                  <div className="memory-tree__action">
                    <span>{lastCity ? '        └──' : '    │   └──'}</span>
                    <a href={`${memoriesBase}${slug}/`}>[ ПРОСМОТРЕТЬ ]</a>
                  </div>
                  {!lastCity && (
                    <div className="memory-tree__spacer" aria-hidden="true">
                      {'    │'}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <a
        className="terminal-back terminal-print"
        style={{ '--print-order': treeStartOrder + cities.length + 3 }}
        href={import.meta.env.BASE_URL}
      >
        fortuna@812:~/memories$ cd ../tour
      </a>
    </div>
  )
}

function MemoryCity({ city }) {
  const memoriesBase = `${import.meta.env.BASE_URL}memories/`
  const directoryLines = [
    'FORTUNA_812_TOUR/',
    '└── CITIES/',
    `    └── ${city.date}_${city.city}/`,
    '        ├── PHOTO/',
    '        ├── VIDEO/',
    '        └── MEMORY.LOG',
  ]

  return (
    <div className="memories__terminal">
      <div
        className="terminal-command terminal-print"
        style={{ '--print-order': 0 }}
      >
        <span className="terminal-command__user">fortuna@812</span>
        :~/memories$ open {city.slug}
      </div>

      <AsciiOutput />

      <section className="memory-directory">
        {directoryLines.map((line, index) => (
          <div
            className="terminal-print"
            style={{ '--print-order': asciiPrintLength + index + 1 }}
            key={line}
          >
            {line}
          </div>
        ))}
      </section>

      <div
        className="memory-directory__empty terminal-print"
        style={{
          '--print-order': asciiPrintLength + directoryLines.length + 2,
        }}
      >
        <p>[ DIRECTORY IS EMPTY ]</p>
        <span>ВОСПОМИНАНИЯ ПОЯВЯТСЯ ЗДЕСЬ</span>
      </div>

      <div
        className="terminal-links terminal-print"
        style={{
          '--print-order': asciiPrintLength + directoryLines.length + 3,
        }}
      >
        <a href={memoriesBase}>fortuna@812:~/memories$ cd ../cities</a>
        <a href={import.meta.env.BASE_URL}>fortuna@812:~$ cd tour</a>
      </div>
    </div>
  )
}

function Memories({ citySlug }) {
  const selectedCity = citySlug
    ? cities.find(({ slug }) => slug === citySlug)
    : null

  useEffect(() => {
    const previousTitle = document.title
    document.title = selectedCity
      ? `${selectedCity.city} — MEMORIES`
      : 'MEMORIES — FORTUNA 812 TOUR'

    return () => {
      document.title = previousTitle
    }
  }, [selectedCity])

  return (
    <main className="memories">
      <div className="memories__screen-noise" aria-hidden="true" />
      <div className="memories__content">
        {citySlug && !selectedCity ? (
          <section className="memories__terminal">
            <div
              className="terminal-command terminal-print"
              style={{ '--print-order': 0 }}
            >
              fortuna@812:~/memories$ open {citySlug}
            </div>
            <AsciiOutput />
            <div
              className="memory-directory__empty terminal-print"
              style={{ '--print-order': asciiPrintLength + 2 }}
            >
              <p>[ DIRECTORY NOT FOUND ]</p>
              <a href={`${import.meta.env.BASE_URL}memories/`}>
                fortuna@812:~/memories$ cd ../cities
              </a>
            </div>
          </section>
        ) : selectedCity ? (
          <MemoryCity city={selectedCity} />
        ) : (
          <MemoriesIndex />
        )}
      </div>
    </main>
  )
}

export default Memories

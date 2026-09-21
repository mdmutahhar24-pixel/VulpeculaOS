import { Globe, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Webpage from './Webpage';

interface browser {
  url: string;
}

const Browser = ({ url }: browser) => {
  const [screen, setScreen] = useState('home')

  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    if (url && url != 'home') {
      setScreen(url)
      setInputVal(url)
    }
  }, [url])

  const pages = [{url: "www.dogs4life.com", title: "Dogs", desc: "All about dogs", type: "info"}, {url: "www.susfoxes.com", title: "Foxes", desc: "Pretty clever aren't they?", type: "info"}, {url: "w̶̧͉͖̃w̷̬͑w̵͎͚̿.̴̫̠̄̔́y̵̬̥͎͘ǒ̸̢̜͍͑̓u̶̻͂s̸͕̔̿h̶̭͍̀͜ö̴̧̘́̈́̐͜u̷̼͉̮͝l̵̢̙̆̂̓ḑ̴̜͕̎͊̌n̶̖͇̑t̸̙̋̑͐s̶̪̲̽̒̈́ḛ̴̻͆́̎ḛ̷̭̲͆t̶̬͕̾͝h̷͕̝̳͝ḭ̶̱̼̇͒̾s̴͍̱̿̎̕.̶̥͝ͅĉ̴͉͙̟̎o̸̡͌̈m̷̤͎͉̆", title: "???", desc: "You shouldn't have seen this...", type: "???"}]

  const currentPage = pages.find(page => page.url === screen)

  const isUnknownPage = screen !== 'home' && screen !== 'results' && !currentPage

  return (
    <div className="browser">
      {screen === 'home' && (
        <div className="home-screen">
          <Globe size={70} />
          <h1>B R O W S E R</h1>

          <div className="search">
            <input
              placeholder="Search Browser"
              id="searchBar"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setScreen('results')
                }
              }}
            />

            <button
              id="SearchButton"
              onClick={() => setScreen('results')}
            >
              <Search />
            </button>
          </div>
        </div>
      )}

      {screen !== 'results' && screen !== 'home' && currentPage ? (
              <Webpage
                type={currentPage.type}
                title={currentPage.title}
                content={currentPage.desc}
                onBack={() => setScreen('results')}
              />
            ) : isUnknownPage ? (
              <Webpage
                type="???"
                title="You weren't supposed to find this"
                content="There is nothing here."
                onBack={() => setScreen('results')}
              />
            ) : (
            <div className="results-screen">
              <div className='headerBrowser'>
                <input placeholder='Search Browser' id='searchBar2' value={inputVal} onChange={(e) => {
                  setInputVal(e.target.value);
                }} onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setScreen('results')
                  }
                }} />
                <button id='SearchButton2' onClick={() => setScreen('results')}><Search /></button>
              </div>
              <hr />
                {pages.map((page) => {

                  if (screen === page.url) {
                    return (
                      <Webpage onBack={() => setScreen('results')} type={page.type} title={page.title} content={page.desc}></Webpage>
                    );
                  }

                  return (
                    <div key={page.title} onClick={() => setScreen(page.url)} className="page">
                      <p className="page-url">{page.url}</p>
                      <h2>{page.title}</h2>
                      <p className="page-description">{page.desc}</p>
                    </div>
                  );
                })}

            </div>
        )}
    </div>
  )
}

export default Browser
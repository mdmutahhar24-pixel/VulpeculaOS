import { Search } from 'lucide-react'
import { appRegistry } from '../apps/registery'

interface StoreProps {
    onInstall: (appId: string) => void;
}

const Store = ({ onInstall }: StoreProps) => {
  return (
    <div>
      <div className="results-screen">
        <div className="headerBrowser">
          <input type="text" placeholder='Search Apps' id='searchBar2' />
          <button id='SearchButton2'><Search /></button>
        </div>
        {appRegistry.map((app) => {
          if (app.installed === false) {
            return (
              <div key={app.id} className='product'>
                {app.icon.type === 'lucide' ? <app.icon.icon id='ico' /> : <img src={app.icon.src} width={30} height={30} id='ico' />}
                <h3>{app.name}</h3>
                <p>{app.desc}</p>
                <button onClick={() => onInstall(app.id)}>Install</button>
              </div>
            );
          }
        })}
      </div>
    </div>
  )
}

export default Store

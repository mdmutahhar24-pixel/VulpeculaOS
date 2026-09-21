import { useEffect, useState } from 'react'
import { Command, Folder, Globe, NotepadText, ShoppingBag, SquareTerminal } from 'lucide-react';

interface OpenProps {
    openFiles: () => void;
    openTerminal: () => void;
    openVulp: () => void;
    openNotes: () => void;
    openCommand: () => void;
    openBrowser: () => void;
    openStore: () => void;
}

const Footer = ({ openFiles, openTerminal, openVulp, openNotes, openCommand, openBrowser, openStore }: OpenProps) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 10000);

        return () => clearInterval(timer);
    }, []);
  return (
    <footer className='footer'>
        <ul>
          <li><button onClick={openCommand}><Command /></button></li>
          <li><button onClick={openFiles}><Folder /></button></li>
          <li><button onClick={openTerminal}><SquareTerminal /></button></li>
          <li><button onClick={openNotes}><NotepadText /></button></li>
          <li><button onClick={openBrowser}><Globe /></button></li>
          <li><button onClick={openStore}><ShoppingBag /></button></li>
          <li><button onClick={openVulp}><img src='logo.png' width={30} height={30}/></button></li>
        </ul>
        <div className='right-footer'>
            <p>{now.toLocaleTimeString()}</p>
            <p>{now.toLocaleDateString()}</p>
        </div>
    </footer>
  )
}

export default Footer

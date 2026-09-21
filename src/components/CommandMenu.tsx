import { Folder, Globe, NotepadText, ShoppingBag, SquareTerminal } from 'lucide-react';

interface CommandMenuProps {
    open: boolean;
    onOpenFiles: () => void;
    onOpenTerminal: () => void;
    onOpenNotes: () => void;
    onOpenVulp: () => void;
    onOpenBrowser: () => void;
    onOpenStore: () => void;
}

const CommandMenu = ({ open, onOpenFiles, onOpenTerminal, onOpenNotes, onOpenVulp, onOpenBrowser, onOpenStore }: CommandMenuProps) => {
    return (
        <div className={`command-menu ${open ? 'open' : ''}`}>
            <h2>VulpeculaOS</h2>
            <div className='file-list'>
                <button className='file-item' onClick={onOpenFiles}>
                    <Folder /> Files
                </button>

                <button className='file-item' onClick={onOpenTerminal}>
                    <SquareTerminal /> Terminal
                </button>

                <button className='file-item' onClick={onOpenNotes}>
                    <NotepadText /> Notes
                </button>

                <button className='file-item' onClick={onOpenBrowser}>
                    <Globe /> Browser
                </button>

                <button className='file-item' onClick={onOpenStore}>
                    <ShoppingBag /> Store
                </button>

                <button className='file-item' onClick={onOpenVulp}>
                    <img src='logo.png' width={30} height={30} />Vulp
                </button>
            </div>
        </div>
    )
}

export default CommandMenu
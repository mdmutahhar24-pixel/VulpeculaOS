import {
    ArrowDownToLine,
    FileText,
    Folder,
    Image,
    Monitor,
} from 'lucide-react'
import React, { useState } from 'react'
import type { Directory } from '../filesystem/filesystem';

interface FileProps {
    filesystem: Directory;
    setFilesystem: React.Dispatch<React.SetStateAction<Directory>>;
}

const Files = ({ filesystem }: FileProps) => {
    const [path, setCurrPath] = useState('Desktop');

    const currentDirectory = filesystem.directories.find(
        dir => dir.name === path
    );

    return (
        <div className="files">

            <aside className="sidenav">
                <button onClick={() => setCurrPath('Desktop')}>
                    <Monitor />
                    Desktop
                </button>

                <button onClick={() => setCurrPath('Documents')}>
                    <FileText />
                    Documents
                </button>

                <button onClick={() => setCurrPath('Downloads')}>
                    <ArrowDownToLine />
                    Downloads
                </button>

                <button onClick={() => setCurrPath('Pictures')}>
                    <Image />
                    Pictures
                </button>
            </aside>

            <main className="file-area">
                <h2>{path}</h2>

                <div className="file-list">

                    {currentDirectory?.directories.map(directory => (
                        <button
                            className="file-item"
                            key={directory.name}
                        >
                            <Folder size={18} />
                            {directory.name}
                        </button>
                    ))}

                    {currentDirectory?.files.map(file => (
                        <button
                            className="file-item"
                            key={file.name}
                        >
                            <FileText size={18} />
                            {file.name}
                        </button>
                    ))}

                </div>
            </main>

        </div>
    )
}

export default Files
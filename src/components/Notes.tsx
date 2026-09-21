import React, { useState } from 'react'
import type { Directory, File } from '../filesystem/filesystem';

interface NotesProps {
    filesystem: Directory;
    setFilesystem: React.Dispatch<React.SetStateAction<Directory>>;
}

const Notes = ({ filesystem, setFilesystem }: NotesProps) => {
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [content, setContent] = useState("");
    const [showFiles, setShowFiles] = useState(false);

    const documents = filesystem.directories.find(
        dir => dir.name === "Documents"
    );

    function newNote() {
        const filename = prompt("Enter a filename:");

        if (!filename) {
            return;
        }

        const documents = filesystem.directories.find(
            dir => dir.name === "Documents"
        );

        if (!documents) {
            return;
        }

        const name = filename.endsWith(".txt")
            ? filename
            : `${filename}.txt`;

        const newFile: File = {
            name: name,
            content: ""
        };

        setFilesystem(prev => ({
            ...prev,
            directories: prev.directories.map(dir =>
                dir.name === "Documents"
                    ? {
                        ...dir,
                        files: [...dir.files, newFile]
                    }
                    : dir
            )
        }));

        setCurrentFile(newFile);
        setContent("");
    }

    function saveNote() {
        if (!currentFile) {
            return;
        }

        setFilesystem(prev => ({
            ...prev,
            directories: prev.directories.map(dir =>
                dir.name === "Documents"
                    ? {
                        ...dir,
                        files: dir.files.map(file =>
                            file.name === currentFile.name
                                ? { ...file, content: content }
                                : file
                        )
                    }
                    : dir
            )
        }));
    }

    function loadNote() {
        setShowFiles(prev => !prev);
    }

    function selectFile(file: File) {
        setCurrentFile(file);
        setContent(file.content);
        setShowFiles(false);
    }

    return (
        <div className='notes'>
            <nav className='navbar'>
                <ul>
                    <li onClick={saveNote}>Save</li>
                    <li onClick={newNote}>New</li>
                    <li onClick={loadNote}>Load</li>
                </ul>
            </nav>

            {showFiles && (
                <div className="load-menu">
                    {documents?.files.map(file => (
                        <button
                            key={file.name}
                            onClick={() => selectFile(file)}
                        >
                            {file.name}
                        </button>
                    ))}
                </div>
            )}

            <textarea
                id='notearea'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    )
}

export default Notes
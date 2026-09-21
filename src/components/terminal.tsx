import React, { useState } from 'react'
import { Directory } from '../filesystem/filesystem';

interface TerminalProps {
    filesystem: Directory;
    setFilesystem: React.Dispatch<React.SetStateAction<Directory>>;
}

const TerminalComponent = ({ filesystem }: TerminalProps) => {
    const [input, setInput] = useState('');
    const [currDirect, setCurrDirect] = useState(filesystem);
    const [currPath, setCurrPath] = useState("~")
    const [output, setOutput] = useState<string[]>([]);

    function getCommand(input: string) {
        if (!input.trim()) {
            return;
        }

        const words = input.trim().split(/\s+/);
        const command = words[0];

        const commands = ["cd", "ls", "help", "cat", "echo", "nano", "touch"]
        
        setOutput(prev => [
            ...prev,
            `vulpecula@user:${currPath}$ ${input}`
        ]);

        if (command === "cd") {
            if (!words[1]) {
                setOutput(prev => [...prev, "cd: missing directory"]);
                return;
            }

            const target = currDirect.directories.find(
                dir => dir.name === words[1]
            );

            if (target) {
                setCurrDirect(target);
                setCurrPath(`~/${target.name}`);
            } else {
                setOutput(prev => [
                    ...prev,
                    `cd: ${words[1]}: No such directory`
                ]);
            }

            return;
        } else if (command === "ls") {
            setOutput(prev => [
                ...prev,
                ...currDirect.directories.map(dir => dir.name),
                ...currDirect.files.map(file => file.name)
            ])
        } else if (command === "cat") {
            const target = currDirect.files.find(file => file.name === words[1])

            if (target) {
                setOutput(prev => [
                    ...prev,
                    `${target.content}`
                ])
            } else {
                setOutput(prev => [
                    ...prev,
                    `cat: ${words[1]} is not a valid file.`
                ])
            }

        } else if (command === "echo") {
            setOutput(prev => [
                ...prev,
                `${words[1]}`
            ])
        } else if (command === "nano") {
            const target = currDirect.files.find(file => file.name === words[1])

            if(target) {
                let content = "";
                for (let i = 0; i < words.length; i++) {
                    if (i > 1) {
                        content += words[i] + " "
                    }
                }
                target.content = content
            } else {
                setOutput(prev => [
                    ...prev,
                    `nano: file ${words[1]} not found `
                ])
            }
        } else if (command === "help") {
            setOutput(prev => [
                ...prev,
                ...commands.map(cmd => cmd)
            ])
        } else if (command === "touch") {
            if (!words[1]) {
                setOutput(prev => [
                    ...prev,
                    "touch: missing file name"
                ]);
                return;
            }

            const target = currDirect.files.find(
                file => file.name === words[1]
            );

            if (target) {
                setOutput(prev => [
                    ...prev,
                    `touch: ${words[1]}: file already exists`
                ]);
            } else {
                currDirect.files.push({
                    name: words[1],
                    content: ""
                });
            }
        } else {
            setOutput(prev => [
                ...prev,
                `${command}: Command does not exist. For a list of commands, use 'help'`
            ])
        }
    }

  return (
    <div className="terminal">
        <div className="terminal-output">
            <div>VulpeculaOS Terminal v1.0</div>
            <div>Welcome, User!</div>
            <div>Run 'help' to see a list of commands.</div>

            {output.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </div>

        <div className="terminal-input">
            <span>vulpecula@user:{currPath}$</span>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    getCommand(input)
                    setInput("")
                }
            }} />
        </div>
    </div>
  )
}

export default TerminalComponent

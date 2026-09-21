import { useEffect, useState } from 'react'
import { askVulp, Message } from '../vulp/ai'
import { Send } from 'lucide-react'
import { appRegistry } from '../apps/registery'
import { WindowState } from '../App';
import ReactMarkdown from 'react-markdown'
import  remarkGfm from 'remark-gfm'
import { playSound, startTypingSound, stopTypingSound } from '../audio/soundHandler';
import { speakVulp } from '../audio/speech';

interface VulpProps {
    onAction: (action: string) => void;
    windows: Record<string, WindowState>;
    systemEvents: {
        type: string;
        description: string;
    }[];
    vulpHorrorMes: string | null;

    horrorLevel: number;
}

const Vulp = ({ onAction, windows, systemEvents, vulpHorrorMes, horrorLevel }: VulpProps) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hello! I'm Vulp. How can I assist you?"
        }
    ])

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const sendResponse = async () => {
        if (!input.trim() || loading) return

        const userMessage: Message = {
            role: 'user',
            content: input
        }

        const newMessages = [...messages, userMessage]

        setMessages([
            ...newMessages,
            {
                role: 'assistant',
                content: ''
            }
        ])

        setInput('')
        setLoading(true)
        startTypingSound();

        let streamedResponse = ''

        try {
            const result = await askVulp(
                newMessages,
                {
                    openApps: Object.keys(windows),
                    installedApps: appRegistry
                        .filter(app => app.installed)
                        .map(app => app.id),
                    systemEvents,
                    horrorLevel
                },
                (token) => {
                    streamedResponse += token

                    setMessages(prev => {
                        const updated = [...prev]

                        updated[updated.length - 1] = {
                            role: 'assistant',
                            content: streamedResponse
                        }

                        return updated
                    })
                }
            )

            stopTypingSound()
            playSound("response")

            const finalResponse = streamedResponse || result.response;

            if (finalResponse) {
                setMessages(prev => {
                    const updated = [...prev]

                    updated[updated.length - 1] = {
                        role: 'assistant',
                        content: finalResponse
                    }

                    return updated
                });

                speakVulp(finalResponse)
            }


            if (result.action !== 'NONE') {
                onAction(result.action)
            }

        } catch (error) {
                console.error('Vulp error:', error);

                setMessages(prev => {
                    const updated = [...prev];

                    updated[updated.length - 1] = {
                        role: 'assistant',
                        content: `Vulp error: ${error instanceof Error ? error.message : String(error)}`
                    };

                    return updated;
                });
            } finally {
            setLoading(false)
            stopTypingSound()
        }
    }

    useEffect(() => {
        if (!vulpHorrorMes) return;

        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                content: vulpHorrorMes
            }
        ])
    }, [vulpHorrorMes])

    return (
        <div className='chatFooter'>
            <div className="chatMessages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.role}`}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                        </ReactMarkdown>
                    </div>
                ))}
            </div>

            <footer>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Vulp something..."
                    disabled={loading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendResponse()
                        }
                    }}
                />

                <button
                    id='Send'
                    onClick={sendResponse}
                    disabled={loading}
                >
                    <Send />
                </button>
            </footer>
        </div>
    )
}

export default Vulp
import { ArrowBigLeftDashIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface WebpageProps {
    type: string
    title?: string
    content?: string
    children?: ReactNode
    onBack: () => void;
}

const Webpage = ({ type, title, content, children, onBack }: WebpageProps) => {
    if (type === '???') {
        return (
            <div className='c-style'>
                <button onClick={onBack}><ArrowBigLeftDashIcon /></button>
                <h1>Ṇ̴͊̑̅e̸͕͙̓̾v̶̞̞͌̈́̃e̶͙͑r̶̛̦̮̚ ̷̧̞̑̇̐l̶̩̫͔͐̎o̶͕̖̰̽͗o̷̠̝̓k̷̺̅͂̊ ̵̪̌͌h̷͚̀̚͝e̸̪̘͛r̶̡̦̎̅͋ę̷̜͖̓̓ ̶͖̀̑͘ȁ̶͎g̶̢̭̟̈́a̸̛̠̿͗i̸͍̔n̵͎̏͑̎.̴̦̫̃́.̶̠͍̍͜.̷̠̙͛̍</h1>
            </div>
        );
    }
    return (
        <div className={`webpage ${type}`}>
            {type === 'info' && (
                <>
                    <header className="webpage-header">
                        <div className="website-logo">
                            <button onClick={onBack}><ArrowBigLeftDashIcon /></button>
                            {title}
                        </div>

                        <nav>
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Articles</a>
                        </nav>
                    </header>

                    <main className="webpage-main">
                        <div className="webpage-hero">
                            <span className="website-category">
                                INFORMATION
                            </span>

                            <h1>{title}</h1>

                            <p>{content}</p>
                        </div>

                        <div className="webpage-content">
                            <h2>Welcome to {title}</h2>

                            <p>
                                Explore information, articles, and resources
                                about this topic.
                            </p>

                            <div className="webpage-cards">
                                <div className="webpage-card">
                                    <h3>Learn More</h3>
                                    <p>
                                        Discover interesting facts and
                                        information.
                                    </p>
                                </div>

                                <div className="webpage-card">
                                    <h3>Articles</h3>
                                    <p>
                                        Read our latest articles and guides.
                                    </p>
                                </div>

                                <div className="webpage-card">
                                    <h3>Resources</h3>
                                    <p>
                                        Find useful resources and references.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="webpage-footer">
                        <span>© 2026 {title}</span>
                        <span>Vulpecula Web</span>
                    </footer>
                </>
            )}

            {children}
        </div>
    )
}

export default Webpage
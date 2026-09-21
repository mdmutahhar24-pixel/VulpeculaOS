import { useEffect, useState } from "react"

interface StartupScreenProps {
    onComplete: () => void
}

const StartupScreen = ({ onComplete }: StartupScreenProps) => {
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 300),
            setTimeout(() => setPhase(2), 1000),
            setTimeout(() => setPhase(3), 1800),
            setTimeout(() => setPhase(4), 2600),
            setTimeout(() => onComplete(), 3300)
        ]

        return () => {
            timers.forEach(clearTimeout)
        }
    }, [onComplete])

    return (
        <div className="startup-screen">

            <div className={`startup-logo phase-${phase}`}>
                <div className="startup-mark">
                    <img src="logo.png" alt="V" width={30} height={30} />
                </div>

                <h1>VULPECULAOS</h1>

                <p>Initializing system...</p>
            </div>

            <div className="startup-loader">
                <div
                    className="startup-loader-bar"
                    style={{
                        width: `${Math.min(100, phase * 25)}%`
                    }}
                />
            </div>

            <div className="startup-version">
                VulpeculaOS 1.0.0
            </div>

        </div>
    )
}

export default StartupScreen
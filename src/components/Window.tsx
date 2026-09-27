import { Maximize, Minimize, XIcon } from 'lucide-react';
import { ReactNode, useRef, useState } from 'react';
import { playSound } from '../audio/soundHandler';

interface WindowProps {
    title: string;
    children: ReactNode;
    icon?: ReactNode;
    onClose: () => void;
}

const Window = ({ title, children, icon, onClose }: WindowProps) => {
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [windowState, setWindowState] = useState<
        'normal' | 'maximized' | 'minimized'
    >('normal');

    const windowRef = useRef<HTMLDivElement>(null);

    const dragRef = useRef({
        startX: 0,
        startY: 0,
        initialX: 0,
        initialY: 0,
        nextX: 0,
        nextY: 0,
        dragging: false,
        frame: 0,
    });

    const startDragging = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0 || windowState !== 'normal') return;

        // Don't drag when clicking a window control.
        if ((e.target as HTMLElement).closest('button')) return;

        const drag = dragRef.current;

        drag.startX = e.clientX;
        drag.startY = e.clientY;
        drag.initialX = position.x;
        drag.initialY = position.y;
        drag.nextX = position.x;
        drag.nextY = position.y;
        drag.dragging = true;

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const moveWindow = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;

        if (!drag.dragging || !windowRef.current) return;

        drag.nextX = drag.initialX + e.clientX - drag.startX;
        drag.nextY = drag.initialY + e.clientY - drag.startY;

        // Only apply the latest position once per animation frame.
        if (drag.frame) return;

        drag.frame = requestAnimationFrame(() => {
            drag.frame = 0;

            if (!windowRef.current) return;

            windowRef.current.style.left = `${drag.nextX}px`;
            windowRef.current.style.top = `${drag.nextY}px`;
        });
    };

    const stopDragging = (e: React.PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;

        if (!drag.dragging) return;

        drag.dragging = false;

        if (drag.frame) {
            cancelAnimationFrame(drag.frame);
            drag.frame = 0;
        }

        // Commit the final position to React state.
        setPosition({
            x: drag.nextX,
            y: drag.nextY,
        });

        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };

    const toggleMaximize = () => {
        setWindowState(prev =>
            prev === 'maximized' ? 'normal' : 'maximized'
        );

        playSound('maximize');
    };

    return (
        <div
            ref={windowRef}
            className={`window ${windowState}`}
            style={{
                left: windowState === 'maximized' ? 0 : position.x,
                top: windowState === 'maximized' ? 0 : position.y,
            }}
        >
            <div
                className="window-header"
                onPointerDown={startDragging}
                onPointerMove={moveWindow}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
            >
                {icon}

                <span className="window-title">{title}</span>

                <div className="window-controls">
                    <button
                        className="minimize"
                        onClick={() => {
                            setWindowState('minimized');
                            playSound('minimize');
                        }}
                    >
                        <Minimize />
                    </button>

                    <button
                        className="minimize"
                        onClick={toggleMaximize}
                    >
                        <Maximize />
                    </button>

                    <button
                        onClick={onClose}
                        className="close-btn"
                    >
                        <XIcon />
                    </button>
                </div>
            </div>

            <div className="window-content">
                {children}
            </div>
        </div>
    );
};

export default Window;
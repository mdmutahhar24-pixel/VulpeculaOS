import { Maximize, Minimize, XIcon } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react'
import { playSound } from '../audio/soundHandler';

interface WindowProps {
    title: string;
    children: ReactNode;
    icon?: ReactNode;
    onClose: () => void;
}

const Window = ({ title, children, icon, onClose }: WindowProps) => {
    const [position, setPosition] = useState({ x: 100, y: 100 })
    const dragOffset = useRef({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [windowState, setWindowState] = useState<'normal' | 'maximized' | 'minimized'>('normal');

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!dragging) return;

            if (windowState === 'maximized') return;

            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
        };

        const handlePointerUp = () => {
            setDragging(false);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [dragging]);

  return (
    <div
        className={`window ${windowState}`}
        style={{
          left: windowState === 'maximized' ? 0 : position.x,
          top: windowState === 'maximized' ? 0 : position.y,
        }}
      >
      <div className="window-header" onPointerDown={(e) => {
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };

        setDragging(true);
      }}>
        {icon}
        <span className='window-title'>{title}</span>
        <div className="window-controls">
            <button
              className='minimize'
              onClick={() => {setWindowState('minimized'); playSound("minimize")}}
            >
              <Minimize />
            </button>

            <button
              className='minimize'
              onClick={() =>
                {setWindowState(prev =>
                  prev === 'maximized' ? 'normal' : 'maximized'
                );
                playSound("maximize")
              }
              }
            >
              <Maximize />
            </button>
            <button onClick={onClose} className='close-btn'><XIcon /></button>
        </div>
      </div>

      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window

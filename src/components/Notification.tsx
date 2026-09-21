import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { playSound } from '../audio/soundHandler';

interface NotifProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    onClose: () => void;
}

const Notification = ({ title, description, icon, onClose }: NotifProps) => {
    playSound("notification")
    return (
        <div className="notification">
            <div className="notification-icon">
                {icon}
            </div>

            <div className="notification-content">
                <h3>{title}</h3>

                {description && (
                    <p>{description}</p>
                )}
            </div>

            <button
                className="notification-close"
                onClick={onClose}
                aria-label="Close notification"
            >
                <X size={16} />
            </button>
        </div>
    )
}

export default Notification
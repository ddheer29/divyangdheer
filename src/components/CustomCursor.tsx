import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mainMainMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            // Check if hovering over clickable elements
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('clickable')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mainMainMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mainMainMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Small dot following exactly */}
            <motion.div
                className="cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            />

            {/* Larger glowing ring following with physics */}
            <motion.div
                className="cursor-ring"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? 'rgba(6, 182, 212, 0.8)' : 'rgba(139, 92, 246, 0.5)',
                    backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                }}
                transition={{ type: 'spring', mass: 0.1, stiffness: 150, damping: 15 }}
            />
        </>
    );
};

export default CustomCursor;

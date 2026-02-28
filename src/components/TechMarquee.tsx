import React from 'react';
import './TechMarquee.css';
import {
    Code2,
    Smartphone,
    Database,
    Globe,
    Layout,
    Server,
    Terminal,
    Cpu,
    Figma,
    Cloud
} from 'lucide-react';

const technologies = [
    { name: 'React Native', icon: <Smartphone size={18} /> },
    { name: 'React.js', icon: <Globe size={18} /> },
    { name: 'TypeScript', icon: <Code2 size={18} /> },
    { name: 'Node.js', icon: <Server size={18} /> },
    { name: 'Next.js', icon: <Layout size={18} /> },
    { name: 'Redux Toolkit', icon: <Database size={18} /> },
    { name: 'Firebase', icon: <Cloud size={18} /> },
    { name: 'GraphQL', icon: <Cpu size={18} /> },
    { name: 'Tailwind CSS', icon: <Figma size={18} /> },
    { name: 'Git & CI/CD', icon: <Terminal size={18} /> },
];

const TechMarquee: React.FC = () => {
    return (
        <div className="marquee-section">
            <div className="marquee-container">
                {/* Render twice for seamless looping */}
                {[1, 2].map((set, setIndex) => (
                    <div key={setIndex} className={`marquee-content ${setIndex === 1 ? 'duplicate' : ''}`}>
                        {technologies.map((tech, index) => (
                            <div key={index} className="tech-pill">
                                {tech.icon}
                                <span>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechMarquee;

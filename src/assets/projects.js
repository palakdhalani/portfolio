import zolonImg from './Zolon.png';
import spirexImg from './Spirex Infoways.png';
import shapetImg from './shapet.jpeg';

export const projects = [
    {
        id: 1,
        title: 'Zolon Hardware',
        category: 'E-commerce',
        image: zolonImg,
        description: 'Zolon Hardware is a premium hardware solutions provider. Our digital experience focuses on showcasing high-quality inventory with a modern, efficient interface.',
        tech: ['React', 'GSAP', 'Framer Motion'],
        link: 'https://zolon-hardware.vercel.app/'
    },
    {
        id: 2,
        title: 'Spirex Infoways',
        category: 'IT Services',
        image: spirexImg,
        description: 'Spirex Infoways provides cutting-edge IT services and solutions. We built a platform that highlights their service offerings and technical expertise.',
        tech: ['Next.js', 'Tailwind CSS', 'Node.js'],
        link: 'https://service.spirexinfoways.com/'
    },
    {
        id: 3,
        title: 'Shapet Induction',
        category: 'Industrial Tech',
        image: shapetImg,
        description: 'Shapet is an industrial technology company specialized in innovative manufacturing solutions. We created a clean, professional web presence that emphasizes their industrial leadership.',
        tech: ['React', 'Framer Motion', 'GSAP'],
        link: 'https://shapet.vercel.app/'
    }
];

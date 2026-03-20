import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full flex flex-col border-t border-white/10">
            {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={index} className="border-b border-white/10 overflow-hidden">
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full py-8 md:py-12 flex items-center justify-between text-left focus:outline-none group"
                        >
                            <span className={`text-2xl md:text-4xl tracking-tight transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-white/80'}`}>
                                {item.question}
                            </span>
                            <motion.div
                                initial={false}
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className={`flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'border-accent text-accent' : 'border-white/20 text-white/50 group-hover:border-white/50 group-hover:text-white'}`}
                            >
                                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: { opacity: 1, height: 'auto', marginBottom: 48 },
                                        collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                                    }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <p className="text-xl text-white/50 font-light pr-12">
                                        {item.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

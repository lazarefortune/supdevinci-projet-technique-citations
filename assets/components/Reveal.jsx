import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const Reveal = ({ children, delay = 0 }) => {
    const [ref, inView] = useInView({
        threshold: 0.02,
        triggerOnce: true,
    });

    const nodeRef = useRef();

    useEffect(() => {
        if (inView) {
            nodeRef.current.style.transitionDelay = `${delay}s`;
        }
    }, [inView, delay]);

    return (
        <div
            ref={node => {
                ref(node);
                nodeRef.current = node;
            }}
            className={`reveal ${inView ? 'reveal-visible' : ''}`}
            data-delay={delay}
        >
            {children}
        </div>
    );
};

export default Reveal;

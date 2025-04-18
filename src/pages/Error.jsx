import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Use Link if using React Router
import gsap from 'gsap';
// Removed the CSS import

// Optional: Define custom font families in tailwind.config.js
// (Configuration example remains the same)

function Error() {
  const containerRef = useRef(null);
  const digitRefs = useRef([]);
  const messageRef = useRef(null);
  const subMessageRef = useRef(null);
  const linkRef = useRef(null);

  const addToDigitRefs = (el) => {
    if (el && !digitRefs.current.includes(el)) {
      digitRefs.current.push(el);
    }
  };

  useEffect(() => {
     // GSAP Animation Logic (remains the same)
    if (
      containerRef.current &&
      digitRefs.current.length === 3 &&
      messageRef.current &&
      subMessageRef.current &&
      linkRef.current
    ) {
        // --- GSAP Initial States & Timeline ---
        gsap.set(digitRefs.current, { y: -50, opacity: 0, scale: 1.5 });
        gsap.set(messageRef.current, { y: 30, opacity: 0 });
        gsap.set(subMessageRef.current, { y: 30, opacity: 0 });
        gsap.set(linkRef.current, { scale: 0.5, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(digitRefs.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
        })
        .to(messageRef.current, { y: 0, opacity: 1, duration: 0.5 }, '-=0.5')
        .to(subMessageRef.current, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3')
        .to(linkRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3');

        // Continuous animation for digits
        gsap.to(digitRefs.current, {
            y: "-=10",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { each: 0.1, from: "center" },
            delay: tl.duration()
        });

        return () => {
            tl.kill();
            gsap.killTweensOf(digitRefs.current);
        };
    }
  }, []);

  return (
    // Apply Tailwind classes directly to JSX elements
    <div
        ref={containerRef}
        // UPDATED: Background color and base text color for contrast
        className="flex flex-col items-center justify-center min-h-[80vh] text-center p-5 overflow-hidden bg-[#01050c] text-neutral-200 font-sans"
    >
        <div
             // UPDATED: Text color for "404" for contrast
             className="relative mb-0 leading-none whitespace-nowrap font-heading font-bold text-cyan-400 text-[clamp(6rem,25vw,15rem)]" // Use font-heading (if defined) or font-sans/bold
        >
            <span ref={addToDigitRefs} className="inline-block px-[0.05em]">4</span>
            <span ref={addToDigitRefs} className="inline-block px-[0.05em]">0</span>
            <span ref={addToDigitRefs} className="inline-block px-[0.05em]">4</span>
        </div>

        <p
            ref={messageRef}
            // UPDATED: Text color for message for contrast
            className="mt-3 mb-4 font-bold text-neutral-100 text-[clamp(1.5rem,5vw,2.5rem)]"
        >
            Oops! Page Not Found
        </p>

        <p
            ref={subMessageRef}
            // UPDATED: Text color for sub-message for contrast
            className="mb-8 max-w-lg text-neutral-400 text-[clamp(0.9rem,2.5vw,1.1rem)]"
        >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
        </p>

        <Link
            to="/"
            ref={linkRef}
             // Link colors (text-white on bg-indigo-600) should still work, but check contrast visually.
            className="inline-block py-3 px-6 bg-indigo-600 text-white font-bold rounded-md no-underline transition duration-300 ease-in-out hover:bg-indigo-700 hover:-translate-y-0.5 transform"
        >
            Go Back Home
        </Link>
        {/* Standard 'a' tag version remains the same */}
    </div>
  );
}

export default Error;
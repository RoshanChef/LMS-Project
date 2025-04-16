import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const Error = () => {
    const navigate = useNavigate();
    const containerRef = useRef();
    const planetRef = useRef();
    const astronautRef = useRef();
    const starsRef = useRef([]);
    const shootingStarsRef = useRef([]);

    useEffect(() => {
        // Star twinkling effect
        starsRef.current.forEach((star, i) => {
            gsap.to(star, {
                duration: 2 + Math.random() * 3,
                opacity: Math.random() * 0.8 + 0.2,
                repeat: -1,
                yoyo: true,
                delay: i * 0.1
            });
        });

        // Shooting stars
        shootingStarsRef.current.forEach((star, i) => {
            gsap.fromTo(star,
                {
                    x: -100,
                    y: Math.random() * 100,
                    opacity: 0
                },
                {
                    x: '+=300',
                    y: '+=100',
                    opacity: 1,
                    duration: 1 + Math.random(),
                    delay: Math.random() * 5,
                    repeat: -1,
                    repeatDelay: Math.random() * 10,
                    ease: 'power1.out'
                }
            );
        });

        // Planet pulsing effect
        gsap.to(planetRef.current, {
            scale: 1.05,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Astronaut floating
        gsap.to(astronautRef.current, {
            y: '+=20',
            rotation: '+=5',
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Page entrance animation
        gsap.from(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-[#0d131e] flex flex-col items-center justify-center p-4 text-white overflow-hidden relative"
        >
            {/* Static stars */}
            <div className="fixed inset-0">
                {[...Array(100)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        ref={el => starsRef.current[i] = el}
                        className="absolute rounded-full bg-white"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            opacity: 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Shooting stars */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={`shooting-${i}`}
                    ref={el => shootingStarsRef.current[i] = el}
                    className="absolute h-[2px] w-[20px] bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                        top: `${Math.random() * 30}%`,
                        left: `${Math.random() * 20}%`,
                    }}
                />
            ))}

            <div className="relative z-10 text-center max-w-2xl px-4">
                {/* Planet illustration */}
                <div ref={planetRef} className="relative mb-12 mx-auto w-48 h-48">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-800 rounded-full shadow-lg shadow-purple-500/20"></div>
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-400 rounded-full opacity-80"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-teal-400 rounded-full opacity-80"></div>
                    <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-pink-400 rounded-full opacity-80"></div>
                </div>

                <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-200">Lost in the Cosmos</h2>
                <p className="text-lg md:text-xl mb-8 text-blue-300/80">
                    The page you're seeking has drifted into the void.
                    <br />
                    Let's navigate back to familiar space.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                >
                    Return to Home
                </button>

                {/* Astronaut */}
                <div
                    ref={astronautRef}
                    className="absolute -right-10 md:-right-20 top-1/3"
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-300 rounded-full relative">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-black rounded-full"></div>
                        <div className="absolute bottom-1/4 left-1/3 w-4 h-1 bg-black rounded-full"></div>
                    </div>
                    <div className="w-16 h-3 md:w-20 md:h-4 bg-white/90  rounded-full ml-3 md:ml-4"></div>
                </div>
            </div>
        </div>
    );
};

export default Error;
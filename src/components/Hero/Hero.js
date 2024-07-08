import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useGetData from '@/hooks/useGetData';

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getData } = useGetData();
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await getData('banners');
                setSlides(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, [getData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [slides.length]);

    return (
        <div className="relative h-2/4 lg:h-screen bg-black">
            {loading && <p className="text-white text-center">Loading...</p>}
            {error && <p className="text-white text-center">Error loading data</p>}
            {!loading && !error && (
                <div className="carousel-wrapper mx-auto max-w-full h-2/4 lg:h-screen">
                    <Carousel
                        ref={carouselRef}
                        showArrows={false}
                        selectedItem={currentSlide}
                        infiniteLoop={true}
                        showThumbs={false}
                        showStatus={false}
                        dynamicHeight={true}
                        stopOnHover={false}
                        onChange={(index) => setCurrentSlide(index)}
                    >
                        {slides.map((slide) => (
                            <div key={slide.id} className="relative h-2/4 lg:h-screen ">
                                <img src={slide.imageUrl} alt={slide.legend} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-primary bg-opacity-40 flex items-center justify-center">
                                    <div className="text-center text-white  pl-16 pr-2 lg:px-16">
                                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Your Guide to Indonesian Treasures</h1>
                                        <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-6 py-3 rounded-lg border-2 border-white">Discover More</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}
        </div>
    );
};

export default Hero;

"use client"

import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Parallax, Pagination, EffectFade, Autoplay } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/parallax"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const slides = [
  {
    id: 1,
    title: "Minimalist Design",
    subtitle: "Clean & Modern",
    description:
      "Experience the power of simplicity with our carefully crafted minimalist approach to design and functionality.",
    gradient: "from-[#0F0F10] via-[#1a1a1b] to-[#0F0F10]",
  },
  {
    id: 2,
    title: "Smooth Animations",
    subtitle: "Fluid Motion",
    description: "Every interaction is thoughtfully animated to create a seamless and engaging user experience.",
    gradient: "from-[#0F0F10] via-[#252526] to-[#0F0F10]",
  },
  {
    id: 3,
    title: "Parallax Effects",
    subtitle: "Depth & Movement",
    description: "Immerse yourself in layered visual storytelling with our sophisticated parallax implementations.",
    gradient: "from-[#0F0F10] via-[#1f1f20] to-[#0F0F10]",
  },
  {
    id: 4,
    title: "Perfect Balance",
    subtitle: "Form & Function",
    description: "Where aesthetic beauty meets practical functionality in perfect harmony.",
    gradient: "from-[#0F0F10] via-[#2a2a2b] to-[#0F0F10]",
  },
]

export default function ParallaxSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const swiperRef = useRef<SwiperType>()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [activeIndex])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
    setProgress(0)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Parallax, Pagination, EffectFade, Autoplay]}
        parallax={true}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1200}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
        data-swiper-parallax="-23%"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background with gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} data-swiper-parallax="-300" />

            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10" data-swiper-parallax="-200">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-8">
              <div className="text-center max-w-4xl">
                <div className="mb-4 opacity-70" data-swiper-parallax="-100">
                  <span className="text-white/60 text-lg font-light tracking-wider uppercase">{slide.subtitle}</span>
                </div>

                <h1
                  className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight"
                  data-swiper-parallax="-200"
                >
                  {slide.title}
                </h1>

                <p
                  className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto"
                  data-swiper-parallax="-300"
                >
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination with Progress Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                swiperRef.current?.slideTo(index)
                setProgress(0)
              }}
              className={`relative group transition-all duration-300 ${
                index === activeIndex ? "scale-110" : "scale-100 hover:scale-105"
              }`}
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index === activeIndex
                    ? "border-white bg-white"
                    : "border-white/40 bg-transparent hover:border-white/60"
                }`}
              />

              {/* Progress ring for active slide */}
              {index === activeIndex && (
                <div className="absolute inset-0 -m-2">
                  <svg className="w-7 h-7 transform -rotate-90" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 10}`}
                      strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
                      className="transition-all duration-75 ease-linear"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div className="text-center mt-4">
          <span className="text-white/60 text-sm font-light">
            {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 group"
      >
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5">
          <svg
            className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 group"
      >
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5">
          <svg
            className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  )
}

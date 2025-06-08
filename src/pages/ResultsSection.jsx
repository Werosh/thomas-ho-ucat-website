import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaGraduationCap,
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Medical Student",
      university: "University of Melbourne",
      score: "3280",
      percentile: "95th",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Thomas transformed my approach to the UCAT completely. His strategic thinking methods helped me jump from the 70th to 95th percentile in just 8 weeks.",
      rating: 5,
      bgGradient: "from-rose-400 to-pink-500",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Pre-Med Student",
      university: "University of Sydney",
      score: "3190",
      percentile: "92nd",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Thomas's personalized approach and calming techniques not only improved my scores but also gave me confidence. His methods are genuinely life-changing.",
      rating: 5,
      bgGradient: "from-blue-400 to-indigo-500",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Medical Student",
      university: "Monash University",
      score: "3350",
      percentile: "99th",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Thomas doesn't just teach test-taking strategies - he develops critical thinking skills that extend far beyond the UCAT. His support was incredible.",
      rating: 5,
      bgGradient: "from-emerald-400 to-teal-500",
    },
    {
      id: 4,
      name: "David Kim",
      role: "High School Graduate",
      university: "Queensland University",
      score: "3210",
      percentile: "94th",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "As someone who struggled with standardized tests, I never thought I'd achieve such a high UCAT score. Thomas's patient guidance made all the difference.",
      rating: 5,
      bgGradient: "from-purple-400 to-violet-500",
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      role: "Medical Student",
      university: "University of Adelaide",
      score: "3290",
      percentile: "96th",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Thomas's holistic approach addresses both technical and psychological aspects. His insights into UCAT structure and patterns are unmatched.",
      rating: 5,
      bgGradient: "from-amber-400 to-orange-500",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="results"
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-medium shadow-sm">
              <FaTrophy className="mr-2 text-yellow-500" />
              Success Stories
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4"
          >
            Real Results from
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Real Students
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            See how our proven methods helped students achieve their medical
            school dreams
          </motion.p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200/50 p-8 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Student Profile */}
                <div className="flex-shrink-0 text-center">
                  <div className="relative mb-6">
                    <div
                      className={`w-28 h-28 rounded-full bg-gradient-to-br ${testimonials[currentIndex].bgGradient} p-1 mx-auto`}
                    >
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <FaGraduationCap className="text-white text-sm" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-1">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-slate-500 text-sm mb-4">
                    {testimonials[currentIndex].university}
                  </p>

                  {/* Score */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
                    <div className="text-3xl font-black text-emerald-600 mb-1">
                      {testimonials[currentIndex].score}
                    </div>
                    <div className="text-sm text-slate-600">
                      {testimonials[currentIndex].percentile} Percentile
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 text-center lg:text-left">
                  <FaQuoteLeft className="text-3xl text-blue-200 mb-4 mx-auto lg:mx-0" />
                  <blockquote className="text-xl text-slate-700 leading-relaxed mb-6 font-medium">
                    "{testimonials[currentIndex].testimonial}"
                  </blockquote>

                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start items-center space-x-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-lg" />
                      )
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                      Verified Student
                    </span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                      High Achiever
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-500 w-6"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

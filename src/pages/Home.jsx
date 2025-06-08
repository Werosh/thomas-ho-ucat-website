import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaChartLine,
  FaClock,
  FaGraduationCap,
  FaLightbulb,
  FaPlay,
  FaRocket,
  FaStethoscope,
  FaTrophy,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaUserGraduate,
} from "react-icons/fa";
import { MdScience, MdQuiz, MdTrendingUp, MdSchool } from "react-icons/md";

const TypewriterEffect = ({ text, speed = 50, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, hasStarted]);

  return (
    <span className={`relative ${className}`}>
      {displayText}
      {!isComplete && hasStarted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-blue-600 ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const AnimatedCounter = ({
  target,
  duration = 2000,
  delay = 0,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.min(prev + increment, target);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return (
    <span>
      {Math.round(count)}
      {suffix}
    </span>
  );
};

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      id="home"
      className="min-h-screen bg-gradient-to-br mt-15 from-gray-50 to-white relative overflow-hidden font-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">Start </span>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text ">
                  <TypewriterEffect text="Learning" speed={80} delay={500} />
                </span>
                <span className="block">From the world's</span>
                <span className="block font-black">Pro instructor</span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                <TypewriterEffect
                  text="Achieve your dream UCAT score with expert guidance from Thomas Ho - 99th percentile scorer and medical student."
                  speed={30}
                  delay={2000}
                />
              </p>
            </div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <a href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300 shadow-lg"
                >
                  Get In Touch
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </a>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-8 pt-8"
            >
              {/* Student Avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                    <FaUserGraduate className="text-white text-sm" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white flex items-center justify-center">
                    <FaGraduationCap className="text-white text-sm" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center">
                    <FaTrophy className="text-white text-sm" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter
                      target={100}
                      duration={2000}
                      delay={3000}
                      suffix="%"
                    />
                  </div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter
                    target={4.9}
                    duration={2000}
                    delay={3500}
                    suffix="/5"
                  />
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Section */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl transform rotate-3"></div>

              {/* Main Profile Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z29vZCUyMGxvb2tpbmclMjBndXl8ZW58MHx8MHx8fDA%3D" // Replace with your image path
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Thomas Ho
                    </h2>
                    <p className="text-emerald-600 font-semibold">
                      UCAT Expert • Medical Student
                    </p>
                  </div>

                  {/* UCAT Score Highlight */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                    <div className="text-4xl font-black text-emerald-600 mb-2">
                      3350
                    </div>
                    <div className="text-sm text-gray-600">
                      UCAT Score (99th Percentile)
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        100%
                      </div>
                      <div className="text-xs text-gray-600">
                        Students 90th+
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        $75
                      </div>
                      <div className="text-xs text-gray-600">Per Hour</div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap justify-center gap-2 mt-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Verbal Reasoning
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      Decision Making
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      Quantitative
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      Abstract Reasoning
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-lg"
              >
                <FaTrophy className="text-white text-2xl" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-4 bg-emerald-500 rounded-full p-3 shadow-lg"
              >
                <FaBrain className="text-white text-xl" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 text-center"
        >
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose Thomas Ho?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FaChartLine className="text-blue-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Proven Results
                </h4>
                <p className="text-gray-600 text-sm">
                  All students achieve 90th percentile and above with
                  personalized strategies
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FaBrain className="text-emerald-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Critical Thinking
                </h4>
                <p className="text-gray-600 text-sm">
                  Evidence-based strategy focused on developing analytical
                  skills
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FaUsers className="text-purple-600 text-xl" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Personal Approach
                </h4>
                <p className="text-gray-600 text-sm">
                  Student-first methodology with personalized lesson plans
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

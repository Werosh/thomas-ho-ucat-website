import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaUsers,
  FaBrain,
  FaDollarSign,
  FaGraduationCap,
  FaChartLine,
  FaStar,
} from "react-icons/fa";

const AnimatedCounter = ({ target, delay = 0, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, delay, started]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const ModernStatsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    {
      value: 3350,
      label: "UCAT Score",
      sublabel: "99th Percentile Achievement",
      icon: FaGraduationCap,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      value: 100,
      suffix: "%",
      label: "Success Rate",
      sublabel: "All students 90th+ percentile",
      icon: FaTrophy,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      value: 870,
      label: "Decision Making",
      sublabel: "Highest subsection score",
      icon: FaBrain,
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
    },
    {
      value: 75,
      prefix: "$",
      label: "Per Hour",
      sublabel: "Premium online tutoring",
      icon: FaDollarSign,
      gradient: "from-gray-600 to-gray-800",
      bgGradient: "from-gray-50 to-gray-100",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering exceptional results through evidence-based teaching
            methods and personalized guidance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="text-center mb-4">
                    <div
                      className={`text-4xl lg:text-5xl font-black bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      <AnimatedCounter
                        target={stat.value}
                        delay={index * 200}
                        suffix={stat.suffix || ""}
                        prefix={stat.prefix || ""}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {stat.sublabel}
                    </p>
                  </div>
                </div>

                {/* Subtle corner accent */}
                <div
                  className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${stat.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Rating */}
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Student Rating</div>
              </div>

              {/* Specializations */}
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Specializations
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                    Verbal Reasoning
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
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

              {/* Experience */}
              <div className="text-center">
                <FaChartLine className="text-emerald-600 text-2xl mb-2 mx-auto" />
                <div className="text-2xl font-bold text-gray-900">2+ Years</div>
                <div className="text-sm text-gray-600">Teaching Experience</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Trusted by aspiring medical students worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-xs font-medium text-gray-400">MELBOURNE</div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="text-xs font-medium text-gray-400">SYDNEY</div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="text-xs font-medium text-gray-400">BRISBANE</div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="text-xs font-medium text-gray-400">PERTH</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernStatsSection;

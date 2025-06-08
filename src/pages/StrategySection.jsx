import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaGraduationCap,
  FaLightbulb,
  FaRocket,
  FaStethoscope,
  FaTrophy,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { PiTargetBold } from "react-icons/pi";

const StrategySection = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const ucatScores = [
    {
      section: "Verbal Reasoning",
      score: 720,
      color: "from-blue-400 to-blue-600",
    },
    {
      section: "Decision Making",
      score: 870,
      color: "from-emerald-400 to-emerald-600",
    },
    {
      section: "Quantitative Reasoning",
      score: 880,
      color: "from-purple-400 to-purple-600",
    },
    {
      section: "Abstract Reasoning",
      score: 880,
      color: "from-orange-400 to-orange-600",
    },
  ];

  const achievements = [
    {
      icon: FaTrophy,
      title: "3350 UCAT Score",
      subtitle: "99th Percentile",
      color: "text-yellow-500",
    },
    {
      icon: FaGraduationCap,
      title: "Medical Student",
      subtitle: "Current Studies",
      color: "text-blue-500",
    },
    {
      icon: FaUsers,
      title: "100% Success Rate",
      subtitle: "All students 90th+",
      color: "text-emerald-500",
    },
    {
      icon: PiTargetBold,
      title: "Proven Strategy",
      subtitle: "Critical Thinking Based",
      color: "text-purple-500",
    },
  ];

  const whatYouReceive = [
    {
      icon: FaCalendarAlt,
      title: "Personalised Lesson Plans",
      description:
        "Customized term and weekly schedules to maximize your results",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FaBrain,
      title: "Holistic Insights",
      description:
        "Deep understanding of each UCAT subsection and question types",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: FaRocket,
      title: "Exam Strategies",
      description:
        "Proven techniques to differentiate you from other candidates",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: FaPhone,
      title: "Ongoing Support",
      description: "Quick and responsive help throughout the week",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div
      id="strategy-section"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              My{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Strategy
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the critical thinking-based approach that helped me
              achieve 3350 (99th percentile) and has guaranteed all my students
              reach the 90th percentile and above.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-start mb-20"
        >
          {/* Left Side - UCAT Score Breakdown */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4">
                  <FaTrophy className="text-white text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  UCAT Score Breakdown
                </h3>
                <div className="text-6xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  3350
                </div>
                <p className="text-emerald-600 font-semibold text-lg">
                  99th Percentile
                </p>
              </div>

              <div className="space-y-4">
                {ucatScores.map((score, index) => (
                  <motion.div
                    key={score.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full bg-gradient-to-r ${score.color}`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        {score.section}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {score.score}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Strategy Details */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <FaBrain className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    The Thomas Ho Method
                  </h3>
                  <p className="text-emerald-600 font-semibold">
                    Critical Thinking Strategy
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <FaLightbulb className="text-emerald-600 mr-2" />
                    Why My Strategy Works
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <FaCheckCircle className="text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                      <span>
                        Evidence-based approach developed through hundreds of
                        hours of research
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                      <span>
                        Recognition of common traps and question patterns
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                      <span>
                        Student-first personal approach tailored to individual
                        needs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <FaCheckCircle className="text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                      <span>
                        Proven exam strategies that differentiate you from
                        others
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <FaStethoscope className="text-blue-600 mr-2" />
                    From Medical Student to Mentor
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    As a current medical student who conquered the UCAT, I
                    understand both the academic pressure and the emotional
                    journey. My approach combines analytical rigor with
                    empathetic support to help you achieve your medical school
                    dreams.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* What You Receive Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              What You <span className="text-emerald-600">Receive</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support designed to maximize your UCAT performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatYouReceive.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <item.icon className="text-2xl" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing and CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 max-w-2xl mx-auto"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Ready to Transform Your UCAT Score?
              </h3>
              <p className="text-gray-600">
                Join the ranks of students who achieved their medical school
                dreams
              </p>
            </div>

            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-black text-gray-900 mb-1">
                  $75
                </div>
                <div className="text-sm text-gray-600">Per Hour (Online)</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  Group Lessons
                </div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 mx-auto hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
            >
              Book Your Session
              <FaArrowRight className="text-sm" />
            </motion.button>

            <p className="text-sm text-gray-500 mt-4">
              Don't let UCAT anxiety hold you back. Let's unlock your potential
              together.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StrategySection;

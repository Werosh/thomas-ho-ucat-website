import React from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaBrain,
  FaGraduationCap,
  FaChartLine,
  FaTrophy,
  FaArrowUp,
  FaExternalLinkAlt,
} from "react-icons/fa";

const ModernFooter = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "UCAT Preparation", icon: FaBrain },
    { name: "Mock Exams", icon: FaChartLine },
    { name: "One-on-One Tutoring", icon: FaGraduationCap },
    { name: "Score Analysis", icon: FaTrophy },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: "#", color: "hover:text-blue-600" },
    { icon: FaInstagram, href: "#", color: "hover:text-pink-500" },
    { icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
    { icon: FaYoutube, href: "#", color: "hover:text-red-500" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Thomas Ho</h3>
                <p className="text-emerald-400 font-semibold">
                  UCAT Expert • Medical Student
                </p>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Helping aspiring medical students achieve their dream UCAT
                scores with personalized guidance and proven strategies. 99th
                percentile results guaranteed.
              </p>

              {/* UCAT Score Highlight */}
              <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-4 border border-emerald-500/30 mb-6">
                <div className="text-3xl font-black text-emerald-400 mb-1">
                  3350
                </div>
                <div className="text-xs text-gray-400">
                  UCAT Score (99th Percentile)
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-colors duration-300 ${social.color} hover:bg-gray-700`}
                  >
                    <social.icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <div className="flex items-center space-x-3 text-gray-300 text-sm group">
                      <service.icon className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="group-hover:text-emerald-400 transition-colors duration-300">
                        {service.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-6 text-white">
                Get In Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaPhone className="text-emerald-400 mt-1 text-sm" />
                  <div>
                    <p className="text-gray-300 text-sm">+61 123 456 789</p>
                    <p className="text-xs text-gray-500">Available 9AM - 8PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-emerald-400 mt-1 text-sm" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      thomas@ucatexpert.com
                    </p>
                    <p className="text-xs text-gray-500">24/7 Email Support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-emerald-400 mt-1 text-sm" />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Melbourne, Australia
                    </p>
                    <p className="text-xs text-gray-500">
                      Online Tutoring Available
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
              >
                Book Consultation
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 Thomas Ho UCAT Tutoring. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Helping students achieve medical school dreams since 2022
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="hidden md:flex items-center space-x-6 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>100% Success Rate</span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Secure Online Sessions</span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Money Back Guarantee</span>
                </span>
              </div>

              {/* Scroll to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white hover:bg-emerald-700 transition-colors duration-300 shadow-lg"
              >
                <FaArrowUp className="text-sm" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Agency Credit */}
        <div className="border-t border-gray-800/50 bg-black/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center">
              <a
                href="https://www.nextgenwebsites.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-500 hover:text-emerald-400 transition-colors duration-300 text-xs group"
              >
                <span>Website crafted by</span>
                <span className="font-semibold group-hover:text-emerald-400">
                  NextGenWebsites
                </span>
                <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;

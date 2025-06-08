import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaStar,
  FaTrophy,
  FaBrain,
  FaCalendarAlt,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    currentLevel: "",
    targetScore: "",
    timeframe: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({});

  // Input sanitization function
  const sanitizeInput = (input, type = "text") => {
    if (!input) return "";

    // Remove potential XSS threats
    let sanitized = input.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
    sanitized = sanitized.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
    sanitized = sanitized.replace(/javascript:/gi, ""); // Remove javascript: protocol
    sanitized = sanitized.replace(/on\w+\s*=/gi, ""); // Remove event handlers

    switch (type) {
      case "email":
        // Keep only valid email characters
        sanitized = sanitized.replace(/[^a-zA-Z0-9@._-]/g, "");
        break;
      case "phone":
        // Keep only valid phone characters
        sanitized = sanitized.replace(/[^0-9+\-\s()]/g, "");
        break;
      case "name":
        // Keep only letters, spaces, hyphens, and apostrophes
        sanitized = sanitized.replace(/[^a-zA-Z\s'-]/g, "");
        break;
      default:
        // For general text, remove suspicious characters but keep basic punctuation
        sanitized = sanitized.replace(/[<>{}]/g, "");
    }

    // Trim and limit length
    return sanitized.trim().substring(0, type === "message" ? 1000 : 100);
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (data) => {
    const newErrors = {};

    // Required field validations
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (data.phone && !validatePhone(data.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!data.message.trim()) {
      newErrors.message = "Message is required";
    } else if (data.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sanitize input based on field type
    let sanitizedValue;
    switch (name) {
      case "email":
        sanitizedValue = sanitizeInput(value, "email");
        break;
      case "phone":
        sanitizedValue = sanitizeInput(value, "phone");
        break;
      case "name":
        sanitizedValue = sanitizeInput(value, "name");
        break;
      case "message":
        sanitizedValue = sanitizeInput(value, "message");
        break;
      default:
        sanitizedValue = sanitizeInput(value);
    }

    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }

    // Clear status message when user starts editing
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus({
        type: "error",
        message: "Please fix the errors below before submitting.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });
    setErrors({});

    try {
      // Simulate API call delay for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real application, you would make an actual API call here
      // Example with EmailJS:
      /*
      const emailjs = await import("@emailjs/browser");
      const result = await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID", 
        form.current,
        "YOUR_PUBLIC_KEY"
      );
      */

      // Simulate success for demo
      const success = Math.random() > 0.3; // 70% success rate for demo

      if (success) {
        setStatus({
          type: "success",
          message:
            "Message sent successfully! Thomas will get back to you within 24 hours.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          currentLevel: "",
          targetScore: "",
          timeframe: "",
        });
      } else {
        throw new Error("Simulated network error");
      }
    } catch (error) {
      console.error("Form submission error:", error);

      let errorMessage =
        "Failed to send message. Please try again or contact directly.";

      // Handle specific error types
      if (error.name === "NetworkError" || error.message.includes("network")) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else if (error.status === 429) {
        errorMessage =
          "Too many requests. Please wait a moment before trying again.";
      } else if (error.status >= 500) {
        errorMessage =
          "Server error. Please try again later or contact us directly.";
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const dismissStatus = () => {
    setStatus({ type: "", message: "" });
  };

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

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div
      id="contact"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Side - Image and Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-blue-200 text-blue-700 text-sm font-medium shadow-sm">
                  <FaGraduationCap className="mr-2 text-emerald-500" />
                  Get Started Today
                </span>
              </motion.div>

              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                Ready to Achieve Your
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Dream UCAT Score?
                </span>
              </h1>

              <p className="text-lg text-slate-600 mb-8">
                Book a free consultation with Thomas and discover how
                personalized tutoring can transform your UCAT performance.
              </p>
            </div>

            {/* Profile Image Section */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-1">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center overflow-hidden">
                        <img
                          src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z29vZCUyMGxvb2tpbmclMjBndXl8ZW58MHx8MHx8fDA%3D"
                          alt="Thomas Ho"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      Thomas Ho
                    </h3>
                    <p className="text-emerald-600 font-semibold mb-3">
                      UCAT Expert • Medical Student
                    </p>

                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 mb-4">
                      <div className="text-2xl font-black text-emerald-600">
                        3350
                      </div>
                      <div className="text-xs text-gray-600">
                        UCAT Score (99th Percentile)
                      </div>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">4.9/5</span>
                    </div>
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
                className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg"
              >
                <FaTrophy className="text-white text-lg" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-2 -left-2 bg-emerald-500 rounded-full p-3 shadow-lg"
              >
                <FaBrain className="text-white text-lg" />
              </motion.div>
            </div>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaClock className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">
                      Response Time
                    </div>
                    <div className="text-slate-600 text-xs">
                      Within 24 hours
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">
                      Free Consultation
                    </div>
                    <div className="text-slate-600 text-xs">30 minutes</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Book Your Free Consultation
                </h2>
                <p className="text-slate-600">
                  Tell us about your UCAT goals and we'll create a personalized
                  plan for you.
                </p>
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {status.type === "success" ? (
                        <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
                      )}
                      <span className="text-sm">{status.message}</span>
                    </div>
                    <button
                      onClick={dismissStatus}
                      className="text-current hover:opacity-70 transition-opacity p-1"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
                          errors.name
                            ? "border-red-300 focus:ring-red-500"
                            : "border-slate-200"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
                          errors.email
                            ? "border-red-300 focus:ring-red-500"
                            : "border-slate-200"
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
                        errors.phone
                          ? "border-red-300 focus:ring-red-500"
                          : "border-slate-200"
                      }`}
                      placeholder="+61 400 000 000"
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* UCAT Specific Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Level
                    </label>
                    <select
                      name="currentLevel"
                      value={formData.currentLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="beginner">Just starting</option>
                      <option value="intermediate">Some practice</option>
                      <option value="advanced">Regular practice</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Target Score
                    </label>
                    <select
                      name="targetScore"
                      value={formData.targetScore}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="2800+">2800+ (70th)</option>
                      <option value="3000+">3000+ (80th)</option>
                      <option value="3200+">3200+ (90th)</option>
                      <option value="3300+">3300+ (95th+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Timeframe
                    </label>
                    <select
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option value="">Select</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3-4 months">3-4 months</option>
                      <option value="5-6 months">5-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="e.g., UCAT Tutoring Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                    <span className="text-xs text-slate-500 font-normal">
                      ({formData.message.length}/1000 characters)
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    maxLength="1000"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none ${
                      errors.message
                        ? "border-red-300 focus:ring-red-500"
                        : "border-slate-200"
                    }`}
                    placeholder="Tell us about your UCAT goals, current challenges, or any specific questions you have..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white flex items-center justify-center space-x-3 transition-all duration-300 relative overflow-hidden ${
                    loading
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-3"
                      >
                        <motion.div
                          variants={spinnerVariants}
                          animate="animate"
                        >
                          <FaSpinner className="text-lg" />
                        </motion.div>
                        <span>Sending...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-3"
                      >
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <p className="text-xs text-slate-500 text-center">
                  By submitting this form, you agree to be contacted about UCAT
                  tutoring services. We respect your privacy and won't share
                  your information.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Contact Options */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Prefer to Contact Directly?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:thomas@ucattutoring.com"
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center space-x-3 justify-center"
            >
              <FaEnvelope className="text-blue-600" />
              <span className="font-medium text-slate-800">
                thomas@ucattutoring.com
              </span>
            </a>
            <a
              href="tel:+61400000000"
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center space-x-3 justify-center"
            >
              <FaPhone className="text-emerald-600" />
              <span className="font-medium text-slate-800">
                +61 400 000 000
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

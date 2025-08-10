"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-transparent to-primary-100/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Predictive AI Marketing Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
          >
            Demand Intelligence to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
              Demand Capture
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Transform your marketing with AI-powered insights that predict customer behavior and capture demand at the perfect moment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Get Started
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/learn-more"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-200"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 text-center"
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900">95%</h3>
              <p className="text-sm text-gray-600 mt-1">Prediction Accuracy</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">3x</h3>
              <p className="text-sm text-gray-600 mt-1">ROI Increase</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
              <p className="text-sm text-gray-600 mt-1">AI Optimization</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-gray-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
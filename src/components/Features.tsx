"use client";

import { motion } from "framer-motion";
import { Brain, Target, TrendingUp, Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning algorithms analyze patterns and predict customer behavior with unprecedented accuracy.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Identify and reach your ideal customers at the exact moment they're ready to engage with your brand.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Forecast demand trends and market opportunities before your competitors even see them coming.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Risk Mitigation",
    description: "Minimize wasted ad spend and maximize ROI with intelligent budget allocation and fraud detection.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Real-Time Optimization",
    description: "Continuously optimize campaigns with AI that learns and adapts faster than any human team.",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: Users,
    title: "Customer Journey Mapping",
    description: "Understand and influence every touchpoint in your customer's journey from awareness to conversion.",
    color: "from-indigo-500 to-blue-500",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Intelligent Marketing, Delivered
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform transforms raw data into actionable insights, 
            enabling you to capture demand at scale and drive unprecedented growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
              <div className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to transform your marketing?
              </h3>
              <p className="text-gray-600 mb-4">
                Join leading brands using Hendricks.AI to drive growth.
              </p>
              <a
                href="/demo"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Schedule a demo
                <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
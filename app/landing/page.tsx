'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Database, Heart, Activity, Sparkles, ChevronRight, Music2, Zap } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <Badge 
              variant="outline" 
              className="mb-6 border-purple-500/50 bg-purple-500/10"
            >
              Welcome to The Schumann
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Master Earth's Sacred
              </span>
              <br />
              <span className="text-white">
                Frequencies
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the power of Earth's natural resonance. Track your practice, optimize your well-being, and elevate your consciousness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Your Journey
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                  Explore Courses
                  <Database className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sacred Library */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-black/40 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sacred Library</h3>
                  <p className="text-gray-400 mb-4">
                    Access our comprehensive collection of healing frequencies:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Earth's 7.83Hz Schumann Resonance</li>
                    <li>• Ancient Solfeggio Frequencies</li>
                    <li>• Planetary Harmonics</li>
                    <li>• Brainwave States</li>
                  </ul>
                  <Link href="/library">
                    <Button className="w-full mt-6 bg-purple-500/10 hover:bg-purple-500/20">
                      Explore Library
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Practice Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-black/40 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <Music2 className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Practice Tools</h3>
                  <p className="text-gray-400 mb-4">
                    Enhance your frequency practice with powerful tools:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Binaural Beat Generator</li>
                    <li>• Frequency Mixer</li>
                    <li>• Visual Entrainment</li>
                    <li>• Progress Tracking</li>
                  </ul>
                  <Link href="/practice">
                    <Button className="w-full mt-6 bg-purple-500/10 hover:bg-purple-500/20">
                      Start Practice
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Advanced Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-[#FFD700]/10 to-[#B8860B]/10 border-[#FFD700]/20">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-[#FFD700]/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#FFD700]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Advanced Features</h3>
                  <p className="text-gray-400 mb-4">
                    Take your practice to the next level:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Custom Frequency Programs</li>
                    <li>• Detailed Analytics</li>
                    <li>• Progress Reports</li>
                    <li>• Community Insights</li>
                  </ul>
                  <Link href="/auth/signin">
                    <Button className="w-full mt-6 bg-gradient-to-r from-[#FFD700]/20 to-[#B8860B]/20 hover:from-[#FFD700]/30 hover:to-[#B8860B]/30">
                      Get Started
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Transform Your Practice</h2>
            <p className="text-gray-400">Experience these powerful benefits</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Enhanced Focus",
                description: "Improve concentration and mental clarity through frequency entrainment"
              },
              {
                icon: Heart,
                title: "Deep Relaxation",
                description: "Achieve profound states of peace and tranquility"
              },
              {
                icon: Zap,
                title: "Energy Balance",
                description: "Align with Earth's natural frequencies for optimal vitality"
              },
              {
                icon: Activity,
                title: "Higher States",
                description: "Access expanded states of consciousness"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Begin Your Transformation</h2>
            <p className="text-gray-400 mb-8">
              Join thousands of practitioners exploring the power of sacred frequencies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Start Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline">
                  Browse Courses
                  <Database className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 
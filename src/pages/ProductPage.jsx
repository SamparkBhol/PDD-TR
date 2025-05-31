import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, ShieldCheck, Users, Cpu, BarChart3, Leaf } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered Diagnosis',
    description: 'Utilizes state-of-the-art computer vision models to accurately identify crop diseases from leaf images.',
    color: 'text-blue-500',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Receive diagnosis and confidence scores within seconds, enabling rapid decision-making.',
    color: 'text-yellow-500',
  },
  {
    icon: ShieldCheck,
    title: 'Comprehensive Treatment Guides',
    description: 'Get step-by-step organic and chemical treatment recommendations tailored to the detected disease.',
    color: 'text-green-500',
  },
  {
    icon: BarChart3,
    title: 'Actionable Insights',
    description: 'Understand disease prevalence and track crop health over time with intuitive reporting.',
    color: 'text-purple-500',
  },
  {
    icon: Users,
    title: 'User-Friendly Interface',
    description: 'Designed for ease of use, making advanced technology accessible to all farmers and agricultural professionals.',
    color: 'text-teal-500',
  },
  {
    icon: Leaf,
    title: 'Promotes Sustainable Farming',
    description: 'Encourages targeted treatments, reducing unnecessary pesticide use and supporting eco-friendly practices.',
    color: 'text-emerald-500',
  },
];

const ProductPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-16"
    >
      <section className="text-center py-16 bg-gradient-to-br from-primary/10 via-transparent to-sky-500/5 rounded-xl">
        <motion.h1 
          className="text-5xl font-extrabold text-primary mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover LeafGuard
        </motion.h1>
        <motion.p 
          className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          LeafGuard is your smart agricultural assistant, designed to help you protect your crops, improve yields, and practice sustainable farming with cutting-edge AI technology.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-150">
            <Link to="/">
              <Zap className="mr-2 h-5 w-5" /> Get Started Now
            </Link>
          </Button>
        </motion.div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center text-primary/90 mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-shadow duration-300 glass-card border-primary/20">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <feature.icon className={`w-10 h-10 mr-4 ${feature.color}`} />
                    <CardTitle className="text-2xl text-primary">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary/90 mb-6">How LeafGuard Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{delay: 0.2}}>
              <Card className="p-6 h-full neumorphic-button dark:neumorphic-button">
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">1</div>
                  <h3 className="text-xl font-semibold text-primary">Upload Image</h3>
                </div>
                <p className="text-sm text-foreground/80">Simply take a photo of a crop leaf exhibiting potential symptoms and upload it through our easy-to-use interface.</p>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.4}}>
              <Card className="p-6 h-full neumorphic-button dark:neumorphic-button">
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">2</div>
                  <h3 className="text-xl font-semibold text-primary">AI Analysis</h3>
                </div>
                <p className="text-sm text-foreground/80">Our advanced AI model analyzes the image, comparing it against a vast database of plant diseases to identify potential issues.</p>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{delay: 0.6}}>
              <Card className="p-6 h-full neumorphic-button dark:neumorphic-button">
                <div className="flex items-center mb-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-3">3</div>
                  <h3 className="text-xl font-semibold text-primary">Get Actionable Advice</h3>
                </div>
                <p className="text-sm text-foreground/80">Receive a detailed diagnosis, confidence level, and tailored treatment recommendations to help you take immediate action.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-primary/90 mb-6">Ready to Transform Your Crop Management?</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
          Join a growing community of forward-thinking farmers leveraging AI to build a more resilient and productive agricultural future.
        </p>
        <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-150">
          <Link to="/">
            Try LeafGuard for Free <Leaf className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </motion.div>
  );
};

export default ProductPage;
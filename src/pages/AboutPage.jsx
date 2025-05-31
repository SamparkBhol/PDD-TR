import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Target, Lightbulb, Linkedin, Github, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming Avatar component exists

const teamMembers = [
  {
    name: 'Dr. Eleanor Vance',
    role: 'Lead AI Scientist',
    bio: 'Eleanor is a pioneer in agricultural AI, with a PhD in Computer Vision and Machine Learning. She spearheads the development of our cutting-edge disease detection models.',
    avatarFallback: 'EV',
    socials: { linkedin: '#', github: '#', twitter: '#' },
    imgPlaceholder: "AI scientist Eleanor Vance"
  },
  {
    name: 'Raj Patel',
    role: 'Senior Software Engineer',
    bio: 'Raj brings over a decade of experience in building scalable web applications. He ensures LeafGuard is robust, user-friendly, and performs seamlessly.',
    avatarFallback: 'RP',
    socials: { linkedin: '#', github: '#', twitter: '#' },
    imgPlaceholder: "Software engineer Raj Patel"
  },
  {
    name: 'Aisha Khan',
    role: 'UX/UI Design Lead',
    bio: 'Aisha is passionate about creating intuitive and beautiful user experiences. Her design philosophy centers on making complex technology accessible to everyone.',
    avatarFallback: 'AK',
    socials: { linkedin: '#', github: '#', twitter: '#' },
    imgPlaceholder: "UX designer Aisha Khan"
  },
];

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <section className="text-center py-12 bg-gradient-to-b from-primary/10 to-transparent rounded-xl">
        <motion.h1 
          className="text-5xl font-extrabold text-primary mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          About LeafGuard
        </motion.h1>
        <motion.p 
          className="text-xl text-foreground/80 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We are a passionate team of scientists, engineers, and designers dedicated to revolutionizing agriculture through the power of artificial intelligence. Our mission is to empower farmers with accessible and accurate tools for crop health management.
        </motion.p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-primary/90 mb-8 flex items-center justify-center">
          <Target className="w-8 h-8 mr-3 text-amber-500" /> Our Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl"><Zap className="w-6 h-6 mr-2 text-blue-500" />Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">
                To provide farmers globally with advanced, AI-driven tools for early plant disease detection and sustainable crop management, enhancing food security and promoting environmentally friendly agricultural practices.
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl"><Lightbulb className="w-6 h-6 mr-2 text-green-500" />Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">
                We envision a future where technology and agriculture work hand-in-hand, creating a world with healthier crops, more productive farms, and a sustainable food supply for generations to come. LeafGuard aims to be at the forefront of this agricultural transformation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-primary/90 mb-10 flex items-center justify-center">
          <Users className="w-8 h-8 mr-3 text-teal-500" /> Meet the Team
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="text-center h-full flex flex-col hover:shadow-2xl transition-shadow duration-300 overflow-hidden neumorphic-button dark:neumorphic-button">
                <CardHeader className="items-center pt-8">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-primary/30">
                    <AvatarImage src={`https://source.unsplash.com/random/100x100/?person,${index}`} alt={member.name} />
                    <AvatarFallback className="text-3xl bg-primary/20 text-primary font-semibold">{member.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary/80">{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground px-2">{member.bio}</p>
                </CardContent>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/30 mt-auto">
                  <div className="flex justify-center space-x-3">
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Typography, Row, Col, Card, Avatar, Divider, Button, Space, Statistic, Timeline } from 'antd';
import {
  RocketOutlined,
  TeamOutlined,
  TrophyOutlined,
  BulbOutlined,
  GlobalOutlined,
  FireOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  // Team members data
  const teamMembers = [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      bio: 'AI enthusiast with 10+ years of experience in machine learning and product development.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      bio: 'Former AI researcher at MIT with expertise in NLP and deep learning architectures.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Content',
      bio: 'Tech journalist and AI reviewer with a passion for making complex technology accessible.',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Leila Patel',
      role: 'User Experience Director',
      bio: 'Designer focused on creating intuitive interfaces for AI-powered applications.',
      avatar: 'https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=300&auto=format&fit=crop&q=80',
    }
  ];

  // Company statistics
  const stats = [
    { title: 'AI Tools Listed', value: '500+', icon: <BulbOutlined style={{ fontSize: '24px', color: '#00FFFF' }} /> },
    { title: 'Monthly Users', value: '250K+', icon: <TeamOutlined style={{ fontSize: '24px', color: '#FF00FF' }} /> },
    { title: 'Expert Reviews', value: '1,200+', icon: <CheckCircleOutlined style={{ fontSize: '24px', color: '#FFFF00' }} /> },
    { title: 'Countries Reached', value: '180+', icon: <GlobalOutlined style={{ fontSize: '24px', color: '#FFA500' }} /> },
  ];

  // Company milestones
  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'AI Compass was born from a vision to simplify AI tool discovery.' },
    { year: '2021', title: 'First 100 Tools Listed', description: 'Reached our first major milestone with comprehensive reviews.' },
    { year: '2022', title: 'Community Forum Launch', description: 'Created a space for users to share experiences and insights.' },
    { year: '2023', title: 'AI Compass Pro Launched', description: 'Introduced premium features for power users and businesses.' },
    { year: '2024', title: 'Global Expansion', description: 'Expanded our team and coverage to serve a global audience.' },
    { year: '2025', title: 'Next Generation Platform', description: 'Launched our completely redesigned platform with advanced features.' },
  ];

  return (
    <Layout className="min-h-screen" style={{ background: '#121212' }}>
      <Content className="pt-0">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="py-20 px-4 md:py-32 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Abstract background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <motion.div
              className="absolute rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, rgba(0,255,255,0) 70%)',
                width: '60%',
                height: '60%',
                top: '-20%',
                left: '-20%'
              }}
              animate={pulseAnimation}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, rgba(255,0,255,0) 70%)',
                width: '50%',
                height: '50%',
                bottom: '-10%',
                right: '-10%'
              }}
              animate={pulseAnimation}
            />
          </div>

          <div className="relative z-10">
            <motion.div variants={fadeInUp}>
              <Title level={1} className="mb-6 text-4xl md:text-6xl font-bold" style={{ maxWidth: '900px', margin: '0 auto', color: '#ffffff' }}>
                <span style={{
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  About AI Compass
                </span>
              </Title>

              <Paragraph className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Your trusted navigator in the rapidly expanding universe of artificial intelligence tools and technologies
              </Paragraph>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 px-4 bg-[#121212]"
        >
          <div className="max-w-7xl mx-auto">
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} md={12}>
                <motion.div variants={fadeInLeft}>
                  <Title level={2} className="mb-6" style={{ color: '#ffffff' }}>
                    <span style={{
                      background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Our Mission
                    </span>
                  </Title>
                  <Paragraph className="text-gray-300 text-lg mb-6">
                    At AI Compass, we believe that finding the right AI tool shouldn't require a degree in computer science. Our mission is to democratize access to AI by providing clear, comprehensive, and unbiased information about the tools that are reshaping our world.
                  </Paragraph>
                  <Paragraph className="text-gray-300 text-lg mb-6">
                    We meticulously evaluate each AI tool against rigorous criteria, considering factors like user experience, capabilities, pricing, and practical applications. Our goal is to be your trusted guide in navigating the complex landscape of artificial intelligence solutions.
                  </Paragraph>
                  <Space size="large">
                    <div className="flex items-center">
                      <CheckCircleOutlined style={{ color: '#00FFFF', fontSize: '20px', marginRight: '8px' }} />
                      <Text style={{ color: '#ffffff' }}>Comprehensive Reviews</Text>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined style={{ color: '#00FFFF', fontSize: '20px', marginRight: '8px' }} />
                      <Text style={{ color: '#ffffff' }}>Expert Analysis</Text>
                    </div>
                    <div className="flex items-center">
                      <CheckCircleOutlined style={{ color: '#00FFFF', fontSize: '20px', marginRight: '8px' }} />
                      <Text style={{ color: '#ffffff' }}>User Feedback</Text>
                    </div>
                  </Space>
                </motion.div>
              </Col>
              <Col xs={24} md={12}>
                <motion.div variants={fadeInRight} className="relative">
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=2070"
                      alt="AI Technology"
                      className="w-full h-auto rounded-2xl"
                      style={{ 
                        width: '100%', 
                        objectFit: 'cover'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF20] to-[#FF00FF20] rounded-2xl" />
                  </div>
                  <div 
                    className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full" 
                    style={{ 
                      background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 100%)',
                      opacity: 0.6,
                      filter: 'blur(40px)'
                    }}
                  />
                  <div 
                    className="absolute -top-4 -left-4 w-24 h-24 rounded-full" 
                    style={{ 
                      background: 'linear-gradient(135deg, #FF00FF 0%, #FFFF00 100%)',
                      opacity: 0.5,
                      filter: 'blur(30px)'
                    }}
                  />
                </motion.div>
              </Col>
            </Row>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 px-4"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(255,0,255,0.05) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <Row gutter={[24, 48]} justify="center">
              {stats.map((stat, index) => (
                <Col xs={12} sm={12} md={6} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-4">
                      {stat.icon}
                    </div>
                    <Title level={2} style={{ color: '#ffffff', margin: '0 0 4px 0' }}>
                      <span style={{
                        background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        {stat.value}
                      </span>
                    </Title>
                    <Text style={{ color: '#aaaaaa', fontSize: '16px' }}>
                      {stat.title}
                    </Text>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </motion.section>

        {/* Our Team Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 px-4 bg-[#121212]"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Title level={2} className="mb-4" style={{ color: '#ffffff' }}>
                <span style={{
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Meet Our Team
                </span>
              </Title>
              <Paragraph className="text-gray-300 max-w-2xl mx-auto">
                A dedicated group of AI enthusiasts, technology experts, and industry analysts working to bring you the most reliable AI tool recommendations
              </Paragraph>
            </motion.div>

            <Row gutter={[24, 24]}>
              {teamMembers.map((member, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      hoverable
                      style={{
                        background: 'rgba(30,30,30,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        overflow: 'hidden'
                      }}
                      styles={{ body: { padding: '24px' } }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <Avatar
                          size={120}
                          src={member.avatar}
                          style={{ marginBottom: '16px', border: '3px solid', borderImageSlice: 1, borderImageSource: 'linear-gradient(90deg, #00FFFF, #FF00FF)' }}
                        />
                        <Title level={4} style={{ color: '#ffffff', margin: '0 0 4px 0' }}>
                          {member.name}
                        </Title>
                        <Text style={{ color: '#00FFFF', marginBottom: '12px', fontWeight: 'bold' }}>
                          {member.role}
                        </Text>
                        <Paragraph style={{ color: '#aaaaaa', fontSize: '14px' }}>
                          {member.bio}
                        </Paragraph>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </motion.section>

        {/* Our Journey Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 px-4"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,30,0.9) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Title level={2} className="mb-4" style={{ color: '#ffffff' }}>
                <span style={{
                  background: 'linear-gradient(90deg, #FFFF00 0%, #00FFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Our Journey
                </span>
              </Title>
              <Paragraph className="text-gray-300 max-w-2xl mx-auto">
                From a simple idea to the comprehensive AI tool navigator we are today
              </Paragraph>
            </motion.div>

            <Row gutter={[48, 48]} justify="center">
              <Col xs={24} md={18} lg={16}>
                <Timeline
                  mode="alternate"
                  items={milestones.map((milestone, index) => ({
                    dot: <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{
                      background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                    }}>
                      {milestone.year}
                    </div>,
                    children: (
                      <motion.div 
                        variants={index % 2 === 0 ? fadeInRight : fadeInLeft}
                        className="mb-8 md:mb-12"
                      >
                        <Card
                          style={{
                            background: 'rgba(30,30,30,0.7)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px'
                          }}
                          styles={{ body: { padding: '20px' } }}
                        >
                          <Title level={4} style={{ color: '#ffffff', margin: '0 0 8px 0' }}>
                            {milestone.title}
                          </Title>
                          <Paragraph style={{ color: '#aaaaaa', margin: 0 }}>
                            {milestone.description}
                          </Paragraph>
                        </Card>
                      </motion.div>
                    )
                  }))}
                />
              </Col>
            </Row>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-20 px-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <motion.div
              className="absolute rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,255,255,0) 70%)',
                width: '40%',
                height: '40%',
                top: '-10%',
                right: '-10%'
              }}
              animate={pulseAnimation}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, rgba(255,0,255,0) 70%)',
                width: '50%',
                height: '50%',
                bottom: '-20%',
                left: '-10%'
              }}
              animate={pulseAnimation}
            />
          </div>

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.div variants={fadeInUp}>
              <Title level={2} style={{ color: '#ffffff', marginBottom: '16px' }}>
                <span style={{
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Join Us in Shaping the Future of AI
                </span>
              </Title>
              <Paragraph className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
                Whether you're an AI novice or an experienced professional, AI Compass is your trusted partner in discovering tools that can transform your work and life.
              </Paragraph>

              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  className="rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                    border: 'none',
                    height: '48px',
                    padding: '0 32px',
                    fontSize: '16px'
                  }}
                >
                  Explore AI Tools
                </Button>
                <Button
                  type="default"
                  size="large"
                  className="rounded-full"
                  style={{
                    background: 'transparent',
                    borderColor: '#00FFFF',
                    color: '#00FFFF',
                    height: '48px',
                    padding: '0 32px',
                    fontSize: '16px'
                  }}
                >
                  Contact Us
                </Button>
              </Space>
            </motion.div>
          </div>
        </motion.section>
      </Content>
    </Layout>
  );
};

export default About;
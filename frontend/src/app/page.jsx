'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout, Menu, Button, Input, Card, Row, Col, Typography, Space, Divider, Badge, Tag } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import {
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  StarOutlined,
  FireOutlined,
  BulbOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  CodeOutlined,
  RobotOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import RotatingText from '@/components/UI/RotatingText';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  // AI Tools categories
  const categories = [
    {
      title: 'Text & Writing',
      icon: <RobotOutlined />,
      color: '#00FFFF',
      description: 'Content generation, copywriting, and text enhancement tools',
      count: 86
    },
    {
      title: 'Coding & Development',
      icon: <CodeOutlined />,
      color: '#FF00FF',
      description: 'Code assistants, bug fixers, and development accelerators',
      count: 104
    },
    {
      title: 'Image & Design',
      icon: <BulbOutlined />,
      color: '#FFFF00',
      description: 'Image generation, editing tools, and design assistants',
      count: 78
    },
    {
      title: 'Audio & Speech',
      icon: <ThunderboltOutlined />,
      color: '#FFA500',
      description: 'Voice synthesis, transcription, and audio enhancement',
      count: 52
    },
    {
      title: 'Video Creation',
      icon: <FireOutlined />,
      color: '#FF4500',
      description: 'Video generators, editors, and animation tools',
      count: 47
    },
    {
      title: 'Business & Data',
      icon: <GlobalOutlined />,
      color: '#00FF00',
      description: 'Analytics, business intelligence, and data processing',
      count: 93
    }
  ];

  // Featured AI Tools
  const featuredTools = [
    {
      name: 'NeuralWriter Pro',
      category: 'Text & Writing',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=2069&auto=format&fit=crop',
      tags: ['Content', 'SEO', 'Free Trial'],
      description: 'Advanced AI writing assistant with context-aware content generation',
      highlight: 'TRENDING'
    },
    {
      name: 'CodePilot X',
      category: 'Coding & Development',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      tags: ['Python', 'JavaScript', 'Paid'],
      description: 'Complete coding assistant for 25+ languages with advanced debugging',
      highlight: 'POPULAR'
    },
    {
      name: 'DreamCanvas AI',
      category: 'Image & Design',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
      tags: ['Art', 'Generation', 'Freemium'],
      description: 'Create stunning artwork and graphics from text descriptions',
      highlight: 'NEW'
    },
    {
      name: 'DataSense Pro',
      category: 'Business & Data',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      tags: ['Analytics', 'Visualization', 'Enterprise'],
      description: 'Transform raw data into actionable business intelligence instantly',
      highlight: 'EDITOR\'S CHOICE'
    }
  ];

  return (
    <Layout className="min-h-screen" style={{ background: '#121212' }}>
      {/* Navigation */}
      <Header className="fixed w-full z-50 bg-[#1a1a1a] shadow-lg flex items-center justify-between px-4 md:px-8 lg:px-16">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <RocketOutlined style={{ color: '#00FFFF', fontSize: '28px', marginRight: '8px' }} />
          <span style={{
            background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            paddingRight: '4px'
          }}>
            AI Compass
          </span>
        </Link>

        <div className="flex items-center">
          <div className="hidden lg:block">
            <Menu
              mode="horizontal"
              className="border-0 bg-transparent"
              style={{ color: '#ffffff' }}
              items={[
                { key: 'tools', label: 'AI Tools' },
                { key: 'categories', label: 'Categories' },
                { key: 'pricing', label: 'Pricing' },
                { key: 'about', label: 'About' },
                { key: 'blog', label: 'Blog' }
              ]}
              theme="dark"
            />
          </div>

          <Space size="middle" className="ml-4">
            <Button type="text" style={{ color: '#ffffff' }}>Login</Button>
            <Button
              type="primary"
              style={{
                background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                border: 'none'
              }}
            >
              Sign Up
            </Button>
          </Space>
        </div>
      </Header>

      <Content className="pt-16">
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
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 50%, #FFFF00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Discover & Compare <br className="hidden md:block" />
                  The Best AI Tools
                </span>
              </Title>

              <Paragraph className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Your expert guide to finding the perfect AI solutions for any task.
                Over 500+ curated tools with detailed reviews and comparisons.
              </Paragraph>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
              <Input
                placeholder="Search AI tools by name, feature or category..."
                size="large"
                className="rounded-full py-3 border-0"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', backdropFilter: 'blur(10px)' }}
                suffix={
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    size="large"
                    className="rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                      border: 'none'
                    }}
                  />
                }
              />

              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Tag color="#00FFFF" className="rounded-full px-3 py-1">ChatGPT</Tag>
                <Tag color="#FF00FF" className="rounded-full px-3 py-1">Midjourney</Tag>
                <Tag color="#FFFF00" className="rounded-full px-3 py-1">Claude</Tag>
                <Tag color="#FFA500" className="rounded-full px-3 py-1">Stable Diffusion</Tag>
                <Tag color="#FF4500" className="rounded-full px-3 py-1">DALL-E</Tag>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                type="primary"
                size="large"
                className="mt-12 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                  border: 'none',
                  height: '50px',
                  padding: '0 32px',
                  fontSize: '18px'
                }}
              >
                Explore All AI Tools
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <div className='flex justify-center items-center py-4 bg-[#121212] relative z-10'>
          <Text style={{ color: '#ffffff', fontSize: '24px', paddingRight: '15px' }} className="text-white text-2xl font-semibold">Increase</Text>
          <RotatingText
            texts={['Productivity', 'Creativity', 'Efficiency', 'Intelligence', 'Automation']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black font-bold text-2xl overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
          />
        </div>


        {/* Categories Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 px-4 bg-[#121212] relative"
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <Title level={2} className="mb-4" style={{ color: '#ffffff' }}>
                <span style={{
                  background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Explore by Category
                </span>
              </Title>
              <Paragraph className="text-gray-400 max-w-2xl mx-auto">
                Find the perfect AI tool for your specific needs from our curated collection
                across multiple categories
              </Paragraph>
            </motion.div>

            <Row gutter={[24, 24]} className="mb-8">
              {categories.map((category, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      className="h-full"
                      hoverable
                      style={{
                        background: 'rgba(30,30,30,0.5)',
                        border: `1px solid rgba(${category.color === '#00FFFF' ? '0,255,255' :
                          category.color === '#FF00FF' ? '255,0,255' :
                            category.color === '#FFFF00' ? '255,255,0' :
                              category.color === '#FFA500' ? '255,165,0' :
                                category.color === '#FF4500' ? '255,69,0' :
                                  '0,255,0'},0.3)`,
                        borderRadius: '16px',
                        overflow: 'hidden'
                      }}
                      styles={{
                        body: { padding: '24px' }
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <div
                          className="p-3 rounded-full mr-3"
                          style={{
                            background: `rgba(${category.color === '#00FFFF' ? '0,255,255' :
                              category.color === '#FF00FF' ? '255,0,255' :
                                category.color === '#FFFF00' ? '255,255,0' :
                                  category.color === '#FFA500' ? '255,165,0' :
                                    category.color === '#FF4500' ? '255,69,0' :
                                      '0,255,0'},0.15)`
                          }}
                        >
                          <span style={{ color: category.color, fontSize: '24px' }}>{category.icon}</span>
                        </div>
                        <div>
                          <Title level={4} style={{ color: '#ffffff', margin: 0 }}>
                            {category.title}
                          </Title>
                          <Badge count={category.count} style={{ backgroundColor: category.color }} />
                        </div>
                      </div>
                      <Paragraph className="text-gray-400" style={{ marginBottom: '16px' }}>
                        {category.description}
                      </Paragraph>
                      <Button
                        type="text"
                        size="middle"
                        style={{ color: category.color, padding: 0 }}
                      >
                        Browse Tools →
                      </Button>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Button
                type="default"
                size="large"
                ghost
                style={{
                  borderColor: '#00FFFF',
                  color: '#00FFFF'
                }}
              >
                View All Categories
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Featured Tools Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 px-4 bg-[#121212]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <Title level={2} className="mb-4" style={{ color: '#ffffff' }}>
                <span style={{
                  background: 'linear-gradient(90deg, #FFFF00 0%, #00FFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Featured AI Tools
                </span>
              </Title>
              <Paragraph className="text-gray-400 max-w-2xl mx-auto">
                Discover the most popular, trending, and highest-rated AI tools in our collection
              </Paragraph>
            </motion.div>

            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <Space.Compact size="large">
                <Button
                  type={activeTab === 'trending' ? "primary" : "default"}
                  onClick={() => setActiveTab('trending')}
                  style={{
                    background: activeTab === 'trending' ? 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)' : 'transparent',
                    borderColor: activeTab === 'trending' ? 'transparent' : 'rgba(255,255,255,0.2)',
                    color: activeTab === 'trending' ? '#fff' : '#aaa'
                  }}
                >
                  <FireOutlined /> Trending
                </Button>
                <Button
                  type={activeTab === 'new' ? "primary" : "default"}
                  onClick={() => setActiveTab('new')}
                  style={{
                    background: activeTab === 'new' ? 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)' : 'transparent',
                    borderColor: activeTab === 'new' ? 'transparent' : 'rgba(255,255,255,0.2)',
                    color: activeTab === 'new' ? '#fff' : '#aaa'
                  }}
                >
                  <ThunderboltOutlined /> Newest
                </Button>
                <Button
                  type={activeTab === 'top-rated' ? "primary" : "default"}
                  onClick={() => setActiveTab('top-rated')}
                  style={{
                    background: activeTab === 'top-rated' ? 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)' : 'transparent',
                    borderColor: activeTab === 'top-rated' ? 'transparent' : 'rgba(255,255,255,0.2)',
                    color: activeTab === 'top-rated' ? '#fff' : '#aaa'
                  }}
                >
                  <StarOutlined /> Top Rated
                </Button>
                <Button
                  type={activeTab === 'free' ? "primary" : "default"}
                  onClick={() => setActiveTab('free')}
                  style={{
                    background: activeTab === 'free' ? 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)' : 'transparent',
                    borderColor: activeTab === 'free' ? 'transparent' : 'rgba(255,255,255,0.2)',
                    color: activeTab === 'free' ? '#fff' : '#aaa'
                  }}
                >
                  Free Tools
                </Button>
              </Space.Compact>
            </div>

            <Row gutter={[24, 24]}>
              {featuredTools.map((tool, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      hoverable
                      style={{
                        background: 'rgba(25,25,25,0.8)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                      styles={{ body: { padding: '16px' } }}
                      cover={
                        <div className="relative h-48">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${tool.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                          {tool.highlight && (
                            <span
                              className="absolute top-3 right-3 text-xs font-bold py-1 px-2 rounded-full"
                              style={{
                                background: tool.highlight === 'TRENDING' ? '#FF00FF' :
                                  tool.highlight === 'POPULAR' ? '#FFA500' :
                                    tool.highlight === 'NEW' ? '#00FFFF' :
                                      '#FFFF00'
                              }}
                            >
                              {tool.highlight}
                            </span>
                          )}
                          <div className="absolute bottom-3 left-3 flex items-center">
                            <span className="bg-yellow-400 text-black text-xs font-bold py-1 px-2 rounded-full flex items-center">
                              <StarOutlined /> {tool.rating}
                            </span>
                            <span className="ml-2 text-xs text-white bg-black bg-opacity-60 py-1 px-2 rounded-full">
                              {tool.category}
                            </span>
                          </div>
                        </div>
                      }
                    >
                      <Title level={4} style={{ color: '#ffffff', margin: '0 0 8px 0' }}>
                        {tool.name}
                      </Title>
                      <Paragraph style={{ color: '#aaaaaa', fontSize: '14px', margin: '0 0 12px 0' }}>
                        {tool.description}
                      </Paragraph>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.map((tag, idx) => (
                          <Tag
                            key={idx}
                            color="rgba(0, 0, 0, 0.5)"
                            style={{
                              border: '1px solid rgba(255,255,255,0.2)',
                              color: '#aaa'
                            }}
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                      <Button
                        type="primary"
                        block
                        style={{
                          background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                          border: 'none'
                        }}
                      >
                        View Details
                      </Button>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>

            <div className="text-center mt-12">
              <Button
                type="primary"
                size="large"
                className="rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: '#00FFFF',
                  color: '#00FFFF'
                }}
              >
                View All AI Tools
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="py-24 px-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}
        >
          <div className="max-w-5xl mx-auto relative z-10">
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} md={12}>
                <motion.div variants={fadeInLeft}>
                  <Title level={2} style={{ color: '#ffffff' }}>
                    <span style={{
                      background: 'linear-gradient(90deg, #FFFF00 0%, #00FFFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      Stay Updated with New AI Tools
                    </span>
                  </Title>
                  <Paragraph className="text-gray-300 mb-0">
                    Subscribe to our newsletter and be the first to know about the latest AI tools,
                    exclusive reviews, and special offers.
                  </Paragraph>
                </motion.div>
              </Col>
              <Col xs={24} md={12}>
                <motion.div variants={fadeInRight}>
                  <Space.Compact className="w-full">
                    <Input
                      placeholder="Enter your email address"
                      size="large"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRight: 'none',
                        color: '#fff',
                        width: 'calc(100% - 150px)',
                        borderTopLeftRadius: '8px',
                        borderBottomLeftRadius: '8px'
                      }}
                    />
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        width: '150px',
                        background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                        border: 'none',
                        borderTopRightRadius: '8px',
                        borderBottomRightRadius: '8px'
                      }}
                    >
                      Subscribe
                    </Button>
                  </Space.Compact>
                  <Text className="text-gray-400 text-sm mt-2 block" style={{ color: '#ffffff' }}>
                    We respect your privacy. Unsubscribe at any time.
                  </Text>
                </motion.div>
              </Col>
            </Row>
          </div>

          {/* Abstract background elements */}
          <motion.div
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,255,255,0) 70%)',
              width: '40%',
              height: '40%',
              bottom: '-10%',
              left: '-10%'
            }}
            animate={pulseAnimation}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, rgba(255,0,255,0) 70%)',
              width: '50%',
              height: '50%',
              top: '-20%',
              right: '-10%'
            }}
            animate={pulseAnimation}
          />
        </motion.section>
      </Content>
    </Layout>
  );
};

export default Home;
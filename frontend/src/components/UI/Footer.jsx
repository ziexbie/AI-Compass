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

const Footer = () => {
    return (
        <div>
            <Footer className="bg-[#0A0A0A] text-white py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <Row gutter={[48, 48]}>
                        <Col xs={24} md={8}>
                            <div className="mb-6">
                                <Link href="/" className="text-2xl font-bold flex items-center">
                                    <RocketOutlined style={{ color: '#00FFFF', fontSize: '24px', marginRight: '8px' }} />
                                    <span style={{
                                        background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>
                                        AI Compass
                                    </span>
                                </Link>
                            </div>
                            <Paragraph className="text-gray-400 mb-6">
                                Your expert guide to finding the perfect AI tools for any task, with comprehensive
                                reviews and comparisons to help you make informed decisions.
                            </Paragraph>
                            <Space size="middle">
                                <Button type="text" shape="circle" icon={<i className="fab fa-twitter" style={{ color: '#00FFFF' }} />} />
                                <Button type="text" shape="circle" icon={<i className="fab fa-linkedin" style={{ color: '#00FFFF' }} />} />
                                <Button type="text" shape="circle" icon={<i className="fab fa-instagram" style={{ color: '#FF00FF' }} />} />
                            </Space>
                        </Col>

                        <Col xs={24} md={16}>
                            <Row gutter={[24, 24]}>
                                <Col xs={12} sm={8}>
                                    <Title level={5} style={{ color: '#ffffff', marginBottom: '16px' }}>Explore</Title>
                                    <ul className="list-none p-0 m-0">
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">All AI Tools</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Categories</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">New Tools</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Popular Tools</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Tool Directory</Link></li>
                                    </ul>
                                </Col>
                                <Col xs={12} sm={8}>
                                    <Title level={5} style={{ color: '#ffffff', marginBottom: '16px' }}>Resources</Title>
                                    <ul className="list-none p-0 m-0">
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">AI News</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Guides</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Tutorials</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Blog</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Glossary</Link></li>
                                    </ul>
                                </Col>
                                <Col xs={12} sm={8}>
                                    <Title level={5} style={{ color: '#ffffff', marginBottom: '16px' }}>Company</Title>
                                    <ul className="list-none p-0 m-0">
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">About Us</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Contact</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Add Your Tool</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Advertise</Link></li>
                                        <li className="mb-2"><Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Careers</Link></li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Divider className="border-gray-800 my-8" />

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <Text className="text-gray-500" style={{ color: '#ffffff' }}>
                            &copy; {new Date().getFullYear()} AI Compass. All rights reserved.
                        </Text>
                        <Space size="large" className="mt-4 md:mt-0">
                            <Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Privacy Policy</Link>
                            <Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Terms of Service</Link>
                            <Link href="#" className="text-gray-400 hover:text-[#00FFFF]">Cookie Policy</Link>
                        </Space>
                    </div>
                </div>
            </Footer>
        </div>
    )
}

export default Footer
'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button, Space } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
    return (
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
                            { key: 'tools', label: <Link href="/">AI Tools</Link> },
                            { key: 'categories', label: <Link href="/">Categories</Link> },
                            { key: 'about', label: <Link href="/about">About</Link> },
                            { key: 'contact', label: <Link href="/contact">Contact</Link> }
                        ]}
                        theme="dark"
                    />
                </div>

                <Space size="middle" className="ml-4">
                    <Link href="/login">
                        <Button type="text" style={{ color: '#ffffff' }}>Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button
                            type="primary"
                            style={{
                                background: 'linear-gradient(90deg, #00FFFF 0%, #FF00FF 100%)',
                                border: 'none'
                            }}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </Space>
            </div>
        </Header>
    );
};

export default Navbar;
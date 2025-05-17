'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconDashboard,
  IconTools,
  IconUsers,
  IconCategory,
  IconMessageCircle,
  IconChartBar,
  IconUser,
  IconPlus,
  IconEdit
} from '@tabler/icons-react';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: IconDashboard },
    { name: 'Manage Tools', path: '/admin/manage-tools', icon: IconTools },
    { name: 'Add Tool', path: '/admin/add-tools', icon: IconPlus },
    { name: 'Browse Tools', path: '/browse-tools', icon: IconCategory },
    { name: 'Manage Users', path: '/admin/manage-user', icon: IconUsers },
    { name: 'Update Users', path: '/admin/update-user', icon: IconEdit },



    { name: 'Profile', path: '/admin/profile', icon: IconUser },
  ];

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-[#1A1625] border-r border-[#2A2438] overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          AI Compass
        </h1>
        <p className="text-gray-400 text-sm">Admin Panel</p>
      </div>

      <div className="px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                                ${isActive
                  ? 'bg-pink-500/10 text-pink-500'
                  : 'text-gray-400 hover:bg-pink-500/5 hover:text-pink-500'
                }`}
            >
              <Icon size={20} stroke={1.5} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
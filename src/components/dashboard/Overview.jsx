import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  CreditCardIcon,
  TruckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const Overview = () => {
  const stats = [
    {
      name: 'Total Orders',
      value: '12',
      icon: ShoppingBagIcon,
      change: '+2 from last month',
      changeType: 'positive',
    },
    {
      name: 'Total Spent',
      value: '$2,847',
      icon: CreditCardIcon,
      change: '+$180 from last month',
      changeType: 'positive',
    },
    {
      name: 'Active Orders',
      value: '3',
      icon: TruckIcon,
      change: '2 shipping, 1 processing',
      changeType: 'neutral',
    },
    {
      name: 'Loyalty Points',
      value: '284',
      icon: StarIcon,
      change: '+45 this month',
      changeType: 'positive',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      product: 'Cyberpunk Neon Strip - Blue',
      status: 'Shipped',
      amount: '$89.99',
      date: '2024-01-15',
    },
    {
      id: 'ORD-2024-002',
      product: 'Gaming Setup LED Kit',
      status: 'Processing',
      amount: '$124.99',
      date: '2024-01-12',
    },
    {
      id: 'ORD-2024-003',
      product: 'Neon Sign - Custom Logo',
      status: 'Delivered',
      amount: '$299.99',
      date: '2024-01-08',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-400 bg-green-500/20';
      case 'shipped':
        return 'text-blue-400 bg-blue-500/20';
      case 'processing':
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
        <p className="text-gray-300">
          Here's an overview of your account activity and recent orders.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'text-green-400 bg-green-500/20'
                    : stat.changeType === 'negative'
                    ? 'text-red-400 bg-red-500/20'
                    : 'text-gray-400 bg-gray-500/20'
                }`}
              >
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-6">Recent Orders</h3>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-black/10 rounded-lg border border-cyan-500/10"
            >
              <div className="flex-1">
                <h4 className="text-white font-medium">{order.product}</h4>
                <p className="text-sm text-gray-400">{order.id}</p>
                <p className="text-xs text-gray-500 mt-1">{order.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <span className="text-white font-bold">{order.amount}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-colors">
            View All Orders
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;

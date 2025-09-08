import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: 'ORD-2024-001',
      product: 'Cyberpunk Neon Strip - Blue',
      status: 'Shipped',
      amount: '$89.99',
      date: '2024-01-15',
      tracking: 'UPS-1234567890',
      items: [
        { name: 'Cyberpunk Neon Strip - Blue', quantity: 2, price: '$44.99' }
      ]
    },
    {
      id: 'ORD-2024-002',
      product: 'Gaming Setup LED Kit',
      status: 'Processing',
      amount: '$124.99',
      date: '2024-01-12',
      tracking: null,
      items: [
        { name: 'Gaming Setup LED Kit', quantity: 1, price: '$124.99' }
      ]
    },
    {
      id: 'ORD-2024-003',
      product: 'Neon Sign - Custom Logo',
      status: 'Delivered',
      amount: '$299.99',
      date: '2024-01-08',
      tracking: 'FEDEX-9876543210',
      items: [
        { name: 'Neon Sign - Custom Logo', quantity: 1, price: '$299.99' }
      ]
    },
    {
      id: 'ORD-2023-025',
      product: 'RGB Light Strip Set',
      status: 'Delivered',
      amount: '$67.50',
      date: '2023-12-20',
      tracking: 'UPS-5555666677',
      items: [
        { name: 'RGB Light Strip 5m', quantity: 3, price: '$22.50' }
      ]
    },
    {
      id: 'ORD-2023-024',
      product: 'Neon Window Display',
      status: 'Cancelled',
      amount: '$180.00',
      date: '2023-12-15',
      tracking: null,
      items: [
        { name: 'Neon Window Display', quantity: 1, price: '$180.00' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-400 bg-green-500/20';
      case 'shipped':
        return 'text-blue-400 bg-blue-500/20';
      case 'processing':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'cancelled':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Order History</h2>
          <p className="text-gray-400">Track and manage all your orders</p>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 bg-black/20 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 space-y-3 lg:space-y-0 lg:flex lg:items-center lg:space-x-8">
                {/* Order Info */}
                <div>
                  <h3 className="text-white font-semibold text-lg">{order.id}</h3>
                  <p className="text-gray-300">{order.product}</p>
                  <p className="text-sm text-gray-400">{order.date}</p>
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Tracking */}
                {order.tracking && (
                  <div>
                    <p className="text-sm text-gray-400">Tracking:</p>
                    <p className="text-cyan-400 font-mono text-sm">{order.tracking}</p>
                  </div>
                )}
              </div>

              {/* Amount and Actions */}
              <div className="flex items-center justify-between lg:justify-end space-x-4 mt-4 lg:mt-0">
                <span className="text-white font-bold text-lg">{order.amount}</span>
                <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <EyeIcon className="w-4 h-4" />
                  <span className="text-sm">View Details</span>
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-4 pt-4 border-t border-cyan-500/10">
              <p className="text-sm text-gray-400 mb-2">Items:</p>
              <div className="space-y-1">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-white">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;

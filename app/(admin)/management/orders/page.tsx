"use client";

import { useState } from "react";
import { 
  Search,
  Filter,
  Download,
  Eye,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpDown,
  Calendar,
  DollarSign,
  MapPin,
  Printer,
  FileText,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

// Order type definition
interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  paymentMethod: string;
  items: number;
  shippingAddress: string;
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'year' | 'custom'>('month');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  // Sample orders data
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: '#ORD-2024-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
      date: '2024-01-15T10:30:00Z',
      total: 299.99,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      items: 3,
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: '2',
      orderNumber: '#ORD-2024-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
      },
      date: '2024-01-16T14:20:00Z',
      total: 149.50,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'PayPal',
      items: 2,
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001'
    },
    {
      id: '3',
      orderNumber: '#ORD-2024-003',
      customer: {
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
      },
      date: '2024-01-16T09:15:00Z',
      total: 89.99,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'Bank Transfer',
      items: 1,
      shippingAddress: '789 Pine Rd, Chicago, IL 60601'
    },
    {
      id: '4',
      orderNumber: '#ORD-2024-004',
      customer: {
        name: 'Emily Davis',
        email: 'emily.d@example.com',
      },
      date: '2024-01-15T16:45:00Z',
      total: 567.25,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      items: 4,
      shippingAddress: '321 Elm Blvd, Houston, TX 77001'
    },
    {
      id: '5',
      orderNumber: '#ORD-2024-005',
      customer: {
        name: 'Michael Wilson',
        email: 'michael.w@example.com',
      },
      date: '2024-01-14T11:30:00Z',
      total: 234.99,
      status: 'cancelled',
      paymentStatus: 'refunded',
      paymentMethod: 'PayPal',
      items: 2,
      shippingAddress: '654 Cedar Ln, Phoenix, AZ 85001'
    },
    {
      id: '6',
      orderNumber: '#ORD-2024-006',
      customer: {
        name: 'Sarah Brown',
        email: 'sarah.b@example.com',
      },
      date: '2024-01-14T13:20:00Z',
      total: 789.00,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      items: 5,
      shippingAddress: '987 Spruce Way, Philadelphia, PA 19019'
    },
    {
      id: '7',
      orderNumber: '#ORD-2024-007',
      customer: {
        name: 'David Lee',
        email: 'david.lee@example.com',
      },
      date: '2024-01-13T10:00:00Z',
      total: 45.99,
      status: 'refunded',
      paymentStatus: 'refunded',
      paymentMethod: 'Debit Card',
      items: 1,
      shippingAddress: '147 Maple Dr, San Antonio, TX 78201'
    },
    {
      id: '8',
      orderNumber: '#ORD-2024-008',
      customer: {
        name: 'Lisa Anderson',
        email: 'lisa.a@example.com',
      },
      date: '2024-01-13T15:45:00Z',
      total: 324.50,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'Apple Pay',
      items: 3,
      shippingAddress: '258 Birch St, San Diego, CA 92101'
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }: { status: Order['status'] }) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-300', icon: Clock, label: 'Pending' },
      processing: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-300', icon: RefreshCw, label: 'Processing' },
      shipped: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-300', icon: Truck, label: 'Shipped' },
      delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300', icon: CheckCircle, label: 'Delivered' },
      cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-300', icon: XCircle, label: 'Cancelled' },
      refunded: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-800 dark:text-gray-300', icon: DollarSign, label: 'Refunded' },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  };

  // Payment status badge
  const PaymentStatusBadge = ({ status }: { status: Order['paymentStatus'] }) => {
    const statusConfig = {
      paid: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      failed: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      refunded: 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle sort
  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  // Handle select order
  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.customer.name.toLowerCase().includes(query) ||
        order.customer.email.toLowerCase().includes(query)
      );
    }
    
    // Status filter
    if (selectedStatus !== 'all' && order.status !== selectedStatus) {
      return false;
    }
    
    // Payment status filter
    if (selectedPaymentStatus !== 'all' && order.paymentStatus !== selectedPaymentStatus) {
      return false;
    }
    
    return true;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                Orders
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Manage and track all customer orders
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium text-white hover:opacity-90 transition-opacity">
                <Package className="h-4 w-4" />
                New Order
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mt-8">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{stats.pending}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-sm text-blue-600 dark:text-blue-400">Processing</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.processing}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p className="text-sm text-purple-600 dark:text-purple-400">Shipped</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.shipped}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <p className="text-sm text-green-600 dark:text-green-400">Delivered</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.delivered}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <p className="text-sm text-red-600 dark:text-red-400">Cancelled</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.cancelled}</p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
              <p className="text-sm text-emerald-600 dark:text-emerald-400">Revenue</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">${stats.revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search by order #, customer, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Payment Status Filter */}
            <div>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Payment</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedStatus !== 'all' || selectedPaymentStatus !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Active filters:</span>
              {selectedStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-medium text-blue-800 dark:text-blue-300">
                  Status: {selectedStatus}
                  <button onClick={() => setSelectedStatus('all')}>×</button>
                </span>
              )}
              {selectedPaymentStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-xs font-medium text-green-800 dark:text-green-300">
                  Payment: {selectedPaymentStatus}
                  <button onClick={() => setSelectedPaymentStatus('all')}>×</button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-xs font-medium text-purple-800 dark:text-purple-300">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')}>×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-sm text-blue-800 dark:text-blue-300">
                {selectedOrders.length} orders selected
              </span>
              <div className="flex items-center gap-3">
                <button className="text-sm text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200 font-medium">
                  Update Status
                </button>
                <button className="text-sm text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200 font-medium">
                  Export Selected
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('orderNumber')}
                      className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      Order
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('total')}
                      className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300"
                    >
                      Total
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {paginatedOrders.map((order) => (
                  <tr 
                    key={order.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <Link 
                          href={`/orders/${order.id}`}
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {order.orderNumber}
                        </Link>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          {order.items} items
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-white">
                          {order.customer.name}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {order.customer.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4">
                      <PaymentStatusBadge status={order.paymentStatus} />
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-zinc-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setViewOrder(order)}
                          className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                          title="View details"
                        >
                          <Eye className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                          title="Print invoice"
                        >
                          <Printer className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                          title="More options"
                        >
                          <MoreHorizontal className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-zinc-400 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('all');
                  setSelectedPaymentStatus('all');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length} orders
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`
                      w-8 h-8 rounded-lg text-sm font-medium transition-colors
                      ${currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }
                    `}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setViewOrder(null)} />
            
            <div className="inline-block align-bottom bg-white dark:bg-zinc-900 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Order Details - {viewOrder.orderNumber}
                </h3>
                <button
                  onClick={() => setViewOrder(null)}
                  className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="px-6 py-4">
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Customer Information</h4>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
                      <p className="font-medium text-zinc-900 dark:text-white">{viewOrder.customer.name}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{viewOrder.customer.email}</p>
                      <div className="flex items-start gap-2 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{viewOrder.shippingAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Order Summary</h4>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Order Date</span>
                        <span className="font-medium text-zinc-900 dark:text-white">{formatDate(viewOrder.date)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Status</span>
                        <StatusBadge status={viewOrder.status} />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Payment Status</span>
                        <PaymentStatusBadge status={viewOrder.paymentStatus} />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Payment Method</span>
                        <span className="font-medium text-zinc-900 dark:text-white">{viewOrder.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">Total Items</span>
                        <span className="font-medium text-zinc-900 dark:text-white">{viewOrder.items}</span>
                      </div>
                      <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 flex justify-between">
                        <span className="font-medium text-zinc-900 dark:text-white">Total Amount</span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          ${viewOrder.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setViewOrder(null)}
                      className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium text-white hover:opacity-90 transition-opacity">
                      <FileText className="h-4 w-4 inline mr-2" />
                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
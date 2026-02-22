"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import api from "@/services/api/axiosClient";

interface Order {
  id: number;
  user: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
  total_price: string;
  products: number;
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    orders: Order[];
    net_total: number;
    pending_orders: number;
  };
}

interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  totalRevenue: number;
  netTotal?: number;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Statistics from API
  const [netTotal, setNetTotal] = useState<number>(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState<number>(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Calculate additional statistics from orders (for status breakdown)
  const stats = useMemo(() => {
    return orders.reduce((acc, order) => {
      acc.total += 1;
      acc[order.status] += 1;
      acc.totalRevenue += parseFloat(order.total_price);
      return acc;
    }, {
      total: 0,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      totalRevenue: 0
    } as OrderStats);
  }, [orders]);

  // Filter orders based on search query and status filter
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Status filter
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }

      // Search filter (by order ID or user)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          order.id.toString().includes(query) ||
          order.user.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter]);

  const fetchOrders = async (url?: string) => {
    try {
      setLoading(true);
      let res;

      if (url) {
        res = await api.get(url);
      } else {
        res = await api.get("/orders/", {
          params: {
            page: currentPage,
          }
        });
      }

      const paginatedData: PaginatedResponse = res.data;

      const ordersData = paginatedData.results.orders || [];
      setOrders(ordersData);

      setNetTotal(paginatedData.results.net_total || 0);
      setPendingOrdersCount(paginatedData.results.pending_orders || 0);

      setTotalOrders(paginatedData.count);
      setNextPageUrl(paginatedData.next);
      setPrevPageUrl(paginatedData.previous);

      const itemsPerPage = ordersData.length;
      const calculatedTotalPages = Math.ceil(paginatedData.count / itemsPerPage);
      setTotalPages(calculatedTotalPages || 1);

      setError(null);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchOrders(nextPageUrl);
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      fetchOrders(prevPageUrl);
      setCurrentPage(prev => prev - 1);
    }
  };

  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        <span className="ml-2 text-gray-700 dark:text-gray-300">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Pending Orders</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {pendingOrdersCount || stats.pending}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Delivered Orders</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.delivered}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(netTotal || stats.totalRevenue)}
          </div>
        </div>
      </div>

      {/* Header with Add Order Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Orders Management</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Order
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative w-70"> {/* width adjust: 40 = 10rem */}
            <input
              type="text"
              placeholder="Search by Order ID or User..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="sm:w-48">
          <select
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredOrders.length} of {totalOrders} orders
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Products</th>
              <th className="px-6 py-3">Total Price</th>
              <th className="px-6 py-3">Last Updated</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                          {order.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">{order.user}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 dark:text-gray-300">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 dark:text-gray-300">
                    {order.products}
                  </td>
                  <td className="px-6 py-4 font-medium dark:text-gray-300">
                    {formatCurrency(order.total_price)}
                  </td>
                  <td className="px-6 py-4 dark:text-gray-300">
                    {formatDate(order.updated_at)}
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 hover:underline dark:text-blue-400 mr-3">
                      View
                    </button>
                    <button className="font-medium text-gray-600 hover:underline dark:text-gray-300">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg shadow">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={handlePrevPage}
              disabled={!prevPageUrl}
              className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${prevPageUrl
                  ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!nextPageUrl}
              className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${nextPageUrl
                  ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={!prevPageUrl}
                  className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${prevPageUrl
                      ? 'text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0'
                      : 'text-gray-300 dark:text-gray-600 cursor-not-allowed ring-1 ring-inset ring-gray-200 dark:ring-gray-700'
                    }`}
                >
                  <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                  Previous
                </button>

                {/* Current Page Display */}
                <span className="relative inline-flex items-center bg-blue-50 dark:bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600">
                  Page {currentPage}
                </span>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={!nextPageUrl}
                  className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${nextPageUrl
                      ? 'text-gray-900 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0'
                      : 'text-gray-300 dark:text-gray-600 cursor-not-allowed ring-1 ring-inset ring-gray-200 dark:ring-gray-700'
                    }`}
                >
                  Next
                  <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
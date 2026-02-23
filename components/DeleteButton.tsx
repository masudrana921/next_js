"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import api from "@/services/api/axiosClient";
import ConfirmModal from "./ConfirmModal";
import toast from "react-hot-toast"; // import toast

interface DeleteButtonProps {
  orderId: number;
  onDeleted: (deletedId: number) => void; // callback to parent
}

export default function DeleteButton({ orderId, onDeleted }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await api.delete(`/order-delete/${orderId}/`);
      setIsOpen(false);

      // Call parent to remove from table
      if (res.data.deleted_order_id) {
        onDeleted(res.data.deleted_order_id);
      }

      // Show success toast instead of setMessage
      toast.success(res.data.message);

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order"); // error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/30 transition"
      >
        <Trash2 size={18} />
      </button>

      <ConfirmModal
        isOpen={isOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this order? This action cannot be undone."
        onCancel={() => setIsOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
}
import React, { useState } from 'react';
import type { Supplier } from '../services/api';
import { supplierController } from '../services/controller';

interface SupplierFormData {
  id?: number;
  name: string;
  phone?: string;
  address?: string;
}

interface SupplierModalProps {
  isOpen: boolean;
  editingSupplier: Supplier | null;
  formData: SupplierFormData;
  onClose: () => void;
  onFormDataChange: (data: SupplierFormData) => void;
  onSave: () => void;
}

const SupplierModal: React.FC<SupplierModalProps> = ({
  isOpen,
  editingSupplier,
  formData,
  onClose,
  onFormDataChange,
  onSave,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
    // Clear error khi user bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleModalSave = () => {
    const result = supplierController.validateSupplier(formData);
    
    if (!result.success) {
      // Set error with field name from controller
      if (result.field && result.message) {
        setErrors({ [result.field]: result.message });
      }
      return;
    }
    
    setErrors({});
    onSave();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-96 max-h-screen overflow-y-auto transform transition-transform duration-300 animate-in slide-in-from-center pointer-events-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {editingSupplier ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}
        </h2>

        <div className="space-y-4">
          {/* Tên nhà cung cấp */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Tên nhà cung cấp *"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
                errors.name
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-300 focus:border-blue-600'
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại *"
              value={formData.phone || ''}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
                errors.phone
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-300 focus:border-blue-600'
              }`}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Địa chỉ */}
          <div>
            <textarea
              name="address"
              placeholder="Địa chỉ * "
              value={formData.address || ''}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
                errors.address
                  ? 'border-red-500 focus:border-red-600'
                  : 'border-gray-300 focus:border-blue-600'
              }`}
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">{errors.address}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg font-bold hover:bg-gray-400 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleModalSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;

import React, { useState } from 'react';
import { RenderIf } from '@jswork/react-render-controls/src/main';

interface TableRow {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Column {
  key: string;
  label: string;
}

export function MultipleConditionsExample() {
  const [detailDrawer, setDetailDrawer] = useState({ open: false });
  const [tableRow, setTableRow] = useState<TableRow | null>(null);
  const [columns, setColumns] = useState<Column[] | null>(null);

  // 模拟数据
  const mockData: TableRow[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
  ];

  const mockColumns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  const handleOpenDetailDrawer = (row: TableRow) => {
    setTableRow(row);
    setColumns(mockColumns);
    setDetailDrawer({ open: true });
  };

  const handleCloseDetailDrawer = () => {
    setDetailDrawer({ open: false });
    setTableRow(null);
    setColumns(null);
  };

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold">Multiple Conditions</h2>
      <div className="p-4 bg-white rounded shadow">
        <p className="mb-4 text-gray-600">
          抽屉只有在三个条件都满足时才渲染：抽屉打开 + 有行数据 + 有列配置
        </p>

        {/* 数据表格 */}
        <table className="w-full mb-4 border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left border">ID</th>
              <th className="p-2 text-left border">Name</th>
              <th className="p-2 text-left border">Email</th>
              <th className="p-2 text-left border">Role</th>
              <th className="p-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="p-2 border">{row.id}</td>
                <td className="p-2 border">{row.name}</td>
                <td className="p-2 border">{row.email}</td>
                <td className="p-2 border">{row.role}</td>
                <td className="p-2 border">
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleOpenDetailDrawer(row)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 调试信息 */}
        <div className="p-3 mb-4 text-sm bg-gray-50 border rounded">
          <p className="font-mono">
            当前面板状态: open={detailDrawer.open ? 'true' : 'false'}, tableRow={tableRow ? 'exists' : 'null'},
            columns={columns ? 'exists' : 'null'}
          </p>
          <p className="mt-1 font-mono text-blue-600">
            渲染条件: {Boolean(detailDrawer.open && tableRow && columns) ? '✓ 满足' : '✗ 不满足'}
          </p>
        </div>

        {/* 只有当所有条件都满足时才渲染抽屉 */}
        <RenderIf when={Boolean(detailDrawer.open && tableRow && columns)}>
          <DetailDrawer
            formData={tableRow!}
            columns={columns!}
            onClose={handleCloseDetailDrawer}
          />
        </RenderIf>
      </div>
    </section>
  );
}

// 模拟 DetailDrawer 组件
function DetailDrawer({
  formData,
  columns,
  onClose,
}: {
  formData: TableRow;
  columns: Column[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Detail Drawer</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {columns.map((col) => (
            <div key={col.key} className="flex">
              <span className="w-24 font-semibold text-gray-600">{col.label}:</span>
              <span className="text-gray-800">{String(formData[col.key as keyof TableRow])}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            className="w-full px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

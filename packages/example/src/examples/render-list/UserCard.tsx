import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserCardProps {
  user: User;
  variant?: 'default' | 'compact';
}

export default function UserCard({ user, variant = 'default' }: UserCardProps) {
  if (variant === 'compact') {
    return (
      <div className="p-3 mb-2 bg-white border rounded shadow-sm">
        <span className="font-medium">{user.name}</span>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-sm text-gray-600">{user.role}</span>
      </div>
    );
  }

  return (
    <div className="p-4 mb-4 bg-white rounded shadow">
      <h3 className="mb-2 text-lg font-semibold">{user.name}</h3>
      <p className="mb-1 text-gray-600">{user.email}</p>
      <span className="inline-block px-2 py-1 text-sm bg-blue-100 rounded-full text-blue-800">
        {user.role}
      </span>
    </div>
  );
}

'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient';
import AddTodo from '../addTodo/AddTodo';
import DeleteTodo from '../deletetodo/deletetodo';
import { getCookie } from 'cookies-next';

interface User {
  id: number;
  description: string;
  completed: boolean;
  user_id: string;
}

const TodoApp: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const cookieValue = getCookie('sb-bmcfozonebwygxcdemaz-auth-token') || '';
const data = cookieValue ? JSON.parse(cookieValue) : null;  

  const id = data?.user?.id;

  async function fetchUsers() {
    const { data, error } = await supabase.from('Users').select('*');
    if (error) {
      console.error('Error fetching users:', error.message);
    } else {
      if (data) {
        setUsers(data);
      }
    }

  }

  const handleEdit = async (userId: number, newDescription: string) => {
    const { data, error } = await supabase.from('Users').update({ description: newDescription }).eq('id', userId);
    if (error) {
      console.error('Error updating user:', error.message);
    } else {
      fetchUsers();
      setEditingId(null);
    }
  };

  const handleCheckboxChange = async (userId: number, completed: boolean) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, completed: !completed };
      } else {
        return user;
      }
    });

    setUsers(updatedUsers);

    await supabase.from('Users').update({ completed: !completed }).eq('id', userId);
  };

  const filteredUsers = users.filter(user =>
    user.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const finalarr = filteredUsers.filter((users) => users.user_id == id)


  return (
    <div className="w-5/6 mx-auto  p-4 bg-black">
      <h1 className="text-blue-500 text-2xl text-center underline">Todo List</h1>
      <div className='mx-28 flex items-center justify-between'>
        <AddTodo fetchUsers={fetchUsers} />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-400 rounded text-black"
        />
      </div>
      <table className="w-5/6 mx-auto text-center">
        <thead>
          <tr className='bg-blue-400'>
            <th className="px-4 py-2">S.no</th>
            <th className='px-4 py-2'>Checkbox</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {finalarr.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-4 py-2 text-gray-400">{index + 1}</td>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  defaultChecked={user.completed}
                  onChange={() => handleCheckboxChange(user.id, user.completed)}
                />
              </td>
              <td className="border px-4 py-2 text-gray-400">
                {editingId === user.id ? (
                  <input
                    type="text"
                    value={user.description}
                    onChange={(e) => setUsers(users.map(u => u.id === user.id ? { ...u, description: e.target.value } : u))}
                  />
                ) : (
                  user.description
                )}
              </td>
              <td className="border px-4 py-2 flex gap-2">
                {editingId === user.id ? (
                  <button className='bg-green-600 text-white font-bold py-1 px-2 rounded' onClick={() => handleEdit(user.id, user.description)}>Save</button>
                ) : (
                  <button className='bg-blue-600 text-white font-bold py-1 px-2 rounded' onClick={() => setEditingId(user.id)}>Edit</button>
                )}
                <DeleteTodo userId={user.id} fetchUsers={fetchUsers} />
              </td>
              <td className="border px-4 py-2">
                {user.completed ? (
                  <span className="bg-green-500 text-white py-1 px-2 rounded">Completed</span>
                ) : (
                  <span className="bg-red-500 text-white py-1 px-2 rounded">Not Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;

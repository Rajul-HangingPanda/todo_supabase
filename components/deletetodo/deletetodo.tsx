// DeleteUser.tsx
import React from 'react';
import { supabase } from '../createClient';

interface Props {
  userId: number;
  fetchUsers: () => void;
}

const DeleteTodo: React.FC<Props> = ({ userId, fetchUsers }) => {
  const handleDelete = async () => {
    const { error } = await supabase.from('Users').delete().eq('id', userId);
    if (error) {
      console.error('Error deleting user:', error.message);
    } else {
      fetchUsers(); 
    }
  };

  return (
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteTodo;

"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient';
import { getCookie } from 'cookies-next';


interface AddTodoProps {
  fetchUsers: () => void;
}

interface CookieData {
  user: {
    id: string;
  }
}

const AddTodo: React.FC<AddTodoProps> = ({ fetchUsers }) => {
  const [description, setDescription] = useState('');
  const [cookies, setcookie] = useState<CookieData | null>(null);

  useEffect(() => {
    const cookieValue = getCookie('sb-bmcfozonebwygxcdemaz-auth-token') as string;
    if (typeof cookieValue === 'string') {
      const data = JSON.parse(cookieValue);
      setcookie(data);
      
    }
  }, []);

  const user_id=cookies?.user?.id;

  const handleAddTodo = async () => {
    if (description.trim() === '') {
      alert('Please enter a description for the todo.');
      return;
    }

    const { error } = await supabase.from('Users').insert([{ description,user_id }]);
    if (error) {
      console.error('Error adding todo:', error.message);
    } else {
      fetchUsers();
      setDescription('');
    }
  };



  return (
    <div className="mb-4">
      <input
        type="text"
        className="border px-8 py-2 mr-2 text-black"
        placeholder="Enter todo description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;


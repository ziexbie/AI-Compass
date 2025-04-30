'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { IconTrashFilled, IconPencil } from '@tabler/icons-react';

const ManageTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTools = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tool/getall');
      setTools(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast.error('Failed to load tools');
      setLoading(false);
    }
  };

  const deleteTool = async (toolId) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/tool/delete/${toolId}`);
        if (res.status === 200) {
          toast.success('Tool deleted successfully');
          fetchTools();
        }
      } catch (error) {
        console.error('Error deleting tool:', error);
        toast.error('Failed to delete tool');
      }
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pink-300">Manage AI Tools</h1>
          <Link
            href="/admin/add-tools"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            Add New Tool
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-300"></div>
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-pink-300 text-xl">No tools found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {tools.map((tool) => (
                  <tr key={tool._id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center text-white">
                        {tool.logo ? (
                          <img
                            src={tool.logo}
                            alt={tool.name}
                            className="h-8 w-8 rounded-full mr-3"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full mr-3 bg-gray-700 flex items-center justify-center">
                            <span className="text-pink-300 text-sm">{tool.name[0]}</span>
                          </div>
                        )}
                        <span className="font-medium">{tool.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{tool.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tool.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {tool.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => deleteTool(tool._id)}
                          className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <IconTrashFilled size={20} />
                        </button>
                        <Link
                            href={`/admin/update-tools?id=${tool._id}`}
                          className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <IconPencil size={20} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTools;
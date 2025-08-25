'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Application } from '@/types/application';

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        setError('Failed to fetch applications');
      }
    } catch (error) {
      setError('An error occurred while fetching applications');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-thin text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage job applications</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Applications ({applications.length})
            </h2>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications</h3>
              <p className="mt-1 text-sm text-gray-500">
                No applications have been submitted yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application, index) => (
                    <motion.tr
                      key={application._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.email}</div>
                        <div className="text-sm text-gray-500">{application.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {application.cvUrl ? (
                          <a
                            href={application.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 text-sm underline"
                          >
                            View CV
                          </a>
                        ) : (
                          <span className="text-gray-400 text-sm">No CV</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(application.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            const modal = document.getElementById(`modal-${application._id}`);
                            if (modal) modal.style.display = 'flex';
                          }}
                          className="text-gray-700 hover:text-gray-900 underline"
                        >
                          View Details
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Application Detail Modals */}
        {applications.map((application) => (
          <div
            key={application._id}
            id={`modal-${application._id}`}
            className="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                e.currentTarget.style.display = 'none';
              }
            }}
          >
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Application Details
                  </h3>
                  <button
                    onClick={() => {
                      const modal = document.getElementById(`modal-${application._id}`);
                      if (modal) modal.style.display = 'none';
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Basic Information</h4>
                    <p><strong>Name:</strong> {application.name}</p>
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Phone:</strong> {application.phone}</p>
                    <p><strong>Country:</strong> {application.country}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Motivation</h4>
                    <p className="text-gray-700">{application.motivation}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Project Pride</h4>
                    <p className="text-gray-700">{application.proudProject}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Dream Project</h4>
                    <p className="text-gray-700">{application.dreamProject}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Technologies</h4>
                    {application.technologies && application.technologies.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {application.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No technologies specified</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900">Links</h4>
                    {application.githubUrl && (
                      <p><strong>GitHub:</strong> <a href={application.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline">{application.githubUrl}</a></p>
                    )}
                    {application.linkedinUrl && (
                      <p><strong>LinkedIn:</strong> <a href={application.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline">{application.linkedinUrl}</a></p>
                    )}
                    {application.portfolioUrl && (
                      <p><strong>Portfolio:</strong> <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline">{application.portfolioUrl}</a></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

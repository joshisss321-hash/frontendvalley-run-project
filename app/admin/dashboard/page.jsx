'use client';

import { useEffect, useState } from 'react';
import StatCard from "../../components/admin/StatCard";
import { adminAPI } from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const result = await adminAPI.getStats();
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here's your overview</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon="👥"
          color="#00ff88"
        />
        <StatCard
          title="Registrations"
          value={stats?.totalRegistrations || 0}
          icon="📝"
          color="#ffc107"
        />
        <StatCard
          title="Submissions"
          value={stats?.totalSubmissions || 0}
          icon="🏃"
          color="#ff4444"
        />
        <StatCard
          title="Certificates"
          value={stats?.certificates || 0}
          icon="🏆"
          color="#00d4ff"
        />
      </div>

      <div className="stats-grid">
        <div className="card">
          <h3 style={{ marginTop: 0, color: '#888' }}>Pending Submissions</h3>
          <p style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>
            {stats?.pendingSubmissions || 0}
          </p>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0, color: '#888' }}>Approved Submissions</h3>
          <p style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>
            {stats?.approvedSubmissions || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Events', path: '/admin/events', icon: '🎯' },
    { name: 'Submissions', path: '/admin/submissions', icon: '🏃' },
    { name: 'Leaderboard', path: '/admin/leaderboard', icon: '🏆' },
    { name: 'Users', path: '/admin/users', icon: '👥' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>🔥 Admin Panel</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`nav-item ${pathname.startsWith(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      <button onClick={handleLogout} className="logout-btn">
        🚪 Logout
      </button>

      <style jsx>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
          border-right: 1px solid #2a2a2a;
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .sidebar-header {
          padding: 30px 20px;
          border-bottom: 1px solid #2a2a2a;
        }

        .sidebar-header h2 {
          color: #00ff88;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          color: #888;
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          margin: 5px 0;
        }

        .nav-item:hover {
          background: rgba(0, 255, 136, 0.05);
          color: #00ff88;
          border-left-color: #00ff88;
        }

        .nav-item.active {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          border-left-color: #00ff88;
        }

        .nav-icon {
          font-size: 20px;
          margin-right: 15px;
        }

        .nav-text {
          font-size: 16px;
          font-weight: 500;
        }

        .logout-btn {
          margin: 20px;
          padding: 15px;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #ff2222;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 80px;
          }

          .nav-text {
            display: none;
          }

          .sidebar-header h2 {
            font-size: 20px;
            text-align: center;
          }

          .logout-btn {
            font-size: 0;
            padding: 15px 10px;
          }

          .logout-btn:before {
            content: '🚪';
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
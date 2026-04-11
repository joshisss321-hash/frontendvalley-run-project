'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) return null;
  if (pathname === '/admin/login') return <>{children}</>;

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/events', label: 'Events', icon: '📅' },
    { href: '/admin/registrations', label: 'Registrations', icon: '👥' },
    { href: '/admin/users', label: 'Users', icon: '👤' },
    { href: '/admin/submissions', label: 'Submissions', icon: '🏃' },
    { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
    { href: '/admin/medal-reviews', label: 'Medal Reviews', icon: '🏅' },
    { href: '/admin/leaderboard', label: 'Leaderboard', icon: '🏆' },
  ];

  const logout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '220px', background: 'white', borderRight: '1px solid #e9ecef',
        display: 'flex', flexDirection: 'column', position: 'fixed',
        top: 0, left: 0, height: '100vh', zIndex: 100
      }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #e9ecef' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e' }}>🏃 Valley Run</div>
          <div style={{ fontSize: '11px', color: '#868e96', marginTop: '2px' }}>Admin Panel</div>
        </div>

        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                width: '100%', padding: '9px 12px', marginBottom: '2px',
                borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: pathname === item.href ? 600 : 400,
                background: pathname === item.href ? '#e8f4fd' : 'transparent',
                color: pathname === item.href ? '#1971c2' : '#495057',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '15px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '12px', borderTop: '1px solid #e9ecef' }}>
          <div style={{ fontSize: '11px', color: '#868e96', marginBottom: '8px' }}>admin@valleyrun.in</div>
          <button onClick={logout} style={{
            width: '100%', padding: '8px', borderRadius: '8px',
            border: '1px solid #e9ecef', background: 'white',
            color: '#e03131', fontSize: '12px', cursor: 'pointer', fontWeight: 600,
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '220px', flex: 1, padding: '24px', maxWidth: 'calc(100% - 220px)' }}>
        {children}
      </div>
    </div>
  );
}
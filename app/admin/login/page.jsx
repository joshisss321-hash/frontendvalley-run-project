'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ FIXED LOGIN CALL
      const result = await adminAPI.login({
        email: formData.email,
        password: formData.password
      });

      console.log("LOGIN RESPONSE:", result);

      if (result.success) {
        // ✅ SAVE TOKEN (BOTH)
        localStorage.setItem('adminToken', result.token);
        document.cookie = `adminToken=${result.token}; path=/; max-age=86400`;

        // ✅ REDIRECT
        router.push('/admin/dashboard');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Check backend/API URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <h1 className="login-title">🔥 Admin Panel</h1>
          <p className="login-subtitle">Sign in to continue</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>
      </div>

      {/* 🔥 PREMIUM CSS */}
      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #000, #111);
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 40px;
          border-radius: 20px;
          background: #111;
          box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
        }

        .login-title {
          font-size: 28px;
          color: #00ff88;
          text-align: center;
        }

        .login-subtitle {
          text-align: center;
          color: #aaa;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #333;
          background: #000;
          color: white;
        }

        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #00ff88;
          color: black;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          background: #00cc6a;
        }

        .error-message {
          background: rgba(255,0,0,0.1);
          color: red;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 8px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
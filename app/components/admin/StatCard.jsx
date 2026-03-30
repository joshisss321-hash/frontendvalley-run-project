'use client';

export default function StatCard({ title, value, icon, color = '#00ff88' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: `${color}22` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
      </div>

      <style jsx>{`
        .stat-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 1px solid #333;
          border-radius: 16px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 255, 136, 0.2);
          border-color: ${color};
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        .stat-content h3 {
          color: #888;
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          color: white;
          font-size: 32px;
          font-weight: 700;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
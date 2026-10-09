function StatCard({ title, value, icon }) {
  return (
    <div className="card stat-card h-100 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="text-muted mb-1">
              {title}
            </p>

            <h3 className="fw-bold mb-0">
              {value}
            </h3>
          </div>

          <div className="stat-icon">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
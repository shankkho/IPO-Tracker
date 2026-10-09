import { Link } from "react-router-dom";

function IPOCard({ ipo }) {
  const status = ipo.status?.toLowerCase();

  const statusClass =
    status === "open"
      ? "bg-success"
      : status === "upcoming"
      ? "bg-warning text-dark"
      : status === "closed"
      ? "bg-secondary"
      : "bg-info";

  return (
    <div className="card ipo-card h-100 shadow-sm border-0">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="fw-bold mb-1">
              {ipo.company}
            </h5>

            <small className="text-muted">
              {ipo.symbol}
            </small>
          </div>

          <span className={`badge ${statusClass}`}>
            {ipo.status}
          </span>
        </div>

        <hr />

        <div className="row g-3">

          <div className="col-6">
            <small className="text-muted">
              Price Range
            </small>

            <div className="fw-semibold">
              {ipo.priceRange}
            </div>
          </div>

          <div className="col-6">
            <small className="text-muted">
              Lot Size
            </small>

            <div className="fw-semibold">
              {ipo.lotSize}
            </div>
          </div>

          <div className="col-6">
            <small className="text-muted">
              Open Date
            </small>

            <div className="fw-semibold">
              {ipo.openDate}
            </div>
          </div>

          <div className="col-6">
            <small className="text-muted">
              Close Date
            </small>

            <div className="fw-semibold">
              {ipo.closeDate}
            </div>
          </div>

        </div>

        <div className="mt-4">
          <Link
            to={`/ipo/${ipo.id}`}
            state={{ ipo }}
            className="btn btn-primary w-100"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
}

export default IPOCard;
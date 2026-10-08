function IPOCard({ ipo }) {
  const getStatusClass = () => {
    if (ipo.status === "Open") {
      return "bg-success";
    }

    if (ipo.status === "Upcoming") {
      return "bg-warning text-dark";
    }

    return "bg-secondary";
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="card-title fw-bold mb-1">
                {ipo.company}
              </h5>

              <small className="text-muted">
                {ipo.symbol}
              </small>
            </div>

            <span className={`badge ${getStatusClass()}`}>
              {ipo.status}
            </span>
          </div>

          <hr />

          <div className="row g-3">

            <div className="col-6">
              <small className="text-muted d-block">
                Price Range
              </small>

              <strong>{ipo.priceRange}</strong>
            </div>

            <div className="col-6">
              <small className="text-muted d-block">
                Lot Size
              </small>

              <strong>{ipo.lotSize}</strong>
            </div>

            <div className="col-6">
              <small className="text-muted d-block">
                Open Date
              </small>

              <strong>{ipo.openDate}</strong>
            </div>

            <div className="col-6">
              <small className="text-muted d-block">
                Close Date
              </small>

              <strong>{ipo.closeDate}</strong>
            </div>

          </div>

          <div className="mt-3">
            <small className="text-muted">
              Subscription
            </small>

            <h5 className="mb-0">
              {ipo.subscription}
            </h5>
          </div>

          <button className="btn btn-outline-dark w-100 mt-4">
            View Details
          </button>

        </div>
      </div>
    </div>
  );
}

export default IPOCard;
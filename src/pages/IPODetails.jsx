import { useLocation, useNavigate } from "react-router-dom";

function IPODetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const ipo = location.state?.ipo;

  if (!ipo) {
    return (
      <div className="container py-5">

        <div className="alert alert-warning">
          IPO details are not available.
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>

      </div>
    );
  }

  return (
    <div className="container py-5">

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-start mb-4">

            <div>
              <h1 className="fw-bold">
                {ipo.company}
              </h1>

              <p className="text-muted">
                {ipo.symbol}
              </p>
            </div>

            <span className="badge bg-primary">
              {ipo.status}
            </span>

          </div>

          <hr />

          <div className="row g-4">

            <div className="col-md-4">
              <small className="text-muted">
                Price Range
              </small>

              <h5>{ipo.priceRange}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Lot Size
              </small>

              <h5>{ipo.lotSize}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Issue Size
              </small>

              <h5>{ipo.issueSize}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Open Date
              </small>

              <h5>{ipo.openDate}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Close Date
              </small>

              <h5>{ipo.closeDate}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Listing Date
              </small>

              <h5>{ipo.listingDate}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Subscription
              </small>

              <h5>{ipo.subscription}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                GMP
              </small>

              <h5>{ipo.gmp}</h5>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Board
              </small>

              <h5>{ipo.board}</h5>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default IPODetails;
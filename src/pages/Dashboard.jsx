import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import SearchBar from "../components/SearchBar";
import IPOCard from "../components/IPOCard";
import StatCard from "../components/StatCard";
import Loading from "../components/Loading";

import { getIPOs } from "../services/ipoApi";

function Dashboard() {
  const [ipos, setIpos] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIPOData = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getIPOs();

      setIpos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPOData();
  }, []);

  const filteredIPOs = useMemo(() => {
    return ipos.filter((ipo) => {
      const matchesSearch =
        ipo.company
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ipo.symbol
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" ||
        ipo.status?.toUpperCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [ipos, search, status]);

  const stats = useMemo(() => {
    const open = ipos.filter(
      (ipo) =>
        ipo.status?.toLowerCase() === "open"
    ).length;

    const upcoming = ipos.filter(
      (ipo) =>
        ipo.status?.toLowerCase() === "upcoming"
    ).length;

    const listed = ipos.filter(
      (ipo) =>
        ipo.status?.toLowerCase() === "listed"
    ).length;

    return {
      total: ipos.length,
      open,
      upcoming,
      listed,
    };
  }, [ipos]);

  const chartData = useMemo(() => {
    return ipos
      .slice(0, 8)
      .map((ipo) => ({
        name: ipo.symbol,
        subscription:
          typeof ipo.subscription === "number"
            ? ipo.subscription
            : 0,
      }));
  }, [ipos]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container py-5">

      {/* Hero */}
      <div className="dashboard-hero mb-5">
        <div>
          <h1 className="fw-bold">
            IPO Tracker
          </h1>

          <p className="text-muted mb-0">
            Track Indian IPOs with live market data.
          </p>
        </div>

        <button
          className="btn btn-dark"
          onClick={fetchIPOData}
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          <strong>Error:</strong> {error}

          <button
            className="btn btn-sm btn-danger ms-3"
            onClick={fetchIPOData}
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <StatCard
            title="Total IPOs"
            value={stats.total}
            icon="📊"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            title="Open IPOs"
            value={stats.open}
            icon="🟢"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            title="Upcoming IPOs"
            value={stats.upcoming}
            icon="📅"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            title="Listed IPOs"
            value={stats.listed}
            icon="📈"
          />
        </div>

      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-4">

        {["ALL", "OPEN", "UPCOMING", "CLOSED", "LISTED"].map(
          (filter) => (
            <button
              key={filter}
              className={`btn ${
                status === filter
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setStatus(filter)}
            >
              {filter}
            </button>
          )
        )}

      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="card border-0 shadow-sm mb-5">
          <div className="card-body">

            <h5 className="fw-bold mb-4">
              IPO Subscription Analysis
            </h5>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="subscription"
                    strokeWidth={3}
                  />

                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      )}

      {/* IPO List */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <h4 className="fw-bold mb-0">
          IPO Listings
        </h4>

        <span className="text-muted">
          {filteredIPOs.length} results
        </span>

      </div>

      <div className="row g-4">

        {filteredIPOs.length > 0 ? (
          filteredIPOs.map((ipo) => (
            <div
              className="col-md-6 col-lg-4"
              key={ipo.id}
            >
              <IPOCard ipo={ipo} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              No IPOs found.
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
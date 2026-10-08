import { useState } from "react";

import ipoData from "../data/ipoData";

import SearchBar from "../components/SearchBar";
import IPOCard from "../components/IPOCard";

function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredIPOs = ipoData.filter((ipo) => {
    const searchText = search.toLowerCase();

    return (
      ipo.company.toLowerCase().includes(searchText) ||
      ipo.symbol.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="bg-light min-vh-100">

      {/* Hero Section */}
      <section className="py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">
              IPO Tracker & Analysis
            </h1>

            <p className="lead text-muted">
              Track upcoming, open and recently closed IPOs
            </p>
          </div>

          {/* Stats */}
          <div className="row g-3 mb-5">

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">
                    Total IPOs
                  </h6>

                  <h2 className="fw-bold">
                    {ipoData.length}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">
                    Open IPOs
                  </h6>

                  <h2 className="fw-bold text-success">
                    {
                      ipoData.filter(
                        (ipo) => ipo.status === "Open"
                      ).length
                    }
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <h6 className="text-muted">
                    Upcoming IPOs
                  </h6>

                  <h2 className="fw-bold">
                    {
                      ipoData.filter(
                        (ipo) => ipo.status === "Upcoming"
                      ).length
                    }
                  </h2>
                </div>
              </div>
            </div>

          </div>

          {/* Search */}
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          {/* IPO Cards */}
          <div className="row">

            {filteredIPOs.length > 0 ? (
              filteredIPOs.map((ipo) => (
                <IPOCard
                  key={ipo.id}
                  ipo={ipo}
                />
              ))
            ) : (
              <div className="text-center py-5">
                <h5>No IPOs found</h5>

                <p className="text-muted">
                  Try searching with another company name.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";

import IPOCard from "../components/IPOCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

import { getIPOs } from "../services/ipoApi";

function IPOs() {
  const [ipos, setIpos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIPOs = async () => {
      try {
        const data = await getIPOs();
        setIpos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadIPOs();
  }, []);

  const filteredIPOs = ipos.filter((ipo) =>
    `${ipo.company} ${ipo.symbol}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h1 className="fw-bold">
          All IPOs
        </h1>

        <p className="text-muted">
          Explore all available IPO listings.
        </p>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="row g-4">

        {filteredIPOs.map((ipo) => (
          <div
            className="col-md-6 col-lg-4"
            key={ipo.id}
          >
            <IPOCard ipo={ipo} />
          </div>
        ))}

      </div>

      {filteredIPOs.length === 0 && (
        <div className="alert alert-info">
          No IPOs found.
        </div>
      )}

    </div>
  );
}

export default IPOs;
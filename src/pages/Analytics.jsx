import { useEffect, useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Loading from "../components/Loading";
import { getIPOs } from "../services/ipoApi";

function Analytics() {
  const [ipos, setIpos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getIPOs();
        setIpos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const chartData = useMemo(() => {
    return ipos
      .slice(0, 10)
      .map((ipo) => ({
        name: ipo.symbol,
        subscription:
          Number(ipo.subscription) || 0,
      }));
  }, [ipos]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container py-5">

      <div className="mb-5">
        <h1 className="fw-bold">
          IPO Analytics
        </h1>

        <p className="text-muted">
          Analyze IPO market data and subscription trends.
        </p>
      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <h5 className="fw-bold mb-4">
            IPO Subscription Comparison
          </h5>

          <div
            style={{
              width: "100%",
              height: 400,
            }}
          >
            <ResponsiveContainer>
              <BarChart data={chartData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="subscription"
                />

              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;
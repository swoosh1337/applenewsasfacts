import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../header.css";


const apiKey = "HKHHW9109M6ITER3";

function Header() {
  const [stockData, setStockData] = useState({
    AAPL: null,
    META: null,
    AMZN: null,
  });

  const navigate = useNavigate();

  const handleAuthButtonClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    const fetchStockData = async (symbol) => {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
        const closePrice = parseFloat(
          data["Time Series (Daily)"][lastRefreshed]["4. close"]
        ).toFixed(2);
        setStockData((prevData) => ({ ...prevData, [symbol]: closePrice }));
        console.log(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    ["AAPL", "META", "AMZN"].forEach(fetchStockData);
  }, [stockData]);

  return (
    <header className="site-header">
      <div className="site-branding">
        <h1>Apple news as facts</h1>
      </div>
      <div className="market-data">
        <p>
          AAPL{" "}
          <span>{stockData.AAPL ? `$${stockData.AAPL}` : "Loading..."}</span>
        </p>
        <p>
          META{" "}
          <span>{stockData.META ? `$${stockData.META}` : "Loading..."}</span>
        </p>
        <p>
          AMZN{" "}
          <span>{stockData.AMZN ? `$${stockData.AMZN}` : "Loading..."}</span>
        </p>
      </div>
      <div className="tagline">
        <p>The most important Apple news around the world.</p>
        <p>Unbiased. Concise. Forever ad-free and privacy respecting.</p>
      </div>
      <div className="auth-actions">
        <button onClick={handleAuthButtonClick}>Sign up / in</button>
      </div>
    </header>
  );
}

export default Header;

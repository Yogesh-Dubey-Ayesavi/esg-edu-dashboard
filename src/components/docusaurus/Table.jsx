"use client";

import React, { useState, useEffect } from "react";
import "./Table.css";

const DUMMYDATA = [
  { name: "Amazon", id: 1, city: "Hyderabad", rank: 1, rewards: "none" },
  { name: "Netflix", id: 12, city: "Delhi", rank: 2, rewards: 150 },
  { name: "Apple", id: 2, city: "Bangalore", rank: 3, rewards: "something" },
];

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    // fetchData();
  }, []);

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="responsive-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Rank</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <tbody>
            {DUMMYDATA.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.city}</td>
                <td>{item.rank}</td>
                <td>{item.rewards}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;

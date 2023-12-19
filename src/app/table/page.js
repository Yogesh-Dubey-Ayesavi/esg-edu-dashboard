// ResponsiveTable.js
import React from "react";

const ResponsiveTable = () => {
  const data = [
    {
      name: "John Doe",
      city: "Cityville",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      date: "2023-01-01",
      website: "www.example.com",
      employees: "Employee ABC",
      rank: "Manager",
      fileUrl: "www.example.com/file1",
    },
    {
      name: "Jane Smith",
      city: "Townsville",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Oak St",
      date: "2023-02-15",
      website: "www.janeswebsite.com",
      employees: "Employee XYZ",
      rank: "Supervisor",
      fileUrl: "www.janeswebsite.com/file2",
    },
    // Add more dummy data items as needed
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>City</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Phone No</th>
            <th style={tableHeaderStyle}>Address</th>
            <th style={tableHeaderStyle}>Date</th>
            <th style={tableHeaderStyle}>Website</th>
            <th style={tableHeaderStyle}>Employees</th>
            <th style={tableHeaderStyle}>Rank</th>
            <th style={tableHeaderStyle}>File URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{item.name}</td>
              <td style={tableCellStyle}>{item.city}</td>
              <td style={tableCellStyle}>{item.email}</td>
              <td style={tableCellStyle}>{item.phone}</td>
              <td style={tableCellStyle}>{item.address}</td>
              <td style={tableCellStyle}>{item.date}</td>
              <td style={tableCellStyle}>{item.website}</td>
              <td style={tableCellStyle}>{item.employees}</td>
              <td style={tableCellStyle}>{item.rank}</td>
              <td style={tableCellStyle}>{item.fileUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

export default ResponsiveTable;

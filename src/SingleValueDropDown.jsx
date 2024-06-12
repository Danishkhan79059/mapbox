import React, { useState } from "react";
import { FaFilter, FaCaretRight, FaCaretDown } from "react-icons/fa";

export default function SinglevalueSlider() {
  const customerIds = [
    "All",
    "AA-1098",
    "AA-1124",
    "AB-2324",
    "AC-1025",
    "CD-5623",
    "DA-2623",
  ];

  const [filteredIds, setFilteredIds] = useState(customerIds);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredIds(
      customerIds.filter((id) =>
        id.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(value)
        ? prevSelectedIds.filter((id) => id !== value)
        : [...prevSelectedIds, value]
    );
  };

  return (
    <div
      className="search-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>MultiValue(List)</h1>
      <div
        className="search-box"
        style={{
          position: "relative",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "300px",
        }}
      >
        <div
          className="label-icon-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <label
            htmlFor="customer-id"
            className="customer-id-label"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "91px",
            }}
          >
            Customer ID
          </label>
          <FaFilter style={{ fontSize: "18px", color: "#333" }} />
          <FaCaretRight style={{ fontSize: "18px", color: "#333" }} />
        </div>
            
        <div style={{ position: "relative" }}>
          <input
          
            id="customer-id"
            name="customer-id"
            className="customer-id-input"
            style={{
              width: "200px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              paddingRight: "30px",
              backgroundColor: "#cfcdca",
            }}
            value={searchTerm}
            onChange={handleSearch}
            readOnly
          />
        </div>

        {filteredIds.length === 0 ? (
          <div style={{ padding: "10px", textAlign: "center" }}>
            No results found
          </div>
        ) : (
          filteredIds.map((id, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "background-color 0.3s",
                backgroundColor: selectedIds.includes(id)
                  ? "#f0f0f0"
                  : "transparent",
              }}
            >
              <input
                type="checkbox"
                id={`checkbox-${id}`}
                name="customer-id-checkbox"
                value={id}
                style={{ marginRight: "10px", cursor: "pointer" }}
                checked={selectedIds.includes(id)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`checkbox-${id}`} style={{ cursor: "pointer" }}>
                {id}
              </label>
            </div>
          ))
          
        )}
      </div>
    </div>
  );
}

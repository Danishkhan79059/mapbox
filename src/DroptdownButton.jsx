import React, { useState } from "react";
import {
  FaFilter,
  FaCaretUp,
  FaCaretDown,
  FaSearch,
  FaCaretRight,
} from "react-icons/fa";

export default function DropdownButton() {
  const customerIds = [
    { id: "All" },
    { id: "AA-1098" },
    { id: "AA-1124" },
    { id: "AB-2324" },
    { id: "AC-1025" },
    { id: "CD-5623" },
    { id: "DA-2623" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const filteredIds = customerIds.filter((id) =>
    id.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.trim() !== "") {
      setShowDropdown(true);
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
  };

  const handleItemClick = (id) => {
    setSelectedValue(id);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="search-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>button</h1>
      <div
        className="search-box"
        style={{
          position: "relative",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          border: "2px solid #ccc",
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
              marginRight: "93px",
            }}
          >
            Customer ID
          </label>
          <FaFilter style={{ fontSize: "18px", color: "#333" }} />
          <FaCaretRight />
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
            value={selectedValue || searchTerm}
            onChange={handleSearch}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            readOnly
          />
          {showDropdown ? (
            <FaCaretDown
              onClick={handleIconClick}
              style={{
                position: "absolute",
                top: "50%",
                right: "37px",
                transform: "translateY(-50%)",
                color: "#333",
                cursor: "pointer",
              }}
            />
          ) : (
            <FaCaretUp
              onClick={handleIconClick}
              style={{
                position: "absolute",
                top: "50%",
                right: "37px",
                transform: "translateY(-50%)",
                color: "#333",
                cursor: "pointer",
              }}
            />
          )}
        </div>

        {showDropdown && (
          <div
            className="dropdown"
            style={{
              position: "absolute",
              top: "100%",
              left: "0",
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "5px",
              zIndex: "1200",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "100%",
            }}
          >
            <div style={{ padding: "10px" }}>
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: "calc(100% - 40px)",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {filteredIds.map((id, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  textAlign: "left",
                }}
                onClick={() => handleItemClick(id.id)}
              >
                <input
                  type="checkbox"
                  checked={id.id === selectedValue}
                  onChange={() => handleItemClick(id.id)}
                  style={{ marginRight: "10px" }}
                />
                <span>{id.id}</span>
              </div>
            ))}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
                style={{
                  marginRight: "150px",
                  backgroundColor: "#e6e6eb",
                  color: "black",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  backgroundColor: "#0a124a",
                  color: "white",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

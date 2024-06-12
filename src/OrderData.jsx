import React, { useState } from "react";
import { FaFilter, FaCaretUp, FaCaretDown, FaSearch, FaCaretRight } from "react-icons/fa";

export default function OrderData() {
  const customerIds = [
    { id: "All" },
    { id: "AA-1098" },
    { id: "AA-1124" },
    { id: "AB-2324" },
    { id: "AC-1025" },
    { id: "CD-5623" },
    { id: "DA-2623" },
  ];

  const yearOptions = [
    { year: "2021" },
    { year: "2022" },
    { year: "2023" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedYears, setSelectedYears] = useState([]);

  const filteredIds = customerIds.filter((id) =>
    id.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    if (!inputText) {
      setShowDropdown(false);
    }
  };

  const handleItemClick = (id) => {
    setSelectedValue(id);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleTextInputChange = (e) => {
    setInputText(e.target.value);
    setShowDropdown(true);
    setSearchTerm(e.target.value);
  };

  const toggleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
  };

  const handleCheckboxChange = (year) => {
    setSelectedYears((prevSelectedYears) =>
      prevSelectedYears.includes(year)
        ? prevSelectedYears.filter((y) => y !== year)
        : [...prevSelectedYears, year]
    );
  };

  return (
    <div
      className="search-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>Year and Date</h1>

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
            Order Date
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
              maxHeight: "300px", // Increased maxHeight to accommodate both dropdowns
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <div style={{ position: "relative", padding: "10px" }}>
              <FaSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  transform: "translateY(-50%)",
                  color: "#d1d0cd",
                }}
              />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "16px",
                  paddingRight: "30px",
                }}
                value={searchTerm}
                onChange={handleTextInputChange}
              />
            </div>

            {filteredIds.map((id, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  textAlign: "left",
                }}
                onClick={() => handleItemClick(id.id)}
              >
                {id.id}
              </div>
            ))}

            <div
              className="dropdown-header"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={toggleYearDropdown}
            >
              Year of Date
              <FaFilter style={{ fontSize: "18px", color: "#333", marginLeft: "auto" }} />
              {showYearDropdown ? (
                <FaCaretUp style={{ fontSize: "18px", color: "#333", marginLeft: "5px" }} />
              ) : (
                <FaCaretRight style={{ fontSize: "18px", color: "#333", marginLeft: "5px" }} />
              )}
            </div>

            {showYearDropdown && (
              <div style={{ padding: "10px" }}>
                {yearOptions.map((option, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                    <input
                      type="checkbox"
                      id={`checkbox-${option.year}`}
                      value={option.year}
                      checked={selectedYears.includes(option.year)}
                      onChange={() => handleCheckboxChange(option.year)}
                      style={{ marginRight: "10px" }}
                    />
                    <label htmlFor={`checkbox-${option.year}`}>{option.year}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

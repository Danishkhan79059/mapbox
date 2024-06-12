
import React, { useState } from "react";
import { FaFilter, FaCaretRight } from "react-icons/fa";

export default function SinglevalueSlider() {
  const customerIds = [
    "(All)",
    "AA-1098",
    "AA-1124",
    "AB-2324",
    "AC-1025",
    "CD-5623",
    "DA-2623",
  ];

  const filterOptions = [
    " Edit-Filter",
    "Remove Filter",
    "Apply to worksheet",
    "Single Value list",
    "Multiple Value Dropdown",
    "single value slider",
    "Multiple value (list)",
    "Multiple value (dropdown)",
    "Multiple value (Custome list)",
    "All Value",
    "Show apply Button",
    "Include value ",
    "Hide Filter",
  ];

  const [filteredIds, setFilteredIds] = useState(customerIds);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredIds(
      customerIds.filter((id) =>
        id.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleRadioChange = (e) => {
    setSelectedId(e.target.value);
  };

  const togglePopup = (content) => {
    setPopupVisible(!popupVisible);
    setPopupContent(content);
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
      <h1>Singlevalue(list)</h1>
      <div
        className="search-box"
        style={{
          position: "relative",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <label
            htmlFor="customer-id"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "91px",
            }}
          >
            Customer ID
          </label>
          <FaFilter style={{ fontSize: "18px", color: "#333" }} />
          <FaCaretRight
            style={{ fontSize: "18px", color: "#333", cursor: "pointer" }}
            onClick={() => togglePopup(filterOptions)}
          />
        </div>

        <div style={{ position: "relative" }}>
          <input
            type="text"
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
            value={selectedId}
            readOnly
          />
        </div>

        {popupVisible && (
          <div
            style={{
              position: "fixed",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              zIndex: "999",
              maxWidth: "500px",
              border: "0.5px solid black",
            }}
          >
            {popupContent.map((option, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    padding: "5px 40px",
                    color: "black",
                    cursor: "pointer",
                    display: "flex",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => togglePopup(option)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#aab5fa")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        )}

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
                backgroundColor: selectedId === id ? "#f0f0f0" : "transparent",
              }}
            >
              <input
                type="radio"
                id={`radio-${id}`}
                name="customer-id-radio"
                value={id}
                style={{ marginRight: "10px", cursor: "pointer" }}
                checked={selectedId === id}
                onChange={handleRadioChange}
              />
              <label htmlFor={`radio-${id}`} style={{ cursor: "pointer" }}>
                {id}
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  FaFilter,
  FaCaretRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

export default function Range() {
  const [rangeValue, setRangeValue] = useState(50);

  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  const incrementRange = () => {
    setRangeValue((prevValue) => Math.max(0, parseInt(prevValue) - 1));
  };

  const decrementRange = () => {
    setRangeValue((prevValue) => Math.min(100, parseInt(prevValue) + 1));
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
            readOnly
          />
        </div>

        <div
          className="range-bar-container"
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="range"
            min="0"
            max="100"
            value={rangeValue}
            onChange={handleRangeChange}
            style={{
              width: "200px",
              marginRight: "10px",
            }}
          />
          <FaChevronCircleLeft
            onClick={incrementRange}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          />
          <FaChevronCircleRight
            onClick={decrementRange}
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
        </div>
        <div
          className="range-value"
          style={{
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          {/* Value: {rangeValue} */}
        </div>
      </div>
    </div>
  );
}

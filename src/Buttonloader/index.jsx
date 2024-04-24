import React, { useState, useEffect } from "react";

const ButtonLoader = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);

    // Simulating an API call with setTimeout
    setTimeout(() => {
      fetch("localhost:3500/auth")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          setData(responseData); // Set fetched data to state
          setLoading(false); // Reset loading state
        })
        .catch((error) => {
          setError(error.message); // Set error message to state
          setLoading(false); // Reset loading state
        });
    }, 2000);
  };

  return (
    <div style={{ marginTop: "90px" }}>
      <button
        className="button"
        onClick={fetchData}
        disabled={loading}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading && (
          <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
        )}
        {loading ? (
          <span>Loading Data from Server</span>
        ) : (
          <span>Fetch Data from Server</span>
        )}
      </button>

      {/* Display fetched data */}
      {data && (
        <div style={{ marginTop: "20px" }}>
          <h2>Fetched Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {/* Display error message if any */}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default ButtonLoader;













































































// import React, { useState, useEffect } from "react";

// const ButtonLoader = () => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       try {
//         const response = await fetch("localhost:3500/register");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const responseData = await response.json();
//         setData(responseData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData(); // Call fetchData function when component mounts
//   }, []); // Empty dependency array ensures this effect runs only once on mount

//   const handleButtonClick = () => {
//     fetchData(); // Re-fetch data when button is clicked
//   };

//   return (
//     <div style={{ marginTop: "90px" }}>
//       <button
//         className="button"
//         onClick={handleButtonClick}
//         disabled={loading}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: "blue",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//       >
//         {loading && (
//           <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
//         )}
//         {loading ? <span>Loading Data from Server</span> : <span>Fetch Data from Server</span>}
//       </button>

//       {/* Display fetched data */}
//       {data && (
//         <div style={{ marginTop: "20px" }}>
//           <h2>Fetched Data</h2>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}

//       {/* Display error message if any */}
//       {error && (
//         <div style={{ marginTop: "20px", color: "red" }}>
//           <p>Error: {error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ButtonLoader;

// // import React, { useState, useEffect } from "react";

// // const ButtonLoader = () => {
// //   const [loading, setLoading] = useState(false);

// //   const fetchData = () => {
// //     setLoading(true);

// //     // Faking API call here
// //     setTimeout(() => {
// //       setLoading(false);
// //     }, 2000);
// //   };

// //   return (
// //     <div style={{ marginTop: "90px" }}>
// //       <button
// //   className="button"
// //   onClick={fetchData}
// //   disabled={loading}
// //   style={{
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: '10px 20px',
// //     fontSize: '16px',
// //     backgroundColor: 'blue',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: '5px',
// //     cursor: 'pointer'
// //   }}
// // >
// //   {loading && (
// //     <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
// //   )}
// //   {loading ? <span>Loading Data from Server</span> : <span>Fetch Data from Server</span>}
// // </button>
// //     </div>
// //   );
// // };

// // export default ButtonLoader;

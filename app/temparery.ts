// const GeneratedComponent = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundImage: "linear-gradient(to bottom, #020202, #050816)",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <button
//         style={{
//           padding: "16px 32px",
//           borderRadius: "24px",
//           border: "1px solid #ffffff10",
//           background: "linear-gradient(90deg, #7a29ff, #4c51bf, #6337ff)",
//           backdropFilter: "blur(5px)",
//           color: "#ffffff",
//           fontFamily: "Montserrat, sans-serif",
//           fontWeight: "700",
//           fontSize: "18px",
//           cursor: "pointer",
//           boxShadow: "0px 0px 10px rgba(122, 41, 255, 0.2)",
//           transition: "all 0.3s ease",
//         }}
//         onMouseOver={(e) => {
//           e.target.style.transform = "scale(1.05)";
//           e.target.style.boxShadow = "0px 0px 20px rgba(122, 41, 255, 0.4)";
//         }}
//         onMouseOut={(e) => {
//           e.target.style.transform = "scale(1)";
//           e.target.style.boxShadow = "0px 0px 10px rgba(122, 41, 255, 0.2)";
//         }}
//         onClick={(e) => {
//           const rect = e.target.getBoundingClientRect();
//           const x = e.clientX - rect.left;
//           const y = e.clientY - rect.top;
//           const ripple = document.createElement("span");
//           ripple.style.position = "absolute";
//           ripple.style.left = `${x}px`;
//           ripple.style.top = `${y}px`;
//           ripple.style.width = "0px";
//           ripple.style.height = "0px";
//           ripple.style.borderRadius = "50%";
//           ripple.style.background = "rgba(122, 41, 255, 0.4)";
//           ripple.style.transform = "scale(0)";
//           ripple.style.transition = "all 0.5s ease";
//           e.target.appendChild(ripple);
//           setTimeout(() => {
//             ripple.style.transform = "scale(2)";
//             ripple.style.opacity = "0";
//           }, 100);
//           setTimeout(() => {
//             ripple.remove();
//           }, 600);
//         }}
//       >
//         Click Me
//       </button>
//     </div>
//   );
// };

// render(<GeneratedComponent />);
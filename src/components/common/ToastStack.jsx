// import { useEffect, useState } from "react";
// import "../../styles/components/ToastStack.css";

// const ToastStack = ({ toasts, onRemove }) => {
//   const [visibleToasts, setVisibleToasts] = useState([]);

//   useEffect(() => {
//     if (toasts.length > 0) {
//       const newToast = toasts[toasts.length - 1];

//       // Add new toast to visible toasts
//       setVisibleToasts((prev) => [...prev, newToast]);

//       // Auto remove after 3 seconds
//       const timer = setTimeout(() => {
//         setVisibleToasts((prev) => prev.filter((t) => t.id !== newToast.id));
//         setTimeout(() => onRemove(newToast.id), 300); // Wait for animation
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [toasts, onRemove]);

//   // Remove toasts that are no longer in the props
//   useEffect(() => {
//     setVisibleToasts((prev) =>
//       prev.filter((toast) => toasts.some((t) => t.id === toast.id))
//     );
//   }, [toasts]);

//   const handleManualClose = (toastId) => {
//     setVisibleToasts((prev) => prev.filter((t) => t.id !== toastId));
//     setTimeout(() => onRemove(toastId), 300);
//   };

//   return (
//     <div className="toast-stack">
//       {visibleToasts.map((toast, index) => (
//         <div
//           key={toast.id}
//           className={`toast ${
//             index === visibleToasts.length - 1 ? "toast-latest" : ""
//           }`}
//           style={{
//             transform: `translateY(-${index * 70}px)`,
//             zIndex: 1000 - index,
//           }}
//         >
//           <div className="toast-content">
//             <span className="toast-message">{toast.message}</span>
//             <button
//               className="toast-close"
//               onClick={() => handleManualClose(toast.id)}
//             >
//               ×
//             </button>
//           </div>
//           <div className="toast-progress">
//             <div className="toast-progress-bar" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ToastStack;

import React from "react";

const Loader = () => {
  return (
//   <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm bg-black/40">
//   <div className="relative w-32 h-32 bg-white rounded-full">

//     <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
  
//     <div className="absolute inset-4 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
   
//     <div className="absolute inset-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin-fast"></div>

   
//     <div className="absolute inset-12 flex items-center justify-center text-5xl font-bold text-orange-600 bg-white rounded-full">
//       ॐ
//     </div>
//   </div>

//   <p className="mt-6 text-white text-lg font-medium animate-pulse">Loading...</p>

 
//   <style>{`
//     .animate-spin-slow {
//       animation: spin 4s linear infinite;
//     }
//     .animate-spin-fast {
//       animation: spin 1.5s linear infinite;
//     }
//     @keyframes spin {
//       to { transform: rotate(360deg); }
//     }
//   `}</style>
// </div>
<div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm bg-black/40">
  <div className="relative w-36 h-36">
    <div
      className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin-slow"
      style={{
        borderImage: "conic-gradient(from 0deg, #8b5cf6, #ec4899, #f97316, #8b5cf6) 1",
        boxShadow: "0 0 15px #ec4899, 0 0 30px #f97316",
      }}
    ></div>

    <div
      className="absolute inset-5 rounded-full border-4 border-t-transparent animate-spin"
      style={{
        borderImage: "conic-gradient(from 180deg, #f97316, #8b5cf6, #ec4899, #f97316) 1",
        boxShadow: "0 0 10px #f97316, 0 0 20px #ec4899",
      }}
    ></div>

    <div
      className="absolute inset-10 rounded-full border-4 border-t-transparent animate-spin-fast"
      style={{
        borderImage: "conic-gradient(from 90deg, #ec4899, #f97316, #8b5cf6, #ec4899) 1",
        boxShadow: "0 0 8px #8b5cf6, 0 0 15px #ec4899",
      }}
    ></div>

    <div
      className="absolute inset-14 flex items-center justify-center text-6xl font-extrabold text-orange-400 bg-black rounded-full shadow-[0_0_25px_rgba(249,115,22,0.9)] animate-pulse-scale"
      style={{
        filter: "drop-shadow(0 0 10px #f97316)",
      }}
    >
      ॐ
    </div>
  </div>
  <p className="mt-8 text-white text-xl font-semibold animate-pulse tracking-wide">
    Loading...
  </p>
  <style>{`
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes spin-slow {
      to { transform: rotate(360deg); }
    }
    @keyframes spin-fast {
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 2s linear infinite;
    }
    .animate-spin-slow {
      animation: spin 5s linear infinite;
    }
    .animate-spin-fast {
      animation: spin 1.2s linear infinite;
    }
    @keyframes pulse-scale {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }
    .animate-pulse-scale {
      animation: pulse-scale 2.5s ease-in-out infinite;
    }
  `}</style>
</div>

  );
};

export default Loader;

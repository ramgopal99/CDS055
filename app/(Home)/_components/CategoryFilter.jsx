// "use client";
// import React, { useState } from "react";

// function CategoryFilter() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const filterOptions = [
//     { id: 1, name: "All", value: "all" },
//     { id: 2, name: "Web Development", value: "webdev" },
//     { id: 3, name: "Mobile Development", value: "mobiledev" },
//     { id: 4, name: "Data Science", value: "datascience" },
//   ];

//   return (
//     <div className="flex gap-4 justify-center">
//       {filterOptions.map((item, index) => (
//         <button
//           key={item.id}
//           className={`transition duration-300 ease-in-out border p-4 px-6 text-sm rounded-md font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 ${
//             activeIndex === index
//               ? "bg-purple-500 text-white border-purple-600"
//               : "bg-white text-gray-700 border-gray-300 hover:border-purple-500"
//           }`}
//           onClick={() => setActiveIndex(index)}
//         >
//           <h2>{item.name}</h2>
//         </button>
//       ))}
//     </div>
//   );
// }

// export default CategoryFilter;

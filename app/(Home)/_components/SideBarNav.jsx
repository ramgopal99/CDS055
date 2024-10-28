// "use client";
// import { Search, Code, MessageSquare } from 'lucide-react';
// import Image from 'next/image';
// import React, { useState } from 'react';

// function SideBarNav() {
//   const menuList = [
//     {
//       id: 1,
//       name: 'Browse',
//       icon: Search,
//       path: '/browse'
//     },
//     {
//       id: 2,
//       name: 'Playground',
//       icon: Code,
//       path: '/playground'
//     },
//     {
//       id: 3,
//       name: 'Chatbot',
//       icon: MessageSquare,
//       path: '/chatbot'
//     }
//   ];

//   const [activeIndex, setActiveIndex] = useState(null);

//   return (
//     <div className="h-full bg-gray-50 border-r flex flex-col overflow-y-auto shadow-lg">
//       <div className="p-5 border-b z-50 flex justify-center">
//         <Image src="/logo.png" alt="logo" width={170} height={100} />
//       </div>
//       <div className="flex flex-col">
//         {menuList.map((item, index) => (
//           <div
//             key={item.id}
//             className={`flex gap-2 items-center p-4 px-6 rounded-md text-gray-700 hover:bg-purple-100 transition-colors duration-200 cursor-pointer ${activeIndex === index ? 'bg-purple-300 text-purple-900' : ''}`}
//             onClick={() => setActiveIndex(index)}
//           >
//             <item.icon className="w-5 h-5" />
//             <h2 className="font-semibold">{item.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SideBarNav;

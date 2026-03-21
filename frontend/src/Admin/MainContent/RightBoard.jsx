// import { useEffect, useState } from "react";

// const API_URL = import.meta.env.VITE_API;
// console.log("API_URL in RightBoard:", API_URL);
// export default function RightBoard() {
//     let [news, setNews] = useState([]);
//     try {
//         useEffect(() => {
//             let fetchNews = async () => {
//                 let res = await fetch(`${API_URL}/utils/news`, {
//                     method: "GET",
//                     credentials: "include"
//                 });
//                 let dataBack = await res.json();
//                 if (dataBack.ok && !dataBack.ok) {
//                     alert("Unauthorized Access");
//                     setNews([]);
//                     return;
//                 }
//                 setNews(dataBack);
//             }
//             fetchNews();
//         }, []);
//     } catch (error) {
//         console.error("Error fetching news:", error);
//         setNews([]);
//     }


//     return (
//         <div id="cardList">
//             <h1 className="text-3xl font-bold text-red-500 sticky top-0 bg-white z-10 h-16 p-3 rounded-lg">News</h1>
//             {news && news.map((article, index) => (
//                 <div key={index} className="mt-5 p-4 bg-white rounded-lg shadow-md" >
//                     <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
//                     <p className="text-gray-700">{article.content}</p>
//                     <p className="text-sm text-gray-500 mt-2">Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
//                     <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">Read more</a>
//                 </div>
//             ))}
//         </div>
//     );
// }

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API;

export default function RightBoard() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/utils/news`, {
          method: "GET",
          credentials: "include",
        });

        const dataBack = await response.json();
        console.log("News response:", dataBack);

        if (!response.ok) {
          setError(dataBack.message || "Unauthorized");
          setNews([]); // ALWAYS keep array
          return;
        }

        // Backend sent object instead of array
        if (!Array.isArray(dataBack)) {
          setError("Invalid news data");
          setNews([]);
          return;
        }

        // Success
        setNews(dataBack);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Server error");
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return <p className="text-red-500 font-medium">{error}</p>;
  }

    return (
        <div id="cardList" className="p-4" style={{ perspective: '1200px' }}>
            <style>{`
              @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(20px) translateZ(-50px) rotateX(10deg); }
                to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0); }
              }
            `}</style>
            <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-6">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent sticky top-0 bg-white/60 backdrop-blur-xl z-20 h-20 p-4 -mt-2 -mx-2 rounded-t-2xl border-b border-rose-100/50 flex items-center gap-3">
                    <span className="bg-rose-100 text-rose-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner text-xl">
                        <i className="fa-solid fa-newspaper"></i>
                    </span>
                    Live News
                </h1>

                <div className="mt-6 space-y-6">
                    {news.map((article, index) => (
                        <div
                            key={index}
                            className="p-5 bg-gradient-to-br from-white to-slate-50/80 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-rose-200 transform transition-all duration-500 hover:-translate-y-2 hover:[transform:rotateX(2deg)_rotateY(-1deg)_translateZ(10px)] hover:shadow-[0_15px_30px_rgba(244,63,94,0.15)] group relative overflow-hidden"
                            style={{ animation: `slideUpFade 0.6s ease-out forwards`, animationDelay: `${index * 0.15}s`, opacity: 0 }}
                        >
                            <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                            
                            <h2 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors drop-shadow-sm relative z-10">
                                {article.title}
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed relative z-10 line-clamp-3">{article.content}</p>
                            
                            <div className="flex items-center justify-between mt-4 border-t border-slate-100 pt-3 relative z-10">
                                <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                                    <i className="fa-regular fa-clock"></i>
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                </p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-rose-500 font-bold text-sm hover:text-rose-600 flex items-center gap-1 group/link"
                                >
                                    Read more <i className="fa-solid fa-arrow-right-long transform group-hover/link:translate-x-1 transition-transform"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

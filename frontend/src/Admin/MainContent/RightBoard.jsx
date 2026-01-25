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
    <div id="cardList">
      <h1 className="text-3xl font-bold text-red-500 sticky top-0 bg-white z-10 h-16 p-3 rounded-lg">
        News
      </h1>

      {news.map((article, index) => (
        <div
          key={index}
          className="mt-5 p-4 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">
            {article.title}
          </h2>
          <p className="text-gray-700">{article.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Published on:{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 block"
          >
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}

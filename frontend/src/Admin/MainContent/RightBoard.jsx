import { useEffect, useState } from "react";

export default function RightBoard() {
    let [news, setNews] = useState([]);
    useEffect(() => {
        let fetchNews = async () => {
            let res = await fetch("https://backend-lugs.onrender.com/utils/news", {
                method: "GET",
                credentials: "include"
            });
            let dataBack = await res.json();
            if(dataBack.ok && !dataBack.ok) {
            alert("Unauthorized Access");
            return;
        }
            setNews(dataBack);
        }
        fetchNews();
    }, []);

    return (
        <div id="cardList">
            <h1 className="text-3xl font-bold text-red-500 sticky top-0 bg-white z-10 h-16 p-3 rounded-lg">News</h1>
            {news.map((article, index) => (
                <div key={index} className="mt-5 p-4 bg-white rounded-lg shadow-md" >
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <p className="text-gray-700">{article.content}</p>
                    <p className="text-sm text-gray-500 mt-2">Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">Read more</a>
                </div>
            ))}
        </div>
    );
}
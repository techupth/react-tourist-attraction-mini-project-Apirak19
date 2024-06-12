import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [tag, setTag] = useState([]);

  const handleTag = (newTag) => {
    setTag((prevTag) => [...prevTag, newTag]);
    setKeyword((prevKeyword) =>
      prevKeyword ? `${prevKeyword} ${newTag}` : newTag
    );
  };

  const handleInput = (input) => {
    setKeyword(input);
  };
  const getData = async () => {
    try {
      let response = await axios.get(
        `http://localhost:4001/trips?keywords=${keyword}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    console.log("tag: ", tag);
    console.log("keyword: ", keyword);
  }, [keyword, tag]);
  return (
    <div className="flex flex-col items-center font-noto-sans-thai">
      {/* Start coding here */}
      <h1 className="text-4xl mt-[50px] text-center text-blue-400 font-[700] ">
        เที่ยวไหนดี
      </h1>
      <p className="w-[800px] my-[10px]">ค้นหาที่เที่ยว</p>
      <input
        type="text"
        onChange={(e) => handleInput(e.target.value)}
        placeholder="หาที่เที่ยวแล้วไปกัน..."
        value={keyword}
        className="w-[800px] my-[10px] text-center border-b-2"
      />
      {data.map((item) => {
        return (
          <div
            key={item.eid}
            className="flex w-[1024px] gap-[30px] my-[20px] relative"
          >
            <div className="max-w-[400px] max-h-[250px] ">
              <img
                src={item.photos[0]}
                alt={item.title}
                className="h-[250px] rounded-3xl"
                width={300}
              />
            </div>
            <div className="max-w-[624px] flex flex-col gap-[5px] ">
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="truncate">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                className="w-[100px] underline text-blue-500 font-bold"
              >
                อ่านต่อ
              </a>
              <p>
                หมวด:
                {item.tags.slice(0, -1).map((tag) => (
                  <span
                    className={`mx-[5px] underline
                    } `}
                    onClick={() => handleTag(tag)}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}{" "}
                และ
                {item.tags.slice(-1).map((tag) => (
                  <span
                    className="mx-[5px] underline"
                    onClick={() => handleTag(tag)}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </p>
              <div className="flex gap-[20px] mt-[5px]">
                {item.photos.slice(1).map((img) => {
                  return (
                    <img
                      src={img}
                      className="w-[100px] h-[100px] rounded-xl"
                      key={img}
                    />
                  );
                })}
              </div>
            </div>
            <div
              className="absolute bottom-0 right-0 w-[75px] h-[75px] bg-blue-400 rounded-full text-sm flex items-center justify-center text-white font-bold cursor-pointer"
              onClick={() => {
                alert("copied");
                navigator.clipboard.writeText(item.url);
              }}
            >
              copy URL
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;

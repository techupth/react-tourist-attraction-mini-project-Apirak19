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
          <div key={item.eid} className="flex w-[1024px] gap-[30px] my-[20px]">
            <div className="max-w-[400px] max-h-[200px] ">
              <img
                src={item.photos[0]}
                alt={item.title}
                className="max-h-[200px] rounded-3xl"
                width={300}
              />
            </div>
            <div className="max-w-[624px] flex flex-col gap-[5px] ">
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="truncate">{item.description}</p>
              <a href={item.url} target="_blank">
                อ่านต่อ
              </a>
              <p>
                หมวด:
                {item.tags.map((tag) => (
                  <span
                    className="mx-[5px]"
                    onClick={() => handleTag(tag)}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setdata] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/posts");

        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setdata(data);
        }
      } catch (error) {
      
      }
    };
    getData();

    const getImg = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/img");

        const data = await res.json();
        if (res.ok) {
          console.log(data.img);
          setImg(data.img);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImg();
  }, []);

  return (
    <div className="App">
      {data &&
        data.map((obj) => {
          return (
            <div>
              <p style={{ color: "wheat" }}>{obj.msg}</p>
            </div>
          );
        })}

      {img && <img src="http://127.0.0.1:8000/bd02desarrollo.jpg" alt="" />}
    </div>
  );
}

export default App;

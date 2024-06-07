import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SessionService from "./services/session";
import { Menu } from "./menu/Menu";
import { stringify, parse } from "querystring";

const noActivity = `http://localhost:3000/image/${300}x${420}/blank.png?text.text=No activity&text.width=60&text.height=60&text.rgba=true&resize.fit=contain`;

function App() {
  const [width, height] = [1140, 640];
  const [image, setImage] = useState(
    `http://localhost:3000/image/${width}x${height}/blank.png?text.text=No image uploaded ____\u2193____&text.width=150&text.height=150&text.rgba=true&resize.fit=contain&`
  );
  const [to, setTo] = useState<NodeJS.Timer | null>(null);
  const [others, setOthers] = useState(noActivity);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    SessionService.subscribeToSocket("main", async (last) => {
      if (to) clearInterval(to);
  
      setTo(
        setInterval(() => {
          if (!last.length) {
            if (others !== noActivity) {
              setOthers(
                noActivity
              );
            }
            return;
          }
  
          const idx = Math.floor(Math.random() * (last.length - 1));
          setOthers(`http://localhost:3000/image${last[idx]}`);
  
        }, (3 + Math.random() * 5) * 1000)
      );
    });  
    return () => {
      SessionService.unSubscribeFromSocket("main");
    };
  });
  
  const sendFile = async () => {
    if (fileRef.current && fileRef.current.files) {
      const file = fileRef.current.files[0];

      const body = new FormData();
      body.append("file", file);

      const response = await fetch("http://localhost:3000/image", {
        method: "POST",
        body,
      });

      const { filename } = await response.json();
      setImage(`http://localhost:3000/image/${width}x${height}/${filename}?`);
    }
  };

  const appendParam = (name: string, value: string | Array<string>) => {
    const rawQuery = image.split("?").pop()!;
    const query = parse(rawQuery);
    query[name] = value;
    const imageUrl = image.split("?")[0]!;
    setImage(`${imageUrl}?${stringify(query)}`)
  }
  
  const removeParam = (names: Array<string>) => {
    const rawQuery = image.split("?").pop()!;
    const query = parse(rawQuery);
    
    for (const name of names)
      delete query[name];

    const imageUrl = image.split("?")[0]!;
    setImage(`${imageUrl}?${stringify(query)}`)
  }

  return (
    <div className="App">
      <div className="App-main">
        <div className="editor">
          <div className="commands">
            <Menu appendParam={appendParam} removeParam={removeParam}></Menu>
          </div>
          <img src={image} alt="file" height={height} width={width} />
          <div className="others">
            <img src={others} alt="file" height={420} width={300} />
          </div>
        </div>
        <div className="upload-wrapper">
          <input type="file" name="Upload" ref={fileRef} />
          <button type="submit" onClick={sendFile}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useRef, useState } from "react";
import "./App.css";
import { Menu } from "./menu/Menu";
import { stringify, parse } from "querystring";
import md5 from "md5";

function App() {
  const [width, height] = [1140, 640];
  const [image, setImage] = useState(
    `http://localhost:3000/image/${width}x${height}/blank.webp?text.text=No image uploaded ____\u2193____&text.width=550&text.height=550&text.rgba=true&resize.fit=fill`
  );
  const [query, setQuery] = useState(parse(image.split("?").pop()!))
  
  const fileRef = useRef<HTMLInputElement>(null);
 
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
      setQuery({});
    }
  };

  const appendParam = (name: string, value: string | Array<string>, generated?: boolean) => {
    
    query[name] = value;
    let imageUrl = image.split("?")[0]!;
    
    if (generated) {
      const parts = imageUrl.split("/");
      parts.pop();
      parts.push("generated.webp")
      imageUrl = parts.join("/");
    }

    setImage(`${imageUrl}?${stringify(query)}`)
    setQuery(query);
  }
  
  const removeParam = (names: Array<string>) => {
  
    for (const name of names)
      delete query[name];

    const imageUrl = image.split("?")[0]!;
    setImage(`${imageUrl}?${stringify(query)}`)
    setQuery(query);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p><a href="https://www.npmjs.com/package/@szz_dev/images">@szz_dev/images </a></p>
        <p> Playground </p>
        <span></span>
      </header>
      <div className="App-main">
        <p className="url"> {image} </p>
        <div className="editor">
          <div className="commands">
            <Menu key={md5(image.split("?")[0]!)} appendParam={appendParam} removeParam={removeParam} values={query}></Menu>
          </div>
          <img src={image} alt="Invalid parameters" height={height} width={width} />
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

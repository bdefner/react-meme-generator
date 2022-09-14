import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [templateImg, setTemplateImg] = useState(0);
  const [ImgTemplates, setImgTemplates] = useState([]);

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((res) => res.json())
      .then((res) => setImgTemplates(res))
      .catch(() => alert('We could not find that template.'));
  }, []);

  const templateUrls = [];

  for (let i = 0; i < ImgTemplates.length; i++) {
    templateUrls[i] = ImgTemplates[i].blank;
    console.log(ImgTemplates[i].blank);
  }
  console.log(templateUrls[0]);

  const templateImages = templateUrls.map((url, index) => (
    <div className="template-img-wrap">
      <img
        className="template-img"
        src={templateUrls[index]}
        onClick={() => {
          setTemplateImg(templateImages[index]);
        }}
      />
    </div>
  ));

  return (
    <container className="app-wrap">
      <div className="column">
        <h2>1. scroll and select</h2>
        <div className="template-selector-wrap">
          {/*  */}
          <div className="template-selector">{templateImages}</div>
        </div>
      </div>
      <div className="column">
        <h2>2. meme it up</h2>
        <select
          name="templates"
          id="templates"
          value={templateImg}
          onChange={(e) => setTemplateImg(e.currentTarget.value)}
        >
          {ImgTemplates.map((item) => (
            <option key={item.id} value={item.id}>
              {item.id}
            </option>
          ))}
        </select>
      </div>

      <div className="column">
        <h2>3. ready to share</h2>
      </div>

      <div></div>
    </container>
  );
}

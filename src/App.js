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

  const templateImages = ImgTemplates.map((url, index) => (
    <div key={'imageWrap:' + { index }} className="template-img-wrap">
      <img
        key={'templateImage: ' + { index }}
        alt="meme-template"
        className="template-img"
        src={ImgTemplates[index].blank}
        onClick={() => {
          setTemplateImg(ImgTemplates[index].id);
          console.log(templateImg);
        }}
        aria-hidden="true"
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
        <div className="options-wrap">
          <h2>2. meme it up</h2>
          <select
            name="templates"
            id="templates"
            value={templateImg}
            onChange={(element) => setTemplateImg(element.currentTarget.value)}
          >
            {ImgTemplates.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="top-text-input">Top text</label>
          <input id="top-text-input" />
          <br />
          <label htmlFor="bottom-text-input">Bottom text</label>
          <input id="bottom-text-input" />
          <br />
          <button>Generate</button>
        </div>
      </div>

      <div className="column">
        <h2>3. ready to share</h2>
      </div>

      <div></div>
    </container>
  );
}

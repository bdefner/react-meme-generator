import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [templateImg, setTemplateImg] = useState(0);
  const [imgTemplates, setImgTemplates] = useState([]);
  const [topTextInputValue, setTopTextInputValue] = useState('');
  const [bottomTextInputValue, setBottomTextInputValue] = useState('');
  const [topText, setTopText] = useState('Free memes');
  const [bottomText, setBottomText] = useState('for everyone');

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((res) => res.json())
      .then((res) => setImgTemplates(res))
      .catch((error) => alert(error));
  }, []);

  const templateImages = imgTemplates.map((url, index) => (
    <div key={`imageWrap of url: + ${url}`} className="template-img-wrap">
      <img
        key={`templateImage of url:  + ${url}`}
        alt="meme-template"
        className="template-img"
        src={imgTemplates[index].blank}
        onClick={() => {
          setTemplateImg(imgTemplates[index].id);
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
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <select
              name="templates"
              id="template-selector"
              value={templateImg}
              onChange={(event) => setTemplateImg(event.currentTarget.value)}
            >
              {imgTemplates.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
            <br />
            <label
              htmlFor="top-text-input"
              onChange={() => {
                setTopTextInputValue('Testify');
                console.log('topTextValue: ', topTextInputValue);
              }}
            >
              Top text
            </label>
            <input
              id="top-text-input"
              onChange={(event) => {
                setTopTextInputValue(event.currentTarget.value);
              }}
            />
            <br />
            <label htmlFor="bottom-text-input">Bottom text</label>
            <input
              id="bottom-text-input"
              onChange={(event) =>
                setBottomTextInputValue(event.currentTarget.value)
              }
            />
            <br />
            <button
              onClick={() => {
                setTopText(topTextInputValue);
                setBottomText(bottomTextInputValue);
              }}
            >
              Generate
            </button>
          </form>
          <br />
          <br />
          <p>topText: {topText}</p>
          <p>bottomText: {bottomText}</p>
        </div>
      </div>

      <div className="column">
        <h2>3. ready to share</h2>
        <div className="result wrap">
          <img src="logo192.png" alt="created meme" />
        </div>
      </div>

      <div></div>
    </container>
  );
}

import './App.css';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { useEffect, useState } from 'react';

export default function App() {
  const [templateImg, setTemplateImg] = useState('bongo');
  const [imgTemplates, setImgTemplates] = useState([]);
  const [topTextInputValue, setTopTextInputValue] = useState('');
  const [bottomTextInputValue, setBottomTextInputValue] = useState('');
  const [topText, setTopText] = useState('Free memes');
  const [bottomText, setBottomText] = useState('for everyone');

  const fetchMemeTemplates = async () => {
    try {
      const fetchData = await fetch('https://api.memegen.link/templates');
      const fetchedData = await fetchData.json();
      setImgTemplates(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMemeTemplates().catch((error) => console.log(error));
  }, []);

  function downloadMeme(url) {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, 'my-meme.jpg');
      })
      .catch((err) => console.log(err));
  }

  const templateImages = imgTemplates.map((url, index) => (
    <div
      key={`imageWrap of url: +${Math.random()}`}
      className="template-img-wrap"
    >
      <img
        key={`templateImage of url:  + ${Math.random()}`}
        alt="meme-template"
        className="template-img"
        src={imgTemplates[index].blank}
        onClick={() => {
          setTemplateImg(imgTemplates[index].id);
        }}
        aria-hidden="true"
      />
    </div>
  ));

  return (
    <div className="app-wrap">
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
            <label htmlFor="template-selector">Meme template</label>
            <select
              name="templates"
              id="template-selector"
              value={templateImg}
              onChange={(event) => {
                setTemplateImg(event.currentTarget.value);
                console.log(event.currentTarget.value);
              }}
            >
              {imgTemplates.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="top-text-input">Top text</label>
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
              data-test-id="generate-meme"
              onClick={() => {
                setTopText(topTextInputValue);
                setBottomText(bottomTextInputValue);
                console.log(templateImg);
              }}
            >
              Generate
            </button>
          </form>
        </div>
      </div>

      <div className="column">
        <h2>3. ready to share</h2>
        <div className="result wrap">
          <img
            data-test-id="meme-image"
            src={`https://api.memegen.link/images/${templateImg}/${topText}/${bottomText}.jpg`}
            alt="created meme"
          />

          <button
            onClick={() => {
              downloadMeme(
                `https://api.memegen.link/images/${templateImg}/${topText}/${bottomText}.jpg`,
              );
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

import VanillaJSONEditor from "./VanillaJSONEditor";
import { useEffect, useState } from "react";
import "./styles.css";
import { JsLoaderService } from "./JsLoaderSservice";

// declare const window: Window;
// let aTest : any;
function App() {

  useEffect(() => {
    return () => {
      console.log("This only happens ONCE");
      loadGapi();
    }
  }, []);



  const [showEditor, setShowEditor] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [content, setContent] = useState({
    json: {
      greeting: "Hello World",
      color: "#ff3e00",
      ok: true,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
    text: undefined
  });
  return (
    <div className="App">
      <h1>svelte-jsoneditor in React</h1>
      <p>
        <label>
          <input
            type="checkbox"
            checked={showEditor}
            onChange={() => {
              // window.test();
              console.log(+globalThis.aTest);
              setShowEditor(!showEditor)
            }}
          />{" "}
          Show JSON editor
        </label>
      </p>
      <p>
        <label>
          <input
            type="checkbox"
            checked={readOnly}
            onChange={() => setReadOnly(!readOnly)}
          />{" "}
          Read only
        </label>
      </p>

      {showEditor && (
        <>
          <h2>Editor</h2>
          <div className="my-editor">
            <VanillaJSONEditor
              content={content}
              readOnly={readOnly}
              onChange={setContent}
            />
          </div>
        </>
      )}

      <>
        <h2>Contents</h2>
        <pre>
          <code>{JSON.stringify(content, null, 2)}   </code>
        </pre>
      </>
    </div>
  );
}



async function loadGapi() {
  console.log("loadGapi");
  const ri = await JsLoaderService.loadScript({
    id: 'gapi',
    src: 'https://apis.google.com/js/api.js'
  }, se => {
    se.async = true;
    se.defer = true;
  });
  if (!ri.loaded) { throw new Error('not load gapi!'); }
  console.log(globalThis.gapi + " !!!!Loaded");
}


export default App;

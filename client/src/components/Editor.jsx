import { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import ImageTool from '@editorjs/image';
import SimpleImage from '@editorjs/simple-image';
import uploader from '@ajite/editorjs-image-base64';


// import Embed from '@editorjs/embed';

function _getBase64(file, onLoadCallback) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () { return resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const RTE = () => {
  let editor = { isReady: false };

  useEffect(() => {
    if (!editor.isReady)
      editor = new EditorJS({
        holder: 'editor',
        placeholder: 'Let`s write an awesome story!',
        tools: {
          header: Header,
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 2,
              // withHeadings:true
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  return _getBase64(file, function (e) { }).then((data) => {
                    return {
                      success: 1,
                      file: {
                        url: data
                      }
                    }
                  })
                }                              
              }
          }
      },
SimpleImage: SimpleImage,
  
  
      }
    });
  }, []);

function handleRTE() {
  editor.save().then((outputData) => {
    console.log('Article data: ')
    console.log(outputData.blocks)

    fetch('http://localhost:4000/interMan/editorjs', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(outputData.blocks)
    }).then(function (response) {
      console.log(response.json());
    })
  }).catch((error) => {
    console.log('Saving failed: ')
    console.log(error)
  });

};


return (
  <>
    <div id="editor">
    </div>
    <button className="btn btn-primary" onClick={handleRTE}>Submit</button>
  </>
)
}
export default RTE;
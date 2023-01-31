import { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import ImageTool from '@editorjs/image';
import SimpleImage from '@editorjs/simple-image';
import uploader from '@ajite/editorjs-image-base64';


function _getBase64(file, onLoadCallback) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () { return resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const RST = () => {
  let editor = { isReady: false };

  useEffect(() => {
    fetch('http://localhost:4000/interMan/ttts')
      .then(res => {
        return res.json();
      })
      // .then(x=>
      //   {
      //     console.log(x);
      //     let y=x.blocks;
      //     for(let i=0;i<(y).length;i++) console.log(y[i].type);
      //   })
      .then(y => {
        // console.log(y);
        // console.log(y.blocks);
        if (!editor.isReady) {
          console.log("Rendering.....");
          // let x = y.blocks;
          // console.log(x);
          editor = new EditorJS({
            holderId: 'editor',
            readOnly:true,
            data: {
              blocks: y
            },
            // readOnly: true,
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
        }
      });

  }, []);



  return (
    <>
      <div id="editor">
      </div>
    </>
  )
}
export default RST;
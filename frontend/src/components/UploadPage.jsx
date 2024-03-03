import { useState, useRef } from "react";
import "../App.css";
import axios from "axios";

import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
} from "./upload.styles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const UploadPage = ({
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  const [newDocs, setNewDOcs] = useState([]);

  const updateUploadedFiles = (files) => {
    setNewDOcs([...newDocs, ...files]);
  };

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateUploadedFiles(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  const handleDocumentSubmit = (event) => {
    event.preventDefault();
    
    console.log("NEW DOCS", newDocs);

    const formData = new FormData();
    formData.append('pdfFile', newDocs[0]);
    otherProps.handleSequence(1); 
    // axios.post('http://localhost:3000/api/upload', formData)
    //   .then((response) => {
    //     console.log('File uploaded successfully');
    //     otherProps.handlePdfId(response.data.id)
    //     otherProps.handleSequence(1); 
    //   })
    //   .catch((error) => {
    //     console.error('Error uploading file:', error);
    //   });
    console.log("DOCUMENT SUBMITTED", event);
  };

  return (
    <div className="min-w-full min-h-screen">
      <div className="flex flex-col text-center">
        <h2 className="text-4xl font-bold text-white text-shadow">
          Add Documents
        </h2>
        <form onSubmit={handleDocumentSubmit}>
          <FileUploadContainer>
            <DragDropText>Drag and drop your files anywhere or</DragDropText>
            <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
              <i className="fas fa-file-upload" />
              <span> Browse {otherProps.multiple ? "files" : "a file"}</span>
            </UploadFileBtn>
            <FormField
              type="file"
              ref={fileInputField}
              onChange={handleNewFileUpload}
              title=""
              value=""
              {...otherProps}
            />

            {/* <br /> */}

            <FilePreviewContainer>
              <PreviewList>
                {Object.keys(files).map((fileName, index) => {
                  let file = files[fileName];
                  let isImageFile = file.type.split("/")[0] === "image";
                  return (
                    <PreviewContainer key={fileName}>
                      <div>
                        {isImageFile && (
                          <ImagePreview
                            src={URL.createObjectURL(file)}
                            alt={`file preview ${index}`}
                          />
                        )}
                        <FileMetaData isImageFile={isImageFile}>
                          <span>{file.name}</span>
                          <aside>
                            <span>{convertBytesToKB(file.size)} kb</span>
                            <RemoveFileIcon
                              className="fas fa-trash-alt"
                              onClick={() => removeFile(fileName)}
                            />
                          </aside>
                        </FileMetaData>
                      </div>
                    </PreviewContainer>
                  );
                })}
              </PreviewList>
            </FilePreviewContainer>
            <div className="flex flex-row justify-end flex-1/2">
              <button
                className="bg-[#8294C4] w-[150px] h-[50px] text-white text-[20px] font-bold rounded-md shadow-md hover:bg-[#6B7FA3] mt-5"
                type="submit"
              >
                Next
              </button>
            </div>
          </FileUploadContainer>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;

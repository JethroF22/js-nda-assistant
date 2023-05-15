import { MouseEvent, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { css } from '@emotion/react';
import axios from 'axios';

const pageCss = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .upload {
    align-items: center;
    justify-content: center;
    text-align: center;
    label {
      font-size: 24px;
      margin-right: 20px;
    }
    margin-bottom: 20px;
  }

  .button {
    align-items: center;
    justify-content: center;
    text-align: center;

    div {
      background-color: #d0d0d7;
      border-radius: 5px;
      width: 125px;
      border: 1px solid #000;
    }
  }
`;

export function Index() {
  const { acceptedFiles, getRootProps, getInputProps, isFileDialogActive } =
    useDropzone({
      accept: {
        'application/pdf': [],
      },
      maxFiles: 1,
    });
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!isFileDialogActive) {
      setFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, isFileDialogActive]);

  const upload = async () => {
    if (file) {
      const data = new FormData();
      data.append('file', file);
      await axios.post('http://localhost:3333/upload', data);
    }
  };

  const inputProps = getInputProps();
  return (
    <div {...getRootProps()} css={pageCss}>
      <div className="upload">
        <label>Select File</label>
        <input
          onChange={inputProps.onChange}
          onClick={inputProps.onClick}
          type={inputProps.type}
        />
      </div>
      <div className="button" onClick={upload}>
        <div>Upload</div>
      </div>
      {/* <div>
        {file && <p className="font-bold text-gray-500 mr-5">{file.name}</p>}
        {!file && (
          <>
            <FontAwesomeIcon icon={faFileUpload} size="2x" color="#6B7280" />
          </>
        )}
      </div> */}
    </div>
  );
}

export default Index;

import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './pdfViewer.css'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const Test = () => {
  const [doc, setDoc] = useState(null)
  const [pdf, setpdf] = useState(null)
  const [viewpdf, setviewpdf] = useState(null)
  const [resData, setResData] = useState(null)

  const fetchPdf = async () => {
    const res = await fetch('/pdf', {
      method: "GET",
      headers: {
        'Content-Type': 'application/pdf'
      }
    })

    const data = await res.blob()
    console.log(data);
  }

  const sendFileBack = async () => {
    console.log(doc);
    const formData = new FormData();
    formData.append('pdf', doc);
    const res = await fetch('/pdf', {
      method: 'POST',
      body: formData
    })
    console.log(await res.json());
  }

  const SubmitFile = (e) => {
    e.preventDefault()
    if (pdf !== null) {
      setviewpdf(pdf)

      sendFileBack()
    }
    else {
      setviewpdf(null)
    }
  }


  const fileType = ['application/pdf']
  const handleFile = (event) => {
    let file = event.target.files[0];
    setDoc(file)
    if (file) {
      if (file && fileType.includes(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          setpdf(e.target.result)
          console.log(e.target.result);
        }
      }
      else {
        setpdf(null)
      }
    }
  };


  const newplugin = defaultLayoutPlugin()

  return (
    <div className='container'>
      <form onSubmit={SubmitFile}>
        <input type='file' className='form-control' onChange={handleFile} />
        <button type='submit' className='btn btn-primary'>Upload</button>
      </form>
      <button type='submit' onClick={fetchPdf} className='btn btn-primary'>View pdf</button>
      <h2>view pdf</h2>
      <div className='pdf-container'>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
          {viewpdf && <><Viewer fileUrl={viewpdf} plugins={[newplugin]} /> </>}
          {!viewpdf && <>No File</>}
        </Worker>
      </div>
    </div>
  )
}

export default Test
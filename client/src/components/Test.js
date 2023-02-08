import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './pdfViewer.css'
import { Viewer,Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
const Test = () => {

  const [pdf, setpdf] = useState(null)
  const[viewpdf,setviewpdf] = useState(null)
  const SubmitFile = (e) => {
    e.preventDefault()
    if (pdf!==null) {
      setviewpdf(pdf)
    }
    else{
      setviewpdf(null)
    }
  }


  const fileType = ['application/pdf']
  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file && fileType.includes(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          setpdf(e.target.result)
        }
      }
      else{
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
      <h2>view pdf</h2>
      <div className='pdf-container'>
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js'>
      {viewpdf &&<><Viewer fileUrl={viewpdf} plugins={[newplugin]} /> </>}
      {!viewpdf&&<>No File</>}
    </Worker>
      </div>
    </div>
  )
}

export default Test
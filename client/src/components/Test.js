import React, { useState } from 'react'

const Test = () => {
    const [pdfFile,setPdfFile] = useState(null);
    const [pdfFileError,setPdfFileError] = useState('');

    const [viewPdf,setView] = useState(null)

    const fileType = ['application/pdf']
    const handlePdf=(e)=>{
        let selectedPdf = e.target.files[0];
        if(selectedPdf){
            if(selectedPdf&&fileType.includes(selectedPdf.type)){
                let reader = new FileReader()
                reader.readAsDataURL(selectedPdf)
                reader.onloadend =(e)=>{
                    console.log(e.target.result);
                }
            }
        }
    }
    const handleSubmit = ()=>{
        console.log("sub");
    }
    return (
        <div className='container'>
            <br></br>
            <form className='form-group' onSubmit={handleSubmit}>
                <input className='form-group' onChange={handlePdf} type="file" required />
                <button type='submit' className='btn btn-sumbit btn-md btn-primary'>
                    upload
                </button>
            </form>
            <br></br>
            <h4>View PDF</h4>
            <div className='pdf-container'>

            </div>

        </div>
    )
}

export default Test
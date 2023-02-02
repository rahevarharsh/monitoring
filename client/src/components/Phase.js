import React from 'react'

const Phase = (props) => {
    return (
        <div><div className="card">
            <div className="card-body">
                <div style={{
                    display: "flex",
                    columnGap: "1rem"
                }}>
                    <h5 className="card-title">PHASE-{props.idx}</h5>
                    <i className="fa-regular fa-circle-check icn-c" style={{
                        paddingTop: "1.5px",
                        fontSize: "1.4rem", color: "green"
                    }}></i>
                </div>
                <div className="card-content">
                    <p className="card-text" style={{ margin: "0" }}>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Labore totam modi Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Iusto eum enim quaerat harum ullam. Expedita voluptatum neque illo inventore assumenda voluptate
                        harum quod nostrum, doloribus commodi. Eum nostrum distinctio alias? fugiat voluptatum minima
                        repellat placeat, minus
                        quidem eos odio. Qui sapiente sit necessitatibus modi illo, id eveniet! Eligendi,
                        libero.</p>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: "9px"
                    }}>
                        <label for={props.idx}>
                            <i className="fa-solid fa-upload icn"></i>
                        </label>
                        <input type="file" id={props.idx} style={{ display: "none", visibility: "none" }}
                             onChange={props.inputFile} /> 

                        <div id="display-name" style={{ width: "max-content", display: "flex", columnGap: "5px" }}></div>
                    </div>
                </div>
            </div>
        </div></div>
    )
}

export default Phase
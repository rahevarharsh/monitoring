import React from 'react'
import { NavLink } from 'react-router-dom'

const Notify = (props) => {
    const css_style ={display: 'flex',justifyContent: 'center',alignItems: 'center'}
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.roll}</h5>
                    <div className="card-content">
                        <p className="card-text" style={{margin: "0"}}>{props.body}</p>
                        <div style={css_style}>
                            <NavLink to="/pipage" className="btn btn-primary card-btn">P.D.F</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notify
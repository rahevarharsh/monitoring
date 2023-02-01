import React from 'react'
import { NavLink } from 'react-router-dom'
import './details.js'
import './detail.css'
import Phase from './Phase'
export function AddLibrary(urlOfTheLibrary) {
    const script = document.createElement('script');
    script.src = urlOfTheLibrary;
    script.async = true;
    document.body.appendChild(script);
}
const Detail = () => {

    return (
        <>
            {/* <ScriptTag isHydrating={true} type="text/javascript" src='./details.js' /> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="n_logo">
                    <img className="logo" src="img/logo.png" alt="LOGO" />
                </div>
                <button className="navbar-toggler tglp" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="nav_titlep">
                    <p className="nav_title">Sexual Harassment At Workplace</p>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <button className="btn my-2 my-sm-0 logout" type="submit">Logout</button>
                </div>
            </nav>


            <div className="divp">
                <div style={{
                    color: "white",
                    backgroundColor: "#1c1e2b",
                    display: "flex",
                    columnGap: "1rem",
                    justifyContent: "space-between"
                }}>
                    <p className="title">F.I.R No:-123645</p>
                    <p className="title">Name:-Ayush Patel</p>
                </div>

                <Phase />
                <Phase />
                <Phase />
                <Phase />
                <Phase />
            </div>

            <footer className="bg-light text-center text-lg-start ftp">
                <div className="text-center p-3 ft" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2023 Copyright:
                    <NavLink className="text-dark" to="https://mdbootstrap.com/">W.M.I.S</NavLink>
                </div>
            </footer>
            {AddLibrary("./js/detail.js")}
        </>
    )
}

export default Detail
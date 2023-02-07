import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import './details.js'
import './detail.css'
import Phase from './Phase'
// import { s } from './PiPage.js'

const Detail = (props) => {
    let count = 1;
    const sendID = async () => {
       const res = await fetch("/detail",{
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({id:props.dataNumber})
       })
    //    const data = await res.json()
    //    console.log(data);
    }


    useEffect(async()=>{
        if (count) {
            await sendID()
            console.log('called fetch function');
            count--;
        }
    },[])

    var deletes = document.querySelectorAll(".fa-trash");
    console.log(deletes);
    deletes.forEach(el => {
        el.addEventListener("click", () => {
            el.parentElement.previousElementSibling.value = '';
            el.parentElement.innerHTML = '';
        })
    });

    const getimage = (event) => {
        console.log(event.target);

        var display_name = event.target.nextElementSibling;
        console.log(display_name);

        var image = event.target.value;
        var name = image.replace(/^.*\\/, "");
        display_name.innerHTML = name + "<i class=fa-trash></i>";
        display_name.children[0].classList.add("fa-solid");

        var deletess = document.querySelectorAll(".fa-trash");

        deletess.forEach(el => {
            el.addEventListener("click", () => {
                el.parentElement.previousElementSibling.value = '';
                el.parentElement.innerHTML = '';
            })
        });
    }


    console.log("hello");
    // console.log(s);
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
                    <p className="title">F.I.R No:-{props.dataNumber}</p>
                    <p className="title">Name:-Ayush Patel</p>
                </div>

                <Phase idx={1} inputFile={getimage} />
                <Phase idx={2} inputFile={getimage} />
                <Phase idx={3} inputFile={getimage} />
                <Phase idx={4} inputFile={getimage} />
                <Phase idx={5} inputFile={getimage} />
            </div>

            {/* <footer className="bg-light text-center text-lg-start ftp">
                <div className="text-center p-3 ft" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2023 Copyright:
                    <NavLink className="text-dark" to="https://mdbootstrap.com/">W.M.I.S</NavLink>
                </div>
            </footer> */}

        </>
    )
}

export default Detail
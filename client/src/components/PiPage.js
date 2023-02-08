import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Firrow from './FIR_Row';
import Notify from './Notify'
import { useNavigate } from 'react-router-dom';
import './style.css'
// export let test = true;

const PiPage = (props) => {
    const [myArray, setMyArray] = useState([]);
    const [suggetionfield, setsuggetionfield] = useState([]);
    const [suggName,setSuggName] = useState([])
    const navigate = useNavigate()
    let count = 1;
    let curr_sugge = 0;
    const callPIPage = async () => {
        const res = await fetch('/pipage', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await res.json()
        if (res.status === 200) {
            await setMyArray((oldData) => oldData.concat(data))
            console.log(data);
            console.log(myArray);
        }
        else {
            //    await console.log(data[1]);
            navigate('/')
        }

    }

    useEffect(() => {

        if (count) {
            callPIPage()
            console.log('called fetch function');
            count--;
        }


    }, [])

    const mystyle = {
        width: "9%",
        borderColor: "white"
    };

    function modaltitle(event, el) {
        var fir = event.target.parentElement.parentElement.childNodes[1].innerText;
        document.getElementById("exampleModalLongTitle").innerText = "F.I.R No:-" + fir;

        curr_sugge = fir;
        // s=curr_sugge;
        console.log(curr_sugge);
        // console.log("value of S :"+s);
        renderSuggetion();

    }

    const body = "Lorem ipsum dolor sit amet consectetur adipisicing elit.Labore totam modi fugiat voluptatum minima repellat placeat, minus quidem eos odio.Qui sapiente sit necessitatibus modi illo, id eveniet! Eligendi,libero"

    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value;
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName('tr')
        console.log(tr);
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            console.log(td[1].textContent);
            if (td[1].textContent) {
                txtValue = td[1].textContent;
                console.log(txtValue);
                if (txtValue.indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    const renderSuggetion = () => {
        if (!curr_sugge) { return; }
        myArray.map((obj, index) => {
            if (obj.fir_no == curr_sugge) {
                console.log("MATCH nUMBER!");
                // obj.suggestionsArr.map(()=>)
                let temp = []
                let name = []
                obj.suggestionsArr.map((e) => {
                    temp.push(e.suggestion)
                    name.push(e.name)
                })
                setsuggetionfield(temp)
                setSuggName(name)
                console.log(obj.suggestionsArr[0].suggestion);
            }

        })

    }
    const detailClick = (n) => {
        console.log(n);
        props.clickdetail(n)
        navigate('/pipage/detail' + n)

    }
    return (
        <div>
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

            <div className="form-group has-search searchp">
                <i className="fa-solid fa-magnifying-glass form-control-feedback"></i>
                <input className="form-control search" type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for F.I.R Number.." />
            </div>

            <div className="tablep">
                <table className="table-hover">
                    <thead>
                        <tr>
                            <td style={mystyle}>NO.</td>
                            <td style={{ width: "47%", borderColor: "white" }}>F.I.R Number</td>
                            <td style={{ width: "16%", borderColor: "white" }}>Details</td>
                            <td style={{ width: "25%", borderColor: "white" }}>Suggestions</td>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {console.log(myArray[0])}
                        {(myArray.length === 0) ? "No data.." : myArray.map((obj, i) => (<Firrow index={i+1} firnumber={obj.fir_no} ClickOndetail={() => { detailClick(obj.fir_no) }} notifincation={obj.suggestionsArr.length} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} />))}
                        {/* <Firrow index={1} firnumber={myArray[1].fir_no} notifincation={myArray[0].suggestionsArr.length} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} /> */}
                        {/* <Firrow index={1} firnumber={123645} notifincation={2} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} />
                        <Firrow index={2} firnumber={123646} notifincation={5} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} />
                        <Firrow index={3} firnumber={123647} notifincation={0} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} />
                        <Firrow index={4} firnumber={123648} notifincation={3} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} />
                        <Firrow index={5} firnumber={123649} notifincation={1} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} />
                        <Firrow index={6} firnumber={123650} notifincation={7} target="#exampleModalCenter" toggle="modal" handleClick={(event) => modaltitle(event)} /> */}
                    </tbody>
                </table>
            </div>



            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {(myArray.length === 0) ? "No data.." : ""}
                            {suggetionfield.map((text,idx) => (<Notify roll={suggName[idx]} body={text} />))}
                            {/* {myArray[0].suggestionsArr.map((t)=>console.log(t))}    */}
                            {/* <Notify roll='nodel' body={body} />
                            <Notify roll='P.I' body={body} />
                            <Notify roll='nodel' body={body} />
                            <Notify roll='P.I' body={body} />
                            <Notify roll='nodel' body={body} />
                            <Notify roll='P.I' body={body} /> */}

                        </div>
                    </div>
                </div>
            </div>



            <footer className="bg-light text-center text-lg-start ftp">
                <div className="text-center p-3 ft" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2023 Copyright:
                    <NavLink className="text-dark" to="https://mdbootstrap.com/">W.M.I.S</NavLink>
                </div>
            </footer>
        </div>
    )
}
setTimeout(2000);
export default PiPage

console.log('eND OF THE PROGRAME');
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Nodal = (props) => {
    const navigate = useNavigate(props)
    const callNodalPage = async () => {
        const res = await fetch('/nodalpage', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const data = await res.json()
        console.log(data);
        if (res.status !== 200) {
            navigate('/')
        }
        else {
            //    await console.log(data[1]);
            console.log("hello");
        }
    }

    useEffect(() => {

        callNodalPage()
        console.log('called fetch function');

    }, [])
    console.log(props.NodalSchema);




    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value;
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    function modaltitle(el) {
        var fir = el.target.parentElement.parentElement.childNodes[3].innerText;
        document.getElementById("exampleModalLongTitle").innerText = "F.I.R No:-" + fir;
    }

    

    function reshape(addbtn, et) {
        addbtn.style.color = "#FFFFFF";
        addbtn.style.backgroundColor = "#222831";
        addbtn.style.pointerEvents = "auto";
        disable(et);
    }

    function clck(et) {
        var delete1 = et.parentElement;
        var main_dlt = et.parentElement.parentElement.children[4];
        var addbtn = document.querySelector(".add-card-btn");
        delete1.style.display = "none";
        main_dlt.style.display = "inline";
        et.parentElement.previousElementSibling.previousElementSibling.style.display = "inline";
        reshape(addbtn, et.parentElement);
    }

    const edittext = (et) => {

        var para = et.target.parentElement.nextElementSibling.firstElementChild;
        var addbtn = document.querySelector(".add-card-btn");
        var delete1 = et.target.parentElement.children[3];
        console.log(delete1);
        var upd = et.target.parentElement.nextElementSibling.children[1].children[0];
        var main_dlt = et.target.parentElement.children[4];
        main_dlt.style.display = main_dlt.style.display === "inline" ? "none" : "inline";

        para.contentEditable = para.contentEditable === "true" ? "false" : "true";
        upd.style.pointerEvents = upd.style.pointerEvents === "none" ? "auto" : "none";

        et.target.style.display = et.target.style.display === "inline" ? "none" : "inline";
        if (para.contentEditable == "false") {
            var insidetext = para.textContent.trim();
            if (insidetext == "") {
                var check_input = et.target.parentElement.nextElementSibling.children[1].children[1];
                if (check_input.value == "") {
                    et.target.previousElementSibling.style.display = "inline";
                    setTimeout(() => {
                        et.target.parentElement.parentElement.parentElement.style.transition = "opacity 1s ease-out";
                        et.target.parentElement.parentElement.parentElement.style.opacity = 0;
                        setTimeout(() => {
                            et.target.parentElement.parentElement.parentElement.remove();
                        }, 500);
                    }, 500);
                    reshape(addbtn, et.target);
                    return;
                }
                delete1.style.display = "flex";
                main_dlt.style.display = "none";
            }
            else {
                et.previousElementSibling.style.display = "inline";
                reshape(addbtn, et);
            }

            document.querySelectorAll(".fa-trash-can").forEach(el => {
                el.addEventListener("click", () => {
                    reshape(addbtn, et);
                    setTimeout(() => {
                        et.parentElement.parentElement.parentElement.style.transition = "opacity 1s ease-out";
                        et.parentElement.parentElement.parentElement.style.opacity = 0;
                        setTimeout(() => {
                            et.parentElement.parentElement.parentElement.remove();
                        }, 500);
                    }, 500);
                });
            });

        } else {
            et.nextElementSibling.style.display = "inline";
            addbtn.style.color = "#000000";
            addbtn.style.backgroundColor = "rgb(69 69 80)";
            addbtn.style.pointerEvents = "none";
            disable(et);
        }
    }


    function addCard() {
        var cardContainer = document.querySelector(".modal-body");
        var newCard = document.createElement("div");
        newCard.className = "card";
        newCard.innerHTML = `
        <div class="card-body">
            <div style="display: flex; column-gap: 1rem;">
                <h5 class="card-title">S.P</h5>
                <i class="fa-duotone fa-pen-to-square" style=" pointer-events: auto; display: inline; padding-top: 1.5px; font-size: 1.4rem; color: #3b4166;" onClick="edittext()"></i>
                <i class="fa-regular fa-floppy-disk" style=" display: none; padding-top: 1.5px; font-size: 1.4rem; color: #3b4166;" onclick= "edittext()" ></i>
                <h5 class="delete_1" style="display: none; column-gap: 1rem; align-items: center; margin-bottom: 0.75rem;">Want To Delete?
                    <i class="fa-solid fa-trash-can" style="padding-top: 1.5px; font-size: 1.3rem; color: #3b4166;"></i>
                    <i class="fa-solid fa-trash-can-slash" style="padding-top: 1.5px; font-size: 1.3rem; color: #3b4166;" onClick="clck(this)"></i>
                </h5>
                <i class="fa-duotone fa-trash main_dlt" style="display: inline; padding-top: 1.5px; font-size: 1.4rem; color: #ba4b4b;" onClick="maindlt(this)"></i>
            </div>
            <div class="card-content">
                <p class="card-text" contenteditable="false" style="margin: 0;">Write Here!</p>
                <div style="display: flex; justify-content: center; align-items: center; column-gap: 9px;">
                    <label style="pointer-events: none;" onClick="label_1(this)">
                        <i class="fa-duotone fa-arrow-up-from-bracket icn"></i>
                    </label>
                    <input type="file" style="display: none; visibility: none;" onchange="getimage(this);">
                    <div style="width: max-content; display: flex; column-gap: 5px; align-items: center;"></div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(newCard);
    }


    function maindlt(el) {
        setTimeout(() => {
            el.parentElement.parentElement.parentElement.style.transition = "opacity 1s ease-out";
            el.parentElement.parentElement.parentElement.style.opacity = 0;
            setTimeout(() => {
                el.parentElement.parentElement.parentElement.remove();
            }, 500);
        }, 500);
    };

    function disable(et) {
        var selectedElement = et.parentElement.parentElement.parentElement;

        var previousSibling = selectedElement.previousElementSibling;
        while (previousSibling) {
            var main_dlt = previousSibling.firstElementChild.firstElementChild.children[4];
            var chg = previousSibling.firstElementChild.firstElementChild.children[1];
            main_dlt.style.display = main_dlt.style.display === "inline" ? "none" : "inline";
            chg.style.pointerEvents = chg.style.pointerEvents === "auto" ? "none" : "auto";

            if (chg.style.pointerEvents == "none") {
                chg.style.color = "#919192";
            } else {
                chg.style.color = "#3b4166";
            }
            previousSibling = previousSibling.previousElementSibling;
        }

        var nextSibling = selectedElement.nextElementSibling;
        while (nextSibling) {
            var main_dlt = nextSibling.firstElementChild.firstElementChild.children[4];
            var chg = nextSibling.firstElementChild.firstElementChild.children[1];
            main_dlt.style.display = main_dlt.style.display === "inline" ? "none" : "inline";
            chg.style.pointerEvents = chg.style.pointerEvents === "auto" ? "none" : "auto";
            if (chg.style.pointerEvents == "none") {
                chg.style.color = "#919192";
            } else {
                chg.style.color = "#3b4166";
            }
            nextSibling = nextSibling.nextElementSibling;
        }
    }


    var deletes = document.querySelectorAll(".txt-dlt");
    deletes.forEach(el => {
        el.addEventListener("click", () => {
            el.parentElement.previousElementSibling.value = "";
            el.parentElement.innerHTML = '';
        })
    });

    function getimage(input) {
        var display_name = input.nextElementSibling;
        var image = input.value;
        var raw_name = image.replace(/^.*\\/, "");

        var parts = raw_name.split(" ");
        var firstWord = parts[0];
        if (parts.length > 1) {
            var secondWord = parts[1].substring(0, 4);
            var name = firstWord + " " + secondWord;
        }
        else {
            var name = firstWord;
        }

        if (name.length > 10) {
            name = name.substring(0, 10);
        }

        display_name.innerHTML = name + "<i class=fa-trash></i>";
        display_name.children[0].classList.add("fa-solid");
        display_name.children[0].classList.add("txt-dlt");

        var deletess = document.querySelectorAll(".txt-dlt");

        deletess.forEach(el => {
            el.addEventListener("click", () => {
                el.parentElement.previousElementSibling.value = "";
                var f_delete = el.parentElement.parentElement.previousElementSibling;
                el.parentElement.innerHTML = '';
                if (f_delete.textContent.trim() == "") {
                    setTimeout(() => {
                        f_delete.parentElement.parentElement.parentElement.style.transition = "opacity 1s ease-out";
                        f_delete.parentElement.parentElement.parentElement.style.opacity = 0;
                        setTimeout(() => {
                            f_delete.parentElement.parentElement.parentElement.remove();
                        }, 500);
                    }, 500);
                }
            })
        });
    }

    function label_1(el) {
        el.nextElementSibling.click();
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
                <input className="form-control search" type="text" id="myInput" onkeyup="myFunction()"
                    placeholder="Search for F.I.R Number.." />
            </div>

            <div className="tablep">
                <table className="table-hover">
                    <thead>
                        <tr>
                            <td style={{ width: "9%", borderColor: "rgb(0, 0, 0)" }}>NO.</td>
                            <td style={{ width: "47%", borderColor: "rgb(0, 0, 0)" }}>F.I.R Number</td>
                            <td style={{ width: "16%", borderColor: "rgb(0, 0, 0)" }}>Details</td>
                            <td style={{ width: "25%", borderColor: "rgb(0, 0, 0)" }}>Add Suggestion</td>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        <tr className="mobin jin tin">
                            <td>1</td>
                            <td className="inn">123645</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>123646</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>5</span>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>223647</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>1</span>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>123648</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>123649</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>1</span>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>123650</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>7</span>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>123665</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>123695</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>123695</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>123745</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>124645</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>124645</td>
                            <td><span>Details</span></td>
                            <td><span data-toggle="modal" data-target="#exampleModalCenter" onClick={modaltitle}>3</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
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
                            <div className="card">
                                <div className="card-body">
                                    <div style={{ display: "flex", columnGap: "1rem" }}>
                                        <h5 className="card-title">S.P</h5>
                                        <i className="fa-duotone fa-pen-to-square"
                                            style={{ pointerEvents: "auto", display: "inline", paddingTop: "1.5px", fontSize: "1.4rem", color: "#3b4166" }}
                                            onClick={edittext}></i>
                                        <i className="fa-regular fa-floppy-disk"
                                            style={{ display: "none", paddingTop: "1.5px", fontSize: "1.4rem", color: "#3b4166" }}
                                            onClick={edittext}></i>
                                        <h5 className="delete_1" style={{
                                            display: 'none',
                                            columnGap: '1rem',
                                            alignItems: 'center',
                                            marginBottom: '0.75rem'
                                        }}>Want To Delete?
                                            <i className="fa-solid fa-trash-can"
                                                style={{ paddingTop: '1.5px', fontSize: '1.3rem', color: '#3b4166' }}></i>
                                            <i className="fa-solid fa-trash-can-slash"
                                                style={{ paddingTop: "1.5px", fontSize: "1.3rem", color: "#3b4166" }}
                                                onClick="clck(this)"></i>
                                        </h5>
                                        <i className="fa-duotone fa-trash main_dlt" style={{ display: "inline", paddingTop: "1.5px", fontSize: "1.4rem", color: "#ba4b4b" }} onClick="maindlt(this)"></i>
                                    </div>
                                    <div className="card-content">
                                        <p className="card-text" contenteditable="false" style={{ margin: "0" }}>
                                            Lorem ipsum dolor sit amet consectetur
                                            adipisicing elit. Laendi,
                                            libero.</p>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: 'center',
                                            alignItems: "center", columnGap: "9px"
                                        }}>
                                            <label style={{ pointerEvents: "none" }} onClick="label_1(this)">
                                                <i className="fa-duotone fa-arrow-up-from-bracket icn"></i>
                                            </label>
                                            <input type="file" style={{ display: 'none', visibility: 'none' }}
                                                onchange="getimage(this);" />
                                            <div
                                                style={{ width: "max-content", display: "flex", columnGap: "5px", alignItems: "center" }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="fa-solid fa-plus add-card-btn" onClick={addCard}></button>
                    </div>
                </div>
            </div>

            <footer className="bg-light text-center text-lg-start ftp">
                <div className="text-center p-3 ft" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © 2023 Copyright:
                    <a className="text-dark" href="https://mdbootstrap.com/">W.M.I.S</a>
                </div>
                {/* <!-- <i className=""></i> --> */}
                {/* <!-- <i className="fa-solid fa-trash"></i> --> */}
            </footer>
        </div>
    )
}

export default Nodal
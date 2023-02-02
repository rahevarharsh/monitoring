import React from 'react'
import { NavLink } from 'react-router-dom'

const FIR_Row = (props) => {
  return (
    <>
        <tr>
            <td>{props.index}</td>
            <td>{props.firnumber}</td>
            <td><span onClick={props.ClickOndetail}>Details</span></td>
            <td><span data-toggle={props.toggle} data-target={props.target}
                        onClick={props.handleClick}>{props.notifincation}</span></td>
        </tr>
    </>
  )
}

export default FIR_Row
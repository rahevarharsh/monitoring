import React from 'react'

const FIR_Row = (props) => {
  return (
    <>
        <tr>
            <td>{props.index}</td>
            <td>{props.firnumber}</td>
            <td><span>Details</span></td>
            <td><span data-toggle={props.toggle} data-target={props.target}
                        onClick={props.handleClick}>{props.notifincation}</span></td>
        </tr>
    </>
  )
}

export default FIR_Row
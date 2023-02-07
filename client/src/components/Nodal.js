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
    return (
        <div>Nodal Page{props.NodalSchema.email}</div>
    )
}

export default Nodal
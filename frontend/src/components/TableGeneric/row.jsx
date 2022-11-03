import React from 'react'

const Row = ({ data }) => {
    return (
        <tr>
            {data.map((r, i) => <td key={i}>{r}</td>)}
        </tr>
    )
}

export default Row
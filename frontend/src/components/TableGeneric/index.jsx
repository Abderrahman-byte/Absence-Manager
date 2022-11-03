import React from 'react'
import Row from './row'

const ElementStudentsTable = ({ colomns, data }) => {
    return (
        <table className='table table-dark table-striped'>
            <thead>
                <tr>
                    {colomns.map((col, i) => <td key={i} scope="col">{col}</td>)}
                </tr>
            </thead>
            <tbody>
                {data.map((rowData, i) => <Row key={i} data={rowData} />)}
            </tbody>
        </table>
    )
}

export default ElementStudentsTable
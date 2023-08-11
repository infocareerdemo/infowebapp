import axios from 'axios';
import authservice from '../service/authservice';
import React, { useState, useEffect } from 'react';
import MainHeader from '../MainHeader';
import Sidepannel from '../sidepannel';

const WdgwheelList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    WdgeList();

  }, [])

  const WdgeList = () => {
    authservice.WdgeList().then((response) => {
      setData(response.data)
      console.log(response.data)
    })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <MainHeader />
      <Sidepannel />
      <div className="page-wrapper">
        <div className="page-header">
          <h1 style={{ marginLeft: '4%' }}>Data from wdgwheel API</h1>
          <div>
            <table style={{ width: '100%', border: '1px solid black', margin: '3%' }}>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <td key={columnIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WdgwheelList;

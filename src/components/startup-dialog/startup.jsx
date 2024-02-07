import './startup.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rows = [
  {name : "1" , calories : "434, 544"},
  {name : "2" , calories : "545, 343"},
  {name : "3" , calories : "343, 435"},
  {name : "4" , calories : "434, 443"},
  {name : "5" , calories : "443, 564"},
  {name : "6" , calories : "443, 564"},
  {name : "7" , calories : "443, 564"},
  {name : "8" , calories : "443, 564"},
  {name : "9" , calories : "443, 564"},
  {name : "10", calories : "443, 564"},
  {name : "11", calories : "443, 564"},
  {name : "12", calories : "443, 564"},
  {name : "13", calories : "443, 564"},
  {name : "14", calories : "443, 564"},
  {name : "15", calories : "443, 564"},
]

function Startup() {
  return (
    <div className="startup-container">
      <div className='startup-dialog'>
        <div className='header'> Startup Page
        </div>
        <div style={{ marginTop: "20px" }}>
          <button className='styled-buttons'>Settings...</button>
          <button className='styled-buttons'>Aquire Data!</button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ "width": "35px", "minWidth": "10px" }}>Well Index</TableCell>
                <TableCell style={{ "width": "40px" }}>Wavelength Index</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ "width": "35px" }}>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ "width": "40px" }}>{row.calories}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <div style={{ marginTop: "8%" }}>
          <button className='styled-buttons'>Ok</button>
          <button className='styled-buttons'>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Startup;

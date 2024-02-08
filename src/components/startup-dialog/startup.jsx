import './startup.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

const rows = [
  { index: "1", wavelength: "434, 544, 434" },
  { index: "2", wavelength: "545, 343" },
  { index: "3", wavelength: "434, 544, 434" },
  { index: "4", wavelength: "434, 443" },
  { index: "5", wavelength: "443, 564" },
  { index: "6", wavelength: "434, 544, 434" },
  { index: "7", wavelength: "443, 564, 454" },
  { index: "8", wavelength: "443, 564" },
  { index: "9", wavelength: "443, 564" },
  { index: "10", wavelength: "443, 564" },
  { index: "11", wavelength: "443, 564" },
  { index: "12", wavelength: "443, 564" },
  { index: "13", wavelength: "443, 564" },
  { index: "14", wavelength: "443, 564" },
  { index: "15", wavelength: "443, 564" },
]

function Startup() {

  const [content, setContent] = useState(false);
  const handleAquire = (e) => {
    setContent(true);
  }
  const handleCancel = (e) => {
    setContent(false);
  }
  return (
    <>
      <div className="startup-container">
        <div className='startup-dialog'>
          <div className='header'> Startup Page
          </div>
          <div style={{ marginTop: "20px" }}>
            <button className='styled-buttons'>Settings...</button>
            <button className='styled-buttons' onClick={(e) => handleAquire(e)}>Aquire Data!</button>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ "width": "85px" }} align='center'>Well Index</TableCell>
                  <TableCell align='center'>Wavelength Values</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content && <>
                  {rows.map((row) => (
                    <TableRow
                      key={row.index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align='center'>
                        {row.index}
                      </TableCell>
                      <TableCell align='center'>{row.wavelength}</TableCell>
                    </TableRow>
                  ))}
                </>
                }
              </TableBody>
            </Table>
          </TableContainer>

          <div style={{ marginTop: "8%" }}>
            <button className='styled-buttons'>Ok</button>
            <button className='styled-buttons' onClick={(e) => handleCancel(e)}>Cancel</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Startup;

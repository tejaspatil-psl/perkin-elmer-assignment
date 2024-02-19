import './startup.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";

const dummyData = [
  { index: "1", wavelength: "333, 544, 434" },
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
  let navigate = useNavigate()

  const [content, setContent] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [rows, setRows] = useState([])
  const [count, setCount] = useState(0)
 
  const convert=(index,wavelength) =>{
         console.log("index",index,wavelength)
         let result =[];
         for(let i=0;i<index.length;i++){
             result.push({
              index:index[i],
              wavelength:wavelength[i].join(',')
             })
         }
         return result
  }
  

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/getCalculatedData")
      .then((response) => {
        if (response) {
          console.log("getdata", response.data) // Handle the response data here
          const index= Object.keys(response.data);
          const wavelength = Object.values(response.data)
          const data=convert(index,wavelength);
          
          console.log("getdataconvert",data)
          setRows(data)
          setCount(data.length)
          setIsDisabled(false)
        } else {
          console.error("Response data is empty or undefined")
          setRows(dummyData)
        }
      })
      .catch((error) => {
        console.error("Error while fetching data:", error)
        setRows(dummyData)
      });
  };

  const handleAquire = (e) => {
    if (content === true) {
      setOpen(true)
    } else {
      setContent(true)
      fetchData()
      setIsDisabled(true)
    }
  }
  const handleCancel = (e) => {
    setContent(false)
    setRows([])
    setIsDisabled(false)
  }
  useEffect(() => {
    console.log("rows", rows)
  }, [rows])
  const handleSetting = () => {
    navigate('/settings')
  }
  const handleYes = () => {
    setIsDisabled(true)
    fetchData()
    setOpen(false)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="startup-container">
        <div className='startup-dialog'>
          <div className='header'> Startup Page
          </div>
          <div style={{ marginTop: "20px" }}>
            <button className='styled-buttons' onClick={handleSetting} disabled={isDisabled}>Settings...</button>
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
                  {rows?.map((row) => (
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

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Would you like to override the existing data?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <button className='styled-buttons' onClick={() => handleYes()}>Yes</button>
                <button className='styled-buttons' onClick={() => setOpen(false)}>No</button>
              </Typography>
            </Box>
          </Modal>

          <div style={{ marginTop: "8%" }}>
            <button className='styled-buttons'>Ok</button>
            <button className='styled-buttons' onClick={(e) => handleCancel(e)}>Cancel</button>
          </div>
          {content && <div style={{ color: "green" }}>Wavelengths for {count} wells have been acquired.</div>}
        </div>
      </div>
    </>
  );
}

export default Startup;
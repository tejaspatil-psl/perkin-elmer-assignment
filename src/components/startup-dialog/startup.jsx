import './startup.css';

function Startup() {
  return (
    <div className="startup-container">
      <div className='startup-dialog'>
      <div className='header'> Window 2 <button>X</button></div>
        <div style={{marginTop:"20px"}}>
          <button className='styled-buttons'>Settings...</button>
          <button className='styled-buttons'>Aquire Data!</button>
        </div>

        

        <div style={{marginTop:"65%"}}>
          <button className='styled-buttons'>Ok</button>
          <button className='styled-buttons'>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Startup;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useState('');
  const [data, setData] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://jwt.sulla.hu/login', { username, password });
      setToken(res.data.token);
      console.log(username, password)
    }
    catch (error) {
      console.error("Nem lesz jó az a jelszó: ", error);
      console.log(username, password)
    }
  };



  const fetchData = async () => {
    try {
      const response = await axios.get('https://jwt.sulla.hu/termekek', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Adatok lekérése sikertelen: ", error);
    }
  };
  return (
    <div className='row'>
      <h1>JWT Bejelentkezés hitelesítéssel</h1>
      <div className='col-sm-3 col-md-2'>
        Felhasználónév:
        <input className='form-control' type="text" placeholder="felhasználónév" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className='row'>
        <div className='col-sm-3 col-md-2'>
          Jelszó:
          <input className='form-control' type="password" placeholder="jelszó" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <hr></hr>
      <div className='row'>
        <div>
          <button className='btn btn-warning col-sm-3 col-md-2' onClick={handleLogin}>Bejelentkezés</button>
        </div>
      </div>

      <div className='row'>
        {token && (


          <div>
            <p>Lekérdezés</p>
            <button className='btn btn-danger' onClick={fetchData}>Veszély</button>
            <p>Terméknév : Ár</p>
            <hr></hr>
            {data && (
              
              <ul>
                {data.map((item) => (

                  <div key={item.id}>{item.name} : {item.price}</div>
                )
                )}
              </ul>
            )}




          </div>
        )}


      </div>
    </div>


  );
}

export default App;

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddItemForm from './AddItemForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

//run npm install @mui/icons-material
//run npm install @mui/material 
function ShelfPage() {
  const [user, setUser] = useState(null)
  const [shelf, setShelf] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newItemPut, setNewItemPut] = useState('')
  const [newImgPut, setNewImgPut] = useState('')


  useEffect(() => {
    getUser(),
      fetchShelf();
  }, []);

  const getUser = () => {
    axios.get('api/user')
      .then(res => {
        console.log('user is', res.data);
        setUser(res.data)
      })
      .catch(err => {
        setUser(null)
      })
  }

  const fetchShelf = () => {
    axios.get('/api/shelf')
      .then((res) => {
        setShelf(res.data)
        console.log('shelf is', res.data);
      })
      .catch((err) => {
        console.error('get shelves error', err);

      })
  }
  const onLogin = () => {
    console.log('onLogin', { username, password });

    axios.post('/api/user/register', { username, password })

    setUsername('')
    setPassword('')
    setUser(null)
  }
  const handleDelete = (id) => {
    axios.delete(`/api/shelf/${id}`)
      .then(() => { fetchShelf() })
      .catch(err => console.log(err));
  };
  const onLogout = () => {
    console.log('onLogout');
    axios.post('/api/user')
    setPets([])
    setUser(null)
  }
  const putSubmit = (id) => {
    console.log('id is', id);

    axios.put(`/api/shelf/${id}`, {description: newItemPut, image_url: newImgPut})
    .then(() => { fetchShelf() })
  }

  return (
    <div className="container">
      <AddItemForm fetchShelf={fetchShelf} />
      <div className="shelfItems">
        <h2>Shelf</h2>
        {/* we will need to pass the fetchItems (axios.get function) through to the form */}

        <p>All of the available items can be seen here.</p>
        <div className="itemBox">
          <ul>
            {shelf.map(shelfItem => (
              <>
                <li key={shelfItem.id}> <h2> {shelfItem.description}</h2></li>
                <img src={shelfItem.image_url} width={250} height={300} />
                <div className="dltButton">
                  {/*  <IconButton aria-label="delete" size="large" > */}
                  <DeleteIcon fontSize="large" onClick={() => handleDelete(shelfItem.id)} />
                  {/* </IconButton> */}
                </div>
                <p>edit if you wish</p>
                  <input
                    placeholder='item here'
                    onChange = {evt => setNewItemPut(evt.target.value)}
                    value={newItemPut}
                  />
                  <input
                    placeholder='img url here'
                    onChange = {evt => setNewImgPut(evt.target.value)}
                    value={newImgPut}
                  />
                  <button onClick={() => putSubmit(shelfItem.id)}>save changes</button>
                  
              </>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}


export default ShelfPage;

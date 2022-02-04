import React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import AddItemForm from './AddItemForm';
function ShelfPage() {
  const [user, setUser] = useState(null)
  const [shelf, setShelf] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const onLogout = () => {
    console.log('onLogout');
    axios.post('/api/user')
    setPets([])
    setUser(null)
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      {/* we will need to pass the fetchItems (axios.get function) through to the form */}
      <AddItemForm  fetchShelf={fetchShelf} />
      <p>All of the available items can be seen here.</p>

    <ul>
      {shelf.map(shelfItem => (
        <>
        <li key={shelfItem.id}> <h2> {shelfItem.description}</h2></li>
        <img src={shelfItem.image_url} width ={250} height= {300} />
        <li >{shelfItem.description}</li>
        <img src={shelfItem.image_url}/>
        </>
      ))}
    </ul>

    </div>
  );
}


export default ShelfPage;

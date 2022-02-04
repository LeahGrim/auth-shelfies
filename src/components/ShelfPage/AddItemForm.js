import axios from "axios";
import { useState } from 'react';
import './AddItemForm.css';
function AddItemForm({fetchShelf}){
   const [newItem, setNewItem] = useState('');
   const [image, setImage] = useState('');
   
   const onSubmit = (evt) => {
       evt.preventDefault();

       axios.post('/api/shelf', {description: newItem, image_url: image})
        .then(() => fetchShelf())
        .catch(err => console.error(err));
    };

   return(
        <>
        <form onSubmit= {onSubmit}>
        <div className= "addItemTitle"> 
        <h2><strong> ADD NEW ITEM </strong></h2>
        </div>
        <div className= "inputFields">
        <input 
            value= {newItem}
            onChange= {evt => setNewItem(evt.target.value)}
            placeholder= "item here"
        />
        <input
            value= {image}
            onChange= {evt => setImage(evt.target.value)}
            placeholder="image url here"
            input height= "pixels"

       />
        <button><h3> ADD ITEM </h3></button> <br />
        
       </div>

        </form>
        </>
    )
}
export default AddItemForm;
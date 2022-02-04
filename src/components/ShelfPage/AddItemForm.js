function AddItemForm(){
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
        <h2><strong> ADD NEW ITEM </strong></h2>
        <input 
            value= {newItem}
            onChange= {evt => setNewItem(evt.target.value)}
        />
        <input
            value= {image}
            onChange= {evt => setImage(evt.target.value)}
        />
        <button><h2> ADD ITEM </h2></button>
        </form>
        </>
    )
}
export default AddItemForm;
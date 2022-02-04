import React from 'react';
import AddItemForm from './AddItemForm'
function ShelfPage() {
  return (
    <div className="container">
      <h2>Shelf</h2>
      {/* we will need to pass the fetchItems (axios.get function) through to the form */}
      <AddItemForm  />
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;

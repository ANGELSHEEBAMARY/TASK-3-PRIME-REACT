import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './frockmanager.css';

const RehobothBoutique = () => {
  const [items, setItems] = useState([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [newFrock, setNewFrock] = useState({ frockCode: '', frockName: '', frockPrice: '' });
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updateFrock, setUpdateFrock] = useState({ frockCode: '', frockName: '', frockPrice: '' });

  const handleInputChange = (e, setFrock) => {
    const { name, value } = e.target;
    setFrock(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCreateFormChange = (e) => handleInputChange(e, setNewFrock);
  const handleUpdateFormChange = (e) => handleInputChange(e, setUpdateFrock);

  const isValidFrock = (frock) => {
    return frock.frockCode && frock.frockName && frock.frockPrice;
  };

  const addFrock = () => {
    if (isValidFrock(newFrock)) {
      setItems(prevItems => [...prevItems, newFrock]);
      setNewFrock({ frockCode: '', frockName: '', frockPrice: '' });
      setCreateFormVisible(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const updateFrockDetails = () => {
    if (isValidFrock(updateFrock)) {
      const updatedItems = items.map((item, index) =>
        index === updateIndex ? updateFrock : item
      );
      setItems(updatedItems);
      setUpdateFrock({ frockCode: '', frockName: '', frockPrice: '' });
      setUpdateFormVisible(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderTable = () => {
    return (
      <DataTable value={items}>
        <Column field="frockCode" header="Frock Code" />
        <Column field="frockName" header="Frock Name" />
        <Column field="frockPrice" header="Frock Price" />
        <Column
          header="Actions"
          body={(rowData, rowIndex) => (
            <div className="actions">
              <Button onClick={() => editFrock(rowIndex)}>Edit</Button>
              <Button onClick={() => removeFrock(rowIndex)} className="p-button-danger">Delete</Button>
            </div>
          )}
        />
      </DataTable>
    );
  };

  const editFrock = (index) => {
    setUpdateIndex(index);
    setUpdateFrock(items[index]);
    setUpdateFormVisible(true);
    setCreateFormVisible(false);
  };

  const removeFrock = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="frock-manager">
      <Button className="addbtn" onClick={() => setCreateFormVisible(true)}>Add New Frock</Button>
      
      {createFormVisible && (
        <div className="create_form">
          <InputText 
            name="frockCode" 
            value={newFrock.frockCode} 
            onChange={handleCreateFormChange} 
            placeholder="Frock Code"
          />
          <InputText 
            name="frockName" 
            value={newFrock.frockName} 
            onChange={handleCreateFormChange} 
            placeholder="Frock Name"
          />
          <InputText 
            name="frockPrice" 
            value={newFrock.frockPrice} 
            onChange={handleCreateFormChange} 
            placeholder="Frock Price"
          />
          <Button onClick={addFrock}>Add</Button>
          <Button onClick={() => setCreateFormVisible(false)}>Cancel</Button>
        </div>
      )}

      {updateFormVisible && (
        <div className="update_form">
          <InputText 
            name="frockCode" 
            value={updateFrock.frockCode} 
            onChange={handleUpdateFormChange} 
            placeholder="Frock Code"
          />
          <InputText 
            name="frockName" 
            value={updateFrock.frockName} 
            onChange={handleUpdateFormChange} 
            placeholder="Frock Name"
          />
          <InputText 
            name="frockPrice" 
            value={updateFrock.frockPrice} 
            onChange={handleUpdateFormChange} 
            placeholder="Frock Price"
          />
          <Button onClick={updateFrockDetails}>Update</Button>
          <Button onClick={() => setUpdateFormVisible(false)}>Cancel</Button>
        </div>
      )}

      <div className="table_data">
        {renderTable()}
      </div>
    </div>
  );
};

export default RehobothBoutique;

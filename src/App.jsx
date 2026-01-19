import { useState, useEffect } from 'react';
import './App.css';
import { BackgroundLines } from './BackgroundLines';

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('shopping_items');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [quantily, setQuantily] = useState(1);

  useEffect(() => {
    localStorage.setItem('shopping_items', JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (!input) return;
    setItems([...items, { id: Date.now(), name: input, quantily, bought: false }]);
    setInput('');
    setQuantily(1);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleBought = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, bought: !item.bought } : item));
  };

  return (
    <div className="container">
      <BackgroundLines />
      <div className="shopping-card">
        <h1>Shopping List</h1>
        <form className="input-group" onSubmit={addItem}>
          <input
            type="number"
            className="qty-input"
            value={quantily}
            onChange={(e) => setQuantily(parseInt(e.target.value) || 1)}
            min="1"
          />
          <input
            type="text"
            className="name-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add an item"
          />
          <button type="submit" className="add-btn">Add Item</button>
        </form>
        <div className="item-container">
          {items.map(item => (
            <div key={item.id} className={`item ${item.bought ? 'bought' : ''}`}>
              <div className="item-info" onClick={() => toggleBought(item.id)}>
                <span className="checkbox">{item.bought ? '✔️' : '⬜'}</span>
                <span className="item-text">{item.quantily}x {item.name}</span>
              </div>
              <button className="delete-btn" onClick={() => deleteItem(item.id)}>🗑️</button>
            </div>
          ))}
          {items.length === 0 && <p className="empty-msg">No items in the list</p>}
        </div>
      </div>
    </div>
  );
}

export default App;

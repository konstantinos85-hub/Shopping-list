import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Animation library
import './App.css';
import { BackgroundLines } from './BackgroundLines';

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('shopping_items');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [quantily, setQuantily] = useState(1);
  const [category, setCategory] = useState('🛒'); // Default κατηγορία

  useEffect(() => {
    localStorage.setItem('shopping_items', JSON.stringify(items));
  }, [items]);

  const memoizedBG = useMemo(() => <BackgroundLines />, []);

  const addItem = (e) => {
    e.preventDefault();
    if (!input) return;
    setItems([{ id: Date.now(), name: input, quantily, category, bought: false }, ...items]);
    setInput('');
    setQuantily(1);
  };

  const deleteItem = (id) => setItems(items.filter(item => item.id !== id));

  const toggleBought = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  };

  // Υπολογισμός Προόδου
  const completedItems = items.filter(i => i.bought).length;
  const totalItems = items.length;
  const progress = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

  return (
    <div className="container">
      {memoizedBG}

      <div className="reveal-animation">
        <div className="shopping-card">
          <h1>Shopping List</h1>

          {/* Πρόοδος / Stats */}
          <div className="stats-bar">
            <div className="progress-text">
              Completed: {completedItems} / {totalItems}
            </div>
            <div className="progress-bg">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form className="input-group" onSubmit={addItem}>
            <select
              className="cat-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="🛒">General</option>
              <option value="🍎">Food</option>
              <option value="🧼">Cleaning</option>
              <option value="💊">Health</option>
            </select>
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
            <button type="submit" className="add-btn">+</button>
          </form>

          <div className="item-container">
            <AnimatePresence> {/* Wrapper για animations διαγραφής/προσθήκης */}
              {items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  className={`item ${item.bought ? 'bought' : ''}`}
                >
                  <div className="item-info" onClick={() => toggleBought(item.id)}>
                    <span className="category-icon">{item.category}</span>
                    <span className="checkbox">{item.bought ? '✔️' : '⬜'}</span>
                    <span className="item-text">{item.quantily}x {item.name}</span>
                  </div>
                  <button className="delete-btn" onClick={() => deleteItem(item.id)}>🗑️</button>
                </motion.div>
              ))}
            </AnimatePresence>
            {items.length === 0 && <p className="empty-msg">No items in the list</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;





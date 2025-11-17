import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editText } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const finishTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: true } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F0EDEE',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '40px 30px',
          borderRadius: '16px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(79, 172, 254, 0.3)'
        }}>
          <h1 style={{
            color: 'white',
            margin: '0 0 10px 0',
            fontSize: '32px',
            fontWeight: '700',
            letterSpacing: '-0.5px'
          }}>Todo List</h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0,
            fontSize: '14px'
          }}>Stay organized, stay productive</p>
        </div>

        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              style={{
                flex: 1,
                padding: '14px 18px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4facfe'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              onClick={addTodo}
              style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 24px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(79, 172, 254, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(79, 172, 254, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(79, 172, 254, 0.3)';
              }}
            >
              + Add
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {todos.map(todo => (
            <div
              key={todo.id}
              onMouseEnter={() => !editingId && setHoveredId(todo.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: 'white',
                padding: '18px 20px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: hoveredId === todo.id && !editingId ? 'translateY(-2px)' : 'translateY(0)',
                position: 'relative',
                filter: todo.completed ? 'blur(1.5px)' : 'none',
                opacity: todo.completed ? 0.6 : 1
              }}
            >
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                    autoFocus
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '2px solid #4facfe',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                  <button
                    onClick={() => saveEdit(todo.id)}
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      background: '#e5e7eb',
                      color: '#6b7280',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span style={{
                    flex: 1,
                    color: todo.completed ? '#9ca3af' : '#1f2937',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    fontSize: '15px',
                    transition: 'all 0.2s'
                  }}>
                    {todo.text}
                  </span>

                  {hoveredId === todo.id && !todo.completed && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => startEdit(todo)}
                        style={{
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          transition: 'transform 0.2s',
                          boxShadow: '0 2px 8px rgba(79, 172, 254, 0.3)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => finishTodo(todo.id)}
                        style={{
                          background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          transition: 'transform 0.2s',
                          boxShadow: '0 2px 8px rgba(17, 153, 142, 0.3)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        Finish
                      </button>
                    </div>
                  )}

                  {todo.completed && (
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        transition: 'background 0.2s',
                        fontSize: '18px'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#fee2e2'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      🗑️
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#9ca3af',
            fontSize: '15px'
          }}>
            No tasks yet. Add one to get started!
          </div>
        )}
      </div>
    </div>
  );
}
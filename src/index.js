import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import CategoryContext from './context';
import './index.css';
import App from './App';

function Mai() {
  const [chooseCategory, setChooseCategory] = React.useState();
  return (
    <React.StrictMode>
      <CategoryContext.Provider value={{ chooseCategory, setChooseCategory }}>
        <App chooseCategory={chooseCategory} />
      </CategoryContext.Provider>
    </React.StrictMode>
  );
}
ReactDOM.render(<Mai />, document.getElementById('root'));
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

import React from 'react';
import axios from 'axios';
import './Menu.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Add from '@mui/icons-material/AddCircleOutlineOutlined';
import Delete from '@mui/icons-material/HighlightOffOutlined';
import CategoryContext from '../../context';

export default function Menu(props) {
  const [color, setColor] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const { chooseCategory, setChooseCategory } = React.useContext(CategoryContext);
  const form = document.querySelector('.menu__create-categories');

  const displayForm = function () {
    form.style.display = 'block';
  };
  const hideForm = function () {
    form.style.display = 'none';
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  function createCategory(category, color) {
    if (category && color) {
      axios
        .post('https://6249f654852fe6ebf882c00a.mockapi.io/categories', {
          category: category,
          colorId: color,
        })
        .then(function () {
          document.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert('Error: invalid date');
    }
  }

  function deleteCategory(id) {
    axios
      .delete(`https://6249f654852fe6ebf882c00a.mockapi.io/categories/${id}`)
      .then(function () {
        document.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="menu">
      <div className="menu__list">
        <h2 className="menu__title">My Tasks</h2>
        <div className="menu__item">
          <p className="menu__item-name">All tasks</p>
          <p className="menu__item-count">122</p>
        </div>
        {props.categories.map((val) => {
          return (
            <div key={val.id} className="menu__item" onClick={() => setChooseCategory(val.id)}>
              <p className="menu__item-name">
                <Delete className="menu__delete-category" onClick={() => deleteCategory(val.id)} />
                {val.category}
              </p>
              <p className="menu__item-count">122</p>
            </div>
          );
        })}
      </div>
      <div className="menu__create-categories">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off">
          <TextField
            id="standard-basic"
            label="category"
            variant="standard"
            value={category}
            onChange={handleChangeCategory}
          />
        </Box>
        <FormControl variant="standard" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
          <InputLabel id="demo-simple-select-standard-label">Color</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={color}
            onChange={handleChangeColor}
            label="Color">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {props.colors.map((val) => {
              return (
                <MenuItem key={val.name} value={val.id}>
                  {val.name}
                </MenuItem>
              );
            })}
          </Select>
          <button type="submit" onClick={hideForm}>
            Cancel
          </button>
          <button type="submit" onClick={() => createCategory(category, color)}>
            Create
          </button>
        </FormControl>
      </div>
      <div className="menu__add">
        <Add onClick={displayForm} />
      </div>
    </div>
  );
}

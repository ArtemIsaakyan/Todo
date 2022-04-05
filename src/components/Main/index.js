import React from 'react';
import axios from 'axios';
import './Main.scss';
import SearchIcon from '@mui/icons-material/Search';
import Delete from '@mui/icons-material/HighlightOffOutlined';
import Edit from '@mui/icons-material/ModeEditOutlineOutlined';
import Add from '@mui/icons-material/AddCircleOutlineOutlined';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Main(props) {
  const [text, setText] = React.useState([]);
  let res = props.tasks.filter((value) => value.categoryId === props.chooseCategory);
  const form = document.querySelector('.main__create-tasks');

  const displayForm = function () {
    form.style.display = 'block';
  };
  const hideForm = function () {
    form.style.display = 'none';
  };

  const handleChangeTask = (event) => {
    setText(event.target.value);
  };

  function createTask(text, category) {
    if (text) {
      axios
        .post('https://6249f654852fe6ebf882c00a.mockapi.io/tasks', {
          description: text,
          categoryId: category,
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
  return (
    <div className="main">
      <div className="main__container">
        <div className="main__search">
          <SearchIcon className="main__search-icon" />
          <input
            className="main__search-line"
            type="text"
            name="Search task"
            placeholder="Search task"
          />
        </div>
        <div className="main__search-settings"></div>
        <div className="main__cards">
          {props.chooseCategory && <Add onClick={displayForm} />}
          <div className="main__create-tasks">
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
                value={text}
                onChange={handleChangeTask}
              />
            </Box>
            <FormControl variant="standard" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
              <button type="submit" onClick={hideForm}>
                Cancel
              </button>
              <button type="submit" onClick={() => createTask(text, props.chooseCategory)}>
                Create
              </button>
            </FormControl>
          </div>
          {res &&
            res.map((val) => (
              <div
                className="main__card"
                key={val.id}
                style={{
                  background: 'linear-gradient(to bottom, #6F48E2 2%, transparent 2%)',
                }}>
                <p
                  className="main__category"
                  style={{
                    color: '#6F48E2',
                    backgroundColor: '#6f48e27c',
                  }}>
                  {val.name}
                </p>
                <p className="main__description">{val.description}</p>
                <div className="main__settings">
                  <Edit />
                  <Delete />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

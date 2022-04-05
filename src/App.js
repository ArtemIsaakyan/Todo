import React from 'react';
import axios from 'axios';
import Menu from './components/Menu';
import Main from './components/Main';

function App(props) {
  const [colors, setColors] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [colorsResponse, tasksResponse, categoriesResponse] = await Promise.all([
          axios.get('https://6249f654852fe6ebf882c00a.mockapi.io/colors'),
          axios.get('https://6249f654852fe6ebf882c00a.mockapi.io/tasks'),
          axios.get('https://6249f654852fe6ebf882c00a.mockapi.io/categories'),
        ]);
        setColors(colorsResponse.data);
        setTasks(tasksResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Menu categories={categories} colors={colors} tasks={tasks} />
      <Main
        categories={categories}
        colors={colors}
        tasks={tasks}
        chooseCategory={props.chooseCategory}
      />
    </div>
  );
}

export default App;

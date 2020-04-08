import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";
import logo from './assets/logo.png';


function App() {

  const [ repositories, SetRepository ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((res => {
      SetRepository(res.data)
    }))
  }, [])



  async function handleAddRepository() {
    const res = await api.post('/repositories',{
      title: "React Desafio N1",
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"],
    });

    const repository = res.data;

    SetRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const repoIndex = repositories.findIndex(repo => repo.id === id)

      const newRepositories = [...repositories];
      newRepositories.splice(repoIndex, 1);

      SetRepository(newRepositories);
      
    },[])
  }

  return (
    <div className="container">
      <div className="box">
        <img src={logo} alt="Logo"/>
        <ul data-testid="repository-list">
          {repositories.map( repository => 
            <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          
          )}
        </ul>

        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;

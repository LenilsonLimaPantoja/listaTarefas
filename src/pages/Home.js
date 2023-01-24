import React, { useEffect } from "react";
import "./home.scss";
import {
  MdRemoveCircleOutline,
  MdOutlineCircle,
  MdCheckCircleOutline,
} from "react-icons/md";
import { Alert } from "../components/Alert";
export const Home = () => {
  const [tarefa, setTarefa] = React.useState("");
  const [tarefas, setTarefas] = React.useState([]);

  //   adicionar tarefa
  const handleOnsubmit = (e) => {
    e.preventDefault();
    let formValues = new FormData(e.target);
    let dados = Object.fromEntries(formValues);
    if (dados?.tarefa === "") {
      return Alert("Você deve informar uma tarefa");
    }
    setTarefas([...tarefas, dados]);
    localStorage.setItem("tarefas", JSON.stringify([...tarefas.reverse(), dados]));
    setTarefa("");
    // Alert("Tarefa adicionada com sucesso");
  };

  //   buscar tarefas
  useEffect(() => {
    let tarefas2 = JSON.parse(localStorage.getItem("tarefas"));
    if (tarefas2) {
      setTarefas(tarefas2.reverse());
    }
  }, [tarefas.length]);

  //   remover tarefa
  const handleRemoverTarefa = (dado) => {
    if (dado.status === "1") {
      return Alert("Você não pode remover uma tarefa finalizada");
    }
    let tarefa2 = tarefas.filter((item) => item.id !== dado.id);
    setTarefas(tarefa2);
    localStorage.setItem("tarefas", JSON.stringify(tarefa2));
    Alert("Tarefa removida com sucesso");
  };

  //   finalizar tarefa
  const handleFinalizarTarefa = (dado) => {
    let tarefa2 = tarefas.filter((item) => {
      if (item.id === dado.id) {
        if (item.status === "1") {
          Alert("Tarefa reaberta com sucesso");
          return (item.status = "0");
        }
        Alert("Tarefa finalizada com sucesso");
        return (item.status = "1");
      }
      return item;
    });
    setTarefas(tarefa2);
    localStorage.setItem("tarefas", JSON.stringify(tarefa2));
  };

  //gerar id
  const gerarId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  return (
    <div className="container">
      <div>
        <div className="cabecalho">
          <h2>Lista de Tarefas</h2>
        </div>
        <form onSubmit={handleOnsubmit}>
          <input type="hidden" value={gerarId()} name="id" />
          <input type="hidden" value="0" name="status" />
          <input
            type="text"
            placeholder="Informe a tarefa aqui"
            name="tarefa"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
          />
        </form>

        <div className="lista">
          {tarefas?.map((item, index) => (
            <div className="tarefa" key={index}>
              <span className={item.status === "1" ? "finalizada" : ""}>
                {item.tarefa}
              </span>
              <span className="icones">
                {item.status === "1" ? (
                  <MdCheckCircleOutline
                    color="green"
                    onClick={() => handleFinalizarTarefa(item)}
                  />
                ) : (
                  <MdOutlineCircle
                    color="green"
                    onClick={() => handleFinalizarTarefa(item)}
                  />
                )}

                <MdRemoveCircleOutline
                  color="red"
                  onClick={() => handleRemoverTarefa(item)}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

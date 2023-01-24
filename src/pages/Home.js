import React, { useEffect } from "react";
import "./home.scss";
import {
  MdRemoveCircleOutline,
  MdOutlineCircle,
  MdCheckCircleOutline,
} from "react-icons/md";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { DiReact } from "react-icons/di";
import { FaSass } from "react-icons/fa";
import { Alert } from "../components/Alert";
export const Home = () => {
  const [tarefa, setTarefa] = React.useState("");
  const [tarefas, setTarefas] = React.useState([]);

  //   adicionar tarefa
  const handleOnsubmit = (e) => {
    e.preventDefault();
    let formValues = new FormData(e.target);
    let dados = Object.fromEntries(formValues);

    let existeTarefaAberta = tarefas.filter(
      (item) => item.status === "0" && item.tarefa === dados.tarefa
    );
    if (existeTarefaAberta.length > 0) {
      return Alert("A tarefa já existe e está aberta");
    }

    if (dados?.tarefa === "") {
      return Alert("Você deve informar uma tarefa");
    }
    setTarefas([...tarefas, dados]);
    localStorage.setItem(
      "tarefas",
      JSON.stringify([...tarefas.reverse(), dados])
    );
    setTarefa("");
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
    localStorage.setItem("tarefas", JSON.stringify(tarefa2?.reverse()));
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

  //funcao para abrir outra pagina
  const abrirPagina = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="container">
      <div>
        <div className="icones-topo">
          <AiFillGithub
            color="#24292f"
            onClick={() =>
              abrirPagina("https://github.com/LenilsonLimaPantoja/listaTarefas")
            }
          />
          <AiFillLinkedin
            color="#0a66c2"
            onClick={() =>
              abrirPagina(
                "https://www.linkedin.com/in/lenilson-lima-pantoja-0909b0179/"
              )
            }
          />
          <FaSass
            color="#e91e63"
            onClick={() => abrirPagina("https://sass-lang.com/")}
          />
          <DiReact
            color="#61dafb"
            onClick={() =>
              abrirPagina("https://pt-br.reactjs.org/docs/getting-started.html")
            }
          />
          <AiFillYoutube
            color="#ff0000"
            onClick={() =>
              abrirPagina(
                "https://www.youtube.com/channel/UChMSG90W9Bz3ozejZe6o2pA"
              )
            }
          />
        </div>
        <div className="cabecalho">
          <h2>Lista de Tarefas({tarefas?.length})</h2>
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
          {tarefas
            ?.filter((item) => {
              if (tarefa === "") {
                return item;
              }
              if (item.tarefa.toLowerCase().includes(tarefa.toLowerCase())) {
                return item;
              }
            })
            .map((item, index) => (
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

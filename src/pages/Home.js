import React, { useEffect } from "react";
import "./home.scss";
import {
  MdRemoveCircleOutline,
  MdOutlineCircle,
  MdCheckCircleOutline,
  MdAddCircleOutline,
  MdLightMode,
  MdDarkMode,
} from "react-icons/md";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { DiReact } from "react-icons/di";
import { FaSass } from "react-icons/fa";
import { Alert } from "../components/Alert";
export const Home = () => {
  const [tarefa, setTarefa] = React.useState("");
  const [tarefas, setTarefas] = React.useState([]);
  const [tema, setTema] = React.useState(true);
  // const [filtro, setFiltro] = React.useState("2");

  //   adicionar tarefa
  const handleOnsubmit = (e) => {
    e.preventDefault();
    let formValues = new FormData(e.target);
    let dados = Object.fromEntries(formValues);

    //limitar a tamanho da tarefa em 25 caracteres
    if (dados.tarefa.length > 25) {
      return Alert(
        "A tarefa deve ter no máximo 25 caracteres, você digitou " +
          dados.tarefa.length +
          " caracteres"
      );
    }

    let existeTarefaAberta = tarefas.filter(
      (item) => item.status === "0" && item.tarefa === dados.tarefa
    );
    if (existeTarefaAberta.length > 0) {
      return Alert("A tarefa (" + dados.tarefa + ") já existe e está aberta");
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
    let tarefa2 = tarefas?.filter((item) => item.id !== dado.id);
    setTarefas(tarefa2);
    localStorage.setItem("tarefas", JSON.stringify(tarefa2?.reverse()));
    Alert("Tarefa (" + dado.tarefa + ") foi removida com sucesso");
  };

  //   finalizar tarefa
  const handleFinalizarTarefa = (dado) => {
    let tarefa2 = tarefas?.filter((item) => {
      if (item.id === dado.id) {
        if (item.status === "1") {
          Alert("Tarefa ("+dado.tarefa+") reaberta com sucesso");
          return (item.status = "0");
        }
        Alert("Tarefa ("+dado.tarefa+") finalizada com sucesso");
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
    <div className={tema ? "container dark" : "container light"}>
      <div>
        <div className="tema">
          {tema ? (
            <MdDarkMode
              onClick={() => setTema(!tema)}
              color={tema ? "#fff" : "#6464f8"}
            />
          ) : (
            <MdLightMode
              onClick={() => setTema(!tema)}
              color={tema ? "#fff" : "#6464f8"}
            />
          )}
          <p>{tema ? "dark" : "light"}</p>
        </div>
        <div className="icones-topo">
          <AiFillGithub
            color="#24292f"
            onClick={() =>
              abrirPagina("https://github.com/LenilsonLimaPantoja/listaTarefas")
            }
          />
          <DiReact
            color="#61dafb"
            onClick={() =>
              abrirPagina("https://pt-br.reactjs.org/docs/getting-started.html")
            }
          />
          <FaSass
            color="#e91e63"
            onClick={() => abrirPagina("https://sass-lang.com/")}
          />
          <IoLogoWhatsapp
            color="#008069"
            onClick={() =>
              abrirPagina("https://api.whatsapp.com/send?phone=5567982143134")
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
          <AiFillLinkedin
            color="#0a66c2"
            onClick={() =>
              abrirPagina(
                "https://www.linkedin.com/in/lenilson-lima-pantoja-0909b0179/"
              )
            }
          />
        </div>
        <div
          className={
            tema ? "cabecalho cabecalho-dark" : "cabecalho cabecalho-light"
          }
        >
          <h2>Lista de Tarefas({tarefas?.length})</h2>
        </div>
        <form onSubmit={handleOnsubmit}>
          <input type="hidden" value={gerarId()} name="id" />
          <input type="hidden" value="0" name="status" />
          <label className="input">
            <input
              type="text"
              placeholder="Informe a tarefa aqui"
              name="tarefa"
              value={tarefa}
              onChange={(e) => setTarefa(e.target.value)}
            />
            <button>
              <MdAddCircleOutline type="submit" />
            </button>
          </label>
          {/* <select>
            <option value="2">Mostrar Todas</option>
            <option value="0">Aberta</option>
            <option value="1">Finalizada</option>
          </select> */}
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
                <p className={item.status === "1" ? "finalizada" : ""}>
                  {item.tarefa}
                </p>
                <p className="icones">
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
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

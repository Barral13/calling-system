/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { FiPlusCircle } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const listRef = collection(db, "customers");

function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [idCustomer, setIdCustomer] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (snapshot.docs.size === 0) {
            console.log("NENHUMA EMPRESA ENCONTRADA");
            setCustomers([{ id: 1, nomeFantasia: "FREELA" }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);

          if (id) {
            loadId(lista);
          }

        })
        .catch((error) => {
          console.log("ERRO AO BUSCAR OS CLIENTES", error);
          setLoadCustomers(false);
          setCustomers([{ id: 1, nomeFantasia: "FREELA" }]);
        });
    }

    loadCustomers();
  }, [id]);

  async function loadId(lista) {
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto)
        setStatus(snapshot.data().status)
        setComplemento(snapshot.data().complemento);


        let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
        setCustomerSelected(index);
        setIdCustomer(true)

      })
      .catch((error) => {
        console.log(error);
        setIdCustomer(false);
      })
  }

  function handleOptionChange(event) {
    setStatus(event.target.value);
  }

  function handleChangeSelect(event) {
    setAssunto(event.target.value);
  }

  function handleChangeCustomer(event) {
    setCustomerSelected(event.target.value);
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (idCustomer) {
      const docRef = doc(db, "chamados", id)
      await updateDoc(docRef, {
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        complemento: complemento,
        status: status,
        userId: user.uid
      })
        .then(() => {
          toast.info("Chamado atualizado com sucesso!");
          setCustomerSelected(0)
          setComplemento("");
          navigate("/dashboard")
        })
        .catch((error) => {
          toast.error("Erro ao atualizar chamado!");
          console.log(error);
        });

      return;
    }

    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado registrato");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error("Erro ao registrar, tente novamente!");
        console.log(error);
      });
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name={id ? "Editando chamado" : "Novo chamado"}>
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clientes</label>
            {loadCustomers ? (
              <input type="text" disabled={true} value="Carregando..." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Finalizado"
                onChange={handleOptionChange}
                checked={status === "Finalizado"}
              />
              <span>Finalizado</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva o assunto (opcional)."
              value={complemento}
              onChange={(event) => setComplemento(event.target.value)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;

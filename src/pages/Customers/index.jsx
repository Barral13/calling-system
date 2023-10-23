import { FiUser } from "react-icons/fi";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";

function Customers() {
   const [nome, setNome] = useState('')
   const [cnpj, setCnpj] = useState('')
   const [endereco, setEndereco] = useState('')

   async function handleRegister(event) {
      event.preventDefault();

      if (nome !== '' && cnpj !== '' && endereco !== '') {
         await addDoc(collection(db, 'customers'), {
            nomeFantasia: nome,
            cnpj: cnpj,
            endereco: endereco
         })
            .then(() => {
               setNome('')
               setCnpj('')
               setEndereco('')
               toast.success('Empresa Registrada!')
            })
            .catch((error) => {
               console.log(error)
               toast.error("Erro na tentativa de realizar cadastro!")
            })
      } else {
         toast.error("Preencha todos os campos.")
      }

   }

   return (
      <div>
         <Header />

         <div className="content">
            <Title name='Clientes'>
               <FiUser size={25} />
            </Title>

            <div className="container">
               <form className="form-profile" onSubmit={handleRegister}>
                  <label>Nome Fantasia</label>
                  <input
                     type="text"
                     placeholder="Nome da empresa"
                     value={nome}
                     onChange={(event) => setNome(event.target.value)}
                  />

                  <label>CNPJ</label>
                  <input
                     type="text"
                     placeholder="Informe seu CNPJ"
                     value={cnpj}
                     onChange={(event) => setCnpj(event.target.value)}
                  />

                  <label>Endereço</label>
                  <input
                     type="text"
                     placeholder="Endereço da empresa"
                     value={endereco}
                     onChange={(event) => setEndereco(event.target.value)}
                  />

                  <button type="submit" style={{ width: '100px' }}>Registrar</button>

               </form>
            </div>

         </div>
      </div>
   )
}

export default Customers;
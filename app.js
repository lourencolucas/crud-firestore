// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCnL2cyyV1WrjvjWb4_kRSt8NSlLMDiQ9M",
    authDomain: "crud-firestore-b4.firebaseapp.com",
    projectId: "crud-firestore-b4"
});

var db = firebase.firestore();

//Salvar os docs
function guardar() {
    //Buscar os ID's
    var cod = document.getElementById('cod').value;
    var nome = document.getElementById('nome').value;
    var desc = document.getElementById('desc').value;
    var categoria = document.getElementById('categoria').value;
    //Preencher com as variáveis
    db.collection("product").add({
        cod: cod,
        first: nome,
        desc: desc,
        categoria: categoria
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            //limpar os campos
            document.getElementById('cod').value = '';
            document.getElementById('nome').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('categoria').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//Ler docs FireStore
var tabela = document.getElementById('tabela'); //Variavel para preencher os dados
db.collection("product").onSnapshot((querySnapshot) => {
    tabela.innerHTML = ''; //deixar tabela em branco para receber arquivos
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        //preencher a tabela com os dados
        //<th scope="row">${doc.id}</th>
        tabela.innerHTML += `
        <tr>
             <td>${doc.data().cod}</td>  
             <td>${doc.data().first}</td>
             <td>${doc.data().desc}</td>
             <td>${doc.data().categoria}</td>
             <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Excluir</button></td>
             <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().cod}', '${doc.data().first}', '${doc.data().desc}', '${doc.data().categoria}')">Editar</button></td>
        </tr>
        `
    });
});

//Excluir dados
function eliminar(id) {
    db.collection("product").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}


//Editar dados
function editar(id, cod, nome, desc, categoria) {
    //colocando os dados nos inputs
    var cod = document.getElementById('cod').value = cod;
    var nome = document.getElementById('nome').value = nome;
    var desc = document.getElementById('desc').value = desc;
    var cod = document.getElementById('categoria').value = categoria;

    var button = document.getElementById('salvar');
    button.innerHTML = 'Editar'; //Trocando o nome do botão

    button.onclick = function () {
        var washingtonRef = db.collection("product").doc(id);
        // Set the "capital" field of the city 'DC'
        var cod = document.getElementById('cod').value;
        var nome = document.getElementById('nome').value;
        var desc = document.getElementById('desc').value;
        var desc = document.getElementById('categoria').value;

        return washingtonRef.update({
            cod: cod,
            first: nome,
            desc: desc,
            categoria: categoria
        })
            .then(function () {
                console.log("Document successfully updated!");
                button.innerHTML = 'Salvar'; //Trocando o nome do botão
                document.getElementById('cod').value = '';
                document.getElementById('nome').value = '';
                document.getElementById('desc').value = '';
                document.getElementById('categoria').value = 'Escolha';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}

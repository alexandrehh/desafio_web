const NOME = 'Nome';
const DATA_NASCIMENTO = 'Data Nascimento';
const CPF = 'CPF';
const SEXO = 'Sexo';
const EMAIL = 'E-mail';
const REMOVER = 'Remover';

function salvarFormulario() {   
    let listaDeUsuarios = [];    
    
    let nome_usuario = document.getElementById('input_nome_usuario').value;
    let data_nascimento = document.getElementById('input_data_Nasc').value;
    let cpf_usuario = document.getElementById('input_cpf_usuario').value;
    let masculino = document.getElementById('masculino').checked;
    let feminino = document.getElementById('feminino').checked;
    let email_usuario = document.getElementById('input_email_usuario').value;   

    data_nascimento = formatarData(data_nascimento);  
    cpf_usuario = formatarCPF(cpf_usuario); 
    
    usuario = {
        nome: nome_usuario,
        nascimento: data_nascimento,
        cpf: cpf_usuario,
        masculino: masculino,
        feminino: feminino,
        email: email_usuario
    }    
    
    listaDeUsuarios.push(usuario);    

    let objetoTags = criarTagHtmlNaTabela();
    adicionarValoresNaTabela(listaDeUsuarios, objetoTags);    
    limparInputs();    
}   


function formatarData(data) {

    if(data !== '') {
        data = data.toLocaleString().split('-').reverse().join('/')
    }    
    
    return data;
}

function formatarCPF(cpf) {
   
    if(cpf !== '') {
        let cpf_parte1 = cpf.substr(0,3);
        let cpf_parte2 = cpf.substr(3,3);
        let cpf_parte3 = cpf.substr(6,3);
        let cpf_parte4 = cpf.substr(9,2);
    
        cpf = cpf_parte1 + '.' + cpf_parte2 + '.' + cpf_parte3 + '-' + cpf_parte4;
    }
    
    return cpf;
}

function criarTagHtmlNaTabela() {

    const tabela = document.getElementById('tabela');

    const tbody = document.getElementById('valores_adicionados');
    const tr = document.createElement('tr');   
    const valor_nome = document.createElement('td');            
    const valor_nascimento = document.createElement('td'); 
    const valor_cpf = document.createElement('td'); 
    const valor_sexo = document.createElement('td'); 
    const valor_email = document.createElement('td'); 
    const valor_remover = document.createElement('td'); 
    let botao_remover = document.createElement('button');    

    for(let i=0; i<tabela.rows.length; i++) {
        let contador = i;

        tabela.append(tbody);

        tr.setAttribute('id', 'linha_tabela_' + contador);
        tbody.append(tr);
        
        tr.append(valor_nome);
        valor_nome.setAttribute('id', 'nome_' + contador);

        tr.append(valor_nascimento);
        valor_nascimento.setAttribute('id', 'data_nasc_' + contador);

        tr.append(valor_cpf);
        valor_cpf.setAttribute('id', 'cpf_' + contador);

        tr.append(valor_sexo);
        valor_sexo.setAttribute('id', 'sexo_' + contador);

        tr.append(valor_email);
        valor_email.setAttribute('id', 'email_' + contador);

        tr.append(valor_remover);
        valor_remover.setAttribute('id', 'remover_' + contador);
        
        botao_remover.setAttribute('id', 'botao_remover_' + contador);
        botao_remover.setAttribute('class', 'botao_remover');
        botao_remover.setAttribute('onclick', 'removerLinhaDaTabela(event);');
        botao_remover.innerHTML = REMOVER;
        valor_remover.append(botao_remover);
    }
    
    tags = {
        valor_nome: valor_nome,
        valor_nascimento: valor_nascimento,
        valor_cpf: valor_cpf,
        valor_sexo: valor_sexo,
        valor_email: valor_email,
        valor_remover: valor_remover
    }

    return tags;    
}

function adicionarValoresNaTabela(listaDeUsuarios, objetoTags) {

    let titulo_nome = document.getElementById('titulo_nome');
    let titulo_data_nasc = document.getElementById('titulo_data_nasc');
    let titulo_cpf = document.getElementById('titulo_cpf');
    let titulo_sexo = document.getElementById('titulo_sexo');
    let titulo_email = document.getElementById('titulo_email');      
   

    for(let i=0; i<listaDeUsuarios.length; i++) {         

        if(titulo_nome.innerHTML === NOME) {
            let valor_do_nome_inserido = listaDeUsuarios[i].nome;            
            objetoTags.valor_nome.innerText = valor_do_nome_inserido;
        }

        if(titulo_data_nasc.innerHTML === DATA_NASCIMENTO) {
            let valor_da_data_nasc_inserido = listaDeUsuarios[i].nascimento;
            objetoTags.valor_nascimento.innerText = valor_da_data_nasc_inserido;
        }

        if(titulo_cpf.innerHTML === CPF) {
            let valor_do_cpf_inserido = listaDeUsuarios[i].cpf;
            objetoTags.valor_cpf.innerText = valor_do_cpf_inserido;
        }

        if(titulo_sexo.innerHTML === SEXO) {
            let valor_do_sexo_masculino = listaDeUsuarios[i].masculino; 
            let valor_do_sexo_feminino = listaDeUsuarios[i].feminino;            

            if(valor_do_sexo_masculino) {
                objetoTags.valor_sexo.innerText = 'Masculino';
            } else if(valor_do_sexo_feminino){
                objetoTags.valor_sexo.innerText = 'Feminino';
            } else {
                objetoTags.valor_sexo.innerText = '';
            }
        }

        if(titulo_email.innerHTML === EMAIL) {
            let valor_do_email_inserido = listaDeUsuarios[i].email;
            objetoTags.valor_email.innerText = valor_do_email_inserido;
        }        
    }    
}

function removerLinhaDaTabela(evento) {    
    
    let valores_adicionados = document.getElementById('valores_adicionados');
    let botao_remover_id = evento.currentTarget.id;
    let valor_do_id_botao_selecionado = botao_remover_id.substr(14);

    for(let i=0; i<valores_adicionados.rows.length; i++) {

        let eh_a_linha_para_excluir = valores_adicionados.rows[i].id.endsWith(valor_do_id_botao_selecionado);
        let linha = valores_adicionados.rows[i];

        if(eh_a_linha_para_excluir) {
            linha.remove();            
        }    
    }   
}

function limparInputs() {
    document.getElementById('input_nome_usuario').value = '';
    document.getElementById('input_data_Nasc').value = '';
    document.getElementById('input_cpf_usuario').value = '';
    document.getElementById('masculino').checked = false;
    document.getElementById('feminino').checked = false;
    document.getElementById('input_email_usuario').value = '';
}

function verificarCheckbox(evento) {
    let masculino = document.getElementById('masculino').checked;
    let feminino = document.getElementById('feminino').checked;
    let id_checkbox_selecionado = evento.target.id;    
    let eh_checkbox_selecionado = evento.target.checked;

    if(id_checkbox_selecionado === 'masculino' && eh_checkbox_selecionado) {
        if(feminino) {
            document.getElementById('feminino').checked = false;
        }
    } else if(id_checkbox_selecionado === 'feminino' && eh_checkbox_selecionado) {
        if(masculino) {
            document.getElementById('masculino').checked = false;
        }
    }
}
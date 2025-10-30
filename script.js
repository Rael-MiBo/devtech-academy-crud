// Exercício 2: Criação da Classe Aluno
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    // Método para verificar se o aluno foi aprovado (nota >= 7)
    isAprovado() {
        return this.notaFinal >= 7;
    }

    // Método para formatar os dados do aluno como string
    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
    }
}

// Armazenamento em memória (array de objetos)
let students = [];
let isEditing = false;
let currentStudentId = null;

// Função para renderizar os alunos na tabela
function renderTable() {
    const tableBody = document.getElementById('student-table-body');
    tableBody.innerHTML = ''; // Limpa a tabela antes de renderizar

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.nome}</td>
            <td>${student.idade}</td>
            <td>${student.curso}</td>
            <td>${student.notaFinal}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Editar</button>
                <button class="delete-btn" data-index="${index}">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    addTableEvents(); // Adiciona os eventos aos novos botões
}

// Exercício 3: Adicionar escutadores de eventos aos botões da tabela
function addTableEvents() {
    // Evento de Excluir com Arrow Function
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            students.splice(index, 1);
            renderTable();
            alert('Aluno excluído com sucesso!');
        });
    });

    // Evento de Editar com Função Anônima
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const student = students[index];

            document.getElementById('student-id').value = index;
            document.getElementById('nome').value = student.nome;
            document.getElementById('idade').value = student.idade;
            document.getElementById('curso').value = student.curso;
            document.getElementById('notaFinal').value = student.notaFinal;

            isEditing = true;
            document.querySelector('#student-form button').textContent = 'Atualizar';
        });
    });
}

// Manipulador de evento para o formulário (Exercício 1 e 3)
document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que a página recarregue

    // Coleta dos dados do formulário
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('notaFinal').value);

    // Cria uma instância da classe Aluno (Exercício 2)
    const studentData = new Aluno(nome, idade, curso, notaFinal);

    if (isEditing) {
        const id = parseInt(document.getElementById('student-id').value);
        students[id] = studentData; // Atualiza o aluno existente
        isEditing = false;
        document.querySelector('#student-form button').textContent = 'Cadastrar';
        alert('Aluno atualizado com sucesso!');
    } else {
        students.push(studentData); // Adiciona a nova instância ao array
        alert('Aluno cadastrado com sucesso!');
    }
    
    renderTable(); // Atualiza a tabela
    this.reset(); // Limpa o formulário
    document.getElementById('student-id').value = '';
});

// --- Exercício 4: Relatórios ---
const reportOutput = document.getElementById('report-output');

// 1. Listar alunos aprovados (notaFinal >= 7) usando filter
document.getElementById('report-aprovados').addEventListener('click', () => {
    const aprovados = students.filter(student => student.isAprovado());
    reportOutput.innerHTML = '<h3>Alunos Aprovados</h3>';
    if (aprovados.length === 0) {
        reportOutput.innerHTML += '<p>Nenhum aluno aprovado.</p>';
        return;
    }
    aprovados.forEach(aluno => {
        reportOutput.innerHTML += `<p>${aluno.toString()}</p>`;
    });
});

// 2. Calcular e exibir a média das notas finais usando reduce
document.getElementById('report-media-notas').addEventListener('click', () => {
    if (students.length === 0) {
        reportOutput.innerHTML = '<h3>Média das Notas</h3><p>Nenhum aluno cadastrado.</p>';
        return;
    }
    const totalNotas = students.reduce((sum, student) => sum + student.notaFinal, 0);
    const media = totalNotas / students.length;
    reportOutput.innerHTML = `<h3>Média das Notas</h3><p>A média final da turma é: ${media.toFixed(2)}</p>`;
});

// 3. Calcular e exibir a média das idades usando reduce
document.getElementById('report-media-idades').addEventListener('click', () => {
    if (students.length === 0) {
        reportOutput.innerHTML = '<h3>Média das Idades</h3><p>Nenhum aluno cadastrado.</p>';
        return;
    }
    const totalIdades = students.reduce((sum, student) => sum + student.idade, 0);
    const media = totalIdades / students.length;
    reportOutput.innerHTML = `<h3>Média das Idades</h3><p>A média de idade da turma é: ${media.toFixed(1)} anos</p>`;
});

// 4. Listar os nomes dos alunos em ordem alfabética usando map e sort
document.getElementById('report-ordem-alfabetica').addEventListener('click', () => {
    if (students.length === 0) {
        reportOutput.innerHTML = '<h3>Nomes em Ordem Alfabética</h3><p>Nenhum aluno cadastrado.</p>';
        return;
    }
    const nomes = students.map(student => student.nome).sort();
    reportOutput.innerHTML = '<h3>Nomes em Ordem Alfabética</h3>';
    nomes.forEach(nome => {
        reportOutput.innerHTML += `<p>${nome}</p>`;
    });
});

// 5. Mostrar a quantidade de alunos por curso usando reduce
document.getElementById('report-alunos-curso').addEventListener('click', () => {
    if (students.length === 0) {
        reportOutput.innerHTML = '<h3>Alunos por Curso</h3><p>Nenhum aluno cadastrado.</p>';
        return;
    }
    const porCurso = students.reduce((acc, student) => {
        acc[student.curso] = (acc[student.curso] || 0) + 1;
        return acc;
    }, {});

    reportOutput.innerHTML = '<h3>Alunos por Curso</h3>';
    for (const curso in porCurso) {
        reportOutput.innerHTML += `<p>${curso}: ${porCurso[curso]} aluno(s)</p>`;
    }
});

// Renderização inicial para garantir que a tabela e os eventos estejam prontos
renderTable();
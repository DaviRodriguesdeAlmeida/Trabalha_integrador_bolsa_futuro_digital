use AGENDA_PRO_BEAUTY;
CREATE TABLE nivel_acesso (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    nivel_acesso_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nivel_acesso_id) REFERENCES nivel_acesso(id)
);

CREATE TABLE profissionais (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(30) NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE areas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE servicos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    area_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    duracao_min INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (area_id) REFERENCES areas(id)
);

CREATE TABLE profissionais_servicos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT NOT NULL,
    servico_id INT NOT NULL,
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id),
    UNIQUE (profissional_id, servico_id)
);

CREATE TABLE horarios_trabalho (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT NOT NULL,
    dia_semana TINYINT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
    CHECK (dia_semana BETWEEN 0 AND 6),
    CHECK (hora_inicio < hora_fim)
);

CREATE TABLE horarios_bloqueados (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    profissional_id INT NOT NULL,
    inicio DATETIME NOT NULL,
    fim DATETIME NOT NULL,
    motivo VARCHAR(255),
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
    CHECK (inicio < fim)
);

CREATE TABLE status_agendamento (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE agendamentos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    profissional_id INT NOT NULL,
    servico_id INT NOT NULL,
    status_id INT NOT NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_fim DATETIME NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (profissional_id) REFERENCES profissionais(id),
    FOREIGN KEY (servico_id) REFERENCES servicos(id),
    FOREIGN KEY (status_id) REFERENCES status_agendamento(id),
    CHECK (data_hora_inicio < data_hora_fim)
);
-- USE AGENDA_PRO_BEAUTY;;
-- Senha padrão dos usuários: 123456
-- Hash gerado com password_hash('123456', PASSWORD_BCRYPT) no PHP.

INSERT INTO nivel_acesso (id, nome) VALUES
(1, 'admin'),
(2, 'atendente'),
(3, 'cliente');

INSERT INTO usuarios (id, nome, email, senha_hash, nivel_acesso_id) VALUES
(1, 'Administrador AgendaPro', 'admin@agendaprobeauty.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 1),
(2, 'Marina Recepção', 'marina@agendaprobeauty.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 2),
(3, 'Juliana Martins', 'juliana.martins@email.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 3),
(4, 'Fernanda Lima', 'fernanda.lima@email.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 3),
(5, 'Patrícia Alves', 'patricia.alves@email.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 3),
(6, 'Camila Rocha', 'camila.rocha@email.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 3),
(7, 'Renata Costa', 'renata.costa@email.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 3),
(8, 'Larissa Pereira', 'larissa.pereira@email.com', '$2y$12$ePr6Ri/f84FnjYZWp9jpSuRBfgOrPWBbFmAjPIIcfrVCTiYbumW7a', 3);

INSERT INTO profissionais (id, nome, email, telefone, especialidade, ativo) VALUES
(1, 'Ana Souza', 'ana.souza@agendaprobeauty.com', '(54) 99911-1001', 'Cabeleireira e colorista', TRUE),
(2, 'Bruno Oliveira', 'bruno.oliveira@agendaprobeauty.com', '(54) 99922-2002', 'Barbeiro', TRUE),
(3, 'Camila Fernandes', 'camila.fernandes@agendaprobeauty.com', '(54) 99933-3003', 'Esteticista facial', TRUE),
(4, 'Diana Nunes', 'diana.nunes@agendaprobeauty.com', '(54) 99944-4004', 'Manicure e pedicure', TRUE),
(5, 'Eduardo Ribeiro', 'eduardo.ribeiro@agendaprobeauty.com', '(54) 99955-5005', 'Massoterapeuta', TRUE),
(6, 'Sofia Almeida', 'sofia.almeida@agendaprobeauty.com', '(54) 99966-6006', 'Designer de sobrancelhas', FALSE);

INSERT INTO areas (id, nome, descricao) VALUES
(1, 'Cabelo', 'Serviços de corte, escova, hidratação, coloração e tratamentos capilares.'),
(2, 'Barbearia', 'Serviços de barba, corte masculino e acabamento.'),
(3, 'Manicure e Pedicure', 'Cuidados com unhas das mãos e dos pés.'),
(4, 'Estética Facial', 'Limpeza de pele, hidratação facial, peeling e cuidados com o rosto.'),
(5, 'Estética Corporal', 'Tratamentos corporais, drenagem e massagens estéticas.'),
(6, 'Massagens', 'Massagens relaxantes e terapêuticas.'),
(7, 'Sobrancelhas e Cílios', 'Design de sobrancelhas, henna e extensão de cílios.');

INSERT INTO servicos (id, area_id, nome, duracao_min, preco, descricao, ativo) VALUES
(1, 1, 'Corte feminino', 45, 70.00, 'Corte personalizado com finalização simples.', TRUE),
(2, 1, 'Escova modelada', 60, 80.00, 'Escova com modelagem e finalização.', TRUE),
(3, 1, 'Hidratação capilar', 50, 95.00, 'Tratamento de hidratação para cabelos ressecados.', TRUE),
(4, 1, 'Coloração completa', 120, 230.00, 'Coloração global com avaliação de tom.', TRUE),
(5, 2, 'Corte masculino', 35, 45.00, 'Corte masculino com acabamento.', TRUE),
(6, 2, 'Barba completa', 30, 35.00, 'Barba feita com toalha quente e finalização.', TRUE),
(7, 3, 'Manicure', 40, 35.00, 'Cutilagem, lixamento e esmaltação das mãos.', TRUE),
(8, 3, 'Pedicure', 45, 40.00, 'Cutilagem, lixamento e esmaltação dos pés.', TRUE),
(9, 3, 'Manicure e pedicure', 80, 70.00, 'Pacote completo para mãos e pés.', TRUE),
(10, 4, 'Limpeza de pele', 60, 120.00, 'Higienização, extração e hidratação facial.', TRUE),
(11, 4, 'Peeling facial leve', 45, 140.00, 'Tratamento facial leve para renovação da pele.', TRUE),
(12, 5, 'Drenagem linfática', 60, 130.00, 'Massagem corporal com foco em drenagem.', TRUE),
(13, 6, 'Massagem relaxante', 60, 110.00, 'Massagem para relaxamento muscular e redução de tensão.', TRUE),
(14, 7, 'Design de sobrancelhas', 30, 45.00, 'Modelagem de sobrancelhas conforme o rosto.', TRUE),
(15, 7, 'Design com henna', 45, 65.00, 'Design de sobrancelhas com aplicação de henna.', FALSE);

INSERT INTO profissionais_servicos (id, profissional_id, servico_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 5),
(6, 2, 6),
(7, 4, 7),
(8, 4, 8),
(9, 4, 9),
(10, 3, 10),
(11, 3, 11),
(12, 5, 12),
(13, 5, 13),
(14, 6, 14),
(15, 6, 15);

-- dia_semana: 0 = domingo, 1 = segunda, 2 = terça, 3 = quarta, 4 = quinta, 5 = sexta, 6 = sábado

INSERT INTO horarios_trabalho (id, profissional_id, dia_semana, hora_inicio, hora_fim) VALUES
-- Ana Souza: segunda a sexta, manhã e tarde
(1, 1, 1, '09:00:00', '12:00:00'),
(2, 1, 1, '13:00:00', '18:00:00'),
(3, 1, 2, '09:00:00', '12:00:00'),
(4, 1, 2, '13:00:00', '18:00:00'),
(5, 1, 3, '09:00:00', '12:00:00'),
(6, 1, 3, '13:00:00', '18:00:00'),
(7, 1, 4, '09:00:00', '12:00:00'),
(8, 1, 4, '13:00:00', '18:00:00'),
(9, 1, 5, '09:00:00', '12:00:00'),
(10, 1, 5, '13:00:00', '18:00:00'),

-- Bruno Oliveira: terça a sábado
(11, 2, 2, '10:00:00', '19:00:00'),
(12, 2, 3, '10:00:00', '19:00:00'),
(13, 2, 4, '10:00:00', '19:00:00'),
(14, 2, 5, '10:00:00', '19:00:00'),
(15, 2, 6, '09:00:00', '14:00:00'),

-- Camila Fernandes: segunda a sexta
(16, 3, 1, '08:00:00', '16:00:00'),
(17, 3, 2, '08:00:00', '16:00:00'),
(18, 3, 3, '08:00:00', '16:00:00'),
(19, 3, 4, '08:00:00', '16:00:00'),
(20, 3, 5, '08:00:00', '16:00:00'),

-- Diana Nunes: segunda a sábado
(21, 4, 1, '09:00:00', '17:00:00'),
(22, 4, 2, '09:00:00', '17:00:00'),
(23, 4, 3, '09:00:00', '17:00:00'),
(24, 4, 4, '09:00:00', '17:00:00'),
(25, 4, 5, '09:00:00', '17:00:00'),
(26, 4, 6, '09:00:00', '13:00:00'),

-- Eduardo Ribeiro: segunda a sexta, horário estendido
(27, 5, 1, '11:00:00', '20:00:00'),
(28, 5, 2, '11:00:00', '20:00:00'),
(29, 5, 3, '11:00:00', '20:00:00'),
(30, 5, 4, '11:00:00', '20:00:00'),
(31, 5, 5, '11:00:00', '20:00:00'),

-- Sofia Almeida: inativa, mas com horários cadastrados para teste de filtro
(32, 6, 2, '13:00:00', '18:00:00'),
(33, 6, 4, '13:00:00', '18:00:00');

INSERT INTO horarios_bloqueados (id, profissional_id, inicio, fim, motivo) VALUES
(1, 1, '2026-07-08 13:00:00', '2026-07-08 15:00:00', 'Reunião interna'),
(2, 2, '2026-07-09 10:00:00', '2026-07-09 12:00:00', 'Treinamento profissional'),
(3, 3, '2026-07-10 08:00:00', '2026-07-10 10:00:00', 'Manutenção da sala de estética'),
(4, 4, '2026-07-11 09:00:00', '2026-07-11 13:00:00', 'Folga solicitada'),
(5, 5, '2026-07-07 16:00:00', '2026-07-07 17:00:00', 'Consulta particular');

INSERT INTO status_agendamento (id, nome) VALUES
(1, 'Aguardando confirmação'),
(2, 'Confirmado'),
(3, 'Cancelado'),
(4, 'Concluído'),
(5, 'Reagendado');

INSERT INTO agendamentos (id, usuario_id, profissional_id, servico_id, status_id, data_hora_inicio, data_hora_fim) VALUES
(1, 3, 1, 1, 2, '2026-07-06 09:00:00', '2026-07-06 09:45:00'),
(2, 4, 2, 6, 2, '2026-07-07 10:00:00', '2026-07-07 10:30:00'),
(3, 5, 3, 10, 4, '2026-07-08 08:30:00', '2026-07-08 09:30:00'),
(4, 6, 4, 7, 2, '2026-07-09 14:00:00', '2026-07-09 14:40:00'),
(5, 7, 5, 13, 3, '2026-07-10 15:00:00', '2026-07-10 16:00:00'),
(6, 8, 1, 2, 1, '2026-07-10 10:00:00', '2026-07-10 11:00:00'),
(7, 3, 4, 9, 5, '2026-07-06 10:00:00', '2026-07-06 11:20:00'),
(8, 3, 4, 9, 2, '2026-07-07 15:00:00', '2026-07-07 16:20:00'),
(9, 4, 5, 12, 2, '2026-07-08 17:00:00', '2026-07-08 18:00:00'),
(10, 5, 1, 4, 2, '2026-07-09 13:00:00', '2026-07-09 15:00:00');

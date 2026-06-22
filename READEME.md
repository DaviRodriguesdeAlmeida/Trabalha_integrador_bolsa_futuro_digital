documentacao do projeto integrador do bolsa futuro digital


==========================================================
============================BANCO=========================
==========================================================

atualmente ha apenas a criacao do banco e as tabelas 

usuarios terao nivel de acesso (cliente e admin)
admin pode mudar coisas(CRUD de) profisionais, servicos, areas, clientes e agendamentos

proficional pra nao precisar apagar esta com opcao de desativar, assim o cliente nao consegue agendar com ele, mas os dados dele ficam no banco

servicos dao as opcoes do que o cliente pode agendar, e cada servico tem um tempo de duracao, assim o sistema consegue calcular o horario disponivel para o cliente agendar 

no horarios de trabalho do profissional, o sistema vai verificar se o horario que o cliente quer agendar esta disponivel, ex o profissional trabalha das 8 as 18 e no inicio da manha ja agendaram um servico de corte de cabelo as 8 que dura 30 min assim so podem agendar a partir das 8:30, e assim por diante, o sistema vai verificando se o horario que o cliente quer agendar esta disponivel, caso nao esteja ele vai sugerir o proximo horario disponivel
 
agendamento e a ligacao das coisas todas e como ja dito no horario se so a partir das 8:30 que o cliente pode agendar, o sistema vai sugerir o proximo horario disponivel, caso o cliente queira agendar um servico que dura 1 hora, e so tiver 30 min disponivel, o sistema vai sugerir o proximo horario disponivel que tenha 1 hora de duracao
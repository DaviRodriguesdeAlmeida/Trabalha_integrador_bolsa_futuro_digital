function criar_data_local(data, hora) {
  return new Date(`${data}T${hora}`);
}

function converter_data_banco(data_hora) {
  return new Date(data_hora.replace(" ", "T"));
}

function formatar_data_hora(data) {
  const zero = (numero) => String(numero).padStart(2, "0");

  return (
    `${data.getFullYear()}-` +
    `${zero(data.getMonth() + 1)}-` +
    `${zero(data.getDate())} ` +
    `${zero(data.getHours())}:` +
    `${zero(data.getMinutes())}:` +
    `${zero(data.getSeconds())}`
  );
}

function filtrar_horarios_disponiveis( horarios_trabalho, horarios_bloqueados, data) {
  const [ano, mes, dia] = data.split("-").map(Number);

  const dia_semana = new Date( ano, mes - 1, dia).getDay();

  const horarios_do_dia = horarios_trabalho.filter((horario) => Number(horario.dia_semana) === dia_semana);

  const bloqueios = horarios_bloqueados.map((bloqueio) => ({
      inicio: converter_data_banco(bloqueio.inicio),
      fim: converter_data_banco(bloqueio.fim)
    })).sort((a, b) => a.inicio - b.inicio);

  const horarios_disponiveis = [];

  for (const horario of horarios_do_dia) {
    const inicio_trabalho = criar_data_local(data,horario.hora_inicio);

    const fim_trabalho = criar_data_local(data,horario.hora_fim);

    let inicio_disponivel = inicio_trabalho;

    for (const bloqueio of bloqueios) {
      const existe_conflito = bloqueio.inicio < fim_trabalho && bloqueio.fim > inicio_disponivel;

      if (!existe_conflito) {continue;}

      if (bloqueio.inicio > inicio_disponivel) {
        horarios_disponiveis.push({
          inicio: formatar_data_hora(inicio_disponivel),
          fim: formatar_data_hora(bloqueio.inicio)
        });
      }

      if (bloqueio.fim > inicio_disponivel) {inicio_disponivel = bloqueio.fim;}

      if (inicio_disponivel >= fim_trabalho) {break; }
    }

    if (inicio_disponivel < fim_trabalho) {
      horarios_disponiveis.push({
        inicio: formatar_data_hora(inicio_disponivel),
        fim: formatar_data_hora(fim_trabalho)
      });
    }
  }

  return horarios_disponiveis;
}

module.exports = filtrar_horarios_disponiveis;
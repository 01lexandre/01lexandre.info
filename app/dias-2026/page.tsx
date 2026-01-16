export default function Dias2026() {
  // 2026 é um ano bissexto, então tem 366 dias
  const totalDias = 366;
  
  // Obtém a data atual
  const hoje = new Date();
  
  // Verifica se estamos em 2026
  const anoAtual = hoje.getFullYear();

  // Calcula quantos dias se passaram em 2026
  let diasPassados = 0;
  
  if (anoAtual === 2026) {
    // Se estamos em 2026, calcula os dias desde o início do ano
    const inicioAno = new Date(2026, 0, 1);
    const diffTime = hoje.getTime() - inicioAno.getTime();
    diasPassados = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 porque o dia 1 também conta
  } else if (anoAtual < 2026) {
    // Se ainda não chegamos em 2026, nenhum dia passou
    diasPassados = 0;
  } else {
    // Se já passamos de 2026, todos os dias já passaram
    diasPassados = totalDias;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-6 sm:px-8">
      <main className="flex min-h-screen w-full max-w-6xl mx-auto flex-col">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-zinc-200">
            Dias de 2026
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 mb-2">
            Total de dias no ano: {totalDias}
          </p>
          <p className="text-sm sm:text-base text-zinc-300 mb-6">
            Dias que já se passaram: {diasPassados}
          </p>
        </div>

        <div
          className="flex justify-center"
        >
          <div
            className="grid justify-center gap-x-3 gap-y-3"
            style={{
              gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
              maxWidth: "420px",
            }}
          >
            {Array.from({ length: totalDias }, (_, index) => {
              const diaNumero = index + 1;
              const isPreenchido = diaNumero <= diasPassados;
              
              return (
                <div
                  key={diaNumero}
                  className={`
                    w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm
                    rounded-full transition-all duration-200
                    ${isPreenchido 
                      ? 'bg-zinc-200 text-zinc-900 font-bold'
                      : 'bg-zinc-700 border border-zinc-600 text-zinc-500'
                    }
                    hover:scale-125
                    hover:shadow-lg
                  `}
                  style={{
                    margin: "0 auto"
                  }}
                  title={`Dia ${diaNumero} de 2026${isPreenchido ? ' (passou)' : ' (futuro)'}`}
                > 
                  {diaNumero}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-sm text-zinc-400 text-center">
          <p>• Bolinhas claras: dias que já passaram</p>
          <p>• Bolinhas escuras: dias futuros</p>
        </div>
      </main>
    </div>
  );
}
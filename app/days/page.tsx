import { Circle, CircleDashed, Star } from 'lucide-react';

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

  const sizedot = 50;

  // Calcula a porcentagem que passou
  const porcentagemPassou = Math.round((diasPassados / totalDias) * 100);

  // Dias especiais
  const diasEspeciais = [
    42,  // 11/02/2026 (31 dias de jan + 11)
    108  // 17/04/2026 (31 jan + 29 fev + 31 mar + 17)
  ];

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1410 20%, #0a0604 40%, #000000 60%, #1a1008 80%, #000000 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <main className="flex min-h-screen w-full mx-auto flex-col items-center justify-center gap-6 px-8">
        <div className="text-[10vw] text-amber-200/40">
          {porcentagemPassou}%
        </div>

        <div
          className="flex justify-center"
        >
          <div
            className="grid justify-center gap-x-4 gap-y-4"
            style={{
              gridTemplateColumns: "repeat(15, minmax(0, 1fr))",
              width: "80vw",
            }}
          >
            {Array.from({ length: totalDias }, (_, index) => {
              const diaNumero = index + 1;
              const isPreenchido = diaNumero <= diasPassados;
              const isDiaEspecial = diasEspeciais.includes(diaNumero);
              
              if (isDiaEspecial) {
                return (
                  <div
                    key={diaNumero}
                    className="flex items-center justify-center transition-all duration-200 hover:scale-125"
                    style={{
                      margin: "0 auto",
                    }}
                    title={`Dia especial: ${diaNumero} de 2026${isPreenchido ? ' (passou)' : ' (futuro)'}`}
                  >
                    <Star
                      size={sizedot}
                      fill={isPreenchido ? '#FFD700' : '#2a2a2a'}
                      color={isPreenchido ? '#FFD700' : '#2a2a2a'}
                      style={{
                        filter: isPreenchido ? 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.4))' : 'none',
                      }}
                    />
                  </div>
                );
              }
              
              return (
                <div
                  key={diaNumero}
                  className="flex items-center justify-center transition-all duration-200 hover:scale-125"
                  style={{
                    margin: "0 auto",
                  }}
                  title={`Dia ${diaNumero} de 2026${isPreenchido ? ' (passou)' : ' (futuro)'}`}
                >
                  {isPreenchido ? (
                    <Circle
                      size={sizedot}
                      fill="#FFD700"
                      color="#FFD700"
                      style={{
                        filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.4))',
                      }}
                    />
                  ) : (
                    <Circle
                      size={sizedot}
                      color="#4a4a4a"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
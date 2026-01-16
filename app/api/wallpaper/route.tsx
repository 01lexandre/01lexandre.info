import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  // Cálculos dos dias
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const totalDias = 366;
  
  let diasPassados = 0;
  if (anoAtual === 2026) {
    const inicioAno = new Date(2026, 0, 1);
    const diffTime = hoje.getTime() - inicioAno.getTime();
    diasPassados = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } else if (anoAtual < 2026) {
    diasPassados = 0;
  } else {
    diasPassados = totalDias;
  }

  const porcentagemPassou = Math.round((diasPassados / totalDias) * 100);

  // Dias especiais
  const diasEspeciais = [42, 108]; // 11/02 e 17/04

  // Cria array de dias
  const dias = Array.from({ length: totalDias }, (_, i) => {
    const diaNumero = i + 1;
    return {
      numero: diaNumero,
      passou: diaNumero <= diasPassados,
      especial: diasEspeciais.includes(diaNumero),
    };
  });

  // Divide em linhas de 15
  const linhas: typeof dias[] = [];
  for (let i = 0; i < dias.length; i += 15) {
    linhas.push(dias.slice(i, i + 15));
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1179px',
          height: '2556px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1410 20%, #0a0604 40%, #000000 60%, #1a1008 80%, #000000 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '250px 200px',
        }}
      >
        {/* Porcentagem */}
        <div
          style={{
            fontSize: '180px',
            color: 'rgba(253, 230, 138, 0.4)',
            fontWeight: 'normal',
            display: 'flex',
            marginBottom: '150px',
          }}
        >
          {porcentagemPassou}%
        </div>

        {/* Grid de dias */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '800px',
          }}
        >
          {linhas.map((linha, linhaIdx) => (
            <div
              key={linhaIdx}
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
              }}
            >
              {linha.map((dia) => {
                if (dia.especial) {
                  // Diamante (quadrado rotacionado 45°) para dias especiais
                  return (
                    <div
                      key={dia.numero}
                      style={{
                        display: 'flex',
                        width: '25px',
                        height: '25px',
                        backgroundColor: dia.passou ? '#FFD700' : '#2a2a2a',
                        transform: 'rotate(45deg)',
                        boxShadow: dia.passou ? '0 0 6px rgba(255, 215, 0, 0.4)' : 'none',
                      }}
                    />
                  );
                } else {
                  // Círculo para dias normais
                  return (
                    <div
                      key={dia.numero}
                      style={{
                        display: 'flex',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: dia.passou ? '#FFD700' : 'transparent',
                        border: dia.passou ? 'none' : '1.5px solid #4a4a4a',
                        boxShadow: dia.passou ? '0 0 6px rgba(255, 215, 0, 0.4)' : 'none',
                      }}
                    />
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1179,
      height: 2556,
    }
  );
}

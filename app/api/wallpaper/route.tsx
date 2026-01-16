import { createCanvas } from 'canvas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

  // Dimensões
  const width = 1179;
  const height = 2556;
  const paddingX = 200;
  const paddingY = 250;
  const gridWidth = 800;
  const dotSize = 30;
  const diamondSize = 25;
  const gapX = 20;
  const gapY = 24;
  const porcentagemSize = 180;
  const porcentagemMarginBottom = 150;

  // Cria canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background degradê
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0a0a0a');
  gradient.addColorStop(0.2, '#1a1410');
  gradient.addColorStop(0.4, '#0a0604');
  gradient.addColorStop(0.6, '#000000');
  gradient.addColorStop(0.8, '#1a1008');
  gradient.addColorStop(1, '#000000');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Porcentagem
  const porcentagemX = width / 2;
  const porcentagemY = paddingY + porcentagemSize / 2;
  ctx.fillStyle = 'rgba(253, 230, 138, 0.4)';
  ctx.font = `normal ${porcentagemSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${porcentagemPassou}%`, porcentagemX, porcentagemY);

  // Grid de dias
  const gridStartX = (width - gridWidth) / 2;
  const gridStartY = paddingY + porcentagemSize + porcentagemMarginBottom;

  linhas.forEach((linha, linhaIdx) => {
    const linhaY = gridStartY + linhaIdx * (dotSize + gapY);
    
    linha.forEach((dia, colIdx) => {
      const totalDotsWidth = (linha.length - 1) * gapX + linha.length * dotSize;
      const startX = gridStartX + (gridWidth - totalDotsWidth) / 2;
      const dotX = startX + colIdx * (dotSize + gapX) + dotSize / 2;
      const dotY = linhaY + dotSize / 2;

      if (dia.especial) {
        // Diamante (quadrado rotacionado)
        ctx.save();
        ctx.translate(dotX, dotY);
        ctx.rotate(Math.PI / 4);
        if (dia.passou) {
          ctx.shadowColor = 'rgba(255, 215, 0, 0.4)';
          ctx.shadowBlur = 6;
        }
        ctx.fillStyle = dia.passou ? '#FFD700' : '#2a2a2a';
        ctx.fillRect(-diamondSize / 2, -diamondSize / 2, diamondSize, diamondSize);
        ctx.restore();
      } else {
        // Círculo
        ctx.save();
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2);
        
        if (dia.passou) {
          ctx.shadowColor = 'rgba(255, 215, 0, 0.4)';
          ctx.shadowBlur = 6;
          ctx.fillStyle = '#FFD700';
          ctx.fill();
        } else {
          ctx.strokeStyle = '#4a4a4a';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.restore();
      }
    });
  });

  // Converte para buffer
  const buffer = canvas.toBuffer('image/png');

  // Retorna imagem
  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

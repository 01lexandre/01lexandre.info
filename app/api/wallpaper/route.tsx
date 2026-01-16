import { createCanvas } from 'canvas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Função para desenhar dígitos manualmente usando paths (sem depender de fonte)
function drawDigit(ctx: any, x: number, y: number, digit: string, size: number, color: string) {
  const w = size * 0.35; // largura do dígito
  const h = size * 0.9; // altura do dígito
  const t = size * 0.08; // espessura da linha
  
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = t;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  const cx = x;
  const top = y - h / 2;
  const middle = y;
  const bottom = y + h / 2;
  const left = cx - w / 2;
  const right = cx + w / 2;
  
  // Desenha cada dígito usando paths
  ctx.beginPath();
  
  switch (digit) {
    case '0':
      ctx.arc(cx, top + h * 0.3, w * 0.4, Math.PI, 0, false);
      ctx.arc(cx, bottom - h * 0.3, w * 0.4, 0, Math.PI, false);
      ctx.closePath();
      ctx.stroke();
      break;
    case '1':
      ctx.moveTo(cx, top);
      ctx.lineTo(cx, bottom);
      ctx.stroke();
      break;
    case '2':
      ctx.arc(cx, top + h * 0.25, w * 0.35, Math.PI, 0, false);
      ctx.lineTo(right, middle);
      ctx.lineTo(left, middle);
      ctx.arc(cx, bottom - h * 0.25, w * 0.35, 0, Math.PI, false);
      ctx.stroke();
      break;
    case '3':
      ctx.arc(cx, top + h * 0.25, w * 0.35, Math.PI, 0, false);
      ctx.arc(cx, middle, w * 0.3, Math.PI, 0, false);
      ctx.arc(cx, bottom - h * 0.25, w * 0.35, Math.PI, 0, false);
      ctx.stroke();
      break;
    case '4':
      ctx.moveTo(left, top);
      ctx.lineTo(left, middle);
      ctx.lineTo(right, middle);
      ctx.moveTo(right, top);
      ctx.lineTo(right, bottom);
      ctx.stroke();
      break;
    case '5':
      ctx.moveTo(right, top);
      ctx.lineTo(left, top);
      ctx.lineTo(left, middle);
      ctx.arc(cx, middle, w * 0.3, Math.PI, 0, false);
      ctx.arc(cx, bottom - h * 0.25, w * 0.35, 0, Math.PI, false);
      ctx.stroke();
      break;
    case '6':
      ctx.arc(left + w * 0.3, middle, w * 0.25, Math.PI, 0, true);
      ctx.lineTo(left, middle);
      ctx.arc(cx, bottom - h * 0.25, w * 0.35, 0, Math.PI, false);
      ctx.stroke();
      break;
    case '7':
      ctx.moveTo(left, top);
      ctx.lineTo(right, top);
      ctx.lineTo(cx, bottom);
      ctx.stroke();
      break;
    case '8':
      ctx.arc(cx, top + h * 0.25, w * 0.3, 0, Math.PI * 2, false);
      ctx.arc(cx, bottom - h * 0.25, w * 0.3, 0, Math.PI * 2, false);
      ctx.stroke();
      break;
    case '9':
      ctx.arc(right - w * 0.3, middle, w * 0.25, 0, Math.PI, true);
      ctx.lineTo(right, middle);
      ctx.arc(cx, top + h * 0.25, w * 0.35, Math.PI, 0, false);
      ctx.stroke();
      break;
  }
}

// Função para desenhar o símbolo %
function drawPercent(ctx: any, x: number, y: number, size: number, color: string) {
  const r = size * 0.12;
  const spacing = size * 0.25;
  
  ctx.fillStyle = color;
  
  // Círculo superior
  ctx.beginPath();
  ctx.arc(x, y - spacing, r, 0, Math.PI * 2);
  ctx.fill();
  
  // Linha diagonal
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 0.08;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - r, y - spacing + r);
  ctx.lineTo(x + r, y + spacing - r);
  ctx.stroke();
  
  // Círculo inferior
  ctx.beginPath();
  ctx.arc(x, y + spacing, r, 0, Math.PI * 2);
  ctx.fill();
}

// Função principal para desenhar número completo
function drawNumberManual(ctx: any, x: number, y: number, number: number, size: number, color: string) {
  const digits = String(number).split('');
  const digitWidth = size * 0.5;
  const percentWidth = size * 0.3;
  const totalWidth = digits.length * digitWidth + percentWidth + size * 0.1;
  const startX = x - totalWidth / 2;
  
  // Desenha cada dígito
  digits.forEach((digit, idx) => {
    const digitX = startX + idx * digitWidth + digitWidth / 2;
    drawDigit(ctx, digitX, y, digit, size, color);
  });
  
  // Desenha %
  const percentX = startX + digits.length * digitWidth + percentWidth / 2;
  drawPercent(ctx, percentX, y, size, color);
}

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

  // Porcentagem - desenha manualmente usando canvas paths (sempre funciona)
  const porcentagemX = width / 2;
  const porcentagemY = paddingY + porcentagemSize / 2;
  const porcentagemColor = 'rgba(253, 230, 138, 0.4)';
  
  drawNumberManual(ctx, porcentagemX, porcentagemY, porcentagemPassou, porcentagemSize, porcentagemColor);

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
  return new Response(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

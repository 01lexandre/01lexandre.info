'use client';

import { Circle, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function Dias2026() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [captureReady, setCaptureReady] = useState(false);
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

  useEffect(() => {
    // Aguarda a página renderizar completamente antes de capturar
    const timer = setTimeout(() => {
      setCaptureReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!captureReady || !pageRef.current) return;

    const captureAndDownload = async () => {
      try {
        const targetWidth = 1179;
        const targetHeight = 2556;
        
        const element = pageRef.current!;
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;
        
        // Calcula o scale necessário para alcançar o tamanho desejado
        const scaleX = targetWidth / elementWidth;
        const scaleY = targetHeight / elementHeight;
        const scale = Math.max(scaleX, scaleY);

        const canvas = await html2canvas(element, {
          backgroundColor: '#000000',
          width: targetWidth,
          height: targetHeight,
          scale: scale,
          useCORS: true,
          logging: false,
          windowWidth: targetWidth,
          windowHeight: targetHeight,
        });

        // Converte para blob e faz download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const hoje = new Date();
            const dataFormatada = `${hoje.getDate()}-${hoje.getMonth() + 1}-${hoje.getFullYear()}`;
            link.download = `dias-2026-${dataFormatada}.png`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
          }
        });
      } catch (error) {
        console.error('Erro ao capturar tela:', error);
      }
    };

    captureAndDownload();
  }, [captureReady]);

  return (
    <div 
      ref={pageRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1410 20%, #0a0604 40%, #000000 60%, #1a1008 80%, #000000 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <main 
        style={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
          margin: '0 auto',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '0 2rem',
        }}
      >
        <div 
          style={{ 
            color: 'rgba(253, 230, 138, 0.4)',
            fontSize: '10vw',
          }}
        >
          {porcentagemPassou}%
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'grid',
              justifyContent: 'center',
              gap: '1rem',
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
                    style={{
                      margin: "0 auto",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
                  style={{
                    margin: "0 auto",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
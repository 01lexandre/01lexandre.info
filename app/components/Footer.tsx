"use client";

export default function Footer() {
  // Usar uma constante para evitar problemas de hidratação
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 pb-8">
      <p className="text-xs text-zinc-600 text-center">
        © {currentYear} 01.lexandre. All rights reserved.
      </p>
    </footer>
  );
}


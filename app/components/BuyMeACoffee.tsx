export default function BuyMeACoffee() {
  return (
    <div className="flex justify-center mt-8">
      <a
        href="https://buymeacoffee.com/01lexandre"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-[#404040] rounded-lg hover:bg-[#505050] transition-all duration-200 hover:scale-105 shadow-lg"
      >
        <span className="text-2xl">☕</span>
        <span 
          className="text-white text-lg font-normal"
          style={{ fontFamily: "var(--font-cookie), 'Cookie', cursive" }}
        >
          Buy me a coffee
        </span>
      </a>
    </div>
  );
}


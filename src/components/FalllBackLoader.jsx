export default function FallBackLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-amber-900 via-amber-900 to-gray-800">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-600 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-amber-500 blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <div
          className="absolute inset-0 rounded-full border-[6px] border-t-transparent 
                border-b-amber-300 border-l-amber-400 border-r-amber-200
                animate-[spin_4s_linear_infinite] shadow-[0_0_20px_rgba(251,191,36,0.3)]"
        ></div>

        <div
          className="absolute inset-0 rounded-full border-[5px] border-t-transparent 
                bg-gradient-to-r from-transparent via-amber-500/40 to-transparent
                border-amber-500 animate-[spin_3s_linear_infinite_reverse] m-3"
        ></div>

        <div
          className="absolute inset-0 rounded-full border-[4px] border-t-transparent 
                border-amber-600 animate-[spin_2s_linear_infinite] m-6"
        ></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-70">
          <div className="w-3/4 h-3/4 rounded-full border-2 border-amber-400/30 animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute w-1/2 h-1/2 border-2 border-amber-300/20 rotate-45 animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>

        <div className="flex items-center justify-center w-full h-full relative z-10">
          <span
            className="text-7xl md:text-8xl font-bold text-amber-300 
                  drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]
                  animate-[pulse_4s_cubic-bezier(0.45,0,0.55,1)_infinite]"
          >
            ॐ
          </span>
        </div>
      </div>
    </div>
  );
}

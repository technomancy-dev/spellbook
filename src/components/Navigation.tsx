import { Sparkles } from "lucide-react";

const Navigation = ({ children }) => {
  return (
    <div class="navbar h-12 px-20 bg-base-100">
      <div class="flex-1">
        <a href="/" class="font-black flex items-center gap-2 text-xl">
          <Sparkles />
          spellbook
        </a>
      </div>
      <div class="flex-none">{children}</div>
    </div>
  );
};

export default Navigation;

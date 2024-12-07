import { Rocket, FileCode, ArrowRight } from "lucide-react";

const HomePage = () => {
  return (
    <div class="flex flex-1 h-full items-center justify-center">
      <div class="text-center max-w-2xl mx-auto p-6">
        <div class="mb-4 flex justify-center">
          <div class="relative">
            <div class="absolute -inset-1 rounded-full bg-secondary opacity-20 blur-xl"></div>
            <div class="relative bg-base-100 rounded-full p-4">
              <Rocket class="w-12 h-12 text-secondary" />
            </div>
          </div>
        </div>

        <h1 class="text-4xl font-black mb-4 text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-base-content to-primary/10">
          Welcome to Your Dashboard
        </h1>
        <p class="text-base-content/70 mb-8 text-lg">
          This is where your journey begins. Let's build something amazing!
        </p>

        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <div class="flex items-center mb-4">
              <FileCode class="w-6 h-6 text-primary mr-2" />
              <h2 class="card-title">Get Started</h2>
            </div>

            <p class="text-base-content/70 text-left mb-4">
              Open this file to begin customizing your dashboard:
            </p>

            <div class="bg-base-200 rounded-md p-3 font-mono text-sm text-left mb-6">
              /src/features/home/home-page.tsx
            </div>

            <div class="card-actions justify-start">
              <button class="btn btn-wide mx-auto btn-primary gap-2">
                Start Building
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

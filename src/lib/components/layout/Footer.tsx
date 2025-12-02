import { Film, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-slate-700/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-rose-700 flex items-center justify-center shadow-lg shadow-rose-600/20">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl tracking-tight">CineScope</span>
            </div>
            <p className="text-slate-40 text-sm leading-relaxed">
              Your ultimate destination for discovering and tracking movies from
              around the world.
            </p>
          </div>

          <div>
            <h3 className="text-sm mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-slate-40 hover:text-white text-sm transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button className="text-slate-40 hover:text-white text-sm transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-40 hover:text-white text-sm transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <button className="text-slate-40 hover:text-white text-sm transition-colors">
                  About
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-40 hover:text-white text-sm transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-40 hover:text-white text-sm transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-slate-40 hover:text-white text-sm transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-40 hover:text-white text-sm transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-40 hover:text-white text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-40 text-sm">
            © {new Date().getFullYear()} CineScope. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <Twitter className="w-5 h-5 text-slate-40" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <Github className="w-5 h-5 text-slate-40" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-5 h-5 text-slate-40" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

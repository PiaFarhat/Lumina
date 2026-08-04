import { LuminaMark } from "../ui/LuminaMark";

export function Footer() {
  return (
    <footer className="border-t border-[#D8D4CC] bg-[#2C3E50] px-4 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <LuminaMark />
            <span className="font-heading text-2xl font-semibold">Lumina</span>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/64">
            A private digital portal for light, architecture, simplicity, community, and modern villa living.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">Navigation</h2>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <a href="#home">Home</a>
            <a href="#announcements">Announcements</a>
            <a href="#services">Services</a>
            <a href="#parking">Parking</a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C8A97E]">Community</h2>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Clubhouse Office<br />
            Daily, 8:00 AM - 10:00 PM<br />
            Private residential access only
          </p>
        </div>
      </div>
    </footer>
  );
}

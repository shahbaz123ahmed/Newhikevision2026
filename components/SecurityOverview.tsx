import { ShieldCheck, Zap, Users, Settings } from "lucide-react";
import Image from "next/image";

export default function SecurityOverview() {
  const benefits = [
    {
      title: "Complete range of Hikvision products",
      icon: <ShieldCheck className="text-maroon" size={24} />,
      desc: "Full access to the latest security hardware and software."
    },
    {
      title: "Professional system integration",
      icon: <Settings className="text-maroon" size={24} />,
      desc: "Seamlessly connecting your security ecosystem."
    },
    {
      title: "Local technical support",
      icon: <Users className="text-maroon" size={24} />,
      desc: "On-ground experts available across the UAE."
    },
    {
      title: "Customized security solutions",
      icon: <Zap className="text-maroon" size={24} />,
      desc: "Tailored architectures for your specific needs."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-maroon/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-maroon/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">

          {/* Content Side */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon/5 border border-maroon/10 text-maroon font-black text-[10px] uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-maroon"></span>
              </span>
              Security Excellence
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tighter mb-8">
              Hikvision UAE <br />
              <span className="text-maroon">Security Solutions</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-2xl">
              Experience cutting-edge security technology with Hikvision in the UAE. We provide comprehensive security solutions featuring advanced surveillance systems, smart cameras, and integrated security platforms designed for the unique needs of UAE businesses and properties.
            </p>

            <div className="space-y-10">
              <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-4">
                Choose Hikvision UAE for
                <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-maroon group-hover:text-white transition-all duration-300 shadow-sm">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-maroon transition-colors">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-maroon text-white font-black hover:bg-[#a01830] transition-all shadow-xl hover:shadow-maroon/20 group"
                >
                  Request a Solution Design
                  <Zap size={18} className="group-hover:fill-current transition-all" />
                </a>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-2 border-[#C41E3A] transform group-hover:scale-[1.02] transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-maroon/20 to-transparent z-10" />
                <Image
                  src="/herosection/HikUae.webp"
                  alt="Hikvision Security UAE"
                  width={800}
                  height={1000}
                  priority
                  className="w-full h-[350px] sm:h-[500px] lg:h-[600px] object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Floating Badge - Compact & Shows only on hover */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-2.5 sm:p-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 z-20 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-out shadow-2xl">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="text-center border-r border-white/20 pr-3.5 sm:pr-4">
                      <p className="text-xl sm:text-2xl font-black text-white leading-none mb-0.5">100%</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-maroon">Genuine</p>
                    </div>
                    <div>
                      <p className="text-white font-bold text-xs sm:text-sm leading-tight">Authorized Distributor</p>
                      <p className="text-white/70 text-[10px] sm:text-xs">Official UAE Partner Network</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

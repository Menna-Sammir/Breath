import { Mail, Phone, MapPin } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 px-5 py-6 text-white sm:py-10 lg:pl-20 2xl:pl-44">
      <span className="absolute inset-0 bottom-0 lg:bg-none lg:mask-[linear-gradient(rgba(0,0,0,0.4),white,white)] lg:backdrop-blur-[20px]"></span>
      <div className="relative z-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 xl:gap-12 2xl:gap-20">
        <div className="space-y-1 font-medium sm:space-y-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex-shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-normal mb-1 opacity-90">Email us</p>
            <p className="text-base font-medium">support@example.com</p>
          </div>
        </div>

        <div className="space-y-1 font-medium sm:space-y-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex-shrink-0">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-normal mb-1 opacity-90">Phone</p>
            <p className="text-base font-medium">+44 151 222 3344</p>
          </div>
        </div>

        <div className="space-y-1 font-medium sm:space-y-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex-shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-normal mb-1 opacity-90">Visit us</p>
            <p className="text-base font-medium">21 joy street, USA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

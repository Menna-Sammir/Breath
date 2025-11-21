
import { loginImage } from "../../assets/images";
import { ContactInfo } from "./ContactInfo";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div
      className="lg:h-175 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-0
    rounded-3xl shadow-4xl border border-gray-light bg-white lg:p-10 w-full max-w-7xl mx-auto px-4 "
    >
      {/* Form Section */}
      <div className="border-gray-light shadow-4xl relative z-5 shrink-0 rounded-3xl border bg-white p-2 lg:-mr-20 lg:w-120 lg:p-12 xl:w-147 lg:h-110 xl:h-136">
        <RegisterForm />
      </div>

      {/* Hero Image Section */}
      <div className="relative overflow-hidden rounded-3xl lg:h-140 xl:h-166">
        <img
          src={loginImage}
          alt="Group of happy travelers enjoying mountain adventure"
          className="w-full h-full object-cover rounded-none lg:rounded-l-[3rem]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black via-black/70 lg:hidden" />
        <ContactInfo />
      </div>
    </div>
  );
}

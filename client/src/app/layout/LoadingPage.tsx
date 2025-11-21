import React from "react";
import loader  from '../../assets/images/loader.gif';

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-60 flex h-dvh w-full items-center justify-center bg-white">
      <span className="absolute inset-0 bg-[radial-gradient(50%_190.38%_at_55.72%_50%,rgba(0,117,149,0.1)_0%,rgba(255,255,255,0.1)_100%)]"></span>
      <img
        src={loader}
        alt="Loader"
        className="h-auto w-16 lg:w-24"
      />
    </div>
  );
}

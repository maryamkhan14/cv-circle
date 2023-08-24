import React from "react";
import ReportButton from "../components/ReportButton";
const NotFound = () => {
  return (
    <div className="rounded flex shadow-md border bg-cover bg-hero-pattern w-full">
      <div className="bg-slate-50/70 flex flex-col justify-center px-3 py-5 font-[700] text-center gap-5 w-full">
        <h1 className="text-5xl">Whoops!</h1>
        <p className="text-2xl  self-center w-3/4">
          If you're here, you've navigated to a page that doesn't seem to exist.
          If it's supposed to exist, please let us know how you ended up here,
          so we can fix it!
        </p>
        <ReportButton />
      </div>
    </div>
  );
};

export default NotFound;

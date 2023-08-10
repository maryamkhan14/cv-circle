import ReportButton from "./ReportButton";

const NetworkError = () => {
  return (
    <div className="rounded flex shadow-md border m-3 w-5/6 gap-5 bg-slate-100/50 flex-col justify-center px-3 py-5 font-[700] text-center">
      <h1 className="text-5xl">Whoops!</h1>
      <p className="text-2xl  self-center w-3/4">
        If you're here, a network error occurred. This could be a CORS issue or
        a dropped internet connection. Please let us know how you ended up here,
        so we can fix it!
      </p>
      <ReportButton />
    </div>
  );
};

export default NetworkError;

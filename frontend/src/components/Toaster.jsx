import colors from "tailwindcss/colors";
import { Toaster, ToastBar, toast } from "react-hot-toast";
const DefaultToaster = () => {
  console.log(colors);
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={true}
      containerStyle={{
        bottom: 20,
        right: 20,
        alignItems: "center",
      }}
      toastOptions={{
        // Define default options
        duration: 5000,
        className: "!rounded !md:max-w-[30%]",
        success: {
          duration: 90909090,
          iconTheme: {
            primary: colors.blue[800],
            secondary: "white",
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t} position="bottom-right">
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button
                  aria-label="Close"
                  onClick={() => toast.dismiss(t.id)}
                  className="border border-gray-200 ml-1 bg-slate-50 rounded p-2 flex items-center justify-center text-sm font-medium text-blue-800 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                  Close
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default DefaultToaster;

import { XCircleIcon } from "@heroicons/react/solid";
import { useAuth } from "../context/AuthContext";

export default function ErrorMessage() {
  const { error, setError } = useAuth();

  return (
    error && (
      <div
        className="flex justify-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 78, 78, 1)",
          zIndex: 10000,
        }}
      >
        <div className="rounded-md max-w-md w-full bg-red-50 p-4 mt-4 ">
          <div className="flex ">
            <div
              className="flex-shrink-0"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <XCircleIcon
                style={{ width: "4rem", height: "4rem" }}
                onClick={() => setError("")}
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div
              className="ml-3"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <h3 className="text-sm font-medium text-red-800">
                Error: {error}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

import ClipLoader from "react-spinners/ClipLoader";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader color="#36d7b7" size={70} />
    </div>
  );
}

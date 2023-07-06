import Image from "next/image";

export default function Spinner() {
  return (
    <Image
      src={"/spinner.gif"}
      alt="spinner"
      width={25}
      height={25}
      className="mx-auto"
    />
  );
}

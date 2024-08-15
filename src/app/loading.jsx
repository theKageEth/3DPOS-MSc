import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/logo.png"
        width={100}
        height={100}
        priority={true}
        alt="logo brand "
      />
      <p className="text-5xl font-bold m-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent p-3">
        Loading!
      </p>
    </div>
  );
};

export default Loading;

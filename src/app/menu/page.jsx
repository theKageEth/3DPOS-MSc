import dynamic from "next/dynamic";
const Scene = dynamic(() => import("@/components/threejs/Scene"), {
  ssr: false,
});

const Menu = () => {
  return (
    <>
      <div className="w-[100dvw] h-[100dvh] fixed top-0 overflow-hidden left-0 bg-fuchsia-100">
        <Scene />
      </div>
    </>
  );
};

export default Menu;

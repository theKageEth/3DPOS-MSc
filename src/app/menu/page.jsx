import Scene from "@/components/threejs/Scene";

const Menu = () => {
  return (
    <>
      <div className="w-screen h-screen fixed top-0 overflow-hidden left-0 bg-fuchsia-100">
        <Scene />
      </div>
    </>
  );
};

export default Menu;

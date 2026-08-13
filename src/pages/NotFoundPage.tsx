import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-dvh relative bg-linear-to-b from-zinc-100 to-zinc-400 gap-4 w-screen flex items-center justify-center flex-col">
      <h1 className="text-[140px] sm:text-[160px] md:text-[200px] top-63  sm:top-60 md:top-52 absolute font-black">404</h1>{" "}
      <section className="p-20 flex flex-col items-center gap-6 bg-black/5 rounded-lg border-b border-l border-zinc-300  backdrop-blur-xs ">
        <p className="text-2xl font-bold">صفحه مورد نظر پیدا نشد :(</p>
        <Link className="p-3 border-zinc-400 bg-black/5 rounded-lg border " to={"/login"}>برگرد به صفحه ورود</Link>
      </section>
    </div>
  );
};

export default NotFoundPage;

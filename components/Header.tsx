import Image from 'next/image';
import todo from '../app/_assests/todo.jpeg'
export default function   Header() {
  return (
    <div className="flex flex-col gap-4 items-center">
      
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
       Welcome to Todo App {" "}
        <a
          target="_blank"
          className="font-bold "
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          className="font-bold "
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <p className="w-1/2 italic text-center">To keep connected with us please login with your personal details</p>
      <Image src={todo} alt="" />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      
    </div>
  );
}

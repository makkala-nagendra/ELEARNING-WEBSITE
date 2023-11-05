import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Page({ userID }: { userID: string }) {
  const [index, setIndex] = useState<number>(0);
  return (
    <main className="h-screen">
      <div className="h-[50px] w-full bg-[var(--color-palette-2)] text-xl flex items-center px-5 text-white font-bold">
        DASHBOARD
      </div>
      <div className="flex top-[50px] h-full fixed w-full ">
        <div className="w-[300px] h-full bg-[var(--color-palette-8)]">
          <button
            onClick={() => {
              setIndex(0);
            }}
            className={
              `h-[50px] w-full  p-3 text-white ` +
              (index == 0
                ? "bg-[var(--color-palette-0)]"
                : "bg-[var(--color-palette-8)]")
            }
          >
            Dashboard
          </button>

          <button
            onClick={() => {
              setIndex(1);
            }}
            className={
              `h-[50px] w-full p-3 text-white ` +
              (index == 1
                ? "bg-[var(--color-palette-0)]"
                : "bg-[var(--color-palette-8)]")
            }
          >
            Courses
          </button>

          <button
            onClick={() => {
              setIndex(2);
            }}
            className={
              `h-[50px] w-full p-3 text-white ` +
              (index == 2
                ? "bg-[var(--color-palette-0)]"
                : "bg-[var(--color-palette-8)]")
            }
          >
            Account
          </button>

          <button
            onClick={() => {
              setIndex(3);
            }}
            className={
              `h-[50px] w-full p-3 text-white ` +
              (index == 3
                ? "bg-[var(--color-palette-0)]"
                : "bg-[var(--color-palette-8)]")
            }
          >
            Daily Test
          </button>

          <button
            onClick={() => {
              setIndex(4);
            }}
            className={
              `h-[50px] w-full p-3 text-white ` +
              (index == 4
                ? "bg-[var(--color-palette-0)]"
                : "bg-[var(--color-palette-8)]")
            }
          >
            Certification Exames
          </button>

          <button
            onClick={() => {
              setIndex(5);
            }}
            className={
              `h-[50px] w-full p-3 text-white ` +
              (index == 5
                ? "bg-[var(--color-palette-0)]"
                : "bg-[var(--color-palette-8)]")
            }
          >
            Messages
          </button>

          <button
            onClick={() => {
              //   TODO
            }}
            className={`h-[50px] w-full p-3 text-white bg-[var(--color-palette-6)]`}
          >
            Log out
          </button>
        </div>
        <div className=" w-full h-full">
          <DashBoard />
        </div>
      </div>
    </main>
  );
}

function DashBoard() {
  const cources = 29;
  const completed = 6;
  const Certifications = 1;
  const userName = "Nani";

  return (
    <main>
      <div className="pl-2 pb-2">
        <div className=" font-bold text-2xl">Hello {userName}</div>
        <div>Lets learn somthing new today!</div>
      </div>
      <div className="w-full flex justify-around">
        <div className="m-2 h-[100px] w-[25%] flex border-2 rounded-lg items-center">
          <div className="w-[25%] h-full items-center justify-center flex">
            <Image
              src={"/premium/online-learning.png"}
              width={50}
              height={50}
              alt="logo"
              fill={false}
            />
          </div>
          <div className="p-2">
            <div className=" font-bold text-xl text-[var(--color-palette-1)]">
              {cources}
            </div>
            <div>Cources To Do</div>
          </div>
        </div>

        <div className="m-2 h-[100px] w-[25%] flex border-2 rounded-lg items-center">
          <div className="w-[25%] h-full items-center justify-center flex">
            <Image
              src={"/premium/survey.png"}
              width={50}
              height={50}
              alt="logo"
              fill={false}
            />
          </div>
          <div className="p-2">
            <div className=" font-bold text-xl text-[var(--color-palette-1)]">
              {completed}
            </div>
            <div>Completed Courses</div>
          </div>
        </div>

        <div className="m-2 h-[100px] w-[25%] flex border-2 rounded-lg items-center">
          <div className="w-[25%] h-full items-center justify-center flex">
            <Image
              src={"/premium/certification.png"}
              width={50}
              height={50}
              alt="logo"
              fill={false}
            />
          </div>
          <div className="p-2">
            <div className=" font-bold text-xl text-[var(--color-palette-1)]">
              {Certifications}
            </div>
            <div>Certifications</div>
          </div>
        </div>
      </div>

      <div className="h-[150px] w-full p-5">

      </div>
    </main>
  );
}


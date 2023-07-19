"use client";

import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function DogFilter() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(true)}
        className={`${
          isExpanded ? "hidden" : "block"
        } max-w-fit my-5 px-4 py-2 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light`}
      >
        Filter &gt;&gt;&gt;
      </button>

      {isExpanded && (
        <div className="my-5 rounded-3xl text-theme-pink border-2 border-theme-pink">
          <header className="flex justify-between p-3 rounded-t-3xl bg-theme-yellow">
            <h2>Psíčí filter</h2>
            <span
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer text-2xl text-theme-pink"
            >
              <AiFillCloseCircle />
            </span>
          </header>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3 my-3">
            <div className="flex flex-col px-5 border-r-2 border-b-2 xl:border-b-0 border-theme-pink">
              <h3 className="pt-3 text-center font-bold">Pohlavie</h3>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Pes</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Fenka</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
            </div>
            <div className="flex flex-col px-5 lg:border-r-2 border-b-2 xl:border-b-0 border-theme-pink">
              <h3 className="pt-3 text-center font-bold">Vek</h3>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">0 - 3</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">3 - 7</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">8 - 100</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
            </div>
            <div className="flex flex-col px-5 border-r-2 border-b-2 xl:border-b-0 border-theme-pink">
              <h3 className="pt-3 text-center font-bold">Očkovaný</h3>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Áno</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Nie</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
            </div>
            <div className="flex flex-col px-5 xl:border-r-2 border-b-2 xl:border-b-0 border-theme-pink">
              <h3 className="pt-3 text-center font-bold">Kastrovaný</h3>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Áno</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Nie</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
            </div>
            <div className="flex flex-col px-5 border-r-2 border-b-2 lg:border-b-0 border-theme-pink">
              <h3 className="pt-3 text-center font-bold">Vhodný k deťom</h3>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Áno</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Nie</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
            </div>
            <div className="flex flex-col px-5 lg:border-r-2 border-b-2 lg:border-b-0 border-theme-pink">
              <h3 className="pt-3 text-center font-bold">Vzrast</h3>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Malý</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Stredný</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Veľký</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
            </div>
            <div className="flex flex-col px-5 border-r-2 border-theme-pink">
              <h3 className="pt-3 text-center font-bold">Adopcia</h3>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Klasická</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text text-theme-pink">Virtuálna</span>
                  <input type="checkbox" className="checkbox" />
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <button className="max-w-fit px-8 py-2 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light">
                Filtruj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

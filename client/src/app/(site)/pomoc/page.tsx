import Image from "next/image";

export default function Help() {
  return (
    <section className="relative w-full min-h-screen scroll-mt-14">
      <div className="container flex flex-col mb-20">
        <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
          Ako pomôcť
        </h1>
        <div className="mt-5">
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            omnis dicta iste eligendi quisquam vero enim ad, autem tempora
            asperiores aut ullam quod eius est cupiditate maxime at totam,
            inventore accusantium nesciunt. Placeat, porro rerum. Animi nemo
            alias ut possimus sit voluptatem natus tempora beatae, adipisci
            fugit, ad quae quasi!
          </p>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            optio exercitationem, est cumque explicabo consectetur illum ut
            dolor amet repudiandae nihil nesciunt blanditiis fugiat. Dolores non
            voluptates iste perspiciatis mollitia!
          </p>
        </div>

        <div className="mt-5 mb-10">
          <div className="collapse collapse-arrow rounded-none border-theme-dark border-b-2">
            <input type="radio" name="my-accordion-1" />

            <div className="collapse-title">
              <h2 className="text-xl text-theme-pink font-bold mb-2">
                Adopcia
              </h2>
            </div>
            <div className="collapse-content flex flex-col lg:flex-row justify-between">
              <div>
                <p className="max-w-2xl mb-3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Totam quas magnam perferendis quis nemo aperiam iure eum
                  necessitatibus atque sed et, eligendi quam, dolorum deleniti
                  consectetur, provident expedita obcaecati amet consequatur hic
                  fuga ut! Tempora blanditiis magnam saepe quibusdam doloribus,
                  explicabo debitis aspernatur non modi corrupti voluptatum rem
                  est asperiores.
                </p>
                <p className="max-w-2xl mb-3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Totam quas magnam perferendis quis nemo aperiam iure eum
                  necessitatibus atque sed et, eligendi quam, dolorum deleniti
                  consectetur, provident expedita obcaecati amet consequatur hic
                  fuga ut! Tempora blanditiis magnam saepe quibusdam doloribus,
                  explicabo debitis aspernatur non modi corrupti voluptatum rem
                  est asperiores.
                </p>
              </div>
              <div className="flex items-end relative top-4">
                <Image
                  src={"/ilust.png"}
                  alt="ilustracia psik"
                  width={150}
                  height={150}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
              </div>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none border-theme-dark border-b-2">
            <input type="radio" name="my-accordion-1" />

            <div className="collapse-title">
              <h2 className="text-xl text-theme-pink font-bold mb-2">
                Virtuálna adopcia
              </h2>
            </div>
            <div className="collapse-content">
              <p className="max-w-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                quas magnam perferendis quis nemo aperiam iure eum
                necessitatibus atque sed et, eligendi quam, dolorum deleniti
                consectetur, provident expedita obcaecati amet consequatur hic
                fuga ut! Tempora blanditiis magnam saepe quibusdam doloribus,
                explicabo debitis aspernatur non modi corrupti voluptatum rem
                est asperiores.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none border-theme-dark border-b-2">
            <input type="radio" name="my-accordion-1" />

            <div className="collapse-title">
              <h2 className="text-xl text-theme-pink font-bold mb-2">
                Dočasná opatera
              </h2>
            </div>
            <div className="collapse-content">
              <p className="max-w-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                quas magnam perferendis quis nemo aperiam iure eum
                necessitatibus atque sed et, eligendi quam, dolorum deleniti
                consectetur, provident expedita obcaecati amet consequatur hic
                fuga ut! Tempora blanditiis magnam saepe quibusdam doloribus,
                explicabo debitis aspernatur non modi corrupti voluptatum rem
                est asperiores.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none border-theme-dark border-b-2">
            <input type="radio" name="my-accordion-1" />

            <div className="collapse-title">
              <h2 className="text-xl text-theme-pink font-bold mb-2">
                Prispieť na útulok
              </h2>
            </div>
            <div className="collapse-content">
              <p className="max-w-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                quas magnam perferendis quis nemo aperiam iure eum
                necessitatibus atque sed et, eligendi quam, dolorum deleniti
                consectetur, provident expedita obcaecati amet consequatur hic
                fuga ut! Tempora blanditiis magnam saepe quibusdam doloribus,
                explicabo debitis aspernatur non modi corrupti voluptatum rem
                est asperiores.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none">
            <input type="radio" name="my-accordion-1" />

            <div className="collapse-title">
              <h2 className="text-xl text-theme-pink font-bold mb-2">
                Venujte nám 2%
              </h2>
            </div>
            <div className="collapse-content">
              <p className="max-w-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                quas magnam perferendis quis nemo aperiam iure eum
                necessitatibus atque sed et, eligendi quam, dolorum deleniti
                consectetur, provident expedita obcaecati amet consequatur hic
                fuga ut! Tempora blanditiis magnam saepe quibusdam doloribus,
                explicabo debitis aspernatur non modi corrupti voluptatum rem
                est asperiores.
              </p>
              <a
                href=""
                download=""
                className="block max-w-fit px-4 py-2 my-5 rounded-3xl text-theme-dark border-2 border-theme-dark hover:bg-theme-dark hover:text-theme-light"
              >
                Stiahnuť formulár
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-shape-divider-bottom-footer">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  );
}

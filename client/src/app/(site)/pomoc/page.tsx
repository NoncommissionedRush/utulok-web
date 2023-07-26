import Accordion from "./Accordion";

export default function Help() {
  return (
    <section className="relative w-full min-h-screen scroll-mt-14">
      <div className="container flex flex-col mb-20">
        <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
          Ako pomôcť
        </h1>
        <div className="mt-5 max-w-4xl">
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

        <Accordion />
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

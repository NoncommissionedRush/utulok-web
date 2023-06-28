export default function Home() {
  return (
    <>
      <section className="min-h-screen w-full scroll-mt-9">
        <div className="container flex flex-col">
          <h1 className="my-3 text-2xl font-bold">Domov</h1>
        </div>
      </section>
      <section className="min-h-screen w-full scroll-mt-9 bg-theme-pink">
        <div className="container flex flex-col">
          <h1 className="my-3 text-2xl font-bold">Naše psíky</h1>
        </div>
      </section>
      <section className="min-h-screen w-full scroll-mt-9">
        <div className="container flex flex-col">
          <h1 className="my-3 text-2xl font-bold">
            Aktuálne potrebujeme vašu pomoc
          </h1>
        </div>
      </section>
      <section className="min-h-screen w-full scroll-mt-9 bg-theme-green">
        <div className="container flex flex-col">
          <h1 className="my-3 text-2xl font-bold">
            Sledujte nás na Instagrame
          </h1>
        </div>
      </section>
    </>
  );
}

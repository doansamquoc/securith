const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto flex flex-col md:flex-row justify-start md:justify-between md:items-center py-8 px-4">
        <h1 className="text-2xl font-black uppercase">Securith.</h1>

        <span className="uppercase text-sm font-semibold">
          Được xây dựng bởi{" "}
          <a href="https://github.com/doansamquoc" className="underline" target="_blank">
            SAM
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

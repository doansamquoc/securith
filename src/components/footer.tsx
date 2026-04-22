const Footer = () => {
  return (
    <footer className="w-full bg-background px-4">
      <p className="text-center mb-4 mt-24 text-sm text-muted-foreground font-semibold">
        Dự án được xây dựng bởi{" "}
        <a href="https://github.com/doansamquoc" className="underline underline-offset-2" target="_blank">
          Sam
        </a>
        . Mã nguồn có sẵn trên{" "}
        <a href="https://github.com/doansamquoc/securith" className="underline underline-offset-2" target="_blank">
          Github
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;

function Header() {
  return (
    <>
      <div className="logo flex flex-col items-center pt-3">
        <img src="/images/Logo.png" alt="Logo" width={38} />
        <span
          id="header"
          className="text-base font-semibold pt-1 sm:text-sm md:text-lg"
        >
          THE WEDDING COMPANY
        </span>
      </div>
    </>
  );
}

export default Header;

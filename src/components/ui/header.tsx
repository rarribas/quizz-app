interface HeaderI{
  title: string,
  desc: string,
}

function Header({ title, desc }: HeaderI) {
  return (
    <header className="text-center pb-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm">{desc}</p>
    </header>
  )
}

export default Header;
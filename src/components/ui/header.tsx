interface HeaderI{
  title: string,
  desc: string,
  icon?: React.ReactNode,
}

function Header({ title, desc, icon }: HeaderI) {
  return (
    <header className="text-center pb-6">
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm">{desc}</p>
    </header>
  )
}

export default Header;
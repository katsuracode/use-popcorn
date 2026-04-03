import type React from 'react'

export const NavBar = ({ children }: React.PropsWithChildren) => {
  return <nav className="nav-bar">{children}</nav>
}

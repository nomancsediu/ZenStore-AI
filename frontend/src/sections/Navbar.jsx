import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload, faRightFromBracket, faBars, faXmark, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({ onAdd, onBulk, onLogout, productCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto w-full px-6 h-16 flex items-center justify-between">

        {/* Brand + count */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold tracking-tight">
            ZenStore <span className="text-primary">AI</span>
          </span>
          {productCount > 0 && (
            <span className="badge badge-primary badge-outline gap-1 text-xs">
              <FontAwesomeIcon icon={faBoxOpen} className="text-xs" />
              {productCount} Products
            </span>
          )}
        </div>

        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={onAdd}>
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </button>
          <button className="btn btn-outline btn-sm" onClick={onBulk}>
            <FontAwesomeIcon icon={faUpload} />
            Bulk Upload
          </button>
          <button className="btn btn-error btn-sm" onClick={onLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="btn btn-ghost btn-sm sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="text-lg" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-base-100 border-t border-base-200 px-6 py-3 flex flex-col gap-2">
          <button className="btn btn-primary btn-sm w-full" onClick={() => { onAdd(); setMenuOpen(false) }}>
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </button>
          <button className="btn btn-outline btn-sm w-full" onClick={() => { onBulk(); setMenuOpen(false) }}>
            <FontAwesomeIcon icon={faUpload} /> Bulk Upload
          </button>
          <button className="btn btn-error btn-sm w-full" onClick={onLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
          </button>
        </div>
      )}
    </div>
  )
}
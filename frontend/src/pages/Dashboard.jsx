import { useState, useCallback, useEffect } from 'react'
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../api'
import { useToast } from '../hooks/useToast'
import { Navbar, ProductGrid } from '../sections'
import { AddProductModal, BulkUploadModal, ToastContainer } from '../components'

export default function Dashboard({ logout }) {
  const { products: loaderProducts } = useLoaderData()
  const [products, setProducts] = useState(loaderProducts)
  const [showAdd, setShowAdd] = useState(false)
  const [showBulk, setShowBulk] = useState(false)
  const navigate = useNavigate()
  const { revalidate, state } = useRevalidator()
  const { toasts, toast } = useToast()
  const refreshing = state === 'loading'

  useEffect(() => {
    setProducts(loaderProducts)
  }, [loaderProducts])

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'You will be signed out.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      width: '360px',
      customClass: { popup: 'rounded-2xl text-sm' },
    })
    if (!result.isConfirmed) return
    logout()
    navigate('/login')
  }

  const handleRefresh = useCallback(() => {
    revalidate()
  }, [revalidate])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      width: '360px',
      customClass: { popup: 'rounded-2xl text-sm' },
    })
    if (!result.isConfirmed) return
    try {
      await api.delete(`/products/${id}/`)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      toast('Product deleted successfully.', 'success')
    } catch {
      toast('Failed to delete product.', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar
        onAdd={() => setShowAdd(true)}
        onBulk={() => setShowBulk(true)}
        onLogout={handleLogout}
        productCount={products.length}
      />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <ProductGrid
          products={products}
          refreshing={refreshing}
          onDelete={handleDelete}
          setProducts={setProducts}
        />
      </main>

      {showAdd && (
        <AddProductModal
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false)
            handleRefresh()
            toast('Product added successfully.', 'success')
          }}
        />
      )}
      {showBulk && (
        <BulkUploadModal
          onClose={() => setShowBulk(false)}
          onSuccess={() => {
            setShowBulk(false)
            handleRefresh()
            toast('Products added successfully.', 'success')
          }}
        />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  )
}

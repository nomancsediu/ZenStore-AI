import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faSpinner, faImage } from '@fortawesome/free-solid-svg-icons'
import api from '../api'

export default function AddProductModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', price: '', stock: '' })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('price', parseFloat(form.price))
      fd.append('stock', parseInt(form.stock))
      if (image) fd.append('image', image)
      await api.post('/products/create/', fd)
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create product.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Add Product</h3>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {error && <div className="alert alert-error text-sm py-2 mb-3"><span>{error}</span></div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="form-control">
            <span className="label-text text-sm mb-1">Product Name</span>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Wireless Headphones"
              value={form.name}
              onChange={set('name')}
              required
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="form-control">
              <span className="label-text text-sm mb-1">Price ($)</span>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={form.price}
                onChange={set('price')}
                required
              />
            </label>
            <label className="form-control">
              <span className="label-text text-sm mb-1">Stock</span>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="0"
                min="0"
                value={form.stock}
                onChange={set('stock')}
                required
              />
            </label>
          </div>

          <div className="form-control">
            <span className="label-text text-sm mb-1">Product Image <span className="text-base-content/40">(optional)</span></span>
            <div
              className="flex items-center justify-center gap-2 border-2 border-dashed border-base-300 rounded-lg px-4 py-6 cursor-pointer hover:border-primary transition-colors text-sm text-base-content/50 hover:text-primary"
              onClick={() => fileRef.current.click()}
            >
              <FontAwesomeIcon icon={faImage} />
              {image ? image.name : 'Click to upload image'}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </div>
          </div>

          <p className="text-xs text-base-content/40">
            AI will automatically generate a description and category in the background.
          </p>

          <div className="modal-action mt-1">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlus} />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  )
}

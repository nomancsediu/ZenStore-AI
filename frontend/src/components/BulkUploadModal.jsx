import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faUpload, faSpinner, faCheckCircle, faFileCode } from '@fortawesome/free-solid-svg-icons'
import api from '../api'

export default function BulkUploadModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const { data } = await api.post('/products/bulk-upload/', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(data)
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-lg">Bulk Upload Products</h3>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <p className="text-sm text-base-content/50 mb-3">
          Upload a CSV or JSON file. AI will enhance each product in the background.
        </p>

        <div className="bg-base-200 rounded-lg p-3 text-xs text-base-content/60 mb-4 space-y-1">
          <p><strong>CSV:</strong> <code className="bg-base-300 px-1 rounded">name,price,stock</code></p>
          <p><strong>JSON:</strong> <code className="bg-base-300 px-1 rounded">[{'{'}name, price, stock{'}'}]</code></p>
        </div>

        {error && <div className="alert alert-error text-sm py-2 mb-3"><span>{error}</span></div>}

        {result ? (
          <div className="flex flex-col gap-3">
            <div className="alert alert-success text-sm py-2">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span>Created {result.created} products successfully!</span>
            </div>
            {result.errors.length > 0 && (
              <div className="alert alert-warning text-sm py-2">
                <span>{result.errors.length} rows had errors.</span>
              </div>
            )}
            <div className="modal-action mt-0">
              <button className="btn btn-primary" onClick={onSuccess}>View Products</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex items-center gap-2 border-2 border-dashed border-base-300 rounded-lg px-4 py-4 cursor-pointer hover:border-primary transition-colors text-sm text-base-content/50 hover:text-primary">
              <FontAwesomeIcon icon={faFileCode} />
              {file ? file.name : 'Choose CSV or JSON file'}
              <input
                type="file"
                accept=".csv,.json"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
            </label>

            <div className="modal-action mt-1">
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading || !file}>
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUpload} />
                    Upload
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  )
}
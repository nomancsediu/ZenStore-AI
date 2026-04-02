import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash, faSpinner, faTag,
  faCircleCheck, faCircleXmark, faCalendarDays,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import api from '../api'

function StockBadge({ stock }) {
  if (stock === 0)
    return <span className="badge badge-error badge-sm gap-1"><FontAwesomeIcon icon={faCircleXmark} className="text-xs" />Out of Stock</span>
  if (stock <= 5)
    return <span className="badge badge-warning badge-sm gap-1"><FontAwesomeIcon icon={faTriangleExclamation} className="text-xs" />Low Stock ({stock} left)</span>
  return <span className="badge badge-success badge-sm gap-1"><FontAwesomeIcon icon={faCircleCheck} className="text-xs" />In Stock ({stock})</span>
}

function StatusBadge({ status }) {
  if (status === 'done' || status === 'failed') return null
  return (
    <span className="badge badge-info badge-sm gap-1">
      <FontAwesomeIcon icon={faSpinner} spin className="text-xs" />
      Processing
    </span>
  )
}

export default function ProductCard({ product, onDelete, onUpdated }) {
  const isResolved = (p) => p.ai_status === 'done' || p.ai_status === 'failed'
  const [current, setCurrent] = useState(product)
  const intervalRef = useRef(null)
  const resolvedRef = useRef(isResolved(product))
  const isDone = isResolved(current)

  useEffect(() => {
    if (resolvedRef.current) return
    if (isResolved(product)) {
      resolvedRef.current = true
      setCurrent(product)
    } else {
      setCurrent(product)
    }
  }, [product])

  useEffect(() => {
    if (isDone) {
      resolvedRef.current = true
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(async () => {
      try {
        const { data } = await api.get(`/products/${current.id}/`)
        setCurrent(data)
        onUpdated?.(data)
        if (data.ai_status === 'done' || data.ai_status === 'failed') {
          resolvedRef.current = true
          clearInterval(intervalRef.current)
        }
      } catch {
        clearInterval(intervalRef.current)
      }
    }, 3000)
    return () => clearInterval(intervalRef.current)
  }, [isDone, current.id, onUpdated])

  const p = current
  const createdDate = new Date(p.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

  return (
    <div className="card bg-base-100 shadow-sm transition-all duration-200 flex flex-col h-full">
      <figure className="h-40 overflow-hidden relative bg-base-200">
        {p.image
          ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          : <span className="text-base-content/30 text-xs">No Image</span>
        }
        {!isDone && (
          <div className="absolute inset-0 bg-base-300/60 flex items-center justify-center">
            <span className="text-xs font-semibold text-base-content/70 flex items-center gap-1">
              <FontAwesomeIcon icon={faSpinner} spin />
              Processing...
            </span>
          </div>
        )}
      </figure>

      <div className="card-body p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-sm leading-snug">{p.name}</h3>
          <StatusBadge status={p.ai_status} />
        </div>

        {p.ai_category && (
          <span className="badge badge-outline badge-secondary badge-sm w-fit gap-1">
            <FontAwesomeIcon icon={faTag} className="text-xs" />
            {p.ai_category}
          </span>
        )}

        <p className="text-xs text-base-content/60 leading-relaxed min-h-[3rem]">
          {p.ai_description || (
            <span className="italic text-base-content/40 flex items-center gap-1">
              <FontAwesomeIcon icon={faSpinner} spin className="text-xs" />
              AI is generating description...
            </span>
          )}
        </p>

        <div className="divider my-0" />

        <div className="flex items-center justify-between gap-2">
          <span className="text-primary font-bold text-base">${parseFloat(p.price).toFixed(2)}</span>
          <StockBadge stock={p.stock} />
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-xs text-base-content/40 flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendarDays} />
            {createdDate}
          </span>
          <button
            className="btn btn-error btn-outline btn-xs gap-1"
            onClick={() => onDelete(p.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

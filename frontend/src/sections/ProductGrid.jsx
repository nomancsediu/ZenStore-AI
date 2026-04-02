import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { ProductCard, SkeletonCard } from '../components'

const GRID = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'

export default function ProductGrid({ products, refreshing, loading, onDelete, setProducts }) {
  return (
    <div>
      {refreshing && (
        <div className="w-full h-1 bg-base-300 rounded overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-primary via-purple-400 to-primary bg-[length:200%_100%] animate-[shimmer_1.2s_infinite]" />
        </div>
      )}

      {loading ? (
        <div className={GRID}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-base-content/30">
          <FontAwesomeIcon icon={faBoxOpen} className="text-7xl mb-4" />
          <p className="text-xl font-semibold">No products yet</p>
          <p className="text-sm mt-1">Click "Add Product" to get started</p>
        </div>
      ) : (
        <div className={GRID}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onDelete={onDelete}
              onUpdated={(updated) =>
                setProducts((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
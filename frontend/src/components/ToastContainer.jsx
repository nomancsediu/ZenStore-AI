import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircleExclamation, faCircleInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const icons = {
  success: { icon: faCheckCircle, cls: 'alert-success' },
  error: { icon: faCircleExclamation, cls: 'alert-error' },
  warning: { icon: faTriangleExclamation, cls: 'alert-warning' },
  info: { icon: faCircleInfo, cls: 'alert-info' },
}

export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="toast toast-bottom toast-end z-50">
      {toasts.map(({ id, message, type }) => {
        const { icon, cls } = icons[type] || icons.info
        return (
          <div key={id} className={`alert ${cls} shadow-lg text-sm py-3 px-4 flex items-center gap-2`}>
            <FontAwesomeIcon icon={icon} />
            <span>{message}</span>
          </div>
        )
      })}
    </div>
  )
}
import { useEffect } from 'react'
import { useStore } from '../../store'
import Alert from './Alert'

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return <Alert message={toast.message} severity={toast.severity} />
}

export default function ToastStack() {
  const { state, dispatch } = useStore()

  if (state.toast.toasts.length === 0) return null

  return (
    <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
      {state.toast.toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={() => dispatch({ type: 'toast/dismiss', payload: { id: toast.id } })} />
      ))}
    </div>
  )
}

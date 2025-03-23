'use client'

export const ActionButtons = () => {
  return (
    <div className="flex gap-4">
      <button className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
        Add Helper
      </button>
      <button className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
        HR
      </button>
      <button className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
        Legal
      </button>
    </div>
  )
}

export default ActionButtons
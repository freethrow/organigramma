import { useState } from 'react'

function DropArea({ area, onDrop, onRemoveItem }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const itemId = parseInt(e.dataTransfer.getData('itemId'))
    onDrop(area.id, itemId)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-3 flex flex-col overflow-hidden transition-colors ${isDragOver
          ? 'border-green-500 bg-green-50'
          : 'border-gray-300 bg-white'
        }`}
    >
      <h3 className="text-base font-semibold mb-2 text-gray-700">{area.name}</h3>
      <div className="flex-1 flex flex-wrap gap-1.5 content-start overflow-y-auto">
        {area.items.map(item => (
          <div
            key={item.id}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-100 border border-green-300 rounded-full text-xs h-fit"
          >
            <span className="text-gray-700">{item.name}</span>
            <button
              onClick={() => onRemoveItem(area.id, item.id)}
              className="text-red-600 hover:text-red-800 font-bold text-sm leading-none"
            >
              ×
            </button>
          </div>
        ))}
        {area.items.length === 0 && !isDragOver && (
          <p className="text-gray-400 text-xs">Drop items here</p>
        )}
        {isDragOver && (
          <p className="text-green-600 text-xs font-medium">Release to drop</p>
        )}
      </div>
    </div>
  )
}

export default DropArea

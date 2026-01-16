function DraggableItem({ item }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('itemId', item.id.toString())
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="px-3 py-2 bg-blue-100 border border-blue-300 rounded-lg cursor-move hover:bg-blue-200 transition-colors"
    >
      <span className="text-gray-800 text-sm font-medium">{item.name}</span>
    </div>
  )
}

export default DraggableItem

import { useState } from 'react'
import Modal from './components/Modal'
import DraggableItem from './components/DraggableItem'
import DropArea from './components/DropArea'
import useStore from './store/useStore'

function App() {
  const items = useStore((state) => state.items)
  const areas = useStore((state) => state.areas)
  const addItem = useStore((state) => state.addItem)
  const addArea = useStore((state) => state.addArea)
  const dropItemToArea = useStore((state) => state.dropItemToArea)
  const removeItemFromArea = useStore((state) => state.removeItemFromArea)
  const loadExistingItems = useStore((state) => state.loadExistingItems)
  const loadExistingAreas = useStore((state) => state.loadExistingAreas)
  const resetStore = useStore((state) => state.resetStore)

  const [showItemModal, setShowItemModal] = useState(false)
  const [showAreaModal, setShowAreaModal] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newAreaName, setNewAreaName] = useState('')

  const handleAddItem = (e) => {
    e.preventDefault()
    if (newItemName.trim()) {
      addItem(newItemName)
      setNewItemName('')
      setShowItemModal(false)
    }
  }

  const handleAddArea = (e) => {
    e.preventDefault()
    if (newAreaName.trim()) {
      addArea(newAreaName)
      setNewAreaName('')
      setShowAreaModal(false)
    }
  }

  const handleDrop = (areaId, itemId) => {
    dropItemToArea(areaId, itemId)
  }

  const handleRemoveFromArea = (areaId, itemId) => {
    removeItemFromArea(areaId, itemId)
  }

  const handleUseExisting = () => {
    loadExistingItems()
  }

  const handleUseExistingAreas = () => {
    loadExistingAreas()
  }

  const handleReset = () => {
    if (window.confirm('Sei sicuro di voler resettare tutti i dati? Questa azione non può essere annullata.')) {
      resetStore()
    }
  }

  const handlePrintOrganigramma = () => {
    const printWindow = window.open('', '_blank')

    let content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Organigramma</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              line-height: 1.6;
            }
            h1 {
              color: #333;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            h2 {
              color: #444;
              margin-top: 25px;
              margin-bottom: 10px;
            }
            ul {
              list-style-type: none;
              padding-left: 0;
            }
            li {
              padding: 5px 0;
              padding-left: 20px;
            }
            li:before {
              content: "- ";
              margin-left: -20px;
              margin-right: 5px;
            }
            .empty {
              color: #999;
              font-style: italic;
            }
            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <h1>Organigramma</h1>
    `

    if (areas.length === 0) {
      content += '<p class="empty">Nessun impiegato aggiunto.</p>'
    } else {
      areas.forEach(area => {
        content += `<h2>${area.name}</h2>`
        if (area.items.length === 0) {
          content += '<p class="empty">Nessun settore assegnato</p>'
        } else {
          content += '<ul>'
          area.items.forEach(item => {
            content += `<li>${item.name}</li>`
          })
          content += '</ul>'
        }
      })
    }

    content += `
        </body>
      </html>
    `

    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Header with Buttons */}
      <div className="bg-white border-b border-gray-200 p-2 flex gap-2 justify-center flex-shrink-0 flex-wrap">
        <button
          onClick={() => setShowItemModal(true)}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Aggiungi settore / attivita'
        </button>
        <button
          onClick={() => setShowAreaModal(true)}
          className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Aggiungi impiegato
        </button>
        <button
          onClick={handleUseExisting}
          className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Utilizza settori esistenti
        </button>
        <button
          onClick={handleUseExistingAreas}
          className="px-3 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Utilizza impiegati esistenti
        </button>
        <button
          onClick={handlePrintOrganigramma}
          className="px-3 py-1.5 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Organigramma
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Section - Draggable Items */}
        <div className="w-1/4 bg-white border-r border-gray-200 p-4 flex flex-col overflow-hidden">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Settori/attivita'</h2>
          <div className="flex-1 overflow-y-auto space-y-2">
            {items.map(item => (
              <DraggableItem key={item.id} item={item} />
            ))}
            {items.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No items yet. Add one using the button above.</p>
            )}
          </div>
        </div>

        {/* Right Section - Drop Areas */}
        <div className="flex-1 bg-gray-50 p-4 flex flex-col overflow-hidden">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Drop Areas</h2>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden" style={{ gridAutoRows: '1fr' }}>
            {areas.map(area => (
              <DropArea
                key={area.id}
                area={area}
                onDrop={handleDrop}
                onRemoveItem={handleRemoveFromArea}
              />
            ))}
            {areas.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4 col-span-2">No areas yet. Add one using the button above.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showItemModal} onClose={() => setShowItemModal(false)}>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Item</h3>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter item name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowItemModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAreaModal} onClose={() => setShowAreaModal(false)}>
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add New Area</h3>
        <form onSubmit={handleAddArea}>
          <input
            type="text"
            value={newAreaName}
            onChange={(e) => setNewAreaName(e.target.value)}
            placeholder="Enter area name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowAreaModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default App

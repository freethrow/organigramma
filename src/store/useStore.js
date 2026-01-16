import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      items: [],
      areas: [],

      addItem: (name) => set((state) => ({
        items: [...state.items, { id: Date.now(), name }]
      })),

      addArea: (name) => set((state) => ({
        areas: [...state.areas, { id: Date.now(), name, items: [] }]
      })),

      dropItemToArea: (areaId, itemId) => set((state) => ({
        areas: state.areas.map(area => {
          if (area.id === areaId) {
            const item = state.items.find(i => i.id === itemId)
            if (item && !area.items.find(i => i.id === itemId)) {
              return { ...area, items: [...area.items, item] }
            }
          }
          return area
        })
      })),

      removeItemFromArea: (areaId, itemId) => set((state) => ({
        areas: state.areas.map(area => {
          if (area.id === areaId) {
            return { ...area, items: area.items.filter(i => i.id !== itemId) }
          }
          return area
        })
      })),

      loadExistingItems: () => set(() => {
        const existingItems = [
          'macchine e attrezzature per l\'agricoltura e il giardinaggio',
          'prodotti chimici per trattamento dei terreni e dei prodotti agricoli',
          'prodotti agricoli',
          'tecnologie per l\'industria alimentare',
          'prodotti alimentari',
          'packaging - materiali e macchinari',
          'vino e altre bevande',
          'Mobili, Arredamento',
          'Design, Illuminazione',
          'Legno e macchine lavorazione legno',
          'Elettrodomestici',
          'Tessile, abbigliamento, calzature, pelletteria, pelli e relativi macchinari',
          'Architettura, Edilizia, Macchinari e materiali per costruzione',
          'Plastica - gomma, Macchine per industria della plastica e gomma',
          'Trasporti',
          'Infrastrutture',
          'Giocattoli',
          'settore metalmeccanico (lavorazione metallo, carpenteria metallica, fonderie, laminazione, forgiatura, produzione di semilavorati metallici, trattamenti galvanici, meccanica di precisione, relativi macchinari)',
          'ambiente (gestione dei rifiuti, economia circolare, trattamento acque reflue, monitoraggio ambientale)',
          'energia (energie rinnovabili, efficienza energetica, carbone, petrolifero e gas, reti di distribuzione energetica, stoccaggio energetico)',
          'ICT (telecomunicazioni, software development, cybersecurity, cloud computing, intelligenza artificiale, digitalizzazione, IoT, makers)',
          'settori innovativi',
          'elaborazione dati statistici',
          'occhialeria',
          'gioielleria',
          'florovivaismo',
          'medicinale',
          'farmaceutico e nutraceutica',
          'zootecnia',
          'nautica',
          'editoria',
          'audiovisivi',
          'fitness e articoli sportivi',
          'automotive'
        ]

        const newItems = existingItems.map((name, index) => ({
          id: Date.now() + index,
          name
        }))

        return { items: newItems }
      }),

      loadExistingAreas: () => set(() => {
        const existingAreas = ['Dragan', 'Mirjana', 'Marko', 'Aleksandar', 'Tamara', 'Radmila']

        const newAreas = existingAreas.map((name, index) => ({
          id: Date.now() + index,
          name,
          items: []
        }))

        return { areas: newAreas }
      }),

      resetStore: () => set(() => ({
        items: [],
        areas: []
      }))
    }),
    {
      name: 'draghi-storage',
    }
  )
)

export default useStore

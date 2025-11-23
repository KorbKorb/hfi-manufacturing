import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuoteWizardState, QuoteFormData } from '@/types'

export const useQuoteStore = create<QuoteWizardState>()(
  persist(
    (set) => ({
      currentStep: 0,
      formData: {},

      setCurrentStep: (step: number) => set({ currentStep: step }),

      updateFormData: (data: Partial<QuoteFormData>) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      resetForm: () => set({ currentStep: 0, formData: {} }),
    }),
    {
      name: 'hfi-quote-wizard',
    }
  )
)

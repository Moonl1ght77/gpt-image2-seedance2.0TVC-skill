export interface AiAdapterInput {
  fabricId: string
  source: HTMLCanvasElement
}

export interface AiAdapterOutput {
  enhancedTexture?: HTMLCanvasElement
  notes?: string
}

export interface AiAdapter {
  enabled: boolean
  enhanceTexture(input: AiAdapterInput): Promise<AiAdapterOutput>
}

export const aiAdapter: AiAdapter = {
  enabled: false,
  async enhanceTexture() {
    return {
      notes: 'Local AI adapter is disabled. The rule-based texture pipeline is active.'
    }
  }
}

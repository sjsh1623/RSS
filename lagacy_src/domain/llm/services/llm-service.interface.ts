export interface ILlmService {
  /**
   * Analyze the given content to produce short summary, long summary, and category.
   */
  analyze(content: string): Promise<{
    shortSummary: string;
    longSummary: string;
    category: string;
  }>;
}

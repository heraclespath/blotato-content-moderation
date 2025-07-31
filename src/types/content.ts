export interface ContentInput {
  text?; string;
  images?: string[];
  links?: string[];
}

export interface ModerationResult {
  safe: boolean;
  reasons: string[];
}
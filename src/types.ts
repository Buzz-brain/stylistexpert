export interface UserInput {
  gender: string;
  age_range?: string;
  occasion: string;
  weather: string;
  body_type: string;
  preferred_style: string;
  color_preference?: string;
  height?: string;
}

export interface Recommendation {
  title: string;
  items: string[];
  explanation: string;
  images: string[];
  confidence: number;
  matched_rules: string[];
}

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}
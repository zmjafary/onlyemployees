
export type FlagType = {
  type: "red" | "green" | string;
  text: string;
  votes: number;
  percentage: number;
};

export type StoryType = {
  id: string;
  questionId: number;
  answer: boolean;
  comment: string;
  category: string;
  question: string;
  timestamp: string;
};

export type CompanyType = {
  id: string;
  name: string;
  display_name?: string;
  description?: string;
  logo: string;
  logoUrl?: string;
  address?: string;
  industry: string;
  website?: string;
  linkedin_url?: string;
  location?: string; // For backward compatibility
  size?: string; // For backward compatibility
  founded?: string; // For backward compatibility
  redFlagCount?: number; // For backward compatibility
  greenFlagCount?: number; // For backward compatibility
  reviewCount?: number; // For backward compatibility
  rating?: number; // For backward compatibility
  reviews?: number; // For backward compatibility
  featured?: boolean; // For backward compatibility
  tags?: string[]; // For backward compatibility
  flags?: FlagType[]; // For backward compatibility
  stories?: StoryType[]; // For backward compatibility
};

export type QuestionType = {
  id: number;
  question: string;
  question_regular?: string;
  question_meme?: string;
  category: string;
  topic: string;
  topic_id?: number;
  category_id?: number;
  positiveGif?: string;
  negativeGif?: string;
  favour_gif?: string;
  against_gif?: string;
  status?: boolean;
  needs_additional_responses?: boolean;
  favorStatement?: string;
  favorDescription?: string;
  againstStatement?: string;
  againstDescription?: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type TopicType = {
  id: number;
  name: string;
  category_id: number;
  description?: string;
  favor_statement?: string;
  favor_description?: string;
  against_statement?: string;
  against_description?: string;
  status?: boolean;
};

export type CountryType = {
  id: number;
  name: string;
};

export type CityType = {
  id: number;
  name: string;
  country_id: number;
};

export type SurveyType = {
  id?: number;
  user_id?: number;
  company_id: number;
  city_id?: number;
  country_id?: number;
  role_id?: number;
  department_id?: number;
  is_anonymous: boolean;
  is_employed: boolean;
  employed_from_date?: string;
  employed_to_date?: string;
  overall_rating?: number;
  review?: string;
  created_at?: string;
  updated_at?: string;
  answers: SurveyQuestionType[];
};

export type SurveyQuestionType = {
  id?: number;
  survey_id?: number;
  question_id: number;
  answer?: number;
  is_yes: boolean;
  rating?: number;
  comment?: string;
  additional_responses?: string[];
};


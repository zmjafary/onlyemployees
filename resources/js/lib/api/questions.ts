
import { QuestionType } from '@/types/company';

// Simulated questions data matching the schema exactly
const mockQuestions: QuestionType[] = [
  {
    id: 1,
    question: "Does the company provide good work-life balance?",
    topic_id: 1,
    category_id: 1,
    status: true,
    favor_statement: "Great work-life balance",
    favor_description: "Employees have flexible schedules and reasonable working hours",
    favor_gif: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    against_statement: "Poor work-life balance",
    against_description: "Long hours and high stress environment",
    against_gif: "https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif",
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    question: "Are the salary and benefits competitive?",
    topic_id: 2,
    category_id: 2,
    status: true,
    favor_statement: "Excellent compensation",
    favor_description: "Above market salary with great benefits package",
    favor_gif: "https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif",
    against_statement: "Below market compensation",
    against_description: "Salary and benefits are not competitive",
    against_gif: "https://media.giphy.com/media/ZGH8VtTZMmnwzsYYMf/giphy.gif",
    created_at: "2024-01-02T00:00:00Z"
  },
  {
    id: 3,
    question: "Is management supportive and effective?",
    topic_id: 3,
    category_id: 3,
    status: true,
    favor_statement: "Great leadership",
    favor_description: "Management is supportive and provides clear direction",
    favor_gif: "https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif",
    against_statement: "Poor management",
    against_description: "Management lacks direction and support",
    against_gif: "https://media.giphy.com/media/3o85xnoIXebk3xYx4Q/giphy.gif",
    created_at: "2024-01-03T00:00:00Z"
  },
  {
    id: 4,
    question: "Are there good opportunities for career growth?",
    topic_id: 4,
    category_id: 4,
    status: true,
    favor_statement: "Great growth opportunities",
    favor_description: "Clear career paths and promotion opportunities",
    favor_gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    against_statement: "Limited growth",
    against_description: "Few opportunities for advancement",
    against_gif: "https://media.giphy.com/media/l0HlQ7LRalQqdWfao/giphy.gif",
    created_at: "2024-01-04T00:00:00Z"
  },
  {
    id: 5,
    question: "Is the company culture positive and inclusive?",
    topic_id: 5,
    category_id: 5,
    status: true,
    favor_statement: "Positive culture",
    favor_description: "Inclusive and supportive work environment",
    favor_gif: "https://media.giphy.com/media/l1ughbsd9qXz2s9SE/giphy.gif",
    against_statement: "Toxic culture",
    against_description: "Negative and exclusive work environment",
    against_gif: "https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif",
    created_at: "2024-01-05T00:00:00Z"
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getQuestions = async (): Promise<QuestionType[]> => {
  await delay(400);
  return mockQuestions.filter(q => q.status);
};

export const getQuestionsByCategory = async (categoryId: number): Promise<QuestionType[]> => {
  await delay(350);
  return mockQuestions.filter(q => q.category_id === categoryId && q.status);
};

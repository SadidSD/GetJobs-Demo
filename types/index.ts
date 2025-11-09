export type Skill = string;

export type Job = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  match?: number; // 0-100 percentage of match to a candidate's skills
};

export type Talent = {
  id: string;
  name: string;
  skills: Skill[];
  match?: number; // 0-100 percentage of match to a job requirements
};

export type JobSuggestionRequest = {
  skills: Skill[];
};

export type JobSuggestionResponse = {
  jobs: Job[];
};

export type TalentSuggestionRequest = {
  requirements: Skill[];
};

export type TalentSuggestionResponse = {
  talents: Talent[];
};
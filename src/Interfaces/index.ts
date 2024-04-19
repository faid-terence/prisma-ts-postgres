import exp from "constants";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  applyLink: string;
}

import moment from "moment";

export interface Post {
  id: string;
  title: string;
  created: moment.Moment;
  html?: string;
  markdown?: string;
  userId: string;
}

export const today: Post = {
  id: "1",
  title: "Today",
  created: moment().subtract("seconds", 1),
  userId: "1",
};

export const thisWeek: Post = {
  id: "2",
  title: "This Week",
  created: moment().subtract("days", 2),
  userId: "1",
};

export const thisMonth: Post = {
  id: "3",
  title: "This Month",
  created: moment().subtract("days", 12),
  userId: "1",
};

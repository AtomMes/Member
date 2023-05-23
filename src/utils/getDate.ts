import { format, formatDistanceToNow, isToday } from "date-fns";

export const getDate = (date: Date): string => {
   const now = new Date();
   const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days in milliseconds

   if (Number(date) > Number(oneWeekAgo)) {
     return formatDistanceToNow(date, { addSuffix: true });
   } else if (isToday(date)) {
     return "Today";
   } else {
     return format(date, "MMMM d");
   }
 };
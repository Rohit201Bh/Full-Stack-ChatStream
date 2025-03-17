export const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  return `${hours}:${minutes} ${ampm}`; // Example: 2:30 PM
};
export function getStatus(event: any) {
    const today = new Date();
  
    if (event.startDate > today) {
      return 'Upcoming';
    } else if (event.endDate < today) {
      return 'Closed';
    } else {
      return 'Ongoing';
    }
}
  
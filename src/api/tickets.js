export async function getTickets() {

  const response =
    await fetch(
      'http://localhost:4000/api/v1/events/tickets'
    );

  const data =
    await response.json();

  return data.data || [];
}
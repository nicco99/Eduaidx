document.addEventListener("DOMContentLoaded", async () => {
  const ordersTableBody = document.getElementById("ordersTableBody");

  // Replace with actual user ID retrieval logic
  const userId = getUserID(); // Assume this function fetches the user ID

  try {
    const response = await fetch(`/order/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch orders data.");

    const { order } = await response.json();

    // Generate table rows
    order.forEach((order) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>#${order.id}</td>
                <td>${order.order_title}</td>
                <td>$${parseFloat(order.price).toFixed(2)}</td>
                <td>
                    <span class="badge ${getStatusBadgeClass(order.status)}">${
        order.status
      }</span>
                </td>
            `;

      ordersTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading orders:", error);
  }
});

function getStatusBadgeClass(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-success";
    case "in progress":
      return "bg-info";
    case "pending":
      return "bg-warning";
    case "cancelled":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}

// Example function to retrieve user ID (adjust based on your storage method)
function getUserID() {
  // This is a placeholder; replace with your actual logic for retrieving the user ID.
  const token = document.cookie.replace("jwt=", ""); // Assuming JWT stored as cookie
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.id;
}

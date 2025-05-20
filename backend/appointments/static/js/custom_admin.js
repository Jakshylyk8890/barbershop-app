document.addEventListener('DOMContentLoaded', function () {
  console.log("✅ Admin JS loaded");

  const rows = document.querySelectorAll('.row1, .row2');
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => row.style.background = '#f0f4ff');
    row.addEventListener('mouseleave', () => row.style.background = '');
  });
});

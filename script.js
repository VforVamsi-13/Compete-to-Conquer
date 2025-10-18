async function loadCfContests() {
      const response = await fetch("https://codeforces.com/api/contest.list");
      const data = await response.json();
      const contests = data.result
        .filter(c => c.phase === "BEFORE")
        .slice(0, 10);

      const tbody = document.getElementById("contest-table");
      tbody.innerHTML = "";

      contests.forEach(c => {
        // Convert to IST (UTC+5:30)
        const start = new Date(c.startTimeSeconds * 1000);
        const istOffset = 5.5 * 60; // minutes
        const istTime = new Date(start.getTime() + istOffset * 60 * 1000);

        const durationHours = (c.durationSeconds / 3600).toFixed(2);

        const row = `<tr>
          <td>${c.id}</td>
          <td>${c.name}</td>
          <td>${istTime.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
          <td>${durationHours}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    }

loadCfContests();

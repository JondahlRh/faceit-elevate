const getEloNode = (node) =>
  node.childNodes[0].childNodes[0].childNodes[0].childNodes[2].childNodes[0]
    .childNodes[1].childNodes[0].childNodes[0];

const filterTeamData = (nodes) => {
  const sumElo = nodes.reduce((total, currentNode) => {
    return total + +currentNode.textContent;
  }, 0);

  const avgElo = Math.round((sumElo / nodes.length) * 10) / 10;

  return avgElo;
};

const addEloNode = (parentNode, avgElo, gain) => {
  const roundedGain = Math.round(gain);
  const roundedLoss = Math.round(50 - gain);

  const team1node = document.createElement("span");
  team1node.textContent = `Avg Elo: ${avgElo} - Gain: ${roundedGain} - Loss: ${roundedLoss}`;
  team1node.style.opacity = "70%";
  parentNode.append(team1node);
};

const addInfoNode = (parentNode) => {
  const child = document.createElement("span");
  child.textContent = "Elo Gain / Loss made by Gamix";
  parentNode.prepend(child);
};

const editDom = () => {
  const teamLeftQuery = document.querySelector('[name="roster1"]');
  const teamRightQuery = document.querySelector('[name="roster2"]');

  const mappedTeamLeftQuery = Array.from(
    teamLeftQuery.childNodes[0].childNodes
  ).map(getEloNode);
  const mappedTeamRightQuery = Array.from(
    teamRightQuery.childNodes[0].childNodes
  ).map(getEloNode);

  const avgEloTeamLeft = filterTeamData(mappedTeamLeftQuery);
  const avgEloTeamRight = filterTeamData(mappedTeamRightQuery);

  const dif = Math.abs(avgEloTeamLeft - avgEloTeamRight);

  const gain = 50 * (1 - 1 / (1 + Math.pow(10, dif / 400)));
  const loss = 50 - gain;

  const teamLeftGain = Math.round(
    avgEloTeamLeft < avgEloTeamRight ? gain : loss
  );
  const teamRightGain = Math.round(
    avgEloTeamLeft < avgEloTeamRight ? loss : gain
  );

  const matchQuery = document.querySelector("#MATCHROOM-OVERVIEW");

  const teamLeftHeaderQuery =
    matchQuery.childNodes[0].childNodes[0].childNodes[1].childNodes[0]
      .childNodes[0];
  const teamRightHeaderQuery =
    matchQuery.childNodes[0].childNodes[0].childNodes[1].childNodes[2]
      .childNodes[0];

  addEloNode(teamLeftHeaderQuery, avgEloTeamLeft, teamLeftGain);
  addEloNode(teamRightHeaderQuery, avgEloTeamRight, teamRightGain);

  matchQuery.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].textContent =
    "Elo Gain / Loss made by Gamix";
};

setTimeout(editDom, 5000);

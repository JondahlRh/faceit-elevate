const filterTeamData = (nodes) => {
  const sumElo = nodes.reduce((total, currentNode) => {
    return total + +currentNode.children[1].children[0].children[0].textContent;
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
  const querySelectElo = [...document.querySelectorAll(".sc-gDXjCt.kZeRJR")];

  const avgEloTeamLeft = filterTeamData(querySelectElo.slice(0, 5));
  const avgEloTeamRight = filterTeamData(querySelectElo.slice(5));

  const dif = Math.abs(avgEloTeamLeft - avgEloTeamRight);

  const gain = 50 * (1 - 1 / (1 + Math.pow(10, dif / 400)));
  const loss = 50 - gain;

  const teamLeftGain = Math.round(
    avgEloTeamLeft < avgEloTeamRight ? gain : loss
  );
  const teamRightGain = Math.round(
    avgEloTeamLeft < avgEloTeamRight ? loss : gain
  );

  const querySelectTeams = [
    ...document.querySelectorAll(".sc-kgvGAC.fYkWRc.sc-jZqtKW.fYWcuv"),
  ];
  addEloNode(querySelectTeams[0].parentNode, avgEloTeamLeft, teamLeftGain);
  addEloNode(querySelectTeams[1].parentNode, avgEloTeamRight, teamRightGain);

  const querySelectInfo = document.querySelector(".sc-fwDRTc.fiNfPN");
  addInfoNode(querySelectInfo);
};

setTimeout(editDom, 5000);

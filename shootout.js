const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// All 48 World Cup 2026 Nations (Countries & Kit Colors Only)
const TEAMS = [
    // Hosts (CONCACAF)
    { country: "USA", code: "USA", jersey: "#ffffff", shorts: "#1d4ed8", gk: "#f97316" },
    { country: "Mexico", code: "MEX", jersey: "#15803d", shorts: "#ffffff", gk: "#eab308" },
    { country: "Canada", code: "CAN", jersey: "#dc2626", shorts: "#dc2626", gk: "#111827" },
    // CONMEBOL
    { country: "Argentina", code: "ARG", jersey: "#38bdf8", shorts: "#ffffff", gk: "#22c55e" },
    { country: "Brazil", code: "BRA", jersey: "#facc15", shorts: "#1d4ed8", gk: "#111827" },
    { country: "Uruguay", code: "URU", jersey: "#60a5fa", shorts: "#111827", gk: "#f97316" },
    { country: "Colombia", code: "COL", jersey: "#fde047", shorts: "#1e3a8a", gk: "#ef4444" },
    { country: "Ecuador", code: "ECU", jersey: "#facc15", shorts: "#1e40af", gk: "#a855f7" },
    { country: "Paraguay", code: "PAR", jersey: "#ef4444", shorts: "#1d4ed8", gk: "#10b981" },
    // UEFA
    { country: "France", code: "FRA", jersey: "#1e3a8a", shorts: "#ffffff", gk: "#facc15" },
    { country: "England", code: "ENG", jersey: "#f8fafc", shorts: "#1e3a8a", gk: "#22c55e" },
    { country: "Spain", code: "ESP", jersey: "#dc2626", shorts: "#1e3a8a", gk: "#38bdf8" },
    { country: "Germany", code: "GER", jersey: "#ffffff", shorts: "#111827", gk: "#a855f7" },
    { country: "Portugal", code: "POR", jersey: "#b91c1c", shorts: "#15803d", gk: "#38bdf8" },
    { country: "Netherlands", code: "NED", jersey: "#f97316", shorts: "#f97316", gk: "#1e293b" },
    { country: "Italy", code: "ITA", jersey: "#2563eb", shorts: "#ffffff", gk: "#facc15" },
    { country: "Belgium", code: "BEL", jersey: "#991b1b", shorts: "#111827", gk: "#38bdf8" },
    { country: "Croatia", code: "CRO", jersey: "#ef4444", shorts: "#ffffff", gk: "#22c55e" },
    { country: "Switzerland", code: "SUI", jersey: "#dc2626", shorts: "#ffffff", gk: "#111827" },
    { country: "Denmark", code: "DEN", jersey: "#dc2626", shorts: "#ffffff", gk: "#38bdf8" },
    { country: "Austria", code: "AUT", jersey: "#ef4444", shorts: "#111827", gk: "#facc15" },
    { country: "Norway", code: "NOR", jersey: "#dc2626", shorts: "#1e3a8a", gk: "#22c55e" },
    { country: "Poland", code: "POL", jersey: "#ffffff", shorts: "#dc2626", gk: "#111827" },
    { country: "Scotland", code: "SCO", jersey: "#1e3a8a", shorts: "#1e3a8a", gk: "#f97316" },
    { country: "Turkey", code: "TUR", jersey: "#ffffff", shorts: "#dc2626", gk: "#22c55e" },
    // CAF
    { country: "Morocco", code: "MAR", jersey: "#b91c1c", shorts: "#15803d", gk: "#facc15" },
    { country: "Senegal", code: "SEN", jersey: "#ffffff", shorts: "#15803d", gk: "#f97316" },
    { country: "Egypt", code: "EGY", jersey: "#dc2626", shorts: "#ffffff", gk: "#22c55e" },
    { country: "Nigeria", code: "NGA", jersey: "#16a34a", shorts: "#ffffff", gk: "#111827" },
    { country: "Ivory Coast", code: "CIV", jersey: "#f97316", shorts: "#f97316", gk: "#15803d" },
    { country: "Algeria", code: "ALG", jersey: "#ffffff", shorts: "#16a34a", gk: "#facc15" },
    { country: "Tunisia", code: "TUN", jersey: "#dc2626", shorts: "#dc2626", gk: "#38bdf8" },
    { country: "Cameroon", code: "CMR", jersey: "#15803d", shorts: "#dc2626", gk: "#facc15" },
    { country: "South Africa", code: "RSA", jersey: "#facc15", shorts: "#15803d", gk: "#111827" },
    // AFC
    { country: "Japan", code: "JPN", jersey: "#1d4ed8", shorts: "#1e3a8a", gk: "#ef4444" },
    { country: "South Korea", code: "KOR", jersey: "#e11d48", shorts: "#111827", gk: "#facc15" },
    { country: "Iran", code: "IRN", jersey: "#ffffff", shorts: "#ffffff", gk: "#16a34a" },
    { country: "Australia", code: "AUS", jersey: "#facc15", shorts: "#15803d", gk: "#a855f7" },
    { country: "Saudi Arabia", code: "KSA", jersey: "#15803d", shorts: "#ffffff", gk: "#f97316" },
    { country: "Qatar", code: "QAT", jersey: "#881337", shorts: "#881337", gk: "#38bdf8" },
    { country: "Uzbekistan", code: "UZB", jersey: "#38bdf8", shorts: "#ffffff", gk: "#facc15" },
    { country: "Jordan", code: "JOR", jersey: "#dc2626", shorts: "#ffffff", gk: "#22c55e" },
    // CONCACAF Qualifiers
    { country: "Panama", code: "PAN", jersey: "#dc2626", shorts: "#1d4ed8", gk: "#facc15" },
    { country: "Costa Rica", code: "CRC", jersey: "#dc2626", shorts: "#1e3a8a", gk: "#22c55e" },
    { country: "Jamaica", code: "JAM", jersey: "#facc15", shorts: "#111827", gk: "#16a34a" },
    // OFC & Playoff Qualifiers
    { country: "New Zealand", code: "NZL", jersey: "#ffffff", shorts: "#ffffff", gk: "#111827" },
    { country: "Ghana", code: "GHA", jersey: "#ffffff", shorts: "#111827", gk: "#ef4444" },
    { country: "Venezuela", code: "VEN", jersey: "#7f1d1d", shorts: "#7f1d1d", gk: "#38bdf8" }
];

// DOM Elements
const menuOverlay = document.getElementById("menuOverlay");
const resultOverlay = document.getElementById("resultOverlay");
const scoreboard = document.getElementById("scoreboard");
const playerSelect = document.getElementById("playerTeam");
const aiSelect = document.getElementById("aiTeam");
const customPlayerInput = document.getElementById("customPlayerName");
const customAiInput = document.getElementById("customAiName");
const playerPreview = document.getElementById("playerPreview");
const aiPreview = document.getElementById("aiPreview");

// Pitch & Goal Geometry
const goal = { x: 175, y: 65, width: 350, height: 130 };
let mouse = { x: 350, y: 130 };

// Match State
let playerTeam = { ...TEAMS[3], playerName: "Player 1" };
let aiTeam = { ...TEAMS[9], playerName: "Player 2" };
let matchActive = false;
let isResetting = false;
let turn = "PLAYER_SHOOT"; // "PLAYER_SHOOT" or "PLAYER_SAVE"
let playerHistory = [];    // true = goal, false = miss/save
let aiHistory = [];
let statusText = "";
let statusColor = "#ffffff";
let shotOutcome = "";

// Ball & Goalkeeper State
const ball = {
    startX: 350, startY: 375,
    x: 350, y: 375,
    targetX: 350, targetY: 130,
    radius: 11,
    isKicked: false,
    progress: 0
};

const gk = {
    startX: 350, startY: 165,
    x: 350, y: 165,
    targetX: 350, targetY: 165,
    angle: 0, targetAngle: 0
};

// Populate Dropdowns (Countries Only)
function initMenu() {
    playerSelect.innerHTML = "";
    aiSelect.innerHTML = "";

    TEAMS.forEach((team, idx) => {
        playerSelect.add(new Option(team.country, idx));
        aiSelect.add(new Option(team.country, idx));
    });

    playerSelect.value = 3; // Argentina
    aiSelect.value = 9;     // France
    updatePreviews();
}

function updatePreviews() {
    const p = TEAMS[playerSelect.value];
    const a = TEAMS[aiSelect.value];
    const pName = customPlayerInput.value.trim() || "Player 1";
    const aName = customAiInput.value.trim() || "Player 2";

    playerPreview.innerHTML = `<span class="kit-swatch" style="background:${p.jersey}"></span> Player: <b></b>`;
    playerPreview.querySelector("b").textContent = pName;

    aiPreview.innerHTML = `<span class="kit-swatch" style="background:${a.jersey}"></span> Opponent: <b></b>`;
    aiPreview.querySelector("b").textContent = aName;
}

playerSelect.addEventListener("change", updatePreviews);
aiSelect.addEventListener("change", updatePreviews);
customPlayerInput.addEventListener("input", updatePreviews);
customAiInput.addEventListener("input", updatePreviews);

document.getElementById("randomBtn").addEventListener("click", () => {
    let rand;
    do {
        rand = Math.floor(Math.random() * TEAMS.length);
    } while (rand === Number(playerSelect.value));
    aiSelect.value = rand;
    updatePreviews();
});

document.getElementById("startBtn").addEventListener("click", startMatch);
document.getElementById("rematchBtn").addEventListener("click", startMatch);
document.getElementById("changeTeamsBtn").addEventListener("click", () => {
    resultOverlay.classList.add("hidden");
    scoreboard.classList.add("hidden");
    menuOverlay.classList.remove("hidden");
    matchActive = false;
});

function startMatch() {
    playerTeam = {
        ...TEAMS[playerSelect.value],
        playerName: customPlayerInput.value.trim() || "Player 1"
    };
    aiTeam = {
        ...TEAMS[aiSelect.value],
        playerName: customAiInput.value.trim() || "Player 2"
    };

    playerHistory = [];
    aiHistory = [];
    turn = "PLAYER_SHOOT";
    matchActive = true;
    isResetting = false;

    document.getElementById("pName").textContent = playerTeam.code;
    document.getElementById("pStar").textContent = playerTeam.playerName;
    document.getElementById("aName").textContent = aiTeam.code;
    document.getElementById("aStar").textContent = aiTeam.playerName;

    menuOverlay.classList.add("hidden");
    resultOverlay.classList.add("hidden");
    scoreboard.classList.remove("hidden");

    resetPositions();
    updateScoreboardUI();
}

function resetPositions() {
    ball.x = ball.startX;
    ball.y = ball.startY;
    ball.radius = 11;
    ball.isKicked = false;
    ball.progress = 0;

    gk.x = gk.startX;
    gk.y = gk.startY;
    gk.angle = 0;

    statusText = turn === "PLAYER_SHOOT"
        ? `YOUR TURN: Aim & Click to Shoot (${playerTeam.playerName})`
        : `YOUR TURN TO SAVE: Click Where to Dive!`;
    statusColor = turn === "PLAYER_SHOOT" ? "#facc15" : "#38bdf8";
}

function updateScoreboardUI() {
    const pScore = playerHistory.filter(Boolean).length;
    const aScore = aiHistory.filter(Boolean).length;
    document.getElementById("pTotal").textContent = pScore;
    document.getElementById("aTotal").textContent = aScore;

    const totalSlots = Math.max(5, Math.max(playerHistory.length, aiHistory.length));
    const renderDots = (containerId, history) => {
        const el = document.getElementById(containerId);
        el.innerHTML = "";
        for (let i = 0; i < totalSlots; i++) {
            const dot = document.createElement("div");
            dot.className = "dot";
            if (i < history.length) dot.classList.add(history[i] ? "goal" : "miss");
            el.appendChild(dot);
        }
    };
    renderDots("pDots", playerHistory);
    renderDots("aDots", aiHistory);

    const currentRound = Math.min(playerHistory.length, aiHistory.length) + 1;
    document.getElementById("roundBadge").textContent =
        currentRound > 5 ? `SUDDEN DEATH • R${currentRound}` : `ROUND ${currentRound} / 5`;
}

// Mouse Tracking
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

// Click Handler (Shoot OR Dive depending on turn)
canvas.addEventListener("click", () => {
    if (!matchActive || ball.isKicked || isResetting) return;

    ball.isKicked = true;
    ball.progress = 0;
    statusText = "";

    if (turn === "PLAYER_SHOOT") {
        ball.targetX = mouse.x;
        ball.targetY = mouse.y;

        const onTarget =
            ball.targetX > goal.x + 8 &&
            ball.targetX < goal.x + goal.width - 8 &&
            ball.targetY > goal.y + 8 &&
            ball.targetY < goal.y + goal.height;

        if (onTarget) {
            // 50-50 random save ratio
            const gkSaves = Math.random() < 0.5;
            if (gkSaves) {
                shotOutcome = "SAVED";
                gk.targetX = ball.targetX;
                gk.targetY = Math.max(ball.targetY + 12, goal.y + 40);
            } else {
                shotOutcome = "GOAL";
                const diveRight = ball.targetX < 350;
                gk.targetX = diveRight ? 450 + Math.random() * 40 : 210 + Math.random() * 40;
                gk.targetY = 160;
            }
        } else {
            shotOutcome = "MISSED";
            gk.targetX = Math.random() < 0.5 ? 240 : 460;
            gk.targetY = 160;
        }
    } else {
        // PLAYER_SAVE: Player clicks where GK should dive
        gk.targetX = Math.max(goal.x + 20, Math.min(goal.x + goal.width - 20, mouse.x));
        gk.targetY = Math.max(goal.y + 35, Math.min(goal.y + goal.height - 5, mouse.y));

        const zones = [
            goal.x + 45 + Math.random() * 55,              // Left
            315 + Math.random() * 70,                      // Center
            goal.x + goal.width - 100 + Math.random() * 55 // Right
        ];
        ball.targetX = zones[Math.floor(Math.random() * zones.length)];
        ball.targetY = goal.y + 25 + Math.random() * (goal.height - 45);

        const dist = Math.hypot(ball.targetX - gk.targetX, ball.targetY - gk.targetY);
        shotOutcome = dist <= 72 ? "SAVED" : "GOAL";
    }

    if (gk.targetX < gk.startX - 25) gk.targetAngle = -0.75;
    else if (gk.targetX > gk.startX + 25) gk.targetAngle = 0.75;
    else gk.targetAngle = 0;
});

function finishShot() {
    isResetting = true;
    const isGoal = shotOutcome === "GOAL";

    if (turn === "PLAYER_SHOOT") {
        playerHistory.push(isGoal);
        statusText = isGoal
            ? `GOAL! ${playerTeam.playerName} scores!`
            : (shotOutcome === "SAVED" ? "SAVED BY KEEPER!" : "MISSED!");
        statusColor = isGoal ? "#4ade80" : "#f87171";
    } else {
        aiHistory.push(isGoal);
        statusText = isGoal ? `${aiTeam.playerName} SCORES!` : "WHAT A SAVE!";
        statusColor = isGoal ? "#f87171" : "#4ade80";
    }

    updateScoreboardUI();

    setTimeout(() => {
        if (checkMatchWinner()) return;
        turn = turn === "PLAYER_SHOOT" ? "PLAYER_SAVE" : "PLAYER_SHOOT";
        resetPositions();
        isResetting = false;
    }, 1300);
}

function checkMatchWinner() {
    const pScore = playerHistory.filter(Boolean).length;
    const aScore = aiHistory.filter(Boolean).length;
    const pKicks = playerHistory.length;
    const aKicks = aiHistory.length;

    let winner = null;

    if (pKicks <= 5 && aKicks <= 5) {
        const pRemaining = 5 - pKicks;
        const aRemaining = 5 - aKicks;
        if (pScore > aScore + aRemaining) winner = "PLAYER";
        else if (aScore > pScore + pRemaining) winner = "AI";
        else if (pKicks === 5 && aKicks === 5 && pScore !== aScore) {
            winner = pScore > aScore ? "PLAYER" : "AI";
        }
    } else if (pKicks === aKicks && pScore !== aScore) {
        winner = pScore > aScore ? "PLAYER" : "AI";
    }

    if (winner) {
        matchActive = false;
        isResetting = false;
        const title = document.getElementById("resultTitle");
        const details = document.getElementById("resultDetails");
        title.textContent = winner === "PLAYER"
            ? `${playerTeam.country.toUpperCase()} WINS!`
            : `${aiTeam.country.toUpperCase()} WINS!`;
        title.style.color = winner === "PLAYER" ? "#4ade80" : "#f87171";
        details.textContent = `Final Shootout Score: ${playerTeam.code} ${pScore} - ${aScore} ${aiTeam.code}`;
        resultOverlay.classList.remove("hidden");
        return true;
    }
    return false;
}

// Drawing Functions
function drawField() {
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, 195);

    ctx.fillStyle = "#2e7d32";
    ctx.fillRect(0, 195, canvas.width, canvas.height - 195);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 3;
    ctx.strokeRect(85, 195, 530, 205);

    ctx.beginPath();
    ctx.arc(350, 375, 4, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;
    for (let x = goal.x; x <= goal.x + goal.width; x += 22) {
        ctx.beginPath();
        ctx.moveTo(x, goal.y);
        ctx.lineTo(x, goal.y + goal.height);
        ctx.stroke();
    }
    for (let y = goal.y; y <= goal.y + goal.height; y += 22) {
        ctx.beginPath();
        ctx.moveTo(goal.x, y);
        ctx.lineTo(goal.x + goal.width, y);
        ctx.stroke();
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(goal.x, goal.y + goal.height);
    ctx.lineTo(goal.x, goal.y);
    ctx.lineTo(goal.x + goal.width, goal.y);
    ctx.lineTo(goal.x + goal.width, goal.y + goal.height);
    ctx.stroke();
}

function drawPerson(x, y, angle, jerseyColor, shortsColor, isGK) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Legs
    ctx.strokeStyle = "#f1c27d";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-6, 12); ctx.lineTo(-9, 28);
    ctx.moveTo(6, 12);  ctx.lineTo(9, 28);
    ctx.stroke();

    // Boots
    ctx.fillStyle = "#111";
    ctx.fillRect(-13, 26, 8, 5);
    ctx.fillRect(5, 26, 8, 5);

    // Shorts
    ctx.fillStyle = shortsColor;
    ctx.fillRect(-10, 6, 20, 10);

    // Jersey
    ctx.fillStyle = jerseyColor;
    ctx.fillRect(-11, -14, 22, 22);
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(-11, -14, 22, 22);

    // Arms
    ctx.strokeStyle = jerseyColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    if (isGK) {
        ctx.moveTo(-11, -10); ctx.lineTo(-24, -18);
        ctx.moveTo(11, -10);  ctx.lineTo(24, -18);
    } else {
        ctx.moveTo(-11, -10); ctx.lineTo(-18, 4);
        ctx.moveTo(11, -10);  ctx.lineTo(18, 4);
    }
    ctx.stroke();

    // Gloves
    if (isGK) {
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(-25, -19, 5, 0, Math.PI * 2);
        ctx.arc(25, -19, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Head & Hair
    ctx.fillStyle = "#f1c27d";
    ctx.beginPath();
    ctx.arc(0, -23, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(0, -25, 9, Math.PI, 0);
    ctx.fill();

    ctx.restore();
}

function drawAimOrDiveGuide() {
    if (!matchActive || ball.isKicked || isResetting) return;

    if (turn === "PLAYER_SHOOT") {
        ctx.save();
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "rgba(250, 204, 21, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.restore();

        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.moveTo(mouse.x - 15, mouse.y); ctx.lineTo(mouse.x + 15, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 15); ctx.lineTo(mouse.x, mouse.y + 15);
        ctx.stroke();
    } else {
        const diveX = Math.max(goal.x + 20, Math.min(goal.x + goal.width - 20, mouse.x));
        const diveY = Math.max(goal.y + 35, Math.min(goal.y + goal.height - 5, mouse.y));
        ctx.strokeStyle = "#38bdf8";
        ctx.fillStyle = "rgba(56, 189, 248, 0.18)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(diveX, diveY, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.closePath();
}

function drawStatus() {
    if (!statusText) return;
    ctx.fillStyle = "rgba(15, 23, 42, 0.72)";
    ctx.fillRect(110, 232, 480, 40);

    ctx.fillStyle = statusColor;
    ctx.font = "bold 18px Segoe UI, Arial";
    ctx.textAlign = "center";
    ctx.fillText(statusText, canvas.width / 2, 258);
}

function update() {
    if (ball.isKicked) {
        ball.progress += 0.04;
        if (ball.progress >= 1) {
            ball.progress = 1;
            ball.isKicked = false;
            finishShot();
        }
        ball.x = ball.startX + (ball.targetX - ball.startX) * ball.progress;
        ball.y = ball.startY + (ball.targetY - ball.startY) * ball.progress;
        ball.radius = 11 - 3.5 * ball.progress;

        gk.x = gk.startX + (gk.targetX - gk.startX) * ball.progress;
        gk.y = gk.startY + (gk.targetY - gk.startY) * ball.progress;
        gk.angle = gk.targetAngle * ball.progress;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawField();

    const kickerKit = turn === "PLAYER_SHOOT" ? playerTeam : aiTeam;
    const keeperKit = turn === "PLAYER_SHOOT" ? aiTeam : playerTeam;

    drawPerson(gk.x, gk.y, gk.angle, keeperKit.gk, "#111827", true);
    drawAimOrDiveGuide();
    drawBall();
    drawPerson(315, 380, 0, kickerKit.jersey, kickerKit.shorts, false);
    drawStatus();
    update();

    requestAnimationFrame(gameLoop);
}

initMenu();
gameLoop();
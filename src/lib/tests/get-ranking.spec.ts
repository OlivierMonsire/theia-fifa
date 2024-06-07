import { createFixture, Fixture } from "./create-get-ranking.fixture";

describe("Feature: Get ranking", async () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = createFixture();
  });

  it("Sam can see ranking but there is no players", async () => {
    fixture.givenPlayers([]);
    fixture.givenMatches([]);
    await fixture.whenGetRanking();
    fixture.thenRankingShouldBe([]);
  });

  it("Sam can see ranking but no matches have been played", async () => {
    fixture.givenPlayers([
      {
        id: "player-1",
        name: "John",
      },
      {
        id: "player-2",
        name: "Jean",
      },
    ]);
    fixture.givenMatches([]);
    await fixture.whenGetRanking();
    fixture.thenRankingShouldBe([
      {
        id: "player-1",
        name: "John",
        rank: 1,
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goalsScored: 0,
        goalsConceded: 0,
        GoalsDiff: 0,
        points: 0,
      },
      {
        id: "player-2",
        name: "Jean",
        rank: 1,
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goalsScored: 0,
        goalsConceded: 0,
        GoalsDiff: 0,
        points: 0,
      },
    ]);
  });

  it("Sam can see ranking of three players and a match was played, finished by a draw, no goals, each players gain 1 point", async () => {
    fixture.givenPlayers([
      {
        id: "player-1",
        name: "John",
      },
      {
        id: "player-2",
        name: "Jean",
      },
      {
        id: "player-3",
        name: "Aymeric",
      },
    ]);
    fixture.givenMatches([
      {
        id: "match-1",
        homePlayerId: "player-1",
        homePlayerGoals: 0,
        visitorPlayerId: "player-2",
        visitorPlayerGoals: 0,
      },
    ]);
    await fixture.whenGetRanking();
    fixture.thenRankingShouldBe([
      {
        id: "player-1",
        name: "John",
        rank: 1,
        matchesPlayed: 1,
        wins: 0,
        losses: 0,
        draws: 1,
        goalsScored: 0,
        goalsConceded: 0,
        GoalsDiff: 0,
        points: 1,
      },
      {
        id: "player-2",
        name: "Jean",
        rank: 1,
        matchesPlayed: 1,
        wins: 0,
        losses: 0,
        draws: 1,
        goalsScored: 0,
        goalsConceded: 0,
        GoalsDiff: 0,
        points: 1,
      },
      {
        id: "player-3",
        name: "Aymeric",
        rank: 3,
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goalsScored: 0,
        goalsConceded: 0,
        GoalsDiff: 0,
        points: 0,
      },
    ]);
  });

  it("Sam can see ranking of three players and two matches was played, a draw and a match finished by a home player victory, 3-2, home player gain 3 point", async () => {
    fixture.givenPlayers([
      {
        id: "player-1",
        name: "John",
      },
      {
        id: "player-2",
        name: "Jean",
      },
      {
        id: "player-3",
        name: "Aymeric",
      },
    ]);
    fixture.givenMatches([
      {
        id: "match-1",
        homePlayerId: "player-1",
        homePlayerGoals: 0,
        visitorPlayerId: "player-2",
        visitorPlayerGoals: 0,
      },
      {
        id: "match-2",
        homePlayerId: "player-1",
        homePlayerGoals: 3,
        visitorPlayerId: "player-3",
        visitorPlayerGoals: 2,
      },
    ]);
    await fixture.whenGetRanking();
    fixture.thenRankingShouldBe([
      {
        id: "player-1",
        name: "John",
        rank: 1,
        matchesPlayed: 2,
        wins: 1,
        losses: 0,
        draws: 1,
        goalsScored: 3,
        goalsConceded: 2,
        GoalsDiff: 1,
        points: 4,
      },
      {
        id: "player-2",
        name: "Jean",
        rank: 2,
        matchesPlayed: 1,
        wins: 0,
        losses: 0,
        draws: 1,
        goalsScored: 0,
        goalsConceded: 0,
        GoalsDiff: 0,
        points: 1,
      },
      {
        id: "player-3",
        name: "Aymeric",
        rank: 3,
        matchesPlayed: 1,
        wins: 0,
        losses: 1,
        draws: 0,
        goalsScored: 2,
        goalsConceded: 3,
        GoalsDiff: -1,
        points: 0,
      },
    ]);
  });
});

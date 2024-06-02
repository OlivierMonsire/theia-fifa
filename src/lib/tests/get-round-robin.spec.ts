import { createGetRoundRobinFixture } from "./create-get-round-robin.fixture";

describe("Feature: Get scores by players order by player name", async () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = createGetRoundRobinFixture();
  });

  it("Sam can see all scores but there is no players", async () => {
    fixture.givenPlayers([]);
    fixture.givenMatches([]);
    await fixture.whenGetRoundRobin();
    fixture.thenRoundRobinShouldBe([]);
  });

  it("Sam can see all scores but there is no matches", async () => {
    fixture.givenPlayers([
      { id: "player-1", name: "John" },
      { id: "player-2", name: "Erin" },
    ]);
    fixture.givenMatches([]);
    await fixture.whenGetRoundRobin();
    fixture.thenRoundRobinShouldBe([
      { id: "player-2", name: "Erin", results: [] },
      { id: "player-1", name: "John", results: [] },
    ]);
  });

  it("Sam can see all scores and there is one match", async () => {
    fixture.givenPlayers([
      { id: "player-1", name: "John" },
      { id: "player-2", name: "Erin" },
      { id: "player-3", name: "Michael" },
    ]);
    fixture.givenMatches([
      {
        homePlayerId: "player-1",
        homePlayerGoals: 2,
        visitorPlayerId: "player-3",
        visitorPlayerGoals: 0,
      },
    ]);
    await fixture.whenGetRoundRobin();
    fixture.thenRoundRobinShouldBe([
      { id: "player-2", name: "Erin", results: [] },
      { id: "player-1", name: "John", results: [{ opponentId: "player-3", score: "2 - 0" }] },
      { id: "player-3", name: "Michael", results: [{ opponentId: "player-1", score: "0 - 2" }] },
    ]);
  });

  it("Sam can see all scores and there is multiples matches", async () => {
    fixture.givenPlayers([
      { id: "player-1", name: "John" },
      { id: "player-2", name: "Erin" },
      { id: "player-3", name: "Michael" },
      { id: "player-4", name: "Jade" },
      { id: "player-5", name: "Elias" },
    ]);
    fixture.givenMatches([
      { homePlayerId: "player-1", homePlayerGoals: 2, visitorPlayerId: "player-3", visitorPlayerGoals: 0 },
      { homePlayerId: "player-2", homePlayerGoals: 0, visitorPlayerId: "player-5", visitorPlayerGoals: 0 },
      { homePlayerId: "player-5", homePlayerGoals: 3, visitorPlayerId: "player-3", visitorPlayerGoals: 1 },
    ]);
    await fixture.whenGetRoundRobin();
    fixture.thenRoundRobinShouldBe([
      {
        id: "player-5",
        name: "Elias",
        results: [
          { opponentId: "player-2", score: "0 - 0" },
          { opponentId: "player-3", score: "3 - 1" },
        ],
      },
      { id: "player-2", name: "Erin", results: [{ opponentId: "player-5", score: "0 - 0" }] },
      { id: "player-4", name: "Jade", results: [] },
      { id: "player-1", name: "John", results: [{ opponentId: "player-3", score: "2 - 0" }] },
      {
        id: "player-3",
        name: "Michael",
        results: [
          { opponentId: "player-1", score: "0 - 2" },
          { opponentId: "player-5", score: "1 - 3" },
        ],
      },
    ]);
  });
});

type Fixture = ReturnType<typeof createGetRoundRobinFixture>;

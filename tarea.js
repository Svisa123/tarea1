import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom();

loadSprite("birdy", "sprites/birdy.png");
loadSprite("pipe", "sprites/pipe.png");
loadSprite("bg", "sprites/bg.png");

scene("game", () => {
  const right = "right";

  add([sprite("pipe", { width: width(), height: height() })]);
//comentario
  const PIPE_GAP = 120;
  function producePipes() {
    const offset = rand(-64, 64);
    add([
      sprite("pipe"),
      pos(width(), height() / 2 + offset + PIPE_GAP / 2),
      "pipe",
      area(),
    ]);

    add([
      sprite("pipe", { flipY: true }),
      pos(width(), height() / 2 + offset - PIPE_GAP / 2),
      origin("botleft"),
      "pipe",
      area(),
    ]);
    onUpdate("pipe", (pipe) => {
      pipe.move(-160, 0);
    });
    loop(1.5, () => {
      producePipes();
    });
  }

  producePipes();

  const player = add([
    sprite("birdy"),
    scale(2),
    pos(80, 40),
    area(),
    body(),

    onKeyPress("space", () => {
      player.jump(400);
    }),
  ]);
});

scene("gameover", (score) => {});
go("game");

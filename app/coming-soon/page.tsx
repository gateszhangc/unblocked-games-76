'use client'

import React, { useState, FormEvent, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

// 创建一个组件来包装使用useSearchParams的内容
function SearchParamsWrapper({ children }: { children: (gameInfo: { name: string; image: string }) => React.ReactNode }) {
  const searchParams = useSearchParams()

  // 预定义的游戏信息
  const gameData: { [key: string]: { name: string; image: string } } = {
    'plonky': {
      name: 'Plonky',
      image: 'https://play-lh.googleusercontent.com/37iUpEXB3mkrYkL07ZZBxfOqDVKrNB9jWW5DYrI0-ChlTjLJ7s2zAcLnfNZ6hKYTh9Ze=w240-h480-rw'
    },
    'tung-sahur-clicker': {
      name: 'Tung Sahur Clicker',
      image: 'https://gamulo.com/wp-content/uploads/thumbs/custom/T/tung-tung-tung-sahur-clicker-logo-150x150.png'
    },
    'head-soccer-2024': {
      name: 'Head Soccer 2024',
      image: 'https://azgames.io/upload/cache/upload/imgs/thumbnail_90x90-m200x200.webp'
    },
    'planet-clicker': {
      name: 'Planet Clicker',
      image: 'https://gamulo.com/wp-content/uploads/thumbs/custom/P/Planet-Clicker-2-logo-150x150.webp'
    },
    'fnaf': {
      name: 'FNAF',
      image: 'https://classroom-6x.org/files/images/fnaf.jpeg'
    },
    'tetris': {
      name: 'Tetris',
      image: 'https://tetrys.org/games/tetris/thumb_2.png'
    },
    'tile-matching-3d': {
      name: 'Tile Matching 3D',
      image: 'https://classroom-6x.org/files/images/gametiles_com.loop_.match3d1.jpg'
    },
    'chicken-merge': {
      name: 'Chicken Merge',
      image: 'https://ubg98.github.io/assets/img/games/chicken-merge.png '
    },
    'minefun.io': {
      name: 'MineFun.io',
      image: 'https://classroom-6x.org/files/images/minefun-io.png '
    },
    'cut-the-rope': {
      name: 'Cut The Rope',
      image: 'https://play-lh.googleusercontent.com/lCbn5iYc9wRgsyoJwgxsbE-Ho3tPLLi_94-HaRZ2Zs2mXotvBuYj5nFAJZPCVXF7chFO=s160'
    },
    'worldguessr': {
      name: 'WorldGuessr',
      image: 'https://classroom-6x.org/files/images/worldguessr.png'
    },
    'plants-vs-zombies': {
      name: 'Plants vs Zombies',
      image: 'https://pvz.onl/images/pvzgame.png'
    },
    'bejeweled-classic': {
      name: 'Bejeweled Classic',
      image: 'https://gamesaturn.net/games/bejeweled-classic/thumb_2.jpg'
    },
    'merge-rot': {
      name: 'Merge Rot',
      image: 'https://classroom-6x.org/files/images/brainrot.png'
    },
'galaxy-attack': {
name: 'Galaxy Attack',
image: 'https://classroom-6x.org/games/galaxy-attack/galaxyatack.jpeg'
},
'survival-game': {
name: 'Survival Game',
image: 'https://poki.ee/games/survival-game/survivalgame.png'
},
'tower-building': {
name: 'Tower Building',
image: 'https://poki.ee/games/tower-building/tower-building.webp'
},
'baseball-pro': {
name: 'Baseball Pro',
image: 'https://poki.ee/games/baseball-pro/basbeballpro_thumb.png'
},
'block-blast-puzzle': {
name: 'Block Blast Puzzle',
image: 'https://poki.ee/games/block-blast-puzzle/block-blast-puzzle.png'
},
'dungeon-platformer': {
name: 'Dungeon Platformer',
image: 'https://poki.ee/games/Dungeon-Platformer/Dungeon-Platformer.png'
},
'youtube-clicker': {
name: 'YouTube Clicker',
image: 'https://poopclicker.github.io/tube-clicker/logo.png'
},
'battleship': {
name: 'Battleship',
image: 'https://poki.ee/games/battleship/battleship_thumbnail.png'
},
'formula-rush': {
name: 'Formula Rush',
image: 'https://poki.ee/games/formula-rush/formula.jpg'
},
'merge-fruit': {
name: 'Merge Fruit',
image: 'https://poki.ee/games/merge-fruit/mergefruit.png'
},
'scary-wheels': {
name: 'Scary Wheels',
image: 'https://www4.minijuegosgratis.com/v3/games/thumbnails/252550_7_sq.jpg'
},
'cake-clicker': {
name: 'Cake Clicker',
image: 'https://games-online.io/upload/cache/upload/imgs/perfectcookie-m300x165.png'
},
'geometry-dash-world-unblocked': {
name: 'Geometry Dash World Unblocked',
image: 'https://games-online.io/upload/cache/upload/imgs/geometryjumpworld-m300x165.png'
},
'chill-guy-clicker': {
name: 'Chill Guy Clicker',
image: 'https://1games.io/data/image/game/chill-guy-clicker/chill-guy-clicker.png'
},
'among-us': {
name: 'Among us',
image: 'https://webglmath.github.io/among-us/logo.png'
},
'handless-millionaire': {
name: 'Handless Millionaire',
image: 'https://games-online.io/upload/cache/upload/imgs/icon-2563-m300x165.png'
},
'duck-shooter': {
name: 'Duck Shooter',
image: 'https://games-online.io/upload/cache/upload/imgs/icon-25632-m300x165.png'
},
'bottle-flip-3d': {
name: 'Bottle Flip 3D',
image: 'https://ubg44.github.io/assets/img/games/bottle-flip-3d.png'
},
'runner': {
name: 'Runner',
image: 'https://play-lh.googleusercontent.com/zG13gMv0FOLDFZIL1IA1AtUUFmFqyIEa-vrMk6FHM8IgYMn_0ATLQ9WG4Lda6Ydm4R0=w526-h296-rw'
},
'cookie-clicker-2': {
name: 'Cookie Clicker 2',
image: 'https://play-lh.googleusercontent.com/qiTKdSxk5XUk6MGJj1r-dMwXwd5Mx-rR3xQNB339OdxwXzFeqMXceMjpkK3316fMAw=s160'
},
'cookie-clicker': {
name: 'Cookie Clicker',
image: 'https://webglmath.github.io/cookie-clicker/logo.png'
},
'subway-surfers': {
name: 'Subway Surfers',
image: 'https://ubg77.github.io/updatefaqs/subway-surfers-nyc/logo.png'
},
'google-snake': {
name: 'Google Snake',
image: 'https://googlesnake.org/files/images/icon-512.png'
},
'mr.mine-idle': {
name: 'Mr.Mine Idle',
image: 'https://cdn.playsaurus.com/embed/7870616a94add6a85117dff74f0a42ba-512x512.jpeg'
},
'poker-quest': {
name: 'Poker Quest',
image: 'https://cdn.playsaurus.com/embed/1f50dfc26741aa81630f16b78b68c54a-512x512.jpeg'
},
'fray-fight': {
name: 'Fray Fight',
image: 'https://cdn.playsaurus.com/embed/3dfd7ce434f0b2ffdbc29c9b7f3e4cd2-512x512.jpeg'
},
'duck-duck-clicker': {
name: 'Duck Duck Clicker',
image: 'https://duckduckclicker.org/games/duck-duck-clicker/thumb_2.png'
},
'spacebar-clicker': {
name: 'Spacebar Clicker',
image: 'https://classroom-6x.org/games/spacebar-clicker/thumb_2.png'
},
'race-clicker-idle': {
name: 'Race Clicker Idle',
image: 'https://cdn.playsaurus.com/embed/08a91f5aba7aa8b61007f1d731502cc8-512x384.jpeg'
},
'clicker-heroes': {
name: 'Clicker Heroes',
image: 'https://cdn.playsaurus.com/embed/032c979bf9188f910239447f43617697-512x384.jpeg'
},
'block-blast': {
name: 'Block Blast',
image: 'https://classroom-6x.org/files/images/blockblast.png'
},
'monkey-mart-unblocked': {
name: 'Monkey Mart Unblocked',
image: 'https://classroom-6x.org/games/monkey-mart-unblocked/thumb_2.png'
},
'geometry-dash-lite': {
name: 'Geometry Dash Lite',
image: 'https://geometrydash.it.com/files/images/geometrydash-lite.png'
},
'pinball-space-adventure': {
name: 'Pinball Space Adventure',
image: 'https://unblockedgames6x.org/games/pinball-space-adventure/thumb_2.png'
},
'bowling': {
name: 'Bowling',
image: 'https://unblockedgames6x.org/games/bowling/thumb_2.png'
},
'christmas-gift-merge': {
name: 'Christmas Gift Merge',
image: 'https://fruitmerge.me/games/christmas-gift-merge/thumb_2.png'
},
'onet-fruit-classic': {
name: 'Onet Fruit Classic',
image: 'https://fruitmerge.me/games/onet-fruit-classic/thumb_2.png'
},
'gravity-fruit-merge': {
name: 'Gravity Fruit Merge',
image: 'https://fruitmerge.me/games/gravity-fruit-merge/thumb_2.png'
},
'pixel-fruit-merge': {
name: 'Pixel Fruit Merge',
image: 'https://fruitmerge.me/games/pixel-fruit-merge/thumb_2.png'
},
'fruit-watermelon-merge': {
name: 'Fruit Watermelon Merge',
image: 'https://fruitmerge.me/games/fruit-watermelon-merge/thumb_2.png'
},
'fruit-merge': {
name: 'Fruit Merge',
image: 'https://fruitmerge.me/games/fruit-merge/thumb_2.png'
},
'puzzle-bobble': {
name: 'Puzzle Bobble',
image: 'https://unblockedgames.ee/files/images/icon-copy.png'
},
'helix-jump': {
name: 'Helix Jump',
image: 'https://unblockedgames.ee/files/images/icon.jpeg'
},
'q%2Abert': {
name: 'Q*bert',
image: 'https://unblockedgames.ee/files/images/icon.png'
},
'ragdoll-hit': {
name: 'Ragdoll Hit',
image: 'https://classroom-6x.org/wp-content/uploads/thumbs/custom/I/icon-128-12.png'
},
'zombie-tsunami': {
name: 'Zombie Tsunami',
image: 'https://classroom-6x.org/wp-content/uploads/thumbs/custom/I/icon-2.jpeg'
},
'bubble-shooter': {
name: 'Bubble Shooter',
image: 'https://classroom-6x.org/wp-content/uploads/thumbs/custom/I/icon-128-6.png'
},
'dad-n-me': {
name: 'Dad n Me',
image: 'https://unblockedgames.ee/files/images/dad-n-me.png'
},
'gold-miner': {
name: 'Gold Miner',
image: 'https://unblockedgames.ee/files/images/gold-miner.png'
},
'slope': {
name: 'Slope',
image: 'https://unblockedgames.ee/files/images/icon-512.png'
},
'uno': {
name: 'Uno',
image: 'https://unblockedgames.ee/games/uno/icon.webp'
},
'fnf-another-friday-night': {
name: 'FNF Another Friday Night',
image: 'https://fridaynightfunkin.org/files/images/fnf-another-friday-night-1.png'
},
'my-perfect-hotel': {
name: 'My Perfect Hotel',
image: 'https://nowifigames.org/files/images/my-perfect-hotel.png'
},
'escape-from-school': {
name: 'Escape From School',
image: 'https://nowifigames.org/files/images/escape-from-school.jpg'
},
'hill-climb-racing': {
name: 'Hill Climb Racing',
image: 'https://nowifigames.org/files/images/icon-128.png'
},
'monopoly': {
name: 'Monopoly',
image: 'https://unblockedgames.ee/files/images/monopoly.png'
},
'trains.io': {
name: 'Trains.io',
image: 'https://unblockedgames.ee/files/images/trains.io.png'
},
'cats-drop': {
name: 'Cats Drop',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/01/cats-drop.jpeg'
},
'bitcoin-clicker': {
name: 'Bitcoin Clicker',
image: 'https://unblockedgames.ee/wp-content/uploads/thumbs/custom/I/icon-512-150x150.png'
},
'sonic-origins-pocket-edition': {
name: 'Sonic Origins Pocket Edition',
image: 'https://unblockedgames.ee/files/images/sonic.jpg'
},
'happy-wheels': {
name: 'Happy Wheels',
image: 'https://classroom-6x.org/wp-content/uploads/thumbs/custom/H/happy-wheels-classroom-6x-150x150.png'
},
'geometry-dash-world': {
name: 'Geometry Dash World',
image: 'https://geometrydash.ee/wp-content/uploads/2023/11/icon.png'
},
'geometry-dash': {
name: 'Geometry Dash',
image: 'https://geometrydash.it.com/files/images/geometry.png'
},
'paper.io-2': {
name: 'Paper.io 2',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-25-150x150.png'
},
'justfall.lol': {
name: 'JustFall.LOL',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-4-150x150.png'
},
'who-is-lying': {
name: 'Who is Lying',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-23-150x150.png'
},
'red-ball-4': {
name: 'Red Ball 4',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-22-150x150.png'
},
'gobble': {
name: 'Gobble',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-27-150x150.png'
},
'golf-champions': {
name: 'Golf Champions',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-1-150x150.jpeg'
},
'bubbles-cool': {
name: 'Bubbles Cool',
image: 'https://classroom-6x.org/wp-content/uploads/thumbs/custom/I/icon-128-4.png'
},
'word-city-crossed': {
name: 'Word City Crossed',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-128-5.png'
},
'tag': {
name: 'Tag',
image: 'https://unblockedgames.ee/wp-content/uploads/2024/05/icon-128-7.png'
},
'super-mario-bros': {
name: 'Super Mario Bros',
image: 'https://frivcm.b-cdn.net/wp-content/thumbs/super-mario-bros.jpg'
},
'ping-pong-go': {
name: 'Ping Pong Go',
image: 'https://nowifigames.org/files/images/ping-pong-go.jpg'
},
'level-devil-2': {
name: 'Level devil 2',
image: 'https://nowifigames.org/files/images/level-devil.jpg'
},
'bleach-vs-naruto': {
name: 'Bleach vs Naruto',
image: 'https://nowifigames.org/files/images/bleach%20vs%20naruto%203.0%20copy.jpg'
},
'one-piece-vs-naruto-3': {
name: 'One piece vs Naruto 3',
image: 'https://unblockedgames.ee/wp-content/uploads/thumbs/custom/I/icon-2-150x150.jpg'
},
'hills-of-steel': {
name: 'Hills Of Steel',
image: 'https://nowifigames.org/files/images/hills-of-steel.png'
},
'1v1.lol': {
name: '1v1.lol',
image: 'https://1v1lol.org/wp-content/uploads/2024/03/1v1lol-1.jpg'
},
'slope-2': {
name: 'Slope 2',
image: 'https://monkeymart.org/wp-content/uploads/2023/09/rolling-ball-3d-min.png'
},
'ragdoll-archers': {
name: 'Ragdoll Archers',
image: 'https://bitlifeonline.github.io/ragdoll-archers/logo.png'
},
'vex-3-xmas': {
name: 'Vex 3 Xmas',
image: 'https://bitlifeonline.github.io/vex-3-xmas/logo.png'
},
'stickman-crazy-box': {
name: 'Stickman Crazy Box',
image: 'https://bitlifeonline.github.io/stickman-crazy-box/logo.png'
},
'ovo-dimension': {
name: 'OvO Dimension',
image: 'https://bitlifeonline.github.io/ovo-dimensions/logo.png'
},
'stickman-dragon-fight': {
name: 'Stickman Dragon Fight',
image: 'https://poki.ee/games/stickman-dragon-fight-3v3.png'
},
'vex-8': {
name: 'Vex 8',
image: 'https://classroomjq.github.io/vex-8/logo.png'
},
'we-become-what-we-behold': {
name: 'We Become What We Behold',
image: 'https://ubg77.github.io/we-become-what-we-behold/logo.png'
},
'vex-7': {
name: 'Vex 7',
image: 'https://slope-game.github.io/newgame/vex7/logo.png'
},
'vex-6': {
name: 'Vex 6',
image: 'https://slope-game.github.io/newgame/vex6/logo.png'
},
'vex-5': {
name: 'Vex 5',
image: 'https://slope-game.github.io/newgame/vex5/logo.png'
},
'vex-4': {
name: 'Vex 4',
image: 'https://slope-game.github.io/newgame/vex4/logo.png'
},
'vex-3': {
name: 'Vex 3',
image: 'https://slope-game.github.io/newgame/vex3/logo.png'
},
'vex-challenges': {
name: 'Vex Challenges',
image: 'https://rebemanae.github.io/vex-challenges/logo.png'
},
'the-speed-ninja': {
name: 'The Speed Ninja',
image: 'https://slope-game.github.io/rungame/the-speed-ninja/logo.png'
},
'the-spear-stickman': {
name: 'The Spear Stickman',
image: 'https://webglmath.github.io/the-spear-stickman/logo.png'
},
'the-sniper-code': {
name: 'The Sniper Code',
image: 'https://classroomjq.github.io/the-sniper-code/logo.png'
},
'stick-merge': {
name: 'Stick Merge',
image: 'https://webglmath.github.io/stickmerge/logo.png'
},
'stickman-hook': {
name: 'Stickman Hook',
image: 'https://webglmath.github.io/stickmanhook/logo.png'
},
'stickman-war': {
name: 'Stickman War',
image: 'https://slope-game.github.io/stickman-war/logo.png'
},
'stickman-vs-huggy-wuggy': {
name: 'Stickman vs Huggy Wuggy',
image: 'https://classroomjq.github.io/stickman-vs-huggy-wuggy/logo.png'
},
'stickman-that-one-level': {
name: 'Stickman That One Level',
image: 'https://rebemanae.github.io/stickman-that-one-level/logo.png'
},
'stickman-planks-fall': {
name: 'Stickman Planks Fall',
image: 'https://classroomjq.github.io/stickman-planks-fall/logo.png'
},
'stickman-parkour': {
name: 'Stickman Parkour',
image: 'https://rebemanae.github.io/stickman-parkour/logo.png'
},
'stickman-parkour-skyland': {
name: 'Stickman Parkour Skyland',
image: 'https://slope-game.github.io/stickman-parkour-skyland/logo.png'
},
'stickman-parkour-2-lucky-block': {
name: 'Stickman Parkour 2 Lucky Block',
image: 'https://slope-game.github.io/stickman-parkour-2-lucky-block/logo.png'
},
'stickman-go': {
name: 'Stickman Go',
image: 'https://slope-game.github.io/stickman-go/logo.png'
},
'stickman-fighter-mega-brawl': {
name: 'Stickman Fighter Mega Brawl',
image: 'https://webglmath.github.io/stickman-fighter-mega-brawl/logo.png'
},
'stickman-fighter': {
name: 'Stickman Fighter',
image: 'https://webglmath.github.io/stickman-fighter-epic-battle/logo.png'
},
'stickman-fighter-2': {
name: 'Stickman Fighter 2',
image: 'https://webglmath.github.io/stickman-fighter-epic-battle-2/logo.png'
},
'stickman-escape': {
name: 'Stickman Escape',
image: 'https://bitlifeonline.github.io/stickman-escape/logo.png'
},
'stickman-climb': {
name: 'Stickman Climb',
image: 'https://classroomjq.github.io/stickman-climb/logo.png'
},
'stickman-climb-2': {
name: 'Stickman Climb 2',
image: 'https://ubg77.github.io/stickman-climb-2/logo.png'
},
'stickman-bike-pr': {
name: 'Stickman Bike Pr',
image: 'https://ubg77.github.io/stickman-bike-pr/logo.png'
},
'stickman-army-the-defenders': {
name: 'Stickman Army The Defenders',
image: 'https://classroomjq.github.io/stickman-army-the-defenders/logo.png'
},
'stickman-archer-3': {
name: 'Stickman Archer 3',
image: 'https://slope-game.github.io/stickman-archer-3-2018/logo.png'
},
'stick-archer-2': {
name: 'Stick Archer 2',
image: 'https://slope-game.github.io/stickman-archer-2/logo.png'
},
'stick-war-ninja-duel': {
name: 'Stick War Ninja Duel',
image: 'https://slope-game.github.io/stick-war-ninja-duel/logo.png'
},
'stick-merge-halloween': {
name: 'Stick Merge Halloween',
image: 'https://ubg77.github.io/stick-merge-halloween/logo.png'
},
'stick-fighter': {
name: 'Stick Fighter',
image: 'https://classroomjq.github.io/stick-fighter/logo.png'
},
'stick-defenders': {
name: 'Stick Defenders',
image: 'https://classroomjq.github.io/stick-defenders/logo.png'
},
'stealing-the-diamond': {
name: 'Stealing The Diamond',
image: 'https://bitlifeonline.github.io/stealing-the-diamond/logo.png'
},
'red-stickman-vs-monster-school': {
name: 'Red Stickman vs Monster School',
image: 'https://rebemanae.github.io/red-stickman-vs-monster-school/logo.png'
},
'parkour-race': {
name: 'Parkour Race',
image: 'https://slope-game.github.io/rungame/parkour-race/logo.png'
},
'parkour-block-xmas-special': {
name: 'Parkour Block Xmas Special',
image: 'https://rebemanae.github.io/parkour-block-xmas-special/logo.png'
},
'parkour-block-5': {
name: 'Parkour Block 5',
image: 'https://rebemanae.github.io/parkour-block-5/logo.png'
},
'parkour-block-4': {
name: 'Parkour Block 4',
image: 'https://rebemanae.github.io/parkour-block-4/logo.png'
},
'parkour-block-3d': {
name: 'Parkour Block 3D',
image: 'https://rebemanae.github.io/parkour-block-3d/logo.png'
},
'parkour-block-3': {
name: 'Parkour Block 3',
image: 'https://rebemanae.github.io/parkour-block-3/logo.png'
},
'parkour-block-2': {
name: 'Parkour Block 2',
image: 'https://rebemanae.github.io/parkour-block-2/logo.png'
},
'noob-vs-pro-vs-stickman-jailbreak': {
name: 'Noob vs Pro vs Stickman Jailbreak',
image: 'https://rebemanae.github.io/noob-vs-pro-vs-stickman-jailbreak/logo.png'
},
'noob-vs-pro-stick-war': {
name: 'Noob vs Pro Stick War',
image: 'https://classroomjq.github.io/noob-vs-pro-stick-war/logo.png'
},
'noob-torch-flip-2d': {
name: 'Noob Torch Flip 2D',
image: 'https://rebemanae.github.io/noob-torch-flip-2d/logo.png'
},
'noob-nightmare-arcade': {
name: 'Noob Nightmare Arcade',
image: 'https://rebemanae.github.io/noob-nightmare-arcade/logo.png'
},
'monster-school-vs-siren-head': {
name: 'Monster School vs Siren Head',
image: 'https://classroomjq.github.io/monster-school-vs-siren-head/logo.png'
},
'monster-school-challenges': {
name: 'Monster School Challenges',
image: 'https://rebemanae.github.io/monster-school-challenges/logo.png'
},
'monster-school-3': {
name: 'Monster School 3',
image: 'https://rebemanae.github.io/monster-school-challenge-3/logo.png'
},
'monster-school-2': {
name: 'Monster School 2',
image: 'https://rebemanae.github.io/monster-school-challenge-2/logo.png'
},
'johnny-revenge': {
name: 'Johnny Revenge',
image: 'https://slope-game.github.io/johnny-revenge/logo.png'
},
'infiltrating-the-airship': {
name: 'Infiltrating The Airship',
image: 'https://rebemanae.github.io/infiltrating-the-airship/logo.png'
},
'impostor-vs-noob': {
name: 'Impostor vs Noob',
image: 'https://rebemanae.github.io/impostor-vs-noob/logo.png'
},
'herobrine-monster-school': {
name: 'Herobrine Monster School',
image: 'https://rebemanae.github.io/herobrine-vs-monster-school/logo.png'
},
'hamster-escape-jailbreak-ez': {
name: 'Hamster Escape Jailbreak EZ',
image: 'https://rebemanae.github.io/hamster-escape-jailbreak/logo.png'
},
'gun-fu-stickman-2': {
name: 'Gun Fu Stickman 2',
image: 'https://slope-game.github.io/gun-fu-stickman-2/logo.png'
},
'fleeing-the-complex': {
name: 'Fleeing The Complex',
image: 'https://ubg77.github.io/fleeing-the-complex/logo.png'
},
'fancy-pants-2': {
name: 'Fancy Pants 2',
image: 'https://ubg77.github.io/fancy-pants-2/logo.png'
},
'fall-red-stickman': {
name: 'Fall Red Stickman',
image: 'https://slope-game.github.io/fall-red-stickman/logo.png'
},
'escaping-the-prison': {
name: 'Escaping The Prison',
image: 'https://classroomjq.github.io/escaping-the-prison/logo.png'
},
'dark-runner': {
name: 'Dark Runner',
image: 'https://slope-game.github.io/rungame/dark-runner/logo.png'
},
'breaking-the-bank': {
name: 'Breaking The Bank',
image: 'https://rebemanae.github.io/breaking-the-bank/logo.png'
},
'avoid-dying': {
name: 'Avoid Dying',
image: 'https://slope-game.github.io/avoid-dying/logo.png'
},
'penalty-shootout-multi-league': {
name: 'Penalty Shootout Multi League',
image: 'https://bitlifeonline.github.io/penalty-shootout-multi-league/logo.png'
},
'basketball-slam-dunk': {
name: 'BasketBall Slam Dunk',
image: 'https://bitlifeonline.github.io/basketball-slam-dunk/logo.png'
},
'basket-slam-dunk-2': {
name: 'Basket Slam Dunk 2',
image: 'https://bitlifeonline.github.io/basket-slam-dunk-2/logo.png'
},
'volleyball-challenge': {
name: 'Volleyball Challenge',
image: 'https://bitlifeonline.github.io/volleyball-challenge/logo.png'
},
'supper-soccer-noggins': {
name: 'Supper Soccer Noggins',
image: 'https://bitlifeonline.github.io/super-soccer-noggins-xmas-edition/logo.png'
},
'penalty-shootout-euro-2016': {
name: 'Penalty Shootout EURO 2016',
image: 'https://bitlifeonline.github.io/penalty-shootout-euro-cup-2016/logo.png'
},
'basket-swooshes-plus': {
name: 'Basket Swooshes Plus',
image: 'https://bitlifeonline.github.io/basket-swooshes/logo.png'
},
'football-stars': {
name: 'Football Stars',
image: 'https://bitlifeonline.github.io/football-stars/logo.png'
},
'penalty-shooters-1': {
name: 'Penalty Shooters 1',
image: 'https://soccerlegends.github.io/penalty-shooters/logo.png'
},
'soccer-legends-2021': {
name: 'Soccer Legends 2021',
image: 'https://soccerlegends.github.io/soccer-legends/logo.png'
},
'gravity-soccer': {
name: 'Gravity Soccer',
image: 'https://soccerlegends.github.io/gravity-soccer/logo.png'
},
'crossbar-challenge': {
name: 'CROSSBAR CHALLENGE',
image: 'https://soccerlegends.github.io/crossbar-challenge/logo.png'
},
'penalty-europe-champions': {
name: 'PENALTY EUROPE CHAMPIONS',
image: 'https://soccerlegends.github.io/penalty-challenge-multiplayer/logo.png'
},
'american-football-challenge': {
name: 'AMERICAN FOOTBALL CHALLENGE',
image: 'https://soccerlegends.github.io/american-football-challenge/logo.png'
},
'penalty-challenge': {
name: 'PENALTY CHALLENGE',
image: 'https://soccerlegends.github.io/penalty-challenge/logo.png'
},
'hockey-shootout': {
name: 'HOCKEY SHOOTOUT',
image: 'https://soccerlegends.github.io/hockey-shootout/logo.png'
},
'cricket-fielder-challenge-game': {
name: 'CRICKET FIELDER CHALLENGE GAME',
image: 'https://soccerlegends.github.io/cricket-fielder-challenge-game/logo.png'
},
'goalkeeper-challenge': {
name: 'GOALKEEPER CHALLENGE',
image: 'https://soccerlegends.github.io/goalkeeperchallenge/logo.png'
},
'american-football-kicks': {
name: 'AMERICAN FOOTBALL KICKS',
image: 'https://soccerlegends.github.io/american-football-kick/logo.png'
},
'street-basketball': {
name: 'STREET BASKETBALL',
image: 'https://soccerlegends.github.io/street-basketball-1/logo.png'
},
'football-penalty-champions': {
name: 'FOOTBALL PENALTY CHAMPIONS',
image: 'https://soccerlegends.github.io/football-penalty-champions/logo.png'
},
'penalty-kick-wiz': {
name: 'Penalty Kick Wiz',
image: 'https://soccerlegends.github.io/penalty-kick-wiz/logo.png'
},
'soccer-free-kick': {
name: 'Soccer Free Kick',
image: 'https://soccerlegends.github.io/soccer-free-kick/logo.png'
},
'football-run': {
name: 'Football Run',
image: 'https://soccerlegends.github.io/football-run/logo.png'
},
'football-killer': {
name: 'Football Killer',
image: 'https://soccerlegends.github.io/football-killer/logo.png'
},
'head-soccer-2-player': {
name: 'Head Soccer 2 Player',
image: 'https://soccerlegends.github.io/head-soccer-2-player/logo.png'
},
'football-masters': {
name: 'Football Masters',
image: 'https://soccerlegends.github.io/football-masters/logo.png'
},
'pill-soccer': {
name: 'Pill Soccer',
image: 'https://soccerlegends.github.io/pill-soccer/logo.png'
},
'fiveheads-soccer': {
name: 'Fiveheads Soccer',
image: 'https://soccerlegends.github.io/fiveheads-soccer/logo.png'
},
'super-liquid-soccer': {
name: 'Super Liquid Soccer',
image: 'https://soccerlegends.github.io/super-liquid-soccer/logo.png'
},
'bumper-cars-soccer': {
name: 'Bumper Cars Soccer',
image: 'https://soccerlegends.github.io/bumper-cars-soccer/logo.png'
},
'sling-world-cup': {
name: 'Sling World Cup',
image: 'https://soccerlegends.github.io/sling-world-cup/logo.png'
},
'heads-arena%3A-euro-soccer': {
name: 'Heads Arena: Euro Soccer',
image: 'https://bitlifeonline.github.io/heads-arena-euro-soccer/logo.png'
},
'basketball-serial-shooter': {
name: 'Basketball Serial Shooter',
image: 'https://bitlifeonline.github.io/basketball-serial-shooter/logo.png'
},
'boxing-random': {
name: 'Boxing Random',
image: 'https://bitlifeonline.github.io/boxing-random/logo.png'
}
  }

  // 从URL参数获取游戏信息，使用useState避免水合错误
  const [gameInfo, setGameInfo] = useState(gameData['plonky']) // 默认显示plonky

  useEffect(() => {
    const gameParam = searchParams.get('game')
    if (gameParam && gameData[gameParam]) {
      setGameInfo(gameData[gameParam])
    }
  }, [searchParams])

  return children(gameInfo)
}

// 主组件
export default function ComingSoonPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim()

    if (!isValidEmail(trimmedEmail)) {
      setShowError(true)
      return
    }

    setShowError(false)
    setIsSubmitting(true)

    // 模拟API调用
    setTimeout(() => {
      setIsSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setShowError(false)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper>
        {(gameInfo) => (
          <html lang="en">
            <head>
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Coming Soon - Game Preview</title>
              <style>{`
                :root {
                  --theme-color: rgb(37, 150, 237);
                  --card-shadow: #33333322;
                }

                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  transition: .3s;
                }

                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
                  background-attachment: fixed;
                  min-height: 100vh;
                }

                body::before {
                  content: '';
                  position: fixed;
                  left: 0;
                  top: 0;
                  height: 100%;
                  width: 100%;
                  --bg-color: rgba(51, 255, 197, 0.404);
                  background: linear-gradient(var(--bg-color), var(--bg-color));
                  z-index: -1;
                }

                .mvn-container {
                  max-width: 1890px;
                  margin: 10px auto;
                  padding: 0 20px;
                }

                .coming-soon-container {
                  background: rgba(255, 255, 255, 0.95);
                  backdrop-filter: blur(20px);
                  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                  border-radius: 20px;
                  overflow: hidden;
                  border: 1px solid rgba(255, 255, 255, 0.3);
                  max-width: 600px;
                  margin: 40px auto;
                  padding: 40px;
                  text-align: center;
                  animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                .game-thumbnail {
                  width: 200px;
                  height: 200px;
                  margin: 0 auto 24px;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
                }

                .game-thumbnail img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }

                h1 {
                  font-size: 32px;
                  color: #002b50;
                  margin-bottom: 16px;
                  font-weight: 700;
                }

                .status-message {
                  font-size: 20px;
                  color: #555;
                  margin-bottom: 12px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 8px;
                }

                .status-icon {
                  font-size: 24px;
                }

                .description {
                  font-size: 16px;
                  color: #666;
                  margin-bottom: 32px;
                  line-height: 1.6;
                }

                .email-form {
                  margin: 32px 0;
                }

                .form-label {
                  display: block;
                  font-size: 14px;
                  font-weight: 600;
                  color: #002b50;
                  margin-bottom: 12px;
                  text-align: left;
                }

                .email-input {
                  width: 100%;
                  padding: 14px 16px;
                  border: 2px solid #dcdcdc;
                  border-radius: 12px;
                  font-size: 16px;
                  outline: none;
                  background: #f0f5fc;
                  transition: all 0.3s ease;
                }

                .email-input:focus {
                  border-color: var(--theme-color);
                  background: white;
                }

                .email-input.error {
                  border-color: #dc3545;
                }

                .error-message {
                  color: #dc3545;
                  font-size: 14px;
                  margin-top: 8px;
                  text-align: left;
                  display: none;
                }

                .error-message.show {
                  display: block;
                }

                .button {
                  width: 100%;
                  padding: 14px 24px;
                  background: var(--theme-color);
                  color: white;
                  text-decoration: none;
                  border-radius: 12px;
                  font-weight: 600;
                  font-size: 16px;
                  text-transform: uppercase;
                  transition: all 0.3s ease;
                  cursor: pointer;
                  border: none;
                  margin-top: 16px;
                  display: inline-block;
                }

                .button:hover {
                  transform: scale(1.05);
                  box-shadow: 0 8px 24px rgba(21, 131, 249, 0.3);
                }

                .button:disabled {
                  opacity: 0.6;
                  cursor: not-allowed;
                  transform: none;
                }

                .button-secondary {
                  background: transparent;
                  color: var(--theme-color);
                  border: 2px solid var(--theme-color);
                  margin-top: 12px;
                }

                .button-secondary:hover {
                  background: rgba(21, 131, 249, 0.1);
                }

                .success-message {
                  background: #10b981;
                  color: white;
                  padding: 16px;
                  border-radius: 12px;
                  margin-top: 16px;
                  display: none;
                  animation: slideIn 0.3s ease-out;
                }

                .success-message.show {
                  display: block;
                }

                @keyframes slideIn {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                .loading-spinner {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  border: 2px solid rgba(255, 255, 255, 0.3);
                  border-top-color: white;
                  border-radius: 50%;
                  animation: spin 0.6s linear infinite;
                  margin-left: 8px;
                  vertical-align: middle;
                }

                @keyframes spin {
                  to { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                  .coming-soon-container {
                    padding: 30px 20px;
                    margin: 20px auto;
                  }

                  h1 {
                    font-size: 24px;
                  }

                  .game-thumbnail {
                    width: 150px;
                    height: 150px;
                  }

                  .status-message {
                    font-size: 18px;
                  }
                }
              `}</style>
            </head>
            <body>
              <div className="mvn-container">
                {/* Coming Soon Page */}
                <div className="coming-soon-container">
                  {/* Game Thumbnail */}
                  <div className="game-thumbnail">
                    <img src={gameInfo.image} alt={`${gameInfo.name} Game`} />
                  </div>

                  {/* Game Name */}
                  <h1>{gameInfo.name}</h1>

                  {/* Status Message */}
                  <div className="status-message">
                    <span className="status-icon">🚧</span>
                    <span>This game is under development</span>
                  </div>

                  {/* Description */}
                  <p className="description">
                    We&apos;re working hard to bring you this amazing game. Leave your email below and we&apos;ll notify you as soon as it&apos;s ready to play!
                  </p>

                  {/* Email Subscription Form */}
                  <form className="email-form" onSubmit={handleSubmit} style={{ display: isSuccess ? 'none' : 'block' }}>
                    <label className="form-label" htmlFor="email">Get notified when it&apos;s ready:</label>
                    <input
                      type="email"
                      id="email"
                      className={`email-input ${showError ? 'error' : ''}`}
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleInputChange}
                      required
                      aria-invalid={showError}
                      aria-describedby={showError ? 'errorMessage' : undefined}
                    />
                    <div className={`error-message ${showError ? 'show' : ''}`} id="errorMessage" role="alert" aria-live="polite">
                      Please enter a valid email address
                    </div>

                    <button type="submit" className="button" disabled={isSubmitting}>
                      <span>
                        {isSubmitting ? 'Subscribing' : 'Notify Me'}
                        {isSubmitting && <span className="loading-spinner"></span>}
                      </span>
                    </button>
                  </form>

                  {/* Success Message */}
                  <div className={`success-message ${isSuccess ? 'show' : ''}`} role="alert" aria-live="polite">
                    ✓ Thank you! We&apos;ll notify you when the game is ready.
                  </div>

                  {/* Back to Home Button */}
                  <a href="/" className="button button-secondary">
                    Back to Home
                  </a>
                </div>
              </div>
            </body>
          </html>
        )}
      </SearchParamsWrapper>
    </Suspense>
  )
}

import Property from "../models/Property.js";

let id = 1;
let nextUserId = 1;

const createData = () => {
  let propertiesArr = [
    new Property(
      id++,
      "Greg Long Conquers Giant Wave",
      300,
      `In this awe-inspiring photo, big wave surfer Greg Long is seen riding a massive wave in what appears to be a moment of pure triumph. The scale of the wave is breathtaking, with the sheer force of the water visible in the towering wall of spray and the roiling mass of white water behind Long. Despite the immense challenge of the wave, Long looks completely at ease and in control, perfectly balanced on his board and showing off his exceptional skill and athleticism. This photo captures the raw power and beauty of surfing at its most extreme, and is sure to inspire anyone who loves the thrill of the ocean.`,
      "https://www.surfer.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_1400/MTk2Mjc3MTUzMzA1NDcwMjU2/greg-long.webp",
      "Jackson Smith"
    ),
    new Property(
      id++,
      'Grant "Twiggy" Baker Takes on a Heavy Wave',
      400,
      `In this gripping photo, professional surfer Grant "Twiggy" Baker is seen charging down the face of a massive wave with incredible speed and precision. The wave is so large that the bottom appears to be falling away, creating a sense of vertigo-inducing depth and power. Despite the danger and difficulty of the wave, Baker looks completely focused and in control, his concentration evident in the set of his shoulders and the determination in his gaze. This photo captures the intensity and excitement of big wave surfing, and showcases the skill and bravery of one of the sport's top competitors.

`,
      "https://www.surfer.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_1400/MTk2Mjc3MTUzNTczMTg0ODE2/grant-twiggy--bake.webp",
      "Jackson Smith"
    ),
    new Property(
      id++,
      "Laura Enever Tackles a Challenging Wave",
      400,
      `Laura Enever has had a busy year chasing down the world's most terrifying waves for her soon-to-be-released movie "Undone". Here she's seen in the belly of a beast somewhere along the coast of New South Wales

`,
      "https://www.surfer.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_1400/MTk2Mjc3MTUzMzA0NjgzODI0/laura-enever-new-south-wales.webp",
      "Matt Dunbar"
    ),
    new Property(
      id++,
      "Ryan Burch Puts on a Stylish Display of Surfing",
      400,
      `This captivating photo captures professional surfer Ryan Burch showing off his unique and fluid style while riding a wave with effortless grace. Burch is known for his unconventional approach to surfing, favoring retro-inspired boards and creative maneuvers that challenge traditional surfing norms. In this photo, he can be seen executing a smooth bottom turn while carving through the wave with a relaxed and confident stance. The bright blue color of the wave and Burch's colorful wetsuit add a playful and cheerful vibe to the photo, perfectly reflecting Burch's innovative and creative approach to the sport.
`,
      "https://www.surfer.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_1400/MTk2Mjc3MTUzODM3NTU3MDQw/ryan-burch.webp",
      "Nick Liotta"
    ),
    new Property(
      id++,
      "Billy Kemper Charges a Massive Wave at Jaws",
      400,
      `This incredible photo captures professional surfer Billy Kemper pushing the limits of big wave surfing as he takes on a towering wave at the infamous Jaws break in Maui, Hawaii. The wave is massive, with a wall of water that seems to dwarf Kemper as he charges down the face with impressive speed and control. The bright blue color of the wave contrasts sharply with the white spray and foam, creating a stunning visual effect that highlights the raw power and beauty of the ocean. Kemper's focused expression and poised stance demonstrate the skill and courage required to surf waves of this magnitude, making this photo a true testament to the awe-inspiring sport of big wave surfing.

`,
      "https://www.surfer.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_1400/MTk2Mjc3MTUzNTcyMzMyODQ4/billy-kemper.webp",
      "Domenic Mosqueira"
    ),
    new Property(
      id++,
      "Surfer Conquering a Massive Wave",
      350,
      `This incredible photo captures a lone surfer standing confidently behind an enormous wave, ready to take on the challenge. The scale of the wave is stunning, with its towering height and deep blue color creating a sense of awe and wonder. Despite the danger and difficulty of the wave, the surfer appears calm and focused, their eyes fixed on the horizon as they prepare to ride the wave with skill and precision. This photo showcases the courage and determination required to tackle the biggest waves, as well as the raw power and beauty of the ocean.`,
      "https://www.theleader.com.au/images/transform/v1/crop/frm/GJZ5TVpAk84wrTzsQfLQRB/d07c6b07-7d4f-48c4-a44e-fe4b27aa12df.jpg/r46_0_2434_1592_w2480_h1653_fmax.jpg",
      "Jackson Smith"
    ),
  ];
  return propertiesArr;
};

const setInitialData = () => {
  let properties = localStorage.getItem("props");
  if (properties) {
    return;
  }
  localStorage.setItem("props", JSON.stringify(createData()));
  localStorage.setItem("nextid", id + "");
  localStorage.setItem("nextUserId", nextUserId + "");
};

setInitialData();

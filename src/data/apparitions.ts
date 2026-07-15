export type ApparitionStatus =
  | "approved"
  | "worthy"
  | "investigation"
  | "not_approved";

export interface Apparition {
  slug: string;
  title: string;
  invocation?: string;
  location: string;
  country: string;
  coords: [number, number]; // [lat, lng]
  year: number;
  dates: string;
  seers: string[];
  status: ApparitionStatus;
  statusNote: string;
  summary: string;
  account: string;
  messages: string[];
  pilgrimage?: string;
}

export const STATUS_LABEL: Record<ApparitionStatus, string> = {
  approved: "Approved",
  worthy: "Worthy of Belief",
  investigation: "Under Investigation",
  not_approved: "Not Approved",
};

export const APPARITIONS: Apparition[] = [
  {
    slug: "guadalupe",
    title: "Our Lady of Guadalupe",
    location: "Tepeyac, Mexico City",
    country: "Mexico",
    coords: [19.4847, -99.1173],
    year: 1531,
    dates: "December 9–12, 1531",
    seers: ["St. Juan Diego"],
    status: "approved",
    statusNote: "Approved by the Holy See; feast day December 12.",
    summary:
      "The Virgin appeared as a pregnant mestiza to Juan Diego, leaving her image miraculously imprinted on his tilma.",
    account:
      "On Tepeyac hill, the Virgin instructed Juan Diego to ask Bishop Zumárraga to build a church. As a sign, she filled his tilma with Castilian roses out of season. When he opened the cloak before the bishop, her image was found imprinted on it — a tilma that has survived nearly 500 years and remains scientifically inexplicable.",
    messages: [
      "\"Am I not here, I who am your Mother?\"",
      "A promise of maternal protection to the peoples of the Americas.",
    ],
    pilgrimage:
      "Basilica of Our Lady of Guadalupe, the most-visited Catholic shrine in the world.",
  },
  {
    slug: "laus",
    title: "Our Lady of Laus",
    location: "Saint-Étienne-le-Laus, France",
    country: "France",
    coords: [44.4642, 6.1875],
    year: 1664,
    dates: "1664–1718",
    seers: ["Benoîte Rencurel"],
    status: "approved",
    statusNote: "Approved by the Holy See in 2008 after 350 years of study.",
    summary:
      "Over 54 years, Mary appeared to shepherdess Benoîte Rencurel, calling sinners to reconciliation.",
    account:
      "The Blessed Mother appeared repeatedly in the Alps to the young shepherdess Benoîte, asking for a shrine where sinners could find conversion. Countless healings and reconciliations followed.",
    messages: [
      "\"I have asked my Son for this place for the conversion of sinners.\"",
    ],
    pilgrimage: "Sanctuary of Notre-Dame du Laus.",
  },
  {
    slug: "rue-du-bac",
    title: "Our Lady of the Miraculous Medal",
    location: "Rue du Bac, Paris",
    country: "France",
    coords: [48.8534, 2.3241],
    year: 1830,
    dates: "July 18 & November 27, 1830",
    seers: ["St. Catherine Labouré"],
    status: "approved",
    statusNote: "Approved by the Archbishop of Paris in 1836.",
    summary:
      "Mary revealed the design of the Miraculous Medal to Catherine Labouré, a Daughter of Charity novice.",
    account:
      "In the chapel of the Daughters of Charity, Mary appeared standing on a globe, rays of light streaming from her hands, framed by the words: 'O Mary conceived without sin, pray for us who have recourse to thee.' She asked that a medal be struck bearing this image.",
    messages: [
      "\"Have a medal struck upon this model. All who wear it will receive great graces.\"",
    ],
    pilgrimage: "Chapel of Our Lady of the Miraculous Medal, 140 Rue du Bac.",
  },
  {
    slug: "la-salette",
    title: "Our Lady of La Salette",
    location: "La Salette-Fallavaux, France",
    country: "France",
    coords: [44.855, 5.9856],
    year: 1846,
    dates: "September 19, 1846",
    seers: ["Mélanie Calvat", "Maximin Giraud"],
    status: "approved",
    statusNote: "Approved by the Bishop of Grenoble in 1851.",
    summary:
      "A weeping Lady spoke to two young shepherds about the need for prayer, penance, and Sunday observance.",
    account:
      "High in the Alps, the children saw a luminous Lady seated on a rock, weeping. She warned of the consequences of blasphemy and the profanation of the Lord's Day, then vanished into light.",
    messages: [
      "\"If my people will not submit, I shall be forced to let go the arm of my Son.\"",
      "A call to prayer, penance, and reverence for the Sabbath.",
    ],
    pilgrimage: "Sanctuary of Our Lady of La Salette.",
  },
  {
    slug: "lourdes",
    title: "Our Lady of Lourdes",
    location: "Lourdes, France",
    country: "France",
    coords: [43.0951, -0.0453],
    year: 1858,
    dates: "February 11 – July 16, 1858 (18 apparitions)",
    seers: ["St. Bernadette Soubirous"],
    status: "approved",
    statusNote: "Approved by the Bishop of Tarbes in 1862.",
    summary:
      "The Virgin identified herself as the Immaculate Conception to Bernadette in the grotto of Massabielle.",
    account:
      "The Lady appeared eighteen times in a grotto, asking for penance and processions and directing Bernadette to a hidden spring — a spring that continues to flow and is associated with thousands of documented cures.",
    messages: [
      "\"I am the Immaculate Conception.\"",
      "\"Penance, penance, penance. Pray to God for sinners.\"",
    ],
    pilgrimage:
      "Sanctuary of Our Lady of Lourdes — over 6 million pilgrims annually.",
  },
  {
    slug: "filippsdorf",
    title: "Our Lady, Help of the Sick",
    location: "Filipov (Filippsdorf), Czech Republic",
    country: "Czech Republic",
    coords: [50.9836, 14.5586],
    year: 1866,
    dates: "January 13, 1866",
    seers: ["Magdalena Kade"],
    status: "approved",
    statusNote:
      "Approved by the Bishop of Leitmeritz; basilica raised to minor basilica by Pius XI.",
    summary:
      "A dying woman was instantaneously healed after the Virgin appeared with the words: 'My child, from now on you will be well.'",
    account:
      "Bedridden and near death, Magdalena Kade saw a radiant Lady at the foot of her bed who healed her in an instant. Investigation confirmed the cure as inexplicable.",
    messages: ["\"My child, from now on you will be well.\""],
    pilgrimage: "Basilica of Our Lady, Help of the Sick, Filipov.",
  },
  {
    slug: "pontmain",
    title: "Our Lady of Hope of Pontmain",
    location: "Pontmain, France",
    country: "France",
    coords: [48.4419, -1.1064],
    year: 1871,
    dates: "January 17, 1871",
    seers: ["Eugène & Joseph Barbedette", "Françoise Richer", "Jeanne-Marie Lebossé"],
    status: "approved",
    statusNote: "Approved by the Bishop of Laval in 1875.",
    summary:
      "During the Franco-Prussian War, Mary appeared above a farmhouse to encourage the village to pray — Prussian troops halted the next day.",
    account:
      "As enemy troops advanced on the village, the children saw a beautiful Lady in a starry blue robe. A banner unfurled beneath her: 'But pray, my children. God will hear you in a short time. My Son allows Himself to be moved.'",
    messages: [
      "\"But pray, my children. God will hear you in a short time. My Son allows Himself to be moved.\"",
    ],
    pilgrimage: "Basilica of Our Lady of Hope, Pontmain.",
  },
  {
    slug: "gietrzwald",
    title: "Our Lady of Gietrzwałd",
    location: "Gietrzwałd, Poland",
    country: "Poland",
    coords: [53.7028, 20.2986],
    year: 1877,
    dates: "June 27 – September 16, 1877",
    seers: ["Justyna Szafryńska", "Barbara Samulowska"],
    status: "approved",
    statusNote:
      "Approved by the Bishop of Warmia in 1977 — the only Church-approved apparition in Poland.",
    summary:
      "Mary spoke to two Polish girls in their native tongue during a time of Kulturkampf persecution, urging the Rosary.",
    account:
      "The Immaculate Conception appeared in a maple tree, spoke in Polish (then suppressed by the Prussian state), and asked for the daily Rosary. A spring blessed at her request continues to draw pilgrims.",
    messages: [
      "\"Pray the Rosary earnestly.\"",
    ],
    pilgrimage: "Sanctuary of Our Lady of Gietrzwałd.",
  },
  {
    slug: "knock",
    title: "Our Lady of Knock",
    location: "Knock, County Mayo",
    country: "Ireland",
    coords: [53.7906, -8.9192],
    year: 1879,
    dates: "August 21, 1879",
    seers: ["Fifteen villagers, ages 5 to 74"],
    status: "approved",
    statusNote:
      "Approved by the Archbishop of Tuam; John Paul II and Francis visited as papal pilgrims.",
    summary:
      "Mary appeared in silence with St. Joseph, St. John the Evangelist, and the Lamb of God on the gable of the parish church.",
    account:
      "For two hours in the pouring rain, fifteen witnesses gazed on a luminous tableau on the outside wall of the church — the Virgin crowned in prayer, flanked by Joseph and John, with an altar and Lamb behind them. Not a word was spoken.",
    messages: ["A silent apparition — a wordless icon of the Mass."],
    pilgrimage: "Knock Shrine — Ireland's national Marian shrine.",
  },
  {
    slug: "fatima",
    title: "Our Lady of Fátima",
    location: "Cova da Iria, Fátima",
    country: "Portugal",
    coords: [39.6314, -8.6733],
    year: 1917,
    dates: "May 13 – October 13, 1917",
    seers: ["Sts. Francisco & Jacinta Marto", "Sr. Lúcia dos Santos"],
    status: "approved",
    statusNote:
      "Approved by the Bishop of Leiria in 1930; culminated in the public Miracle of the Sun.",
    summary:
      "Over six months, Mary appeared to three shepherd children, asking for the Rosary and consecration of Russia — witnessed by 70,000 at the Miracle of the Sun.",
    account:
      "On the 13th of each month from May to October, the Virgin appeared to three shepherd children in the Cova da Iria. She entrusted them with three secrets and called the world to prayer, penance, and reparation. On October 13, before 70,000 witnesses, the sun 'danced' in the sky.",
    messages: [
      "\"Pray the Rosary every day to obtain peace for the world.\"",
      "\"In the end, my Immaculate Heart will triumph.\"",
    ],
    pilgrimage: "Sanctuary of Our Lady of Fátima.",
  },
  {
    slug: "beauraing",
    title: "Our Lady of the Golden Heart",
    location: "Beauraing, Belgium",
    country: "Belgium",
    coords: [50.1114, 4.9558],
    year: 1932,
    dates: "November 29, 1932 – January 3, 1933",
    seers: ["Five children of the Voisin and Degeimbre families"],
    status: "approved",
    statusNote: "Approved by the Bishop of Namur in 1949.",
    summary:
      "Mary appeared 33 times to five children as the 'Virgin with the Golden Heart,' asking for prayer and pilgrimage.",
    account:
      "In the garden of a convent school, the Blessed Mother appeared to five children, revealing at the end her heart of gold and identifying herself as the Immaculate Virgin, Mother of God, Queen of Heaven.",
    messages: [
      "\"Pray. Pray very much.\"",
      "\"I will convert sinners. I am the Mother of God, the Queen of Heaven.\"",
    ],
    pilgrimage: "Sanctuary of Our Lady of Beauraing.",
  },
  {
    slug: "banneux",
    title: "Our Lady of the Poor",
    location: "Banneux, Belgium",
    country: "Belgium",
    coords: [50.5228, 5.7297],
    year: 1933,
    dates: "January 15 – March 2, 1933",
    seers: ["Mariette Beco"],
    status: "approved",
    statusNote: "Approved by the Bishop of Liège in 1949.",
    summary:
      "Mary appeared eight times to eleven-year-old Mariette Beco, calling herself the Virgin of the Poor and revealing a spring for 'all nations.'",
    account:
      "The Lady led Mariette to a small spring, saying, 'This spring is reserved for all nations, to relieve the sick.' She asked for prayer and confidence in God.",
    messages: [
      "\"I am the Virgin of the Poor.\"",
      "\"Believe in me, I will believe in you.\"",
    ],
    pilgrimage: "Sanctuary of Our Lady of Banneux.",
  },
  {
    slug: "amsterdam",
    title: "Our Lady of All Nations",
    location: "Amsterdam, Netherlands",
    country: "Netherlands",
    coords: [52.3676, 4.9041],
    year: 1945,
    dates: "1945–1959",
    seers: ["Ida Peerdeman"],
    status: "worthy",
    statusNote:
      "Public devotion and prayer approved by the Bishop of Haarlem-Amsterdam in 2002; ongoing evaluation.",
    summary:
      "Mary asked to be venerated as 'the Lady of All Nations' and gave a prayer for the outpouring of the Holy Spirit on the world.",
    account:
      "Over 56 apparitions, the Blessed Mother appeared to Ida Peerdeman with a prayer and an image of the Lady standing before the Cross with the world at her feet.",
    messages: [
      "\"Lord Jesus Christ, Son of the Father, send now Your Spirit over the earth…\"",
    ],
    pilgrimage: "Chapel of the Lady of All Nations, Amsterdam.",
  },
  {
    slug: "l-ile-bouchard",
    title: "Our Lady of Prayer",
    location: "L'Île-Bouchard, France",
    country: "France",
    coords: [47.1189, 0.4211],
    year: 1947,
    dates: "December 8–14, 1947",
    seers: ["Jacqueline & Jeanne Aubry", "Nicole Robin", "Laura Croizon"],
    status: "approved",
    statusNote: "Approved by the Archbishop of Tours in 2001.",
    summary:
      "As France teetered near civil unrest, Mary appeared to four girls asking them to pray for France.",
    account:
      "In the parish church of Saint-Gilles, the Virgin appeared with angels, asking the children to gather people to pray for France. The apparitions coincided with the sudden collapse of a threatening general strike.",
    messages: [
      "\"Tell the little children to pray for France, for she has great need of it.\"",
    ],
    pilgrimage: "Sanctuary of Saint-Gilles at L'Île-Bouchard.",
  },
  {
    slug: "syracuse",
    title: "Madonna of the Tears",
    location: "Syracuse, Sicily",
    country: "Italy",
    coords: [37.0755, 15.2866],
    year: 1953,
    dates: "August 29 – September 1, 1953",
    seers: ["Antonina & Angelo Iannuso"],
    status: "approved",
    statusNote:
      "Approved by the Sicilian bishops in 1953 within months of the event.",
    summary:
      "A small plaque of the Immaculate Heart wept human tears for four days in the home of a young couple.",
    account:
      "A plaster relief of the Immaculate Heart above the bed of a newlywed couple began to shed real tears, verified by chemical analysis as human tears. The event drew immense crowds and was rapidly approved.",
    messages: ["A silent sign — tears calling the world to conversion."],
    pilgrimage: "Sanctuary of the Madonna delle Lacrime, Syracuse.",
  },
  {
    slug: "zeitoun",
    title: "Our Lady of Zeitoun",
    location: "Zeitoun, Cairo",
    country: "Egypt",
    coords: [30.1289, 31.3244],
    year: 1968,
    dates: "April 2, 1968 – 1971",
    seers: ["Millions of witnesses of every faith"],
    status: "approved",
    statusNote:
      "Recognized by Coptic Orthodox Patriarch Cyril VI in 1968; endorsed by the Catholic Church in Egypt.",
    summary:
      "For over two years, luminous apparitions of the Virgin appeared silently above St. Mary's Coptic Church, seen by millions and photographed.",
    account:
      "Beginning with Muslim mechanics who thought a woman was about to jump from the church dome, the silent luminous apparitions returned repeatedly for years — seen by Christians, Muslims, and even President Nasser.",
    messages: ["A silent, universal apparition of consolation."],
    pilgrimage: "St. Mary's Coptic Orthodox Church, Zeitoun.",
  },
  {
    slug: "akita",
    title: "Our Lady of Akita",
    location: "Yuzawadai, Akita",
    country: "Japan",
    coords: [39.7186, 140.1023],
    year: 1973,
    dates: "1973–1981",
    seers: ["Sr. Agnes Katsuko Sasagawa"],
    status: "approved",
    statusNote:
      "Approved by Bishop John Shojiro Ito in 1984; recognized by Cardinal Ratzinger (CDF).",
    summary:
      "A wooden statue of Mary wept 101 times over years, and gave prophetic messages of prayer, penance, and warning.",
    account:
      "Sr. Agnes, deaf and suffering, received messages from a statue of the Virgin that later wept human tears (medically verified). The messages echo Fátima and warn of grave chastisement if the world does not amend.",
    messages: [
      "\"Prayer, penance, and courageous sacrifices can soften the Father's anger.\"",
    ],
    pilgrimage: "Convent of the Institute of the Handmaids of the Eucharist, Akita.",
  },
  {
    slug: "betania",
    title: "Mary, Virgin and Mother, Reconciler of all Peoples",
    location: "Betania, Cúa",
    country: "Venezuela",
    coords: [10.1656, -66.895],
    year: 1976,
    dates: "1976–1988",
    seers: ["María Esperanza de Bianchini", "hundreds of witnesses"],
    status: "approved",
    statusNote: "Approved by Bishop Pío Bello Ricardo in 1987.",
    summary:
      "Mary appeared many times to María Esperanza and later to more than 100 pilgrims simultaneously, calling for reconciliation.",
    account:
      "On March 25, 1984, the Virgin appeared seven times in one day to over 150 witnesses of every walk of life. A subsequent Eucharistic miracle at Betania was also recognized.",
    messages: [
      "\"I have come to reconcile my children with my Divine Son.\"",
    ],
    pilgrimage: "Finca Betania, Cúa, Venezuela.",
  },
  {
    slug: "kibeho",
    title: "Our Lady of Kibeho",
    location: "Kibeho, Rwanda",
    country: "Rwanda",
    coords: [-2.5847, 29.5731],
    year: 1981,
    dates: "November 28, 1981 – 1989",
    seers: ["Alphonsine Mumureke", "Nathalie Mukamazimpaka", "Marie-Claire Mukangango"],
    status: "approved",
    statusNote:
      "Approved by Bishop Augustin Misago in 2001 — the first Church-approved apparitions in Africa.",
    summary:
      "The Virgin appeared as 'Mother of the Word,' warning of coming violence years before the Rwandan genocide.",
    account:
      "To three schoolgirls, Mary appeared with a call to conversion and a sorrowful vision of 'rivers of blood' and 'people killing one another' — a prophetic warning tragically fulfilled in 1994.",
    messages: [
      "\"Repent, repent, repent. Convert while there is still time.\"",
    ],
    pilgrimage: "Shrine of Our Lady of Kibeho.",
  },
  {
    slug: "san-nicolas",
    title: "Our Lady of the Rosary of San Nicolás",
    location: "San Nicolás de los Arroyos",
    country: "Argentina",
    coords: [-33.336, -60.216],
    year: 1983,
    dates: "1983–1990",
    seers: ["Gladys Quiroga de Motta"],
    status: "approved",
    statusNote: "Approved by Bishop Héctor Cardelli in 2016.",
    summary:
      "Mary appeared with the Rosary to a housewife, asking for a shrine on the banks of the Paraná.",
    account:
      "Over seven years, the Blessed Mother dictated more than 1,800 messages, called for a shrine to be built, and requested consecration to her Immaculate Heart.",
    messages: [
      "\"You are living at a decisive time. It is no time for indifference.\"",
    ],
    pilgrimage: "Sanctuary of Our Lady of the Rosary of San Nicolás.",
  },
  {
    slug: "cuapa",
    title: "Our Lady of Cuapa",
    location: "Cuapa, Chontales",
    country: "Nicaragua",
    coords: [12.2611, -85.1275],
    year: 1980,
    dates: "May 8 – October 13, 1980",
    seers: ["Bernardo Martínez"],
    status: "approved",
    statusNote: "Approved by Bishop Pablo Antonio Vega in 1982.",
    summary:
      "Mary appeared to a lay sacristan calling Nicaragua to prayer, especially the Rosary, amid revolutionary upheaval.",
    account:
      "Bernardo, a simple sacristan, saw the Virgin bathed in light asking for the daily Rosary and family prayer as Nicaragua descended into conflict.",
    messages: [
      "\"Pray the Rosary. Meditate on the mysteries. Live the Word of God.\"",
    ],
    pilgrimage: "Sanctuary of Our Lady of Cuapa.",
  },

  // Under investigation / recent developments
  {
    slug: "medjugorje",
    title: "Queen of Peace",
    location: "Medjugorje, Bosnia and Herzegovina",
    country: "Bosnia and Herzegovina",
    coords: [43.1897, 17.6789],
    year: 1981,
    dates: "June 24, 1981 – present (six visionaries)",
    seers: [
      "Ivan Dragićević",
      "Mirjana Dragićević-Soldo",
      "Marija Pavlović-Lunetti",
      "Vicka Ivanković-Mijatović",
      "Ivanka Ivanković-Elez",
      "Jakov Čolo",
    ],
    status: "investigation",
    statusNote:
      "Nihil obstat granted by the Dicastery for the Doctrine of the Faith in September 2024, allowing public devotion; the supernatural character has not been formally declared.",
    summary:
      "Six young people report ongoing apparitions of the Queen of Peace calling for prayer, fasting, and conversion.",
    account:
      "Since 1981, the visionaries have reported daily or monthly apparitions with messages centered on the five stones of Medjugorje: prayer with the heart, the Eucharist, Scripture, fasting, and monthly confession. Medjugorje has become one of the most-visited Marian sites in the world.",
    messages: [
      "\"Peace, peace, peace — and only peace!\"",
      "\"Pray, pray, pray.\"",
    ],
    pilgrimage: "St. James Parish, Medjugorje.",
  },
  {
    slug: "garabandal",
    title: "Our Lady of Mount Carmel of Garabandal",
    location: "San Sebastián de Garabandal, Cantabria",
    country: "Spain",
    coords: [43.2258, -4.4172],
    year: 1961,
    dates: "1961–1965",
    seers: ["Conchita González", "Jacinta González", "Mari Loli Mazón", "Mari Cruz González"],
    status: "investigation",
    statusNote:
      "The local bishops have not declared supernatural origin; private pilgrimage is not forbidden.",
    summary:
      "Four girls reported some 2,000 apparitions of St. Michael and the Virgin, with warnings of a coming 'Warning' and 'Miracle.'",
    account:
      "In a remote mountain village, four schoolgirls entered frequent ecstasies, walked backwards in unison with eyes upturned, and communicated messages of penance and Eucharistic reverence.",
    messages: [
      "\"Many cardinals, many bishops, and many priests are on the road to perdition… Pray much.\"",
    ],
    pilgrimage: "San Sebastián de Garabandal (private pilgrimage).",
  },
  {
    slug: "naju",
    title: "Our Lady of Naju",
    location: "Naju, South Jeolla",
    country: "South Korea",
    coords: [35.0159, 126.7108],
    year: 1985,
    dates: "1985 – present",
    seers: ["Julia Kim"],
    status: "investigation",
    statusNote:
      "The Archbishop of Kwangju has not declared supernatural origin; devotion is under study.",
    summary:
      "A statue of Mary is reported to weep tears and blood, with Eucharistic phenomena drawing pilgrims from Asia.",
    account:
      "Julia Kim reports messages, weeping and bleeding of a statue, and reported Eucharistic miracles. The case remains under evaluation by the local Church.",
    messages: [
      "\"Pray the Rosary. Console the Sacred Heart of Jesus.\"",
    ],
    pilgrimage: "Naju (private pilgrimage).",
  },
  {
    slug: "anguera",
    title: "Our Lady, Queen of Peace of Anguera",
    location: "Anguera, Bahia",
    country: "Brazil",
    coords: [-12.1467, -39.2444],
    year: 1987,
    dates: "1987 – present",
    seers: ["Pedro Régis"],
    status: "investigation",
    statusNote: "The local Church has not pronounced on the supernatural character.",
    summary:
      "Pedro Régis reports weekly messages of prayer, conversion, and warnings for the Church and the world.",
    account:
      "Since 1987, thousands of messages have been published; devotion has spread widely in Latin America while awaiting official Church judgment.",
    messages: [
      "\"Bend your knees in prayer. Humanity walks toward the abyss of self-destruction.\"",
    ],
  },
  {
    slug: "litmanova",
    title: "Immaculate Purity",
    location: "Litmanová, Prešov",
    country: "Slovakia",
    coords: [49.3444, 20.7139],
    year: 1990,
    dates: "August 5, 1990 – August 6, 1995",
    seers: ["Ivetka Korčáková", "Katka Češelková"],
    status: "investigation",
    statusNote:
      "The Prešov Eparchy has established the site as a place of prayer; supernatural character not yet formally declared.",
    summary:
      "Two girls reported monthly apparitions of Mary as 'Immaculate Purity' on Mount Zvir.",
    account:
      "On the first Sunday of each month, the Virgin appeared to two children, calling the Byzantine Catholic faithful to purity, prayer, and fasting.",
    messages: ["\"I am Immaculate Purity. Live for Jesus.\""],
    pilgrimage: "Marian Pilgrimage Site Zvir, Litmanová.",
  },

  // Not approved — included for completeness with clear labeling
  {
    slug: "bayside",
    title: "Our Lady of the Roses (Bayside)",
    location: "Bayside, Queens, New York",
    country: "United States",
    coords: [40.7648, -73.7712],
    year: 1970,
    dates: "1970–1994",
    seers: ["Veronica Lueken"],
    status: "not_approved",
    statusNote:
      "Declared not supernatural by the Diocese of Brooklyn in 1986; devotion is not sanctioned.",
    summary:
      "Messages reported by Veronica Lueken were formally judged by the local ordinary as lacking supernatural origin.",
    account:
      "The Diocese of Brooklyn conducted an investigation and concluded the alleged apparitions lack authenticity; Catholics are directed not to promote or attend related gatherings as Catholic events.",
    messages: [
      "Included here only for completeness; the Church does not endorse these messages.",
    ],
  },
  {
    slug: "necedah",
    title: "Necedah Shrine",
    location: "Necedah, Wisconsin",
    country: "United States",
    coords: [44.0281, -90.0651],
    year: 1949,
    dates: "1949–1980s",
    seers: ["Mary Ann Van Hoof"],
    status: "not_approved",
    statusNote:
      "Condemned by the Bishop of La Crosse in 1955; devotion is not sanctioned by the Catholic Church.",
    summary:
      "Reported apparitions to Mary Ann Van Hoof were investigated and formally condemned by the local ordinary.",
    account:
      "The Bishop of La Crosse issued a formal condemnation after investigation; adherents later formed a group outside the Catholic Church.",
    messages: [
      "Included here only for completeness; the Church does not endorse these messages.",
    ],
  },
];

export function getApparition(slug: string): Apparition | undefined {
  return APPARITIONS.find((a) => a.slug === slug);
}

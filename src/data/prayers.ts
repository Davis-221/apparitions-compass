export type PrayerCategory =
  | "marian"
  | "rosary"
  | "litany"
  | "consecration"
  | "apparition";

export interface Prayer {
  slug: string;
  title: string;
  latinTitle?: string;
  category: PrayerCategory;
  apparitionSlug?: string;
  /** One line on why the Church prays these words. */
  intro?: string;
  /** Where the prayer comes from — council, saint, pope, apparition. */
  source?: string;
  /** Optional guidance shown beneath the prayer. */
  howToPray?: string;
  text: string;
}

export const PRAYERS: Prayer[] = [
  /* ---------------- Marian ---------------- */
  {
    slug: "hail-mary",
    title: "Hail Mary",
    latinTitle: "Ave Maria",
    category: "marian",
    intro:
      "The angel's greeting joined to Elizabeth's blessing — the first prayer a Christian child learns, and the last many whisper.",
    source: "Luke 1:28, 1:42; final petition fixed by the Roman Catechism, 1566",
    text: "Hail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\n\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death.\nAmen.",
    howToPray:
      "Say it slowly. Let the second half — 'now and at the hour of our death' — be a real request, not a formula.",
  },
  {
    slug: "memorare",
    title: "Memorare",
    latinTitle: "Memorare, O piissima Virgo Maria",
    category: "marian",
    intro:
      "A prayer of holy boldness: it reminds Our Lady that she has never been known to refuse a child who runs to her.",
    source: "Popularised by St. Claude de la Colombière and St. Francis de Sales",
    text: "Remember, O most gracious Virgin Mary,\nthat never was it known that anyone who fled to thy protection,\nimplored thy help, or sought thy intercession was left unaided.\n\nInspired with this confidence,\nI fly to thee, O Virgin of virgins, my Mother;\nto thee do I come; before thee I stand, sinful and sorrowful.\n\nO Mother of the Word Incarnate,\ndespise not my petitions,\nbut in thy mercy hear and answer me.\nAmen.",
    howToPray: "Pray it three times in a row when the need is urgent.",
  },
  {
    slug: "salve-regina",
    title: "Hail, Holy Queen",
    latinTitle: "Salve Regina",
    category: "marian",
    intro:
      "Sung by monks at nightfall for a thousand years, and at the deathbed of every Dominican and Cistercian.",
    source: "11th century; attributed to Hermann of Reichenau",
    text: "Hail, Holy Queen, Mother of Mercy,\nour life, our sweetness and our hope.\n\nTo thee do we cry, poor banished children of Eve.\nTo thee do we send up our sighs,\nmourning and weeping in this valley of tears.\n\nTurn then, most gracious advocate,\nthine eyes of mercy toward us,\nand after this our exile,\nshow unto us the blessed fruit of thy womb, Jesus.\n\nO clement, O loving, O sweet Virgin Mary.\n\nV. Pray for us, O holy Mother of God.\nR. That we may be made worthy of the promises of Christ.\nAmen.",
  },
  {
    slug: "angelus",
    title: "The Angelus",
    latinTitle: "Angelus Domini",
    category: "marian",
    intro:
      "Prayed at six, noon, and six as the bells ring — the Incarnation remembered three times a day.",
    source: "Medieval monastic custom; indulgenced by Pope Benedict XIV, 1742",
    text: "V. The Angel of the Lord declared unto Mary,\nR. And she conceived of the Holy Spirit.\n\nHail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death. Amen.\n\nV. Behold the handmaid of the Lord,\nR. Be it done unto me according to thy word.\n\nHail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death. Amen.\n\nV. And the Word was made flesh,\nR. And dwelt among us.\n\nHail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death. Amen.\n\nV. Pray for us, O holy Mother of God,\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray:\nPour forth, we beseech Thee, O Lord, Thy grace into our hearts,\nthat we to whom the Incarnation of Christ Thy Son\nwas made known by the message of an angel,\nmay by His Passion and Cross\nbe brought to the glory of His Resurrection.\nThrough the same Christ Our Lord.\nAmen.",
    howToPray: "Replaced by the Regina Caeli during the Easter season.",
  },
  {
    slug: "regina-caeli",
    title: "Queen of Heaven",
    latinTitle: "Regina Caeli",
    category: "marian",
    intro:
      "The Church's Easter greeting to the Mother who kept vigil through Holy Saturday and was first to rejoice.",
    source: "12th century antiphon; prayed from Easter to Pentecost",
    text: "Queen of Heaven, rejoice, alleluia.\nFor He whom thou didst merit to bear, alleluia,\nHath risen as He said, alleluia.\nPray for us to God, alleluia.\n\nV. Rejoice and be glad, O Virgin Mary, alleluia.\nR. For the Lord hath truly risen, alleluia.\n\nLet us pray:\nO God, who gave joy to the world through the Resurrection of Thy Son,\nour Lord Jesus Christ,\ngrant we beseech Thee,\nthat through the intercession of the Virgin Mary, His Mother,\nwe may obtain the joys of everlasting life.\nThrough the same Christ our Lord.\nAmen.",
  },
  {
    slug: "sub-tuum-praesidium",
    title: "Beneath Thy Protection",
    latinTitle: "Sub Tuum Praesidium",
    category: "marian",
    intro:
      "The oldest known prayer to Our Lady — found on Egyptian papyrus from around the year 250, while the persecutions still raged.",
    source: "Rylands Papyrus 470, c. AD 250",
    text: "Beneath thy protection we take refuge,\nO holy Mother of God;\ndespise not our petitions in our necessities,\nbut deliver us always from all dangers,\nO glorious and blessed Virgin.\nAmen.",
  },
  {
    slug: "magnificat",
    title: "The Magnificat",
    latinTitle: "Canticum Mariae",
    category: "marian",
    intro:
      "Mary's own words — the only long prayer in Scripture spoken by her, and the Church's song every evening at Vespers.",
    source: "Luke 1:46–55",
    text: "My soul doth magnify the Lord,\nand my spirit hath rejoiced in God my Saviour.\n\nFor He hath regarded the lowliness of His handmaid;\nfor behold, from henceforth all generations shall call me blessed.\n\nFor He that is mighty hath done great things to me,\nand holy is His Name.\n\nAnd His mercy is from generation to generation\nupon them that fear Him.\n\nHe hath shewed might in His arm;\nHe hath scattered the proud in the conceit of their heart.\n\nHe hath put down the mighty from their seat,\nand hath exalted the humble.\n\nHe hath filled the hungry with good things,\nand the rich He hath sent empty away.\n\nHe hath received Israel His servant,\nbeing mindful of His mercy.\n\nAs He spoke to our fathers,\nto Abraham and to his seed for ever.\nAmen.",
  },
  {
    slug: "hail-holy-queen-mother-of-mercy-three-hail-marys",
    title: "The Three Hail Marys",
    category: "marian",
    intro:
      "A daily devotion of purity and perseverance, promised by Our Lady to St. Mechtilde as a safeguard at the hour of death.",
    source: "Devotion revealed to St. Mechtilde of Hackeborn, 13th century",
    text: "In honour of the Power of God the Father:\nHail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death. Amen.\n\nIn honour of the Wisdom of God the Son:\nHail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death. Amen.\n\nIn honour of the Love of God the Holy Spirit:\nHail Mary, full of grace, the Lord is with thee.\nBlessed art thou amongst women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death. Amen.\n\nO Mary, my Mother, keep me this day from mortal sin.\nBy thy holy and Immaculate Conception,\nmake my body pure and my soul holy.\nAmen.",
    howToPray: "Prayed each morning on rising and each night before sleep.",
  },

  /* ---------------- Rosary ---------------- */
  {
    slug: "how-to-pray-the-rosary",
    title: "How to Pray the Rosary",
    category: "rosary",
    intro:
      "The whole Gospel told on a string of beads — 'a compendium of the entire Gospel,' as Pope Paul VI called it.",
    source: "Given by tradition to St. Dominic; taught at Lourdes and Fátima",
    text: "1. On the crucifix — the Sign of the Cross and the Apostles' Creed.\n\n2. On the first bead — the Our Father.\n\n3. On the next three beads — three Hail Marys, for faith, hope, and charity.\n\n4. On the chain — the Glory Be.\n\n5. Announce the first mystery. Pray the Our Father.\n\n6. On the ten beads — ten Hail Marys, meditating on the mystery.\n\n7. Pray the Glory Be, then the Fátima Prayer:\n\"O my Jesus, forgive us our sins…\"\n\n8. Repeat for all five mysteries.\n\n9. Conclude with the Hail, Holy Queen and the closing prayer.",
    howToPray:
      "Joyful — Monday and Saturday. Sorrowful — Tuesday and Friday. Glorious — Wednesday and Sunday. Luminous — Thursday.",
  },
  {
    slug: "apostles-creed",
    title: "The Apostles' Creed",
    latinTitle: "Symbolum Apostolorum",
    category: "rosary",
    intro: "The faith held on the crucifix before the first bead is told.",
    source: "Ancient Roman baptismal creed",
    text: "I believe in God, the Father Almighty,\nCreator of heaven and earth;\nand in Jesus Christ, His only Son, our Lord;\nwho was conceived by the Holy Spirit,\nborn of the Virgin Mary,\nsuffered under Pontius Pilate,\nwas crucified, died, and was buried.\n\nHe descended into hell;\non the third day He rose again from the dead;\nHe ascended into heaven,\nand is seated at the right hand of God the Father Almighty;\nfrom thence He shall come to judge the living and the dead.\n\nI believe in the Holy Spirit,\nthe holy Catholic Church,\nthe communion of saints,\nthe forgiveness of sins,\nthe resurrection of the body,\nand life everlasting.\nAmen.",
  },
  {
    slug: "our-father",
    title: "Our Father",
    latinTitle: "Pater Noster",
    category: "rosary",
    intro: "The prayer the Lord Himself taught, opening every decade.",
    source: "Matthew 6:9–13",
    text: "Our Father, who art in heaven,\nhallowed be Thy name;\nThy kingdom come;\nThy will be done on earth as it is in heaven.\n\nGive us this day our daily bread,\nand forgive us our trespasses,\nas we forgive those who trespass against us;\nand lead us not into temptation,\nbut deliver us from evil.\nAmen.",
  },
  {
    slug: "glory-be",
    title: "Glory Be",
    latinTitle: "Gloria Patri",
    category: "rosary",
    intro: "The Church's smallest and oldest hymn to the Trinity.",
    source: "Ancient doxology",
    text: "Glory be to the Father,\nand to the Son,\nand to the Holy Spirit.\n\nAs it was in the beginning,\nis now, and ever shall be,\nworld without end.\nAmen.",
  },
  {
    slug: "rosary-joyful",
    title: "The Joyful Mysteries",
    category: "rosary",
    intro: "Mary's hidden years — the Word made flesh in an ordinary home.",
    source: "Prayed Monday and Saturday",
    text: "1. The Annunciation\nThe angel Gabriel announces to Mary that she will conceive the Son of God, and she answers: Be it done unto me.\nFruit of the mystery: humility.\n\n2. The Visitation\nMary crosses the hill country to serve Elizabeth, and the child leaps in the womb.\nFruit of the mystery: love of neighbour.\n\n3. The Nativity\nJesus is born in Bethlehem and laid in a manger.\nFruit of the mystery: poverty of spirit.\n\n4. The Presentation\nMary and Joseph present the Infant in the Temple, and Simeon foretells the sword.\nFruit of the mystery: obedience.\n\n5. The Finding in the Temple\nAfter three days of sorrow, the Child is found teaching the elders.\nFruit of the mystery: joy in finding Jesus.",
  },
  {
    slug: "rosary-luminous",
    title: "The Luminous Mysteries",
    category: "rosary",
    intro:
      "The public life of Christ, given to the Church by St. John Paul II in 2002.",
    source: "Rosarium Virginis Mariae, 2002 — prayed Thursday",
    text: "1. The Baptism of Jesus\nThe heavens open over the Jordan and the Father's voice is heard.\nFruit of the mystery: openness to the Holy Spirit.\n\n2. The Wedding at Cana\nAt Mary's word — 'Do whatever He tells you' — water becomes wine.\nFruit of the mystery: trust in Mary's intercession.\n\n3. The Proclamation of the Kingdom\nJesus calls all to conversion and forgives sins.\nFruit of the mystery: repentance.\n\n4. The Transfiguration\nOn Tabor His face shines like the sun.\nFruit of the mystery: desire for holiness.\n\n5. The Institution of the Eucharist\nHe gives His Body and Blood at the Last Supper.\nFruit of the mystery: adoration.",
  },
  {
    slug: "rosary-sorrowful",
    title: "The Sorrowful Mysteries",
    category: "rosary",
    intro: "The Passion, walked beside the Mother who did not leave Him.",
    source: "Prayed Tuesday and Friday",
    text: "1. The Agony in the Garden\nIn Gethsemane He sweats blood and accepts the Father's will.\nFruit of the mystery: sorrow for sin.\n\n2. The Scourging at the Pillar\nJesus is bound and scourged.\nFruit of the mystery: purity.\n\n3. The Crowning with Thorns\nSoldiers press a crown of thorns upon His head.\nFruit of the mystery: moral courage.\n\n4. The Carrying of the Cross\nHe bears the Cross to Calvary and meets His Mother on the road.\nFruit of the mystery: patience.\n\n5. The Crucifixion\nFrom the Cross He gives us His Mother: 'Behold thy Mother.'\nFruit of the mystery: perseverance.",
  },
  {
    slug: "rosary-glorious",
    title: "The Glorious Mysteries",
    category: "rosary",
    intro: "Death undone, and the Mother crowned.",
    source: "Prayed Wednesday and Sunday",
    text: "1. The Resurrection\nJesus rises from the dead on the third day.\nFruit of the mystery: faith.\n\n2. The Ascension\nHe ascends into Heaven and prepares a place for us.\nFruit of the mystery: hope.\n\n3. The Descent of the Holy Spirit\nThe Spirit descends upon Our Lady and the Apostles at Pentecost.\nFruit of the mystery: love of God.\n\n4. The Assumption\nMary is taken body and soul into Heaven.\nFruit of the mystery: grace of a happy death.\n\n5. The Coronation\nMary is crowned Queen of Heaven and Earth.\nFruit of the mystery: trust in Mary's queenship.",
  },

  /* ---------------- Litany ---------------- */
  {
    slug: "litany-of-loreto",
    title: "Litany of Loreto",
    latinTitle: "Litaniae Lauretanae",
    category: "litany",
    intro:
      "Her titles named one by one — mirror, tower, gate, morning star — each a window onto the same Mother.",
    source: "Approved by Pope Sixtus V, 1587; invocations added through 2020",
    text: "Lord, have mercy. Christ, have mercy. Lord, have mercy.\nChrist, hear us. Christ, graciously hear us.\n\nGod the Father of heaven, have mercy on us.\nGod the Son, Redeemer of the world, have mercy on us.\nGod the Holy Spirit, have mercy on us.\nHoly Trinity, one God, have mercy on us.\n\nHoly Mary, pray for us.\nHoly Mother of God, pray for us.\nHoly Virgin of virgins, pray for us.\nMother of Christ, pray for us.\nMother of the Church, pray for us.\nMother of Mercy, pray for us.\nMother of divine grace, pray for us.\nMother of Hope, pray for us.\nMother most pure, pray for us.\nMother most chaste, pray for us.\nMother inviolate, pray for us.\nMother undefiled, pray for us.\nMother most amiable, pray for us.\nMother most admirable, pray for us.\nMother of good counsel, pray for us.\nMother of our Creator, pray for us.\nMother of our Saviour, pray for us.\n\nVirgin most prudent, pray for us.\nVirgin most venerable, pray for us.\nVirgin most renowned, pray for us.\nVirgin most powerful, pray for us.\nVirgin most merciful, pray for us.\nVirgin most faithful, pray for us.\n\nMirror of justice, pray for us.\nSeat of wisdom, pray for us.\nCause of our joy, pray for us.\nSpiritual vessel, pray for us.\nVessel of honour, pray for us.\nSingular vessel of devotion, pray for us.\nMystical rose, pray for us.\nTower of David, pray for us.\nTower of ivory, pray for us.\nHouse of gold, pray for us.\nArk of the Covenant, pray for us.\nGate of Heaven, pray for us.\nMorning star, pray for us.\nHealth of the sick, pray for us.\nRefuge of sinners, pray for us.\nSolace of migrants, pray for us.\nComforter of the afflicted, pray for us.\nHelp of Christians, pray for us.\n\nQueen of Angels, pray for us.\nQueen of Patriarchs, pray for us.\nQueen of Prophets, pray for us.\nQueen of Apostles, pray for us.\nQueen of Martyrs, pray for us.\nQueen of Confessors, pray for us.\nQueen of Virgins, pray for us.\nQueen of all Saints, pray for us.\nQueen conceived without original sin, pray for us.\nQueen assumed into Heaven, pray for us.\nQueen of the most holy Rosary, pray for us.\nQueen of families, pray for us.\nQueen of peace, pray for us.\n\nLamb of God, who takest away the sins of the world,\nspare us, O Lord.\nLamb of God, who takest away the sins of the world,\ngraciously hear us, O Lord.\nLamb of God, who takest away the sins of the world,\nhave mercy on us.\n\nV. Pray for us, O holy Mother of God.\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray:\nGrant, we beseech Thee, O Lord God,\nthat we Thy servants may enjoy perpetual health of mind and body;\nand by the glorious intercession of the Blessed Mary, ever Virgin,\nbe delivered from present sorrow\nand enjoy eternal gladness.\nThrough Christ our Lord.\nAmen.",
  },
  {
    slug: "litany-of-humility",
    title: "Litany of Humility",
    category: "litany",
    intro:
      "The prayer of the Handmaid's own heart — asking for the lowliness God regarded in her.",
    source: "Cardinal Rafael Merry del Val, Secretary of State to St. Pius X",
    text: "O Jesus, meek and humble of heart, hear me.\n\nFrom the desire of being esteemed, deliver me, Jesus.\nFrom the desire of being loved, deliver me, Jesus.\nFrom the desire of being extolled, deliver me, Jesus.\nFrom the desire of being honoured, deliver me, Jesus.\nFrom the desire of being praised, deliver me, Jesus.\nFrom the desire of being preferred to others, deliver me, Jesus.\nFrom the desire of being consulted, deliver me, Jesus.\nFrom the desire of being approved, deliver me, Jesus.\n\nFrom the fear of being humiliated, deliver me, Jesus.\nFrom the fear of being despised, deliver me, Jesus.\nFrom the fear of suffering rebukes, deliver me, Jesus.\nFrom the fear of being calumniated, deliver me, Jesus.\nFrom the fear of being forgotten, deliver me, Jesus.\nFrom the fear of being ridiculed, deliver me, Jesus.\nFrom the fear of being wronged, deliver me, Jesus.\nFrom the fear of being suspected, deliver me, Jesus.\n\nThat others may be loved more than I,\nJesus, grant me the grace to desire it.\nThat others may be esteemed more than I,\nJesus, grant me the grace to desire it.\nThat, in the opinion of the world, others may increase and I may decrease,\nJesus, grant me the grace to desire it.\nThat others may be chosen and I set aside,\nJesus, grant me the grace to desire it.\nThat others may be praised and I unnoticed,\nJesus, grant me the grace to desire it.\nThat others may become holier than I,\nprovided that I may become as holy as I should,\nJesus, grant me the grace to desire it.\nAmen.",
  },

  /* ---------------- Consecration ---------------- */
  {
    slug: "total-consecration",
    title: "Act of Total Consecration",
    category: "consecration",
    intro:
      "To Jesus through Mary — giving her everything, so that she may give it all back to her Son.",
    source: "St. Louis de Montfort, True Devotion to the Blessed Virgin",
    text: "I, a faithless sinner, renew and ratify today in thy hands,\nO Immaculate Mother,\nthe vows of my Baptism.\n\nI renounce forever Satan, his pomps and works;\nand I give myself entirely to Jesus Christ,\nthe Incarnate Wisdom,\nto carry my cross after Him all the days of my life.\n\nAnd that I may be more faithful to Him than I have hitherto been,\nI choose thee this day, O Mary,\nin the presence of all the heavenly court,\nas my Mother and Queen.\n\nI deliver and consecrate to thee,\nas thy slave of love,\nmy body and soul, my goods both interior and exterior,\nand even the value of all my good actions,\npast, present, and future;\nleaving to thee the entire and full right of disposing of me,\nand all that belongs to me, without exception,\naccording to thy good pleasure,\nfor the greater glory of God,\nin time and in eternity.\nAmen.",
    howToPray:
      "Traditionally preceded by thirty-three days of preparation and made on a Marian feast.",
  },
  {
    slug: "consecration-immaculate-heart",
    title: "Consecration to the Immaculate Heart",
    category: "consecration",
    intro:
      "The request of Fátima answered — a heart entrusted to the Heart that will triumph.",
    source: "Based on the consecrations of Pius XII, St. John Paul II, and Francis",
    text: "O Immaculate Heart of Mary,\nMother of God and our Mother,\nto thee I consecrate my heart, my life, and all that I am.\n\nTeach me to keep the word of God as thou didst,\npondering it in my heart.\nTeach me to say yes without conditions.\n\nBe my refuge in temptation,\nmy consolation in sorrow,\nmy courage in the hour of the cross.\n\nQueen of Peace, obtain peace for the world,\nfor my family, and for the hidden war within me.\n\nAnd at the last, Mother,\nlead me by the hand to Jesus,\nthe blessed fruit of thy womb.\nAmen.",
  },
  {
    slug: "guardian-of-the-redeemer",
    title: "Prayer to Our Lady, Undoer of Knots",
    category: "consecration",
    intro:
      "For the tangles no one else can reach — Mary's patient fingers loosening what our hands have knotted.",
    source: "German devotion, c. 1700; spread worldwide by Pope Francis",
    text: "Holy Mary, full of the presence of God,\nduring your life you accepted with great humility\nthe Father's holy will,\nand the memory of you is enshrined in the hearts of your children.\n\nYou who had to face the knots of daily life,\nMother of the fair love,\nspread out to us your hands\nand take today into them this knot in my life:\n\n(name the knot)\n\nNo one, not even the evil one,\ncan take it away from your merciful help.\nIn your hands there is no knot that cannot be undone.\n\nMother of God, you who take away the obstacles\nthat make our lives difficult,\nwe entrust ourselves to you.\nMay we never be separated from the Lord.\nAmen.",
  },

  /* ---------------- Apparition ---------------- */
  {
    slug: "fatima-prayer",
    title: "The Fátima Prayer",
    category: "apparition",
    apparitionSlug: "fatima",
    intro:
      "Taught by Our Lady to three shepherd children, to be said after each decade of the Rosary.",
    source: "Given at Fátima, Portugal, 13 July 1917",
    text: "O my Jesus,\nforgive us our sins,\nsave us from the fires of hell.\n\nLead all souls to Heaven,\nespecially those in most need of Thy mercy.\nAmen.",
  },
  {
    slug: "fatima-pardon-prayer",
    title: "The Pardon Prayer",
    category: "apparition",
    apparitionSlug: "fatima",
    intro:
      "Taught by the Angel of Peace to the children of Fátima before Our Lady appeared.",
    source: "Given at Fátima, Portugal, spring 1916",
    text: "My God, I believe, I adore, I hope, and I love Thee.\nI ask pardon of Thee for those who do not believe,\ndo not adore, do not hope, and do not love Thee.\nAmen.",
  },
  {
    slug: "guadalupe-prayer",
    title: "Prayer to Our Lady of Guadalupe",
    category: "apparition",
    apparitionSlug: "guadalupe",
    intro:
      "To the Mother who left her image on a peasant's cloak and asked only for a house of prayer.",
    source: "Traditional prayer of the Americas; Tepeyac, 1531",
    text: "Our Lady of Guadalupe, Mystical Rose,\nmake intercession for the Holy Church,\nprotect the Sovereign Pontiff,\nhelp all those who invoke thee in their necessities.\n\nAnd since thou art the ever Virgin Mary\nand Mother of the true God,\nobtain for us from thy most holy Son\nthe grace of keeping our faith,\nsweet hope in the midst of the bitterness of life,\nburning charity,\nand the precious gift of final perseverance.\nAmen.\n\n'Am I not here, I who am your Mother?\nAre you not under my shadow and protection?'",
  },
  {
    slug: "lourdes-prayer",
    title: "Prayer to Our Lady of Lourdes",
    category: "apparition",
    apparitionSlug: "lourdes",
    intro:
      "At the grotto where she said 'I am the Immaculate Conception,' the sick still come and are healed.",
    source: "Traditional prayer of the Lourdes pilgrimage; 1858",
    text: "O ever Immaculate Virgin,\nMother of Mercy, Health of the Sick,\nRefuge of Sinners, Comforter of the Afflicted,\nyou know my wants, my troubles, my sufferings;\nlook with mercy on me.\n\nBy appearing in the Grotto of Lourdes,\nyou were pleased to make it a privileged sanctuary\nwhence you dispense your favours;\nand already many sufferers have obtained\nthe cure of their infirmities,\nboth spiritual and corporal.\n\nI come, therefore, with confidence\nto implore your maternal intercession.\nObtain, O loving Mother, the granting of my requests.\n\nThrough gratitude for your favours,\nI will endeavour to imitate your virtues,\nthat I may one day share your glory.\nAmen.",
  },
  {
    slug: "miraculous-medal-prayer",
    title: "Prayer of the Miraculous Medal",
    category: "apparition",
    apparitionSlug: "rue-du-bac",
    intro:
      "The words Our Lady asked to be struck upon a medal, in letters of gold around her open hands.",
    source: "Given to St. Catherine Labouré, Rue du Bac, Paris, 27 November 1830",
    text: "O Mary, conceived without sin,\npray for us who have recourse to thee.\n\nO Mary, conceived without sin,\npray for us who have recourse to thee.\n\nO Mary, conceived without sin,\npray for us who have recourse to thee.\n\nO Virgin Mother of God,\nMary Immaculate,\nwe dedicate and consecrate ourselves to thee\nunder the title of Our Lady of the Miraculous Medal.\nMay this medal be for each one of us\na sure sign of thy affection for us\nand a constant reminder of our duties toward thee.\nAmen.",
  },
  {
    slug: "knock-prayer",
    title: "Prayer to Our Lady of Knock",
    category: "apparition",
    apparitionSlug: "knock",
    intro:
      "At Knock she said nothing at all — she simply stood in the rain with the Lamb, and stayed.",
    source: "Traditional Irish prayer; Knock, County Mayo, 21 August 1879",
    text: "Our Lady of Knock,\nQueen of Ireland,\nyou gave hope to your people in a time of distress\nand comforted them in sorrow.\n\nYou have inspired countless pilgrims\nto pray with confidence to your Divine Son,\nremembering His promise:\n'Ask and you shall receive, seek and you shall find.'\n\nHelp me to remember that we are all pilgrims\non the road to Heaven.\nFill me with love and concern\nfor my brothers and sisters in Christ,\nespecially those who live with me.\n\nComfort me when I am sick, lonely, or depressed.\nTeach me how to take part ever more reverently\nin the Holy Mass.\n\nGive me a greater love of Jesus in the Blessed Sacrament.\nPray for me now, and at the hour of my death.\nAmen.",
  },
];

export const CATEGORY_LABEL: Record<PrayerCategory, string> = {
  marian: "Marian Prayers",
  rosary: "The Holy Rosary",
  litany: "Litanies",
  consecration: "Consecration",
  apparition: "From the Apparitions",
};

export function getPrayer(slug: string): Prayer | undefined {
  return PRAYERS.find((p) => p.slug === slug);
}
